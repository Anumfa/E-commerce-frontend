import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ArrowLeft } from 'lucide-react';
import { updateQuantity, removeFromCart } from '../../redux/slices/cartSlice';
import './StoreStyles.css';

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);

  const subtotal = cartItems.reduce((acc, item) => acc + (item.product.discountprice || item.product.price) * item.quantity, 0);

  return (
    <div className="store-page-container" style={{ padding: '40px 24px', maxWidth: '1200px', margin: '0 auto', marginTop: '80px', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '32px', fontWeight: '800', marginBottom: '8px' }}>Shopping Cart</h1>
      <p style={{ color: '#666', marginBottom: '32px' }}>Review your items before checkout.</p>
      
      {cartItems.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px', backgroundColor: '#f9f9f9', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '20px', color: '#333' }}>Your cart is empty</h3>
          <p style={{ color: '#666', marginTop: '8px' }}>Looks like you haven't added anything yet.</p>
        </div>
      ) : (
        <div className="cart-layout">
          {/* Cart Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {cartItems.map((item, idx) => (
              <div key={idx} className="cart-item-row" style={{ display: 'flex', gap: '20px', padding: '20px', backgroundColor: '#fff', borderRadius: '16px', border: '1px solid #eee' }}>
                <img className="cart-item-thumb" src={item.product.images[0]} alt={item.product.name} style={{ width: '120px', height: '120px', objectFit: 'cover', borderRadius: '10px', flexShrink: 0 }} />
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                  <div>
                    <h3 style={{ fontSize: '18px', fontWeight: 'bold', margin: '0 0 4px 0' }}>{item.product.name}</h3>
                    <p style={{ fontSize: '14px', color: '#666', margin: 0 }}>Category: {item.product.ptype}</p>
                    <div style={{ display: 'flex', gap: '12px', marginTop: '8px' }}>
                      {item.selectedSize && <span style={{ fontSize: '13px', backgroundColor: '#f3f4f6', padding: '4px 8px', borderRadius: '4px' }}>Size: {item.selectedSize}</span>}
                      {item.selectedColor && (
                        <span style={{ fontSize: '13px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                          Color: <div style={{ width: '14px', height: '14px', borderRadius: '50%', backgroundColor: item.selectedColor, border: '1px solid #ddd' }}></div>
                        </span>
                      )}
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #ddd', borderRadius: '8px', overflow: 'hidden' }}>
                      <button 
                        onClick={() => dispatch(updateQuantity({ ...item, productId: item.product._id, quantity: Math.max(1, item.quantity - 1) }))}
                        style={{ padding: '8px 12px', border: 'none', background: '#f9f9f9', cursor: 'pointer' }}
                      ><Minus size={14} /></button>
                      <span style={{ padding: '0 16px', fontSize: '14px', fontWeight: '600' }}>{item.quantity}</span>
                      <button 
                        onClick={() => dispatch(updateQuantity({ ...item, productId: item.product._id, quantity: item.quantity + 1 }))}
                        style={{ padding: '8px 12px', border: 'none', background: '#f9f9f9', cursor: 'pointer' }}
                      ><Plus size={14} /></button>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                      <span style={{ fontSize: '18px', fontWeight: 'bold', color: '#d97706' }}>${(item.product.discountprice || item.product.price) * item.quantity}</span>
                      <button 
                        onClick={() => dispatch(removeFromCart({ ...item, productId: item.product._id }))}
                        style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
                        title="Remove Item"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div style={{ backgroundColor: '#fff', padding: '24px', borderRadius: '16px', border: '1px solid #eee', height: 'fit-content' }}>
            <h3 style={{ fontSize: '20px', fontWeight: 'bold', margin: '0 0 20px 0' }}>Order Summary</h3>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666' }}>
              <span>Subtotal</span>
              <span style={{ color: '#333', fontWeight: '600' }}>${subtotal}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px', color: '#666' }}>
              <span>Shipping</span>
              <span style={{ color: '#333', fontWeight: '600' }}>Free</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', color: '#666' }}>
              <span>Tax</span>
              <span style={{ color: '#333', fontWeight: '600' }}>Calculated at checkout</span>
            </div>
            
            <div style={{ height: '1px', backgroundColor: '#eee', margin: '20px 0' }}></div>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', fontSize: '18px' }}>
              <span style={{ fontWeight: 'bold' }}>Total</span>
              <span style={{ fontWeight: '800', color: '#d97706' }}>${subtotal}</span>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <button 
                onClick={() => navigate('/checkout')}
                className="store-btn" 
                style={{ width: '100%', padding: '16px', backgroundColor: '#d97706', color: 'white', border: 'none', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                Proceed to Checkout <ArrowRight size={18} />
              </button>
              
              <button 
                onClick={() => navigate('/shop')}
                className="store-btn-outline" 
                style={{ width: '100%', padding: '16px', backgroundColor: 'transparent', color: '#666', border: '1px solid #ddd', borderRadius: '10px', fontSize: '16px', fontWeight: 'bold', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <ArrowLeft size={18} /> Back to Shopping
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
