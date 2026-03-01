import { useContext, useEffect, useState } from 'react';
import ProductContext from '../../context/Product/ProductContext';

const emptyForm = {
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  category: 'Men',
  sizes: '',
  colors: '',
  stock: ''
};

const categories = ['Men', 'Women', 'Electronics', 'Jewelery', 'Shoes', 'Accessories'];

const ProductAdmin = () => {
  const {
    products,
    getProducts,
    createProduct,
    updateProduct,
    deleteProduct,
    loading
  } = useContext(ProductContext);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [confirmDelete, setConfirmDelete] = useState(null);

  useEffect(() => {
    getProducts();
  }, []);

  // Only show DB products (editable)
  const dbProducts = products.filter(p => p.source === 'db');
  const apiProducts = products.filter(p => p.source === 'api');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const openCreate = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(true);
  };

  const openEdit = (product) => {
    setForm({
      name: product.name,
      description: product.description,
      price: String(product.price),
      imageUrl: product.imageUrl,
      category: product.category,
      sizes: product.sizes?.join(', ') || '',
      colors: product.colors?.join(', ') || '',
      stock: String(product.stock)
    });
    setEditingId(product._id);
    setShowForm(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const productData = {
      name: form.name,
      description: form.description,
      price: Number(form.price),
      imageUrl: form.imageUrl,
      category: form.category,
      sizes: form.sizes.split(',').map(s => s.trim()).filter(Boolean),
      colors: form.colors.split(',').map(c => c.trim()).filter(Boolean),
      stock: Number(form.stock)
    };

    let success;
    if (editingId) {
      success = await updateProduct(editingId, productData);
    } else {
      success = await createProduct(productData);
    }

    if (success) {
      setShowForm(false);
      setForm(emptyForm);
      setEditingId(null);
    }
  };

  const handleDelete = async (id) => {
    const success = await deleteProduct(id);
    if (success) setConfirmDelete(null);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Product Management</h1>
        <button
          onClick={openCreate}
          className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
        >
          + New Product
        </button>
      </div>

      {/* Create / Edit Form */}
      {showForm && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingId ? 'Edit Product' : 'Create New Product'}
          </h2>
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Price *</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                required
                min="0"
                step="0.01"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                required
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL *</label>
              <input
                type="url"
                name="imageUrl"
                value={form.imageUrl}
                onChange={handleChange}
                required
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              >
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Sizes (comma separated)</label>
              <input
                type="text"
                name="sizes"
                value={form.sizes}
                onChange={handleChange}
                placeholder="S, M, L, XL"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Colors (comma separated)</label>
              <input
                type="text"
                name="colors"
                value={form.colors}
                onChange={handleChange}
                placeholder="Black, White, Red"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Stock *</label>
              <input
                type="number"
                name="stock"
                value={form.stock}
                onChange={handleChange}
                required
                min="0"
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-gray-900"
              />
            </div>
            <div className="md:col-span-2 flex gap-3 mt-2">
              <button
                type="submit"
                className="bg-gray-900 text-white px-6 py-2 rounded-lg font-semibold hover:bg-gray-800 transition"
              >
                {editingId ? 'Update Product' : 'Create Product'}
              </button>
              <button
                type="button"
                onClick={() => { setShowForm(false); setEditingId(null); }}
                className="bg-gray-200 text-gray-700 px-6 py-2 rounded-lg font-semibold hover:bg-gray-300 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
        </div>
      ) : (
        <>
          {/* My Products (DB) */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">My Products ({dbProducts.length})</h2>
            {dbProducts.length === 0 ? (
              <p className="text-gray-500 bg-white rounded-lg p-6 shadow-md">
                No custom products yet. Click &quot;+ New Product&quot; to create one.
              </p>
            ) : (
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Image</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Name</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Category</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Price</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Stock</th>
                      <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {dbProducts.map(product => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        <td className="px-4 py-3">
                          <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                        </td>
                        <td className="px-4 py-3 font-medium">{product.name}</td>
                        <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                        <td className="px-4 py-3 font-semibold">${product.price.toFixed(2)}</td>
                        <td className="px-4 py-3">{product.stock}</td>
                        <td className="px-4 py-3">
                          <div className="flex gap-2">
                            <button
                              onClick={() => openEdit(product)}
                              className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                            >
                              Edit
                            </button>
                            {confirmDelete === product._id ? (
                              <div className="flex gap-1">
                                <button
                                  onClick={() => handleDelete(product._id)}
                                  className="text-red-600 hover:text-red-800 text-sm font-medium"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setConfirmDelete(null)}
                                  className="text-gray-500 hover:text-gray-700 text-sm font-medium"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setConfirmDelete(product._id)}
                                className="text-red-600 hover:text-red-800 text-sm font-medium"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Catalog Products (API) */}
          <div>
            <h2 className="text-xl font-bold mb-4">Catalog Products ({apiProducts.length})</h2>
            <p className="text-sm text-gray-500 mb-4">These products come from the external catalog and are read-only.</p>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Image</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Name</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Category</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Price</th>
                    <th className="text-left px-4 py-3 text-sm font-semibold text-gray-600">Stock</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {apiProducts.map(product => (
                    <tr key={product._id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover rounded" />
                      </td>
                      <td className="px-4 py-3 font-medium">{product.name}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{product.category}</td>
                      <td className="px-4 py-3 font-semibold">${product.price.toFixed(2)}</td>
                      <td className="px-4 py-3">{product.stock}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductAdmin;
