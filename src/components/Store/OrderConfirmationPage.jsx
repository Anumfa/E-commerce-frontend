import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';
import './StoreStyles.css';

const OrderConfirmationPage = () => {
  const { id } = useParams();

  return (
    <div className="store-page-container" style={{ padding: '80px 24px', maxWidth: '800px', margin: '0 auto', textAlign: 'center', minHeight: '60vh' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '24px' }}>
        <CheckCircle size={80} color="#10b981" />
      </div>
      
      <h1 style={{ fontSize: '36px', fontWeight: '800', marginBottom: '16px', color: '#111' }}>Thank you for your order!</h1>
      <p style={{ fontSize: '18px', color: '#666', marginBottom: '8px' }}>
        We've received your order and are getting it ready to be shipped.
      </p>
      <p style={{ fontSize: '16px', color: '#666', marginBottom: '40px' }}>
        An email confirmation has been sent to your email address.
      </p>

      <div style={{ backgroundColor: '#f9f9f9', border: '1px dashed #ccc', borderRadius: '12px', padding: '32px', marginBottom: '40px', display: 'inline-block', textAlign: 'left' }}>
        <p style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>Order Number</p>
        <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#111', fontFamily: 'monospace' }}>#{id}</p>
      </div>

      <div>
        <Link to="/shop" className="store-btn" style={{ padding: '16px 32px', backgroundColor: '#111', color: 'white', textDecoration: 'none', borderRadius: '50px', fontSize: '16px', fontWeight: 'bold', display: 'inline-block' }}>
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
