import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
const imgbbAPI = import.meta.env.VITE_IMGBB_KEY;
const AddCategoryForm = () => {
  const [formData, setFormData] = useState({
    categoryName: "",
    parentCategory: "",
    offer: false,
    status: "Active",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

  

  // Fetch existing categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleReset = () => {
    setFormData({
      categoryName: "",
      parentCategory: "",
      offer: false,
      status: "Active",
      image: null,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.categoryName.trim()) {
      return Swal.fire("Error", "Category name is required", "error");
    }

    setLoading(true);

    try {
      let imageUrl = "";

     
      if (formData.image) {
        const imgData = new FormData();
        imgData.append("image", formData.image);
        const imgRes = await axios.post(
          `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
          imgData
        );
        imageUrl = imgRes.data.data.url;
      }

     
      const res = await axios.post("http://localhost:3000/api/categories", {
        name: formData.categoryName.trim(),
        parentCategory: formData.parentCategory,
        offer: formData.offer,
        status: formData.status,
        image: imageUrl,
      });

      if (res.data.success) {
        Swal.fire("Success", "Category added successfully", "success");
        handleReset();

       
        const updatedCategories = await axios.get("http://localhost:3000/api/categories");
        setCategories(updatedCategories.data);
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add category", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-7xl text-[#000] mx-auto p-6 bg-white shadow rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Add Category</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Category Name *</label>
            <input
              type="text"
              name="categoryName"
              value={formData.categoryName}
              onChange={handleChange}
              required
              className="w-full border rounded px-3 py-2"
              placeholder="Category Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Parent Category</label>
            <select
              name="parentCategory"
              value={formData.parentCategory}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Select option</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Image</label>
            <input type="file" name="image" onChange={handleChange} className="w-full" />
            <div className="w-16 h-16 mt-2 bg-gray-200 flex items-center justify-center text-sm">
              60x60
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <div className="flex items-center space-x-2 mt-2">
            <input type="checkbox" name="offer" checked={formData.offer} onChange={handleChange} />
            <label className="text-sm font-medium">Offer</label>
          </div>

          <div>
            <label className="block text-sm font-medium">Status</label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div className="flex space-x-4 pt-6">
            <button
              type="button"
              onClick={handleReset}
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Reset
            </button>
            <button
              type="submit"
              disabled={loading}
              className="bg-green-600 text-white px-4 py-2 rounded"
            >
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCategoryForm;
