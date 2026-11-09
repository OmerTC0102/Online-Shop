
import { Link } from "react-router";
import { useCartStore } from "../store/cartStore";

export default function Cart() {
  const items = useCartStore((state) => state.items);
  const removeItem = useCartStore((state) => state.removeItem);
  const setQuantity = useCartStore((state) => state.setQuantity);
  const clear = useCartStore((state) => state.clear);

  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (items.length === 0) {
    return (
      <section>
        <h1>Your Cart</h1>
        <p>Your cart is empty.</p>

        <Link to="/products">Continue Shopping</Link>
      </section>
    );
  }

  return (
    <section>
      <h1>Your Cart</h1>

      {items.map((item) => (
        <div className="cart-item" key={item.id}>
          <h3>{item.title}</h3>

          <p>${item.price.toFixed(2)}</p>

          <div>
            <button
              onClick={() =>
                setQuantity(item.id, item.quantity - 1)
              }
            >
              -
            </button>

            <span>{item.quantity}</span>

            <button
              onClick={() =>
                setQuantity(item.id, item.quantity + 1)
              }
            >
              +
            </button>
          </div>

          <button onClick={() => removeItem(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ${totalPrice.toFixed(2)}</h2>

      <button onClick={clear}>Clear Cart</button>

      <p>
        <Link to="/products">Continue Shopping</Link>
      </p>
    </section>
  );
}
