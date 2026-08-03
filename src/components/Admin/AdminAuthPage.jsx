import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser, clearError } from '../../redux/slices/authSlice';
import { User, Mail, Lock, Eye, EyeOff, LogIn, LayoutDashboard } from 'lucide-react';

const AdminAuthPage = () => {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.auth);

  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    dispatch(clearError());
  }, [isLogin, dispatch]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      dispatch(loginUser({ email: formData.email, password: formData.password }));
    } else {
      dispatch(registerUser(formData));
    }
  };

  return (
    <div className="admin-auth-fullpage">
      {/* Decorative background elements */}
      <div className="auth-bg-circle auth-bg-circle-1"></div>
      <div className="auth-bg-circle auth-bg-circle-2"></div>
      <div className="auth-bg-circle auth-bg-circle-3"></div>

      <div className="admin-auth-fullpage-card">
        {/* Brand Logo */}
        <div className="auth-brand">
          <div className="auth-brand-dot"></div>
          <span className="auth-brand-text">EcoVibe</span>
          <span className="auth-brand-badge">Admin</span>
        </div>

        <div className="auth-divider"></div>

        <div className="auth-header">
          <div className="auth-icon-wrapper">
            {isLogin ? <LogIn size={28} /> : <User size={28} />}
          </div>
          <h1 className="auth-title">{isLogin ? 'Welcome Back' : 'Create Account'}</h1>
          <p className="auth-subtitle">
            {isLogin ? 'Sign in to manage your store' : 'Register to manage your store'}
          </p>
        </div>

        {error && (
          <div className="auth-error">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          {!isLogin && (
            <div className="auth-field">
              <label>Full Name</label>
              <div className="auth-input-box">
                <User size={18} className="auth-input-icon" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Enter your name" required />
              </div>
            </div>
          )}

          <div className="auth-field">
            <label>Email Address</label>
            <div className="auth-input-box">
              <Mail size={18} className="auth-input-icon" />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Enter your email" required />
            </div>
          </div>

          <div className="auth-field">
            <label>Password</label>
            <div className="auth-input-box">
              <Lock size={18} className="auth-input-icon" />
              <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} placeholder="Enter your password" required />
              <button type="button" className="auth-pass-toggle" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          <button type="submit" disabled={loading} className="auth-submit-btn">
            {loading ? (
              <span className="auth-loading">Processing...</span>
            ) : (
              <span className="auth-btn-content">
                {isLogin ? 'Sign In' : 'Sign Up'}
                <LogIn size={18} />
              </span>
            )}
          </button>
        </form>

        <div className="auth-footer">
          <span>{isLogin ? "Don't have an account?" : 'Already have an account?'}</span>
          <button className="auth-switch-btn" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? 'Create one here' : 'Log in here'}
          </button>
        </div>

        <div className="auth-footer-note">
          <LayoutDashboard size={14} />
          <span>Admin Panel - EcoVibe Store Management</span>
        </div>
      </div>
    </div>
  );
};

export default AdminAuthPage;
