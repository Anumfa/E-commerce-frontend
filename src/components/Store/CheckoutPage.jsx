import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { clearCart } from '../../redux/slices/cartSlice';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import './StoreStyles.css';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:9000';

const CheckoutForm = ({ formData, handleChange, cartItems, subtotal, shippingFee, totalPrice, isSubmitting, setIsSubmitting, error, setError, dispatch, navigate }) => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      let paymentStatus = 'Pending';
      
      if (formData.paymentMethod === 'Credit Card') {
        if (!stripe || !elements) {
          setError("Stripe hasn't loaded yet.");
          setIsSubmitting(false);
          return;
        }

        const res = await axios.post(`${API_BASE}/api/payment/create-payment-intent`, {
          amount: totalPrice
        });

        const { clientSecret } = res.data;

        const result = await stripe.confirmCardPayment(clientSecret, {
          payment_method: {
            card: elements.getElement(CardElement),
            billing_details: {
              name: formData.name,
              email: formData.email,
              address: {
                city: formData.city,
                line1: formData.address,
              }
            },
          },
        });

        if (result.error) {
          setError(result.error.message);
          setIsSubmitting(false);
          return;
        }

        if (result.paymentIntent.status === 'succeeded') {
          paymentStatus = 'Completed';
        }
      }

      const orderPayload = {
        customerInfo: {
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          address: formData.address,
          city: formData.city
        },
        orderItems: cartItems.map(item => ({
          product: item.product._id,
          name: item.product.name,
          quantity: item.quantity,
          price: item.product.discountprice || item.product.price,
          selectedColor: item.selectedColor,
          selectedSize: item.selectedSize
        })),
        subtotal,
        shippingFee,
        totalPrice,
        paymentMethod: formData.paymentMethod,
        paymentStatus
      };

      const response = await axios.post(`${API_BASE}/api/order/create`, orderPayload);
      
      if (response.data.success) {
        dispatch(clearCart());
        navigate(`/order-confirmation/${response.data.data._id}`);
      } else {
        setError(response.data.message || 'Failed to place order');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Network error while placing order');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Full Name</label>
        <input type="text" name="name" required value={formData.name} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} placeholder="John Doe" />
      </div>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Email Address</label>
          <input type="email" name="email" required value={formData.email} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} placeholder="john@example.com" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1 }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Phone Number</label>
          <input type="text" name="phone" required value={formData.phone} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} placeholder="0300 1234567" />
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Delivery Address</label>
        <input type="text" name="address" required value={formData.address} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} placeholder="House 123, Street 4, Block 5..." />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>City</label>
        <input type="text" name="city" required value={formData.city} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }} placeholder="Karachi" />
        <span style={{ fontSize: '12px', color: '#888' }}>*Delivery Charges: Karachi Rs. 300 / Other Cities Rs. 400</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Payment Method</label>
        <select name="paymentMethod" value={formData.paymentMethod} onChange={handleChange} style={{ padding: '12px 16px', borderRadius: '8px', border: '1px solid #ddd', fontSize: '15px' }}>
          <option value="Cash on Delivery">Cash on Delivery</option>
          <option value="Credit Card">Credit Card</option>
        </select>
      </div>

      {formData.paymentMethod === 'Credit Card' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', padding: '16px', border: '1px solid #ddd', borderRadius: '8px' }}>
          <label style={{ fontSize: '14px', fontWeight: '600', color: '#555' }}>Card Details</label>
          <CardElement options={{ style: { base: { fontSize: '16px', color: '#424770', '::placeholder': { color: '#aab7c4' } } } }} />
        </div>
      )}

      <button 
        type="submit" 
        disabled={isSubmitting || (formData.paymentMethod === 'Credit Card' && !stripe)}
        style={{ marginTop: '16px', padding: '16px', backgroundColor: '#111', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
      >
        {isSubmitting ? 'Processing Order...' : 'Place Order'}
      </button>
    </form>
  );
};

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: 'Karachi',
    paymentMethod: 'Cash on Delivery'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const { data } = await axios.get(`${API_BASE}/api/payment/config`);
        if (data.publishableKey) {
          setStripePromise(loadStripe(data.publishableKey));
        } else {
          setError('Backend did not provide a Stripe Publishable Key. Please restart your backend server.');
        }
      } catch (err) {
        console.error('Failed to load Stripe config', err);
        setError('Failed to connect to backend payment service.');
      }
    };
    fetchConfig();
  }, []);

  useEffect(() => {
    if (cartItems.length === 0) {
      navigate('/cart');
    }
  }, [cartItems, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.discountprice || item.product.price) * item.quantity, 0);
  const shippingFee = formData.city.toLowerCase().trim() === 'karachi' ? 300 : 400;
  const totalPrice = subtotal + shippingFee;

  if (cartItems.length === 0) return null;

  return (
    <div className="store-page-container" style={{ padding: '40px 24px', maxWidth: '1000px', margin: '0 auto', marginTop: '80px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '32px' }}>Checkout</h1>
      
      {error && (
        <div style={{ backgroundColor: '#fee2e2', color: '#b91c1c', padding: '16px', borderRadius: '8px', marginBottom: '24px' }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr', gap: '40px' }}>
        <div style={{ backgroundColor: '#fff', padding: '32px', borderRadius: '16px', border: '1px solid #eee' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Delivery Information</h2>
          {stripePromise ? (
            <Elements stripe={stripePromise}>
              <CheckoutForm 
                formData={formData} 
                handleChange={handleChange}
                cartItems={cartItems}
                subtotal={subtotal}
                shippingFee={shippingFee}
                totalPrice={totalPrice}
                isSubmitting={isSubmitting}
                setIsSubmitting={setIsSubmitting}
                error={error}
                setError={setError}
                dispatch={dispatch}
                navigate={navigate}
              />
            </Elements>
          ) : (
            <p>Loading payment methods...</p>
          )}
        </div>

        <div style={{ backgroundColor: '#f9f9f9', padding: '32px', borderRadius: '16px', border: '1px solid #eee', height: 'fit-content' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '24px' }}>Your Order</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '24px' }}>
            {cartItems.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '14px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <img src={item.product.images[0]} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '6px' }} />
                  <div>
                    <p style={{ margin: 0, fontWeight: '600', color: '#333' }}>{item.product.name}</p>
                    <p style={{ margin: 0, color: '#888', fontSize: '12px' }}>Qty: {item.quantity}</p>
                  </div>
                </div>
                <span style={{ fontWeight: '600' }}>Rs. {(item.product.discountprice || item.product.price) * item.quantity}</span>
              </div>
            ))}
          </div>

          <div style={{ height: '1px', backgroundColor: '#e5e5e5', margin: '20px 0' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666', fontSize: '15px' }}>
            <span>Subtotal</span>
            <span style={{ color: '#333', fontWeight: '600' }}>Rs. {subtotal}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#666', fontSize: '15px' }}>
            <span>Shipping ({formData.city})</span>
            <span style={{ color: '#333', fontWeight: '600' }}>Rs. {shippingFee}</span>
          </div>
          
          <div style={{ height: '1px', backgroundColor: '#e5e5e5', margin: '20px 0' }}></div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '20px' }}>
            <span style={{ fontWeight: 'bold' }}>Total</span>
            <span style={{ fontWeight: '800', color: '#d97706' }}>Rs. {totalPrice}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
