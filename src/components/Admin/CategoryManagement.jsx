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
  const [formData, setFormData] = useState({ name: '', image: null, subcategories: [] });
  const [subcatInput, setSubcatInput] = useState('');
  const [preview, setPreview] = useState('');

  useEffect(() => {
    dispatch(fetchCategories());
  }, [dispatch]);

  const handleOpenModal = (category = null) => {
    if (category) {
      setEditingCategory(category);
      setFormData({ name: category.name, image: null, subcategories: category.subcategories || [] });
      setPreview(category.imageUrl);
    } else {
      setEditingCategory(null);
      setFormData({ name: '', image: null, subcategories: [] });
      setPreview('');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setFormData({ name: '', image: null, subcategories: [] });
    setPreview('');
    setSubcatInput('');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSubcat = () => {
    if (subcatInput.trim() && !formData.subcategories.includes(subcatInput.trim())) {
      setFormData({ ...formData, subcategories: [...formData.subcategories, subcatInput.trim()] });
      setSubcatInput('');
    }
  };

  const handleRemoveSubcat = (subcat) => {
    setFormData({ ...formData, subcategories: formData.subcategories.filter(s => s !== subcat) });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('name', formData.name);
    if (formData.image) {
      data.append('image', formData.image);
    }
    data.append('subcategories', JSON.stringify(formData.subcategories));

    try {
      if (editingCategory) {
        await dispatch(updateCategory({ id: editingCategory._id, formData: data })).unwrap();
        alert('Category updated successfully!');
      } else {
        await dispatch(createCategory(data)).unwrap();
        alert('Category created successfully!');
      }
      handleCloseModal();
    } catch (error) {
      alert('Error saving category: ' + (typeof error === 'string' ? error : error.message || 'Unknown error'));
      console.error(error);
    }
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
                      <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <span className="category-name">{cat.name}</span>
                        <span style={{ fontSize: '12px', color: 'gray' }}>{(cat.subcategories || []).join(', ')}</span>
                      </div>
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
            <label>Subcategories</label>
            <div className="tag-input">
              <input 
                type="text" 
                value={subcatInput} 
                onChange={(e) => setSubcatInput(e.target.value)} 
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddSubcat())}
                placeholder="Type and press Add" 
              />
              <button type="button" onClick={handleAddSubcat}>Add</button>
            </div>
            <div className="tags-container">
              {formData.subcategories.map(subcat => (
                <span key={subcat} className="tag">
                  {subcat}
                  <Trash2 size={12} onClick={() => handleRemoveSubcat(subcat)} />
                </span>
              ))}
            </div>
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
