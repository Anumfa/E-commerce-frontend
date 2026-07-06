import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Image as ImageIcon, MoreVertical, Edit2, Trash2, Plus, Search, Filter } from 'lucide-react';
import { fetchBanners, createBanner, updateBanner, deleteBanner } from '../../redux/slices/bannerSlice';
import Modal from './Modal';
import './AdminStyles.css';

const BannerManagement = () => {
  const dispatch = useDispatch();
  const { items: banners, loading } = useSelector((state) => state.banner);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '', image: null });
  const [preview, setPreview] = useState('');

  useEffect(() => {
    dispatch(fetchBanners());
  }, [dispatch]);

  const handleOpenModal = (banner = null) => {
    if (banner) {
      setEditingBanner(banner);
      setFormData({ title: banner.title, description: banner.description, image: null });
      setPreview(banner.imageUrl);
    } else {
      setEditingBanner(null);
      setFormData({ title: '', description: '', image: null });
      setPreview('');
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingBanner(null);
    setFormData({ title: '', description: '', image: null });
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    if (formData.image) {
      data.append('image', formData.image);
    }

    try {
      if (editingBanner) {
        await dispatch(updateBanner({ id: editingBanner._id, formData: data })).unwrap();
        alert('Banner updated successfully!');
      } else {
        await dispatch(createBanner(data)).unwrap();
        alert('Banner created successfully!');
      }
      handleCloseModal();
    } catch (error) {
      alert('Error saving banner: ' + (typeof error === 'string' ? error : error.message || 'Unknown error'));
      console.error(error);
    }
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this banner?')) {
      dispatch(deleteBanner(id));
    }
  };

  const filteredBanners = banners.filter(banner => 
    banner.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="banner-management">
      <div className="management-header">
        <h2 className="section-title">Banner Management</h2>
        <button className="add-btn" onClick={() => handleOpenModal()}><Plus size={18} /> Add Banner</button>
      </div>

      <div className="top-filter-bar">
        <div className="filter-item search-item">
          <Search size={16} />
          <input 
            type="text" 
            placeholder="Search banners..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="product-table-container">
        {loading ? (
          <div className="loading-spinner">Loading banners...</div>
        ) : (
          <table className="management-table">
            <thead>
              <tr>
                <th>Banner</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBanners.map(banner => (
                <tr key={banner._id}>
                  <td>
                    <div className="table-product-info">
                      <img src={banner.imageUrl} alt={banner.title} className="table-img" style={{ width: '80px', height: '45px', borderRadius: '6px' }} />
                      <span className="banner-name">{banner.title}</span>
                    </div>
                  </td>
                  <td>{banner.description}</td>
                  <td>
                    <div className="table-actions">
                      <button className="edit-btn" title="Edit" onClick={() => handleOpenModal(banner)}><Edit2 size={14} /></button>
                      <button className="delete-btn" title="Delete" onClick={() => handleDelete(banner._id)}><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {filteredBanners.length === 0 && !loading && (
          <div className="no-results">
            <p>No banners found matching your search.</p>
          </div>
        )}
      </div>

      <Modal 
        isOpen={isModalOpen} 
        onClose={handleCloseModal} 
        title={editingBanner ? 'Edit Banner' : 'Add Banner'}
      >
        <form onSubmit={handleSubmit} className="admin-form">
          <div className="form-group">
            <label>Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              placeholder="Enter banner title" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea 
              name="description" 
              value={formData.description} 
              onChange={handleInputChange} 
              placeholder="Enter banner description" 
              required 
            />
          </div>
          <div className="form-group">
            <label>Banner Image</label>
            <div className="file-input-container">
              <input 
                type="file" 
                id="banner-image" 
                onChange={handleFileChange} 
                accept="image/*" 
                hidden 
              />
              <label htmlFor="banner-image" className="file-input-label">
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
            <button type="submit" className="submit-btn">{editingBanner ? 'Update' : 'Create'}</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default BannerManagement;
