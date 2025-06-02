import React, { useEffect, useState } from 'react';
import api from '../api/api';

const Checkout = () => {
  const [products, setProducts] = useState([]);
  const [selected, setSelected] = useState({});
  const [email, setEmail] = useState('');

  useEffect(() => {
    api.get('/products')
      .then(res => setProducts(res.data))
      .catch(err => console.error('Error fetching products:', err));
  }, []);


  
  const handleChange = (id, value) => {
    setSelected(prev => ({ ...prev, [id]: parseInt(value) || 0 }));
  };

  const handleCheckout = async () => {
    const items = products
      .filter(p => selected[p._id] > 0)
      .map(p => ({
        name: p.name,
        description: p.description || '',
        price: p.price,
        quantity: selected[p._id],
      }));

    if (!email || items.length === 0) {
      alert('Enter email and select at least one product.');
      return;
    }

    try {
      const res = await api.post('/checkout/create-session', { email, items });
      window.location.href = res.data.url;
    } catch (err) {
      console.error('Checkout error:', err);
      alert('Checkout failed.');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Stripe Checkout</h1>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        style={{ marginBottom: '1rem', padding: '0.5rem', width: '100%' }}
      />
      <ul>
        {products.map(p => (
          <li key={p._id} style={{ marginBottom: '1rem' }}>
            <strong>{p.name}</strong> – ${(p.price / 100).toFixed(2)}
            <br />
            <input
              type="number"
              min="0"
              value={selected[p._id] || ''}
              onChange={e => handleChange(p._id, e.target.value)}
              style={{ padding: '0.25rem', width: '60px' }}
            />
          </li>
        ))}
      </ul>
      <button onClick={handleCheckout} style={{ padding: '0.75rem 1.5rem' }}>
        Checkout
      </button>
    </div>
  );
};

export default Checkout;
