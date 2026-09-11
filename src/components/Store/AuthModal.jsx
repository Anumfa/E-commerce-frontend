import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GoogleLogin } from '@react-oauth/google';
import { loginUser, registerUser, googleLogin, clearError } from '../../redux/slices/authSlice';
import { isValidEmail, EMAIL_ERROR_MESSAGE } from '../../utils/validateEmail';
import { X } from 'lucide-react';
import './StoreStyles.css';

const AuthModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);
  
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [formError, setFormError] = useState('');

  // Clear errors when switching between login and signup
  useEffect(() => {
    dispatch(clearError());
  }, [isLogin, dispatch]);

  // Close modal when authenticated
  useEffect(() => {
    if (isAuthenticated && isOpen) {
      onClose();
    }
  }, [isAuthenticated, isOpen, onClose]);

  if (!isOpen) return null;

  const handleInputChange = (e) => {
    setFormError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isValidEmail(formData.email)) {
      setFormError(EMAIL_ERROR_MESSAGE);
      return;
    }

    if (!formData.password) {
      setFormError('Please enter your password');
      return;
    }

    setFormError('');
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      dispatch(registerUser(formData));
    }
  };

  const handleGoogleSuccess = (credentialResponse) => {
    dispatch(googleLogin(credentialResponse.credential));
  };

  const switchMode = () => {
    setFormError('');
    setIsLogin(!isLogin);
  };

  return (
    <div className="auth-modal-overlay" style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', 
      alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(4px)'
    }}>
      <div className="account-card" style={{ 
        backgroundColor: '#fff', padding: '30px', borderRadius: '16px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.2)', width: '100%', maxWidth: '400px',
        position: 'relative', margin: '20px'
      }}>
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          style={{ position: 'absolute', top: '15px', right: '15px', background: 'none', border: 'none', cursor: 'pointer', color: '#666' }}
        >
          <X size={20} />
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '24px', fontSize: '24px', color: '#333' }}>
          {isLogin ? 'Welcome Back' : 'Create an Account'}
        </h2>
        
        {(formError || error) && (
          <div style={{ backgroundColor: '#fee2e2', color: '#dc2626', padding: '10px', borderRadius: '8px', marginBottom: '16px', fontSize: '14px', textAlign: 'center' }}>
            {formError || error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {!isLogin && (
            <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <label style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>Full Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
            </div>
          )}
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          
          <div className="form-group" style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <label style={{ fontSize: '14px', fontWeight: '500', color: '#555' }}>Password</label>
            <input type="password" name="password" value={formData.password} onChange={handleInputChange} required style={{ padding: '12px', borderRadius: '8px', border: '1px solid #ddd' }} />
          </div>
          
          <button type="submit" disabled={loading} className="store-btn" style={{ 
            padding: '14px', backgroundColor: '#d97706', color: 'white', border: 'none', 
            borderRadius: '8px', fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', 
            marginTop: '8px', opacity: loading ? 0.7 : 1 
          }}>
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>
        
        <div style={{ display: 'flex', alignItems: 'center', margin: '20px 0' }}>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
          <span style={{ padding: '0 10px', color: '#888', fontSize: '12px', fontWeight: '500' }}>OR</span>
          <div style={{ flex: 1, height: '1px', backgroundColor: '#eee' }}></div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => {
              console.log('Login Failed');
            }}
          />
        </div>
        
        <div style={{ textAlign: 'center', marginTop: '24px', fontSize: '14px', color: '#666' }}>
          {isLogin ? "Don't have an account? " : "Already have an account? "}
          <span 
            onClick={switchMode} 
            style={{ color: '#d97706', cursor: 'pointer', fontWeight: 'bold' }}
          >
            {isLogin ? 'Sign up here' : 'Log in here'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default AuthModal;
