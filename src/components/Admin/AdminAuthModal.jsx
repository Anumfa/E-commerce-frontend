import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../../redux/slices/authSlice';
import { isValidEmail, EMAIL_ERROR_MESSAGE } from '../../utils/validateEmail';
import { X, User, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const AdminAuthModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [success, setSuccess] = useState('');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    dispatch(clearError());
  }, [isLogin, dispatch]);

  useEffect(() => {
    if (isAuthenticated && isOpen) {
      onClose();
    }
  }, [isAuthenticated, isOpen, onClose]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormError('');
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');

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
      try {
        await dispatch(registerUser(formData)).unwrap();
        // Registration done -> send the admin to the login form.
        setFormData({ name: '', email: formData.email, password: '' });
        setSuccess('Account created successfully! Please sign in to continue.');
        setIsLogin(true);
      } catch (err) {
        // The error is already surfaced through the redux slice.
      }
    }
  };

  return (
    <div className="admin-auth-overlay">
      <div className="admin-auth-card">
        <button className="admin-auth-close" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="admin-auth-header">
          <div className="admin-auth-icon">
            <User size={28} />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Create Account'}</h2>
          <p>{isLogin ? 'Sign in to manage your store' : 'Register to manage your store'}</p>
        </div>

        {(formError || error) && (
          <div className="admin-auth-error">{formError || error}</div>
        )}

        {success && (
          <div className="admin-auth-success">{success}</div>
        )}

        <form onSubmit={handleSubmit} className="admin-auth-form" noValidate>
          {!isLogin && (
            <div className="admin-auth-field">
              <label>Full Name</label>
              <div className="admin-auth-input">
                <User size={18} />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
              </div>
            </div>
          )}

          <div className="admin-auth-field">
            <label>Email Address</label>
            <div className="admin-auth-input">
              <Mail size={18} />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
            </div>
          </div>

          <div className="admin-auth-field">
            <label>Password</label>
            <div className="admin-auth-input">
              <Lock size={18} />
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
              <button type="button" className="admin-auth-pass-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="admin-auth-submit">
            {loading ? 'Processing...' : (isLogin ? 'Sign In' : 'Sign Up')}
          </button>
        </form>

        <div className="admin-auth-footer">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <button className="admin-auth-switch" onClick={() => { setSuccess(''); setFormError(''); setIsLogin(!isLogin); }}>
            {isLogin ? 'Sign Up' : 'Sign In'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthModal;
