import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Percent,
  Save,
  Tag,
  CheckCircle2,
  AlertCircle,
  RefreshCw,
  Package,
  LayoutGrid,
  Search,
} from 'lucide-react';
import { fetchCategories, updateSaleSettings } from '../../redux/slices/categorySlice';
import { fetchProducts, updateProductDiscounts } from '../../redux/slices/productSlice';
import './AdminStyles.css';

const SaleManagement = () => {
  const dispatch = useDispatch();
  const { items: categories, loading } = useSelector((state) => state.category);
  const { items: products, loading: productsLoading } = useSelector((state) => state.product);

  const [activeTab, setActiveTab] = useState('product');
  const [saleState, setSaleState] = useState({});
  const [productSaleState, setProductSaleState] = useState({});
  const [productSearch, setProductSearch] = useState('');
  const [isDirty, setIsDirty] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    dispatch(fetchCategories());
    dispatch(fetchProducts());
  }, [dispatch]);

  // Rebuild local form state whenever the categories collection changes.
  useEffect(() => {
    const initial = {};
    (categories || []).forEach((cat) => {
      const subDiscounts = {};
      (cat.subcategories || []).forEach((sub) => {
        subDiscounts[sub] = Number(cat.subDiscounts?.[sub]) || 0;
      });
      initial[cat._id] = {
        discount: Number(cat.discount) || 0,
        subDiscounts,
      };
    });
    setSaleState(initial);
    setIsDirty(false);
  }, [categories]);

  // Rebuild per-product discount state whenever products change.
  useEffect(() => {
    const initial = {};
    (products || []).forEach((p) => {
      initial[p._id] = Number(p.discount) || 0;
    });
    setProductSaleState(initial);
    setIsDirty(false);
  }, [products]);

  const productsInCategory = (catId) =>
    (products || []).filter((p) => (p.catid?._id || p.catid) === catId).length;

  const handleCategoryDiscount = (catId, value) => {
    setIsDirty(true);
    setSaleState((prev) => ({
      ...prev,
      [catId]: { ...(prev[catId] || { subDiscounts: {} }), discount: value },
    }));
  };

  const handleSubDiscount = (catId, sub, value) => {
    setIsDirty(true);
    setSaleState((prev) => {
      const current = prev[catId] || { discount: 0, subDiscounts: {} };
      return {
        ...prev,
        [catId]: {
          ...current,
          subDiscounts: { ...current.subDiscounts, [sub]: value },
        },
      };
    });
  };

  const handleProductDiscount = (productId, value) => {
    setIsDirty(true);
    setProductSaleState((prev) => ({ ...prev, [productId]: value }));
  };

  /** Copy a category-wide discount onto every product in that category. */
  const applyCategoryToProducts = (catId) => {
    const percent = Number(saleState[catId]?.discount) || 0;
    const subDiscounts = saleState[catId]?.subDiscounts || {};
    if (percent <= 0 && Object.values(subDiscounts).every((v) => Number(v) <= 0)) return;

    setIsDirty(true);
    setProductSaleState((prev) => {
      const next = { ...prev };
      (products || []).forEach((p) => {
        if ((p.catid?._id || p.catid) !== catId) return;
        const subPercent = Number(subDiscounts[p.ptype]) || 0;
        next[p._id] = subPercent > 0 ? subPercent : percent;
      });
      return next;
    });
    setActiveTab('product');
    setMessage({
      type: 'pending',
      text: 'Category discount copied to its products. Click "Save Changes" to apply.',
    });
  };

  const handleSave = async () => {
    setIsSaving(true);
    setMessage(null);

    try {
      if (activeTab === 'product') {
        const sales = (products || []).map((p) => ({
          id: p._id,
          discount: Number(productSaleState[p._id]) || 0,
        }));
        await dispatch(updateProductDiscounts(sales)).unwrap();
        setMessage({ type: 'success', text: 'Product sale saved! Discounts are now live on the store.' });
      } else {
        const sales = (categories || []).map((cat) => {
          const entry = saleState[cat._id] || {};
          const subDiscounts = {};
          Object.entries(entry.subDiscounts || {}).forEach(([key, value]) => {
            subDiscounts[key] = Number(value) || 0;
          });
          return {
            id: cat._id,
            discount: Number(entry.discount) || 0,
            subDiscounts,
          };
        });
        await dispatch(updateSaleSettings(sales)).unwrap();
        setMessage({ type: 'success', text: 'Category sale saved! Discounts are now live on the store.' });
      }
      setIsDirty(false);
    } catch (error) {
      setMessage({
        type: 'error',
        text: typeof error === 'string' ? error : error?.message || 'Failed to save sale settings',
      });
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    if (!message || message.type !== 'success') return;
    const timer = setTimeout(() => setMessage(null), 4000);
    return () => clearTimeout(timer);
  }, [message]);

  const filteredProducts = (products || []).filter((p) => {
    const q = productSearch.trim().toLowerCase();
    if (!q) return true;
    return (
      (p.name || '').toLowerCase().includes(q) ||
      (p.ptype || '').toLowerCase().includes(q)
    );
  });

  const isBusy = isSaving || (activeTab === 'category' && loading && categories.length === 0);

  return (
    <div className="sale-management">
      <div className="management-header">
        <div>
          <h2 className="section-title">Sale &amp; Discounts</h2>
          <p className="sale-subtitle">
            Give each item its own discount (e.g. Shoes 10%, Shirts 15%) or run a whole-category
            sale. Whatever you set here shows immediately on the storefront.
          </p>
        </div>
        <button className="add-btn" onClick={handleSave} disabled={isBusy}>
          {isSaving ? <RefreshCw size={18} className="sale-spin" /> : <Save size={18} />}
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

      <div className="sale-tabs">
        <button
          className={`sale-tab ${activeTab === 'product' ? 'active' : ''}`}
          onClick={() => { setActiveTab('product'); setMessage(null); setIsDirty(false); }}
        >
          <Package size={16} /> By Product
        </button>
        <button
          className={`sale-tab ${activeTab === 'category' ? 'active' : ''}`}
          onClick={() => { setActiveTab('category'); setMessage(null); setIsDirty(false); }}
        >
          <LayoutGrid size={16} /> By Category
        </button>
      </div>

      {message && (
        <div className={`sale-message ${message.type}`}>
          {message.type === 'success' ? <CheckCircle2 size={18} /> : <AlertCircle size={18} />}
          <span>{message.text}</span>
        </div>
      )}

      {isDirty && (!message || message.type !== 'success') && (
        <div className="sale-message pending">
          <AlertCircle size={18} />
          <span>You have unsaved changes. Click &quot;Save Changes&quot; to apply them.</span>
        </div>
      )}

      {activeTab === 'product' ? (
        productsLoading && products.length === 0 ? (
          <div className="loading-spinner">Loading products...</div>
        ) : products.length === 0 ? (
          <div className="sale-empty">
            <Package size={32} />
            <h3>No products yet</h3>
            <p>Add products from Product Management, then come back to run a sale.</p>
          </div>
        ) : (
          <div className="sale-product-panel">
            <div className="sale-search">
              <Search size={16} />
              <input
                type="text"
                placeholder="Search products by name or type..."
                value={productSearch}
                onChange={(e) => setProductSearch(e.target.value)}
              />
            </div>

            <div className="sale-product-list">
              {filteredProducts.map((p) => {
                const value = productSaleState[p._id] ?? 0;
                return (
                  <div className="sale-product-row" key={p._id}>
                    <img
                      src={p.images?.[0]}
                      alt={p.name}
                      className="sale-product-img"
                      loading="lazy"
                    />
                    <div className="sale-product-info">
                      <span className="sale-product-name" title={p.name}>{p.name}</span>
                      <span className="sale-product-meta">
                        {p.ptype || 'Product'} &middot; ${p.price}
                      </span>
                    </div>
                    <div className="sale-input-box small">
                      <input
                        type="number"
                        min="0"
                        max="100"
                        value={value}
                        onChange={(e) => handleProductDiscount(p._id, e.target.value)}
                        placeholder="0"
                      />
                      <span className="sale-input-suffix">%</span>
                    </div>
                    <span className={`sale-row-badge ${Number(value) > 0 ? 'on' : ''}`}>
                      {Number(value) > 0 ? `${value}% OFF` : 'No sale'}
                    </span>
                  </div>
                );
              })}
              {filteredProducts.length === 0 && (
                <div className="sale-no-results">No products match &quot;{productSearch}&quot;.</div>
              )}
            </div>
          </div>
        )
      ) : loading && categories.length === 0 ? (
        <div className="loading-spinner">Loading categories...</div>
      ) : categories.length === 0 ? (
        <div className="sale-empty">
          <Tag size={32} />
          <h3>No categories yet</h3>
          <p>Create a category first, then come back here to run a sale.</p>
        </div>
      ) : (
        <div className="sale-grid">
          {categories.map((cat) => {
            const entry = saleState[cat._id] || { discount: 0, subDiscounts: {} };
            const count = productsInCategory(cat._id);

            return (
              <div className="sale-card" key={cat._id}>
                <div className="sale-card-head">
                  <img src={cat.imageUrl} alt={cat.name} className="sale-card-img" />
                  <div className="sale-card-titles">
                    <h3>{cat.name}</h3>
                    <span>{count} product{count === 1 ? '' : 's'}</span>
                  </div>
                  {Number(entry.discount) > 0 && (
                    <span className="sale-badge">{entry.discount}% OFF</span>
                  )}
                </div>

                <div className="sale-field">
                  <label>
                    <Percent size={14} />
                    Category discount
                  </label>
                  <div className="sale-input-box">
                    <input
                      type="number"
                      min="0"
                      max="100"
                      value={entry.discount}
                      onChange={(e) => handleCategoryDiscount(cat._id, e.target.value)}
                      placeholder="0"
                    />
                    <span className="sale-input-suffix">%</span>
                  </div>
                  <span className="sale-hint">Applies to every product in this category.</span>
                </div>

                {cat.subcategories && cat.subcategories.length > 0 && (
                  <div className="sale-sub-list">
                    <span className="sale-sub-title">Subcategory overrides</span>
                    {cat.subcategories.map((sub) => {
                      const value = entry.subDiscounts?.[sub] ?? 0;
                      return (
                        <div className="sale-sub-row" key={sub}>
                          <span className="sale-sub-name">{sub}</span>
                          <div className="sale-input-box small">
                            <input
                              type="number"
                              min="0"
                              max="100"
                              value={value}
                              onChange={(e) => handleSubDiscount(cat._id, sub, e.target.value)}
                              placeholder="0"
                            />
                            <span className="sale-input-suffix">%</span>
                          </div>
                          {Number(value) > 0 && <span className="sale-sub-badge">{value}%</span>}
                        </div>
                      );
                    })}
                  </div>
                )}

                <button
                  type="button"
                  className="sale-apply-btn"
                  onClick={() => applyCategoryToProducts(cat._id)}
                  disabled={count === 0}
                >
                  Copy to {count} product{count === 1 ? '' : 's'}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SaleManagement;
