import React, { useEffect, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";
import Swal from "sweetalert2";

const ReservationTable = () => {
  const [reservations, setReservations] = useState([]);
  const [selected, setSelected] = useState(null); 

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const res = await axios.get("http://localhost:3000/api/bookings");
      setReservations(res.data.bookings);
    } catch (err) {
      console.error(err);
    }
  };
  const handleDelete = async (id) => {
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
          await axios.delete(`http://localhost:3000/api/admin/bookings/${id}`);
          setReservations((prev) => prev.filter((r) => r._id !== id));
          Swal.fire("Deleted!", "Reservation has been deleted.", "success");
        } catch (err) {
          console.error(err);
          Swal.fire("Error!", "Failed to delete reservation.", "error");
        }
      }
    });
  };

  const handleStatusChange = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/api/admin/bookings/${selected._id}`,
        { status: selected.status }
      );
      setReservations((prev) =>
        prev.map((r) =>
          r._id === selected._id ? { ...r, status: selected.status } : r
        )
      );
      Swal.fire("Updated!", "Status has been changed.", "success");
      setSelected(null);
    } catch (err) {
      console.error(err);
      Swal.fire("Error!", "Failed to update status.", "error");
    }
  };

  return (
    <div className="p-8 text-[#000] bg-white">
      <h1 className="text-2xl font-semibold mb-4">Reservation</h1>
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm text-left border border-gray-200">
          <thead className="bg-gray-100 text-gray-700 font-semibold">
            <tr>
              <th className="px-4 py-2 border">SL</th>
              <th className="px-4 py-2 border">Customer Email</th>
              <th className="px-4 py-2 border">Table No</th>
              <th className="px-4 py-2 border">People</th>
              <th className="px-4 py-2 border">Start Time</th>
              <th className="px-4 py-2 border">End Time</th>
              <th className="px-4 py-2 border">Date</th>
              <th className="px-4 py-2 border">Status</th>
              <th className="px-4 py-2 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map((item, index) => (
              <tr key={item._id} className="hover:bg-gray-50">
                <td className="px-4 py-2 border text-center">{index + 1}</td>
                <td className="px-4 py-2 border">{item.customer.email}</td>
                <td className="px-4 py-2 border text-center">{item.tableNo}</td>
                <td className="px-4 py-2 border text-center">{item.people}</td>
                <td className="px-4 py-2 border text-center">{item.startTime}</td>
                <td className="px-4 py-2 border text-center">{item.endTime}</td>
                <td className="px-4 py-2 border text-center">{item.date}</td>
                <td className="px-4 py-2 border text-center">
                  <span
                    className={`px-2 py-1 rounded text-white text-xs ${
                      item.status === "Free"
                        ? "bg-green-500"
                        : "bg-red-500"
                    }`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="px-4 py-2 border text-center">
                  <div className="flex justify-center space-x-2">
                    <button
                      onClick={() => setSelected(item)}
                      className="bg-blue-500 hover:bg-blue-600 text-white p-1 rounded"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(item._id)}
                      className="bg-red-500 hover:bg-red-600 text-white p-1 rounded"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan="9" className="text-center py-4 text-gray-500">
                  No reservations found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {selected && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-semibold mb-4">Reservation Details</h2>
            <p><b>Customer:</b> {selected.customer?.email}</p>
            <p><b>Table No:</b> {selected.tableNo}</p>
            <p><b>People:</b> {selected.people}</p>
            <p><b>Date:</b> {selected.date}</p>
            <p><b>Start:</b> {selected.startTime}</p>
            <p><b>End:</b> {selected.endTime}</p>

            <div className="mt-4">
              <label className="block mb-2 font-medium">Status</label>
              <select
                value={selected.status}
                onChange={(e) =>
                  setSelected((prev) => ({ ...prev, status: e.target.value }))
                }
                className="w-full border rounded px-3 py-2"
              >
                <option value="Booked">Booked</option>
                <option value="Free">Free</option>
              </select>
            </div>

            <div className="flex justify-end gap-2 mt-6">
              <button
                onClick={() => setSelected(null)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleStatusChange}
                className="px-4 py-2 rounded bg-green-600 text-white hover:bg-green-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReservationTable;
