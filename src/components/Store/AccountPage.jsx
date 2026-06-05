import React, { useState } from 'react';
import './StoreStyles.css';

const AccountPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(isLogin ? 'Login functionality to be connected to backend.' : 'Registration functionality to be connected to backend.');
  };

  return (
    <div className="store-page-container" style={{ padding: '40px 24px', maxWidth: '500px', margin: '0 auto', marginTop: '100px', minHeight: '60vh' }}>
      <div className="account-card" style={{ backgroundColor: '#fff', padding: '30px', borderRadius: '16px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px' }}>
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
            </div>
          )}
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          
          <button type="submit" className="store-btn" style={{ padding: '14px', backgroundColor: '#d97706', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '8px' }}>
            {isLogin ? 'Sign In' : 'Sign Up'}
          </button>
        </form>
        
        <div style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={() => setIsLogin(!isLogin)} 
            style={{ color: '#d97706', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign up here' : 'Log in here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AccountPage;
