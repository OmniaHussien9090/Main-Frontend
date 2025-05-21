import { useDispatch, useSelector } from "react-redux";
import { toggleWishlistItem } from "../../redux/wishList";
import { api } from "../../axios/axios";

function CustomCard({ product }) {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const isWished = wishlist.includes(product._id);

  const toggleWishlist = async () => {
    try {
      await dispatch(toggleWishlistItem(product._id)).unwrap();
    } catch (err) {
      console.error("Wishlist toggle error:", err);
    }
  };

  return (
    <div className="card">
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <button onClick={toggleWishlist}>
        {isWished ? (
          <i className="fa-solid fa-heart text-red-500"></i>
        ) : (
          <i className="fa-regular fa-heart text-gray-500"></i>
        )}
      </button>
    </div>
  );
}
export default CustomCard;
