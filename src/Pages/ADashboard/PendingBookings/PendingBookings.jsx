// PendingBookings.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const PendingBookings = () => {
  const [pendingOrders, setPendingOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch pending orders
  const fetchPendingOrders = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:3000/api/admin/bookings");
      if (res.data.success) {
        const filtered = res.data.bookings.filter(
          (order) => order.status === "pending"
        );
        setPendingOrders(filtered);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPendingOrders();
  }, []);

  if (loading) return <p>Loading pending bookings...</p>;

  return (
    <div className="p-6 text-[#000] bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">⏳ Pending Bookings</h1>

      {pendingOrders.length === 0 ? (
        <p>No pending bookings found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">User Email</th>
                <th className="p-3">Items</th>
                <th className="p-3">Total</th>
                <th className="p-3">Order Date</th>
                <th className="p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {pendingOrders.map((order) => (
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
                  <td className="p-3">
                    {new Date(order.orderDate).toLocaleString()}
                  </td>
                  <td className="p-3">
                    <span className="px-3 py-1 rounded-full bg-yellow-100 text-yellow-700 text-sm font-medium">
                      Pending
                    </span>
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

export default PendingBookings;
