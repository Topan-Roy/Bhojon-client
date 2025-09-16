import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const AdminFoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch all food products
  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/products");
      setFoods(res.data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch foods", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchFoods();
  }, []);

  // Delete food
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(`http://localhost:3000/api/products/${id}`);
          if (res.data.success) {
            Swal.fire("Deleted!", "Food has been deleted.", "success");
            fetchFoods();
          }
        } catch (err) {
          console.error(err);
          Swal.fire("Error", "Failed to delete food", "error");
        }
      }
    });
  };

  // Update food
  const handleUpdate = async (food) => {
    const { value: formValues } = await Swal.fire({
      title: "Update Food",
      html:
        `<input id="swal-foodName" class="swal2-input" placeholder="Food Name" value="${food.name}">` +
        `<input id="swal-price" type="number" class="swal2-input" placeholder="Price" value="${food.price}">` +
        `<input id="swal-category" class="swal2-input" placeholder="Category" value="${food.category}">`,
      focusConfirm: false,
      preConfirm: () => {
        return {
          name: document.getElementById("swal-foodName").value,
          price: Number(document.getElementById("swal-price").value),
          category: document.getElementById("swal-category").value,
        };
      },
      showCancelButton: true,
    });

    if (formValues) {
      try {
        const res = await axios.put(`http://localhost:3000/api/products/${food._id}`, formValues);
        if (res.data.success) {
          Swal.fire("Updated!", "Food has been updated.", "success");
          fetchFoods();
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to update food", "error");
      }
    }
  };

  return (
    <div className="max-w-7xl text-[#000] mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Admin Food List</h2>
      {loading ? (
        <p>Loading...</p>
      ) : foods.length === 0 ? (
        <p>No foods found.</p>
      ) : (
        <table className="w-full table-auto border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-4 py-2">Image</th>
              <th className="border px-4 py-2">Name</th>
              <th className="border px-4 py-2">Category</th>
              <th className="border px-4 py-2">Price</th>
              <th className="border px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {foods.map((food) => (
              <tr key={food._id} className="text-center">
                <td className="border px-4 py-2">
                  <img src={food.image} alt={food.name} className="w-16 h-16 mx-auto" />
                </td>
                <td className="border px-4 py-2">{food.name}</td>
                <td className="border px-4 py-2">{food.category}</td>
                <td className="border px-4 py-2">${food.price}</td>
                <td className="border px-4 py-2 space-x-2">
                  <button
                    onClick={() => handleUpdate(food)}
                    className="bg-yellow-500 text-white px-2 py-1 rounded"
                  >
                     <FiEdit size={20} />
                  </button>
                  <button
                    onClick={() => handleDelete(food._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded"
                  >
                     <FiTrash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminFoodList;
