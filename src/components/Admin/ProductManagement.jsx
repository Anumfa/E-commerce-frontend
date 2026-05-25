import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Search, Plus, Edit2, Trash2, Image as ImageIcon, X } from 'lucide-react';
import { fetchProducts, createProduct, updateProduct, deleteProduct } from '../../redux/slices/productSlice';
import { fetchCategories } from '../../redux/slices/categorySlice';
import Modal from './Modal';
import './AdminStyles.css';

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { items: products, loading } = useSelector((state) => state.product);
  const { items: categories } = useSelector((state) => state.category);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    quantity: 0,
    price: 0,
    discount: 0,
    ptype: '',
    catid: '',
    size: [],
    color: [],
    images: []
  });
  
  const [previews, setPreviews] = useState([]);
  const [newSize, setNewSize] = useState('');
  const [newColor, setNewColor] = useState('');

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        description: product.description,
        quantity: product.quantity,
        price: product.price,
        discount: product.discount,
        ptype: product.ptype,
        catid: product.catid?._id || product.catid,
        size: product.size || [],
        color: product.color || [],
        images: []
      });
      setPreviews(product.images || []);
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        description: '',
        quantity: 0,
        price: 0,
        discount: 0,
        ptype: '',
        catid: '',
        size: [],
        color: [],
        images: []
      });
      setPreviews([]);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({ ...formData, images: [...formData.images, ...files] });
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const addSize = () => {
    if (newSize && !formData.size.includes(newSize)) {
      setFormData({ ...formData, size: [...formData.size, newSize] });
      setNewSize('');
    }
  };

  const removeSize = (s) => {
    setFormData({ ...formData, size: formData.size.filter(item => item !== s) });
  };

  const addColor = () => {
    if (newColor && !formData.color.includes(newColor)) {
      setFormData({ ...formData, color: [...formData.color, newColor] });
      setNewColor('');
    }
  };

  const removeColor = (c) => {
    setFormData({ ...formData, color: formData.color.filter(item => item !== c) });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        formData.images.forEach(img => data.append('images', img));
      } else if (Array.isArray(formData[key])) {
        formData[key].forEach(item => data.append(key, item));
      } else {
        data.append(key, formData[key]);
      }
    });

    if (editingProduct) {
      dispatch(updateProduct({ id: editingProduct._id, formData: data }));
    } else {
      dispatch(createProduct(data));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="product-management">
      <div className="management-header">
        <h2 className="section-title">Product Management</h2>
        <button className="add-btn" onClick={() => handleOpenModal()}><Plus size={18} /> Add Product</button>
      </div>

      <div className="top-filter-bar">
        <div className="filter-item search-item">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search products..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="product-table-container">
        {loading ? (
          <div className="loading-spinner">Loading products...</div>
        ) : (
          <table className="management-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map(product => (
                <tr key={product._id}>
                  <td>
                    <div className="table-product-info">
                      <img src={product.images?.[0]} alt={product.name} className="table-img" />
                      <span>{product.name}</span>
                    </div>
                  </td>
                  <td><span className="table-tag">{product.catid?.name || 'N/A'}</span></td>
                  <td className="table-price">${product.price}</td>
                  <td>{product.quantity} pcs</td>
                  <td>
                    <div className="table-actions">
                      <button className="edit-btn" onClick={() => handleOpenModal(product)}><Edit2 size={14} /></button>
                      <button className="delete-btn" onClick={() => handleDelete(product._id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingProduct ? 'Edit Product' : 'Add Product'}
      >
        <form onSubmit={handleSubmit} className="admin-form product-form">
          <div className="form-row">
            <div className="form-group">
              <label>Product Name</label>
              <input type="text" name="name" value={formData.name} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Category</label>
              <select name="catid" value={formData.catid} onChange={handleInputChange} required>
                <option value="">Select Category</option>
                {categories.map(cat => <option key={cat._id} value={cat._id}>{cat.name}</option>)}
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea name="description" value={formData.description} onChange={handleInputChange} required />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Price ($)</label>
              <input type="number" name="price" value={formData.price} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label>Discount (%)</label>
              <input type="number" name="discount" value={formData.discount} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label>Quantity</label>
              <input type="number" name="quantity" value={formData.quantity} onChange={handleInputChange} required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Product Type</label>
              <input type="text" name="ptype" value={formData.ptype} onChange={handleInputChange} placeholder="e.g. Simple, Variable" required />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Sizes</label>
              <div className="tag-input">
                <input type="text" value={newSize} onChange={(e) => setNewSize(e.target.value)} placeholder="Add size" />
                <button type="button" onClick={addSize}>Add</button>
              </div>
              <div className="tags-container">
                {formData.size.map(s => (
                  <span key={s} className="tag">{s} <X size={12} onClick={() => removeSize(s)} /></span>
                ))}
              </div>
            </div>
            <div className="form-group">
              <label>Colors</label>
              <div className="tag-input">
                <input type="text" value={newColor} onChange={(e) => setNewColor(e.target.value)} placeholder="Add color" />
                <button type="button" onClick={addColor}>Add</button>
              </div>
              <div className="tags-container">
                {formData.color.map(c => (
                  <span key={c} className="tag">{c} <X size={12} onClick={() => removeColor(c)} /></span>
                ))}
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Images (Min 3 required)</label>
            <div className="file-input-container">
              <input type="file" id="product-images" onChange={handleFileChange} accept="image/*" multiple hidden />
              <label htmlFor="product-images" className="file-input-label">
                <ImageIcon size={24} />
                <span>Upload Images</span>
              </label>
            </div>
            <div className="previews-grid">
              {previews.map((src, index) => (
                <img key={index} src={src} alt="Preview" className="image-preview" />
              ))}
            </div>
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
            <button type="submit" className="submit-btn">{editingProduct ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default ProductManagement;
