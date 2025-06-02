import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '../context/CartContext';

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();    
  }, []);

  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Payment Successful!</h1>
      <p className="mb-4">Thank you for your purchase.</p>
      <Link href="/">
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Back to Home
        </button>
      </Link>
    </div>
  );
}
