import Link from 'next/link';

export default function CancelPage() {
  return (
    <div className="p-6 text-center">
      <h1 className="text-3xl font-bold text-red-600 mb-4"> Payment Failed!</h1>
      <p className="mb-4">Something went wrong or you cancelled the payment.</p>
      <Link href="/checkout">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded">
          Try Again
        </button>
      </Link>
    </div>
  );
}
