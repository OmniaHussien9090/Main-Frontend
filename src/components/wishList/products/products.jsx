import React, { useEffect, useState } from "react";
import CustomCard from '../card/customeCard';
import { useSelector } from 'react-redux';
import axios from 'axios';

function Product() {
  const wishlist = useSelector((state) => state.wishlist.items); 
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("/products"); 
        setProducts(res.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="px-4 sm:px-6 md:px-12">
      <h1 className="text-3xl sm:text-4xl font-bold text-[#373737] text-center py-6 font-['PTSans']">
        Products of the week
      </h1>

      <p className="text-center text-[#8A8A8A] font-['PTSans'] text-base sm:text-lg max-w-md sm:max-w-xl mx-auto mb-8 px-2">
        Discover our handpicked selection of this week's favorite pieces — where
        modern elegance meets everyday comfort. Elevate your space with designs
        made to stand out.
      </p>

      <div className="flex flex-col sm:flex-row justify-center items-center gap-6 flex-wrap pb-12">
        {products.map((product) => (
          <CustomCard key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
}

export default Product;
