
import React, { useEffect, useState } from "react";

const PurchaseReturnList = () => {
  const [returnedPurchases, setReturnedPurchases] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/purchases")
      .then((res) => res.json())
      .then((data) => {
        const returned = data.filter((p) => p.status === "returned");
        setReturnedPurchases(returned);
      })
      .catch((err) => console.error(err));
  }, []);

  if (returnedPurchases.length === 0) {
    return <p className="text-center py-4 text-gray-500">No returned purchases yet.</p>;
  }

  return (
    <div className="p-6 text-[#000] bg-white shadow-md rounded-md">
      <h2 className="text-xl font-semibold mb-4">Returned Purchases</h2>
      <div className="bg-white rounded shadow border overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100 text-gray-700">
            <tr>
              {["SL", "Invoice No", "Supplier", "Date", "Grand Total", "Paid Amount"].map(
                (col) => (
                  <th key={col} className="px-4 py-2">{col}</th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {returnedPurchases.map((p, idx) => (
              <tr key={p._id} className="border-t">
                <td className="px-4 py-2">{idx + 1}</td>
                <td className="px-4 py-2">{p.invoiceNo}</td>
                <td className="px-4 py-2">{p.supplier}</td>
                <td className="px-4 py-2">{new Date(p.purchaseDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">${p.grandTotal}</td>
                <td className="px-4 py-2">${p.paidAmount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PurchaseReturnList;
