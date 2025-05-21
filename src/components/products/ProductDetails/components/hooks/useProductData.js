import { useEffect, useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { api } from "../../../../../axios/axios";


export default function useProductData(id, location) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
       const response = await api.get(`/products`); 
        const foundProduct = response.data.products.find(p => p._id === id);

        if (!foundProduct) {
          setError("Product not found");
          setLoading(false);
          return;
        }

        setProduct(foundProduct);

        const variantIdFromState = location.state?.variantId;
        if (variantIdFromState) {
          const variantIndex = foundProduct.variants.findIndex(
            v => v._id === variantIdFromState
          );
          if (variantIndex >= 0) setSelectedVariant(variantIndex);
          else navigate(`/shop/${id}`, { replace: true });
        }
      } catch (err) {
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, location.state, navigate]);

  useEffect(() => {
    if (product) {
      const fetchRelatedProducts = async () => {
        try {
          const response = await api.get(`/products`);
          const currentTags = product.categories?.sub?.tags || [];
          
          if (currentTags.length > 0) {
            const related = response.data.products
              .filter(p => p._id !== product._id && 
                p.categories?.sub?.tags?.some(tag => currentTags.includes(tag)))
              .slice(0, 4);
            setRelatedProducts(related);
          }
        } catch (err) {
          console.error("Error fetching related products:", err);
        }
      };
      fetchRelatedProducts();
    }
  }, [product]);

  const handleVariantChange = (index) => {
    setSelectedVariant(index);
    setSelectedImage(0);
    navigate(`/shop/${id}`, {
      replace: true,
      state: { variantId: product.variants[index]._id },
    });
  };

  return {
    product,
    loading,
    error,
    selectedVariant,
    selectedImage,
    setSelectedImage,
    handleVariantChange,
    relatedProducts
  };
}