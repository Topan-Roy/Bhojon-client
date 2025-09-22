import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { FiEdit, FiTrash2 } from "react-icons/fi";

const AdminFoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [foodsPerPage, setFoodsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchFoods = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://bhojon-server.vercel.app/api/products");
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
          const res = await axios.delete(`https://bhojon-server.vercel.app/api/products/${id}`);
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
        const res = await axios.put(`https://bhojon-server.vercel.app/api/products/${food._id}`, formValues);
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

  const filteredFoods = foods.filter(
    (food) =>
      food.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      food.category.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastFood = currentPage * foodsPerPage;
  const indexOfFirstFood = indexOfLastFood - foodsPerPage;
  const currentFoods = filteredFoods.slice(indexOfFirstFood, indexOfLastFood);
  const totalPages = Math.ceil(filteredFoods.length / foodsPerPage);

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="max-w-7xl text-[#000] mx-auto p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-semibold mb-4">Admin Food List</h2>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by name or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-1/2"
        />
        <select
          value={foodsPerPage}
          onChange={(e) => setFoodsPerPage(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : currentFoods.length === 0 ? (
        <p>No foods found.</p>
      ) : (
        <>
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
              {currentFoods.map((food) => (
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
                      className="bg-[#20c997] text-white px-2 py-1 rounded cursor-pointer"
                    >
                      <FiEdit size={20} />
                    </button>
                    <button
                      onClick={() => handleDelete(food._id)}
                      className="bg-[#dc3545] text-white px-2 py-1 rounded cursor-pointer"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
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
        </>
      )}
    </div>
  );
};

export default AdminFoodList;
