import Header from "@/components/Header";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function CheckoutPage() {
  const { cartItems, addToCart, removeFromCart, clearCart } = useCart();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCheckout = async () => {
    if (!email) return alert("Email is required");
    setLoading(true);

    const res = await fetch(
      "http://localhost:5000/api/checkout/create-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: cartItems, email }),
      }
    );

    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
    } else {
      alert("Failed to create Stripe session");
      setLoading(false);
    }
  };

  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <>
      <Header />
      <div className="p-6 mx-auto max-w-xl">
        <h2 className="text-2xl font-bold mb-4">Checkout</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div>
            <ul className="mb-4">
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="mb-2 flex justify-between items-center"
                >
                  <div>
                    {item.name} × {item.quantity} = $
                    {((item.price * item.quantity) / 100).toFixed(2)}
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-green-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() => addToCart(item)}
                    >
                      Add
                    </button>
                    <button
                      className="bg-red-500 text-white px-2 py-1 rounded text-sm"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <p className="mb-2 font-semibold">
              Total: ${(totalAmount / 100).toFixed(2)}
            </p>
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="p-2 border rounded w-full mb-4"
              required
            />
            <button
              onClick={handleCheckout}
              className="bg-blue-600 text-white px-4 py-2 rounded"
              disabled={loading}
            >
              {loading ? "Processing..." : "Proceed to Checkout"}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
