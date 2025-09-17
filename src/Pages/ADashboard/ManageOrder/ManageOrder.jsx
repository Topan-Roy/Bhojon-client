import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage, setOrdersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/admin/bookings");
      if (res.data.success) {
        setOrders(res.data.bookings);
      } else {
        Swal.fire("Error", "Failed to fetch orders", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server error while fetching orders", "error");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleCancel = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the order permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, cancel it",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axios.delete(`http://localhost:3000/api/admin/bookings/${id}`);
        if (res.data.success) {
          Swal.fire("Deleted!", "Booking has been cancelled.", "success");
          fetchOrders();
        } else {
          Swal.fire("Error", res.data.message || "Failed to cancel booking", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Server error while deleting booking", "error");
      }
    }
  };
  const handleUpdateStatus = async (id, status) => {
    try {
      const res = await axios.patch(
        `http://localhost:3000/api/admin/bookings/${id}`,
        { status }
      );
      if (res.data.success) {
        Swal.fire("Updated!", `Booking ${status}`, "success");
        fetchOrders();
      } else {
        Swal.fire("Error", res.data.message || "Failed to update status", "error");
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Server error while updating booking", "error");
    }
  };

  if (loading) return <p>Loading orders...</p>;
const filteredOrders = orders.filter((order) => {
  const email = order.userEmail || "";
  const items = order.items || [];

  return (
    email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    items.some((item) => (item?.name || "").toLowerCase().includes(searchTerm.toLowerCase()))
  );
});

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  return (
    <div className="p-6 text-[#000] bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>
      <div className="flex justify-between mb-4">
        <input
          type="text"
          placeholder="Search by email or item name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="border rounded px-3 py-2 w-1/2"
        />
        <select
          value={ordersPerPage}
          onChange={(e) => setOrdersPerPage(Number(e.target.value))}
          className="border rounded px-3 py-2"
        >
          <option value={5}>5 per page</option>
          <option value={10}>10 per page</option>
          <option value={20}>20 per page</option>
        </select>
      </div>

      {currentOrders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">User Email</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {currentOrders.map((order) => (
                <tr key={order._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{order.userEmail}</td>
                  <td className="p-3">
                    {order.items.map((item) => (
                      <p key={item._id}>
                        {item.name} x {item.quantity}
                      </p>
                    ))}
                  </td>
                  <td className="p-3">${order.total.toFixed(2)}</td>
                  <td className="p-3">{new Date(order.orderDate).toLocaleString()}</td>
                  <td className="p-3 flex items-center gap-2">
                    <button
                      onClick={() => handleUpdateStatus(order._id, "completed")}
                      disabled={order.status !== "pending"}
                      className={`px-3 py-1 rounded-md shadow text-sm font-medium transition duration-200 ${
                        order.status === "completed"
                          ? "bg-green-700 text-white cursor-default"
                          : "bg-green-500 hover:bg-green-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      }`}
                    >
                      {order.status === "completed" ? "Completed ✅" : "Complete"}
                    </button>
                    <button
                      onClick={() => handleUpdateStatus(order._id, "rejected")}
                      disabled={order.status !== "pending"}
                      className={`px-3 py-1 rounded-md shadow text-sm font-medium transition duration-200 ${
                        order.status === "rejected"
                          ? "bg-yellow-700 text-white cursor-default"
                          : "bg-yellow-500 hover:bg-yellow-600 text-white disabled:opacity-50 disabled:cursor-not-allowed"
                      }`}
                    >
                      {order.status === "rejected" ? "Rejected ❌" : "Reject"}
                    </button>
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="px-3 py-1 rounded-md bg-[#dc3545] hover:bg-[#dc3545] text-white shadow text-sm font-medium"
                    >
                      🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-3 py-1">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="bg-gray-300 px-3 py-1 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
