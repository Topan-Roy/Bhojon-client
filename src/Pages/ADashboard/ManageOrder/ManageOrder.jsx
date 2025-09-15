import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

const ManageOrder = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch all orders
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

  // Cancel order
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
          fetchOrders(); // Refresh orders
        } else {
          Swal.fire("Error", res.data.message || "Failed to cancel booking", "error");
        }
      } catch (error) {
        console.error(error);
        Swal.fire("Error", "Server error while deleting booking", "error");
      }
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="p-6 text-[#000] bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Manage Orders</h1>

      {orders.length === 0 ? (
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
              {orders.map((order) => (
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
                  <td className="p-3">
                    <button
                      onClick={() => handleCancel(order._id)}
                      className="bg-red-500 hover:bg-red-500 text-white px-3 py-1 rounded"
                    >
                       🗑
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageOrder;
