import { Link } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

type CartItemProps = {
  cartItem: {
    photo: string;
    productId: string;
    name: string;
    price: number;
    quantity: number;
    stock: number;
  };
};

const CartItem = ({ cartItem }: CartItemProps) => {
  const { photo, productId, name, price, quantity } = cartItem;
  return (
    <div className="cart-item">
      <img src={photo} alt={name} />
      <article>
        <Link to={`/product/${productId}`}>{name}</Link>
        <span>₹{price}</span>
      </article>
      <div className="quantity-controls">
        <button>-</button>
        <p>{quantity}</p>
        <button>+</button>
      </div>
      <button className="remove-button">
        <FaTrash />
      </button>
    </div>
  );
};

export default CartItem;
