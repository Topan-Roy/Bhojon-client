import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [editingCategory, setEditingCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    parentCategory: "",
    offer: false,
    status: "Active",
    image: "",
  });

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [categoriesPerPage] = useState(10); 

  // Fetch all categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/categories");
      setCategories(res.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  // Start editing a category
  const handleEdit = (category) => {
    setEditingCategory(category._id);
    setFormData({
      name: category.name,
      parentCategory: category.parentCategory || "",
      offer: category.offer,
      status: category.status,
      image: category.image,
    });
  };

  // Cancel editing
  const handleCancel = () => {
    setEditingCategory(null);
    setFormData({
      name: "",
      parentCategory: "",
      offer: false,
      status: "Active",
      image: "",
    });
  };

  // Update category
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return Swal.fire("Error", "Category name is required", "error");
    }
    setLoading(true);
    try {
      const res = await axios.put(
        `http://localhost:3000/api/categories/${editingCategory}`,
        formData
      );
      if (res.data.success) {
        Swal.fire("Success", "Category updated successfully", "success");
        fetchCategories();
        handleCancel();
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to update category", "error");
    } finally {
      setLoading(false);
    }
  };

  // Delete category
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This category will be deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:3000/api/categories/${id}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "Category has been deleted.", "success");
          fetchCategories();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to delete category", "error");
      }
    }
  };

  // Pagination logic
  const indexOfLastCategory = currentPage * categoriesPerPage;
  const indexOfFirstCategory = indexOfLastCategory - categoriesPerPage;
  const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);
  const totalPages = Math.ceil(categories.length / categoriesPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-7xl text-[#000] mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Category List</h2>

      {editingCategory && (
        <form onSubmit={handleUpdate} className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Category Name"
            className="border rounded px-3 py-2 w-full"
            required
          />
          <input
            type="text"
            name="parentCategory"
            value={formData.parentCategory}
            onChange={handleChange}
            placeholder="Parent Category"
            className="border rounded px-3 py-2 w-full"
          />
          <div className="flex items-center space-x-2">
            <input type="checkbox" name="offer" checked={formData.offer} onChange={handleChange} />
            <label>Offer</label>
          </div>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border rounded px-3 py-2"
          >
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="flex space-x-2">
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Updating..." : "Update"}
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-100">
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Parent</th>
            <th className="border px-4 py-2">Offer</th>
            <th className="border px-4 py-2">Status</th>
            <th className="border px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {currentCategories.map((cat) => (
            <tr key={cat._id}>
              <td className="border px-4 py-2">{cat.name}</td>
              <td className="border px-4 py-2">{cat.parentCategory || "-"}</td>
              <td className="border px-4 py-2">{cat.offer ? "Yes" : "No"}</td>
              <td className="border px-4 py-2">{cat.status}</td>
              <td className="border px-4 py-2 space-x-2">
                <button
                  onClick={() => handleEdit(cat)}
                  className="bg-[#20c997] text-white px-2 py-1 rounded"
                >
                  <FiEdit size={20} />
                </button>
                <button
                  onClick={() => handleDelete(cat._id)}
                  className="bg-[#dc3545] text-white px-2 py-1 rounded"
                >
                  <FiTrash2 size={20} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={handlePrevPage}
          disabled={currentPage === 1}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Prev
        </button>
        <span className="px-3 py-1">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CategoryList;
