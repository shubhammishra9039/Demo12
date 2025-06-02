import Link from 'next/link';
import { useCart } from '../context/CartContext';
import Image from 'next/image';

export default function Header() {
  const { cartItems } = useCart();
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="p-4 bg-gray-100 text-white flex justify-between items-center">
      <Link href="/" className="text-xl font-bold text-black">
        Ecomm Store
      </Link>
      <Link href="/checkout">
        <div className="relative">
        <Image src={"/cart.png"} height={30} width={30} alt='cart-icon'/>
          {totalItems > 0 && (
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">
              {totalItems}
            </span>
          )}
        </div>
      </Link>
    </header>
  );
}
