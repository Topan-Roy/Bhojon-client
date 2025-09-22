import React, { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import Swal from "sweetalert2";
import { AuthContext } from "../../../Contexts/Context";

const ReservationForm = () => {
  const { user } = useContext(AuthContext); 
  const [date, setDate] = useState(null);
  const [time, setTime] = useState("");
  const [people, setPeople] = useState("");
  const [tables, setTables] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleCheckAvailability = async () => {
    if (!date || !time || !people) {
      Swal.fire({ icon: "warning", title: "Missing Fields!", text: "Please select date, time and number of people!" });
      return;
    }
    if (!user) {
      Swal.fire({ icon: "error", title: "Not Logged In!", text: "Please login to make a reservation." });
      return;
    }

    setLoading(true);
    try {
      const formattedDate = date.toISOString().split("T")[0];
      const res = await axios.get("https://bhojon-server.vercel.app/api/reservations/check", { params: { date: formattedDate, time } });

      if (res.data.success) {
        setTables(res.data.tables);
      }
    } catch (error) {
      console.error(error);
      Swal.fire({ icon: "error", title: "Error!", text: "Something went wrong while checking availability." });
    } finally {
      setLoading(false);
    }
  };

  const handleBookTable = async (tableNo) => {
    const formattedDate = date.toISOString().split("T")[0];
    const customer = { name: user.name, email: user.email, phone: user.phone || "Not Provided" };

    try {
      const res = await axios.post("https://bhojon-server.vercel.app/api/reservations", { date: formattedDate, tableNo, time, people, customer });
      if (res.data.success) {
        Swal.fire({ icon: "success", title: "Booking Confirmed!", text: `Table ${tableNo} booked successfully.` });
        handleCheckAvailability(); 
      }
    } catch (err) {
      console.error(err);
      Swal.fire({ icon: "error", title: "Error", text: err.response?.data?.message || "Failed to book table." });
    }
  };

  return (
    <div className="p-8 text-[#000] bg-white rounded shadow-md">
      <h1 className="text-2xl font-semibold text-gray-800 mb-4">Reservation</h1>
      <div className="flex flex-col md:flex-row gap-4 items-center mb-4">
        <DatePicker selected={date} onChange={(date) => setDate(date)} dateFormat="yyyy-MM-dd" placeholderText="Select a date" className="px-4 py-2 border rounded w-48" />
        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} className="px-4 py-2 border rounded w-48" />
        <input type="number" value={people} onChange={(e) => setPeople(e.target.value)} placeholder="Number of People" className="px-4 py-2 border rounded w-56" />
        <button onClick={handleCheckAvailability} className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded" disabled={loading}>
          {loading ? "Checking..." : "Check Availability"}
        </button>
      </div>

      <div className="grid grid-cols-5 gap-4">
        {tables.map((t) => (
          <button key={t.tableNo} disabled={t.status === "Booked"} className={`p-4 rounded text-white font-semibold ${t.status === "Free" ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"}`} onClick={() => handleBookTable(t.tableNo)}>
            Table {t.tableNo} <br /> {t.status}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ReservationForm;
