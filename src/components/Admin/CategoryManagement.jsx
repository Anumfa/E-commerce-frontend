import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layers, MoreVertical, Edit2, Trash2, Plus, Image as ImageIcon } from 'lucide-react';
import { fetchCategories, createCategory, updateCategory, deleteCategory } from '../../redux/slices/categorySlice';
import Modal from './Modal';
import './AdminStyles.css';

const CategoryManagement = () => {
  const dispatch = useDispatch();
  const { items: categories, loading } = useSelector((state) => state.category);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [formData, setFormData] = useState({ name: '', image: null });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, image: null });
      setPreview(category.imageUrl);
    } else {
      setEditingCategory(null);
      setFormData({ name: '', image: null });
      setPreview('');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', image: null });
    setPreview('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    if (formData.image) {
      data.append('image', formData.image);
    }

    if (editingCategory) {
      dispatch(updateCategory({ id: editingCategory._id, formData: data }));
    } else {
      dispatch(createCategory(data));
    }
    handleCloseModal();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      dispatch(deleteCategory(id));
    }
  };

  return (
    <div className="category-management">
      <div className="management-header">
        <h2 className="section-title">Category Management</h2>
        <button className="add-btn" onClick={() => handleOpenModal()}><Plus size={18} /> Add Category</button>
      </div>

      <div className="product-table-container">
        {loading ? (
          <div className="loading-spinner">Loading categories...</div>
        ) : (
          <table className="management-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td>
                    <div className="table-product-info">
                      <img src={cat.imageUrl} alt={cat.name} className="table-img" style={{ width: '50px', height: '50px', borderRadius: '8px' }} />
                      <span className="category-name">{cat.name}</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <button className="edit-btn" title="Edit" onClick={() => handleOpenModal(cat)}><Edit2 size={14} /></button>
                      <button className="delete-btn" title="Delete" onClick={() => handleDelete(cat._id)}><Trash2 size={14} /></button>
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
        title={editingCategory ? 'Edit Category' : 'Add Category'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Category Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="Enter category name" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Category Image</label>
            <div className="file-input-container">
              <input 
                type="file" 
                id="cat-image" 
                onChange={handleFileChange} 
                accept="image/*" 
                hidden 
              />
              <label htmlFor="cat-image" className="file-input-label">
                {preview ? (
                  <img src={preview} alt="Preview" className="image-preview" />
                ) : (
                  <>
                    <ImageIcon size={24} />
                    <span>Upload Image</span>
                  </>
                )}
              </label>
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={handleCloseModal}>Cancel</button>
            <button type="submit" className="submit-btn">{editingCategory ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default CategoryManagement;
