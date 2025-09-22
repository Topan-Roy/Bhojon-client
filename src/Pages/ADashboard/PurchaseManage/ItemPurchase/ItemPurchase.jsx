
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router";
import Swal from "sweetalert2";

const ItemPurchase = () => {
  const [purchases, setPurchases] = useState([]);
  const [search, setSearch] = useState("");
  const [filtered, setFiltered] = useState([]);
  const [viewPurchase, setViewPurchase] = useState(null);
  useEffect(() => {
    fetch("https://bhojon-server.vercel.app/purchases")
      .then((res) => res.json())
      .then((data) => {
        setPurchases(data);
        setFiltered(data);
      })
      .catch((err) => console.error(err));
  }, []);
  const handleSearch = () => {
    if (!search.trim()) return setFiltered(purchases);
    const result = purchases.filter((p) =>
      p.invoiceNo.toString().includes(search)
    );
    setFiltered(result);
  };
  const handleReturn = async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This purchase will be returned!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, return it!",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await fetch(`https://bhojon-server.vercel.app/purchases/${id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: "returned" }),
        });

        if (res.ok) {
          Swal.fire(
            "Returned!",
            "Purchase has been marked as returned.",
            "success"
          );
          setPurchases((prev) =>
            prev.map((p) =>
              p._id === id ? { ...p, status: "returned" } : p
            )
          );
          setFiltered((prev) =>
            prev.map((p) =>
              p._id === id ? { ...p, status: "returned" } : p
            )
          );
          setViewPurchase((prev) =>
            prev && prev._id === id ? { ...prev, status: "returned" } : prev
          );
        }
      } catch (err) {
        console.error(err);
        Swal.fire("Error", "Failed to return purchase.", "error");
      }
    }
  };

  return (
    <div className="p-6 text-[#000] bg-white shadow-md rounded-md">
      <div className="flex items-center text-[#000] justify-between mb-4">
        <h1 className="text-2xl font-semibold">Purchase List</h1>
        <NavLink to='/dashboard/purchaseform'>
            <button className="bg-[#0dcaf0] text-white px-4 py-2 rounded hover:bg-[#0dcaf0]">
          + Add Purchase
        </button>
        </NavLink>
      </div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search by Invoice No"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-1 rounded text-sm"
        />
        <button
          onClick={handleSearch}
          className="bg-gray-600 text-white px-3 py-1 rounded hover:bg-gray-700 text-sm"
        >
          Search
        </button>
      </div>
      <div className="bg-white rounded shadow border overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {[
                "SL",
                "Invoice No",
                "Supplier",
                "Date",
                "Grand Total",
                "Paid Amount",
                "Action",
              ].map((col) => (
                <th key={col} className="px-4 py-2">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length > 0 ? (
              filtered.map((p, idx) => (
                <tr key={p._id} className="border-t">
                  <td className="px-4 py-2">{idx + 1}</td>
                  <td className="px-4 py-2">{p.invoiceNo}</td>
                  <td className="px-4 py-2">{p.supplier}</td>
                  <td className="px-4 py-2">
                    {new Date(p.purchaseDate).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">${p.grandTotal}</td>
                  <td className="px-4 py-2">${p.paidAmount}</td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-xs cursor-pointer"
                      onClick={() => setViewPurchase(p)}
                    >
                      View
                    </button>
                    <button
                      className={`px-2 py-1 rounded text-xs text-white  ${
                        p.status === "returned"
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-500 hover:bg-red-600 cursor-pointer"
                      }`}
                      onClick={() => p.status !== "returned" && handleReturn(p._id)}
                      disabled={p.status === "returned"}
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  No Data Available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {viewPurchase && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow max-w-2xl w-full relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setViewPurchase(null)}
            >
              ✖
            </button>
            <h2 className="text-xl font-semibold mb-4">
              Purchase Details - {viewPurchase.invoiceNo}
            </h2>
            <p>
              <strong>Supplier:</strong> {viewPurchase.supplier}
            </p>
            <p>
              <strong>Date:</strong>{" "}
              {new Date(viewPurchase.purchaseDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Grand Total:</strong> ${viewPurchase.grandTotal}
            </p>
            <p>
              <strong>Paid Amount:</strong> ${viewPurchase.paidAmount}
            </p>

            <h3 className="mt-4 font-semibold">Items:</h3>
            <table className="min-w-full text-sm mt-2 border">
              <thead className="bg-gray-100">
                <tr>
                  {["Product", "Qty", "Rate", "Total"].map((col) => (
                    <th key={col} className="px-2 py-1 border">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {viewPurchase.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-2 py-1 border">{item.item}</td>
                    <td className="px-2 py-1 border">{item.quantity}</td>
                    <td className="px-2 py-1 border">{item.rate}</td>
                    <td className="px-2 py-1 border">{item.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <button
              className={`mt-4 px-4 py-2 rounded text-white ${
                viewPurchase.status === "returned"
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600"
              }`}
              onClick={() =>
                viewPurchase.status !== "returned" &&
                handleReturn(viewPurchase._id)
              }
              disabled={viewPurchase.status === "returned"}
            >
              Return Purchase
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemPurchase;
