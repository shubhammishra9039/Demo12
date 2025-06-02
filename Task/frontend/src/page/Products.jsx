
import { useNavigate } from 'react-router-dom';

const Products = () => {
  const navigate = useNavigate();


  const products = [
    {
      _id: '1',
      name: 'Wireless Mouse',
      description: 'Ergonomic and responsive wireless mouse',
      productPrice: 1999, // $19.99
    },
    {
      _id: '2',
      name: 'Mechanical Keyboard',
      description: 'RGB lighting and tactile keys',
      productPrice: 8999,
    },
    {
      _id: '3',
      name: 'USB-C Hub',
      description: 'Expand your ports with HDMI, USB-A and Ethernet',
      productPrice: 3499,
    },
    {
      _id: '4',
      name: 'Noise Cancelling Headphones',
      description: 'Immersive sound with ANC',
      productPrice: 12999,
    },
    {
      _id: '5',
      name: 'HD Webcam',
      description: '1080p camera perfect for video conferencing',
      productPrice: 4999,
    },
  ];

  const goToCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Products</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {products.map(product => (
          <div key={product._id} style={{ border: '1px solid #ccc', padding: '1rem', width: '250px' }}>
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p><strong>${(product.productPrice / 100).toFixed(2)}</strong></p>
            <button onClick={goToCheckout}>Buy Now</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Products;
