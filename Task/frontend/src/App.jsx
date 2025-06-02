import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Products from './page/Products';
import Checkout from './page/Checkout';

function App() {
  return (
    <Router>
      <nav style={{ padding: '1rem', borderBottom: '1px solid #ccc' }}>
        <Link to="/" style={{ marginRight: '1rem' }}>Products</Link>
        <Link to="/checkout">Checkout</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/success" element={<h2>Payment Successful!</h2>} />
        <Route path="/cancel" element={<h2>Payment Cancelled.</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
