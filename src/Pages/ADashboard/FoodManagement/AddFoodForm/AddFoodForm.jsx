import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2"; // ✅ SweetAlert import

const imgbbAPI = import.meta.env.VITE_IMGBB_KEY;

const AddFoodForm = () => {
  const [formData, setFormData] = useState({
    category: "",
    kitchen: "",
    foodName: "",
    price: "",
    components: "",
    notes: "",
    description: "",
    vat: "",
    offer: false,
    special: false,
    customQuantity: false,
    cookingTime: "",
    menuType: {
      breakfast: false,
      party: false,
      coffee: false,
      dinner: false,
      launch: false,
    },
    status: "Active",
    image: null,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/categories");
        setCategories(res.data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
        Swal.fire("Error", "Failed to fetch categories", "error");
      }
    };
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name in formData.menuType) {
      setFormData({
        ...formData,
        menuType: { ...formData.menuType, [name]: checked },
      });
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, image: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.image) return Swal.fire("Warning", "Please select an image", "warning");

    setLoading(true);
    try {
      const imageData = new FormData();
      imageData.append("image", formData.image);

      const imgbbRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${imgbbAPI}`,
        imageData
      );

      const imageUrl = imgbbRes.data.data.url;

      const productData = {
        name: formData.foodName,
        price: Number(formData.price),
        category: formData.category,
        image: imageUrl,
      };

      const res = await axios.post("http://localhost:3000/api/products", productData);

      if (res.data.success) {
        Swal.fire("Success", "Food added successfully!", "success");

        // Reset form
        setFormData({
          category: "",
          kitchen: "",
          foodName: "",
          price: "",
          components: "",
          notes: "",
          description: "",
          vat: "",
          offer: false,
          special: false,
          customQuantity: false,
          cookingTime: "",
          menuType: {
            breakfast: false,
            party: false,
            coffee: false,
            dinner: false,
            launch: false,
          },
          status: "Active",
          image: null,
        });
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to add food", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white rounded shadow text-[#000]">
      <h2 className="text-2xl font-semibold mb-4">Add Food</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Kitchen</label>
            <select
              name="kitchen"
              value={formData.kitchen}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            >
              <option value="">Select Kitchen</option>
              <option value="Main">Main</option>
              <option value="Secondary">Secondary</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Food Name *</label>
            <input
              type="text"
              name="foodName"
              value={formData.foodName}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Price *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Components</label>
            <input
              type="text"
              name="components"
              value={formData.components}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Notes</label>
            <input
              type="text"
              name="notes"
              value={formData.notes}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium">Image</label>
            <input type="file" name="image" onChange={handleChange} className="w-full" />
            <div className="w-16 h-16 mt-2 bg-gray-200 flex items-center justify-center text-sm">60x60</div>
          </div>
        </div>

        {/* Right Side */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">VAT</label>
            <input
              type="text"
              name="vat"
              value={formData.vat}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div className="flex items-center space-x-4">
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="offer" checked={formData.offer} onChange={handleChange} />
              <span>Offer</span>
            </label>
            <label className="flex items-center space-x-2">
              <input type="checkbox" name="special" checked={formData.special} onChange={handleChange} />
              <span>Special</span>
            </label>
          </div>

          <label className="flex items-center space-x-2">
            <input type="checkbox" name="customQuantity" checked={formData.customQuantity} onChange={handleChange} />
            <span>Custom Quantity</span>
          </label>

          <div>
            <label className="block text-sm font-medium">Cooking Time</label>
            <input
              type="time"
              name="cookingTime"
              value={formData.cookingTime}
              onChange={handleChange}
              className="w-full border rounded px-3 py-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Menu Type</label>
            <div className="grid grid-cols-3 gap-2">
              {Object.keys(formData.menuType).map((type) => (
                <label key={type} className="flex items-center space-x-2">
                  <input type="checkbox" name={type} checked={formData.menuType[type]} onChange={handleChange} />
                  <span className="capitalize">{type}</span>
                </label>
              ))}
            </div>
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

          <div className="flex space-x-4 mt-4">
            <button type="reset" className="bg-blue-500 text-white px-4 py-2 rounded">Reset</button>
            <button type="submit" disabled={loading} className="bg-green-600 text-white px-4 py-2 rounded">
              {loading ? "Saving..." : "Save"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddFoodForm;
