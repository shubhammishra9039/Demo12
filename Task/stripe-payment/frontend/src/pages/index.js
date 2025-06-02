import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "@/components/Header";

export default function HomePage() {
  const [products, setProducts] = useState([]);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  return (
    <>
      <Header />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 rounded ">
        {products.map((product) => (
          <div key={product._id} className="border p-4 rounded">
            <div
              className="h-40 object-cover bg-gray-600 rounded"
            />
            <h2 className="text-lg font-bold">{product.name}</h2>
            <p>${(product.price / 100).toFixed(2)}</p>
            <button
              onClick={() => addToCart(product)}
              className="mt-2 px-4 py-2 bg-blue-600 text-white rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </>
  );
}
