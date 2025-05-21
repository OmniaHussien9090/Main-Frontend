import Layout from "../components/layout/layout.jsx";
import { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addCartItem } from "../redux/cartActions";

function Shop() {
  const [products, setProducts] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("token");
    axios
      .get("http://localhost:3000/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("Products Response:", res.data);
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log("Error fetching products:", err);
        alert("Unauthorized: Please login again");
      });
  }, []);

  const handleAddToCart = (product) => {
    dispatch(addCartItem(product));
  };

  return (
    <div className="grid grid-cols-3 gap-4 p-4">
      {products.map((product) => {
        const variant = product.variants?.[0]; // أول variant

        if (!variant) return null; // تجاهل المنتجات بدون variant

        return (
          <div key={product._id} className="card bg-base-200 shadow p-4">
            <h2 className="font-bold text-lg">{variant.name.en}</h2>
            <p>{product.description?.en}</p>
            <p className="text-primary font-bold">{variant.price} EGP</p>
            <p className="text-secondary font-bold ">
              sale:{variant.discountPrice} EGP
            </p>

            <img
              src={variant.image}
              alt={variant.name.en}
              className="w-full h-48 object-cover rounded"
            />
            <button
              onClick={() => handleAddToCart(product)}
              className="btn btn-primary mt-2"
            >
              Add to Cart
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default Shop;
