import React, { useState } from "react";

const PurchaseForm = () => {
  const [items, setItems] = useState([
    { id: Date.now(), item: "", stock: 0, quantity: 0, rate: 0, total: 0 },
  ]);
  const [paidAmount, setPaidAmount] = useState(0);
  const [invoiceNo, setInvoiceNo] = useState("");
  const [details, setDetails] = useState("");
  const supplierList = [
    { id: 1, name: "Akash Traders" },
    { id: 2, name: "BD Wholesale" },
    { id: 3, name: "Fresh Mart Ltd" },
  ];
  const paymentTypes = ["Cash Payment", "Bank Payment"];
  const [selectedSupplier, setSelectedSupplier] = useState("");
  const [selectedPaymentType, setSelectedPaymentType] = useState(paymentTypes[0]);
  const productList = [
    { id: 1, name: "Onion" },
    { id: 2, name: "Oil" },
    { id: 3, name: "Sugar" },
    { id: 4, name: "Salt" },
    { id: 5, name: "Flour" },
    { id: 6, name: "Chickens" },
    { id: 7, name: "Mutton" },
    { id: 8, name: "Sauce" },
    { id: 9, name: "Potato" },
    { id: 10, name: "Lemon" },
    { id: 11, name: "Egg" },
    { id: 12, name: "Salt" },
    { id: 13, name: "Coffee" },
  ];

  const handleItemChange = (id, field, value) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              [field]: value,
              total:
                field === "quantity" || field === "rate"
                  ? (field === "quantity"
                      ? parseFloat(value)
                      : parseFloat(item.quantity || 0)) *
                    (field === "rate"
                      ? parseFloat(value)
                      : parseFloat(item.rate || 0))
                  : item.total,
            }
          : item
      )
    );
  };

  const addItem = () => {
    setItems([
      ...items,
      { id: Date.now(), item: "", stock: 0, quantity: 0, rate: 0, total: 0 },
    ]);
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const grandTotal = items.reduce((sum, item) => sum + Number(item.total), 0);
  const handleSubmitForm = async () => {
    const purchaseData = {
      supplier: selectedSupplier,
      purchaseDate: new Date().toISOString().split("T")[0],
      invoiceNo,
      paymentType: selectedPaymentType,
      paidAmount,
      grandTotal,
      details,
      items,
    };

    try {
      const res = await fetch("http://localhost:3000/purchases", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(purchaseData),
      });

      if (res.ok) {
        alert("✅ Purchase saved successfully!");
        setItems([{ id: Date.now(), item: "", stock: 0, quantity: 0, rate: 0, total: 0 }]);
        setSelectedSupplier("");
        setInvoiceNo("");
        setPaidAmount(0);
        setDetails("");
      } else {
        alert("❌ Failed to save purchase!");
      }
    } catch (error) {
      console.error(error);
      alert("Error: " + error.message);
    }
  };

  return (
    <div className="max-w-7xl text-[#000] mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-6 text-green-700">Purchase</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        <div>
          <label className="block font-medium mb-1">
            Supplier Name <span className="text-red-500">*</span>
          </label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedSupplier}
            onChange={(e) => setSelectedSupplier(e.target.value)}
          >
            <option value="">Select supplier</option>
            {supplierList.map((supplier) => (
              <option key={supplier.id} value={supplier.name}>
                {supplier.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">
            Purchase Date <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            value={new Date().toISOString().split("T")[0]}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">
            Invoice No <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Invoice No"
            value={invoiceNo}
            onChange={(e) => setInvoiceNo(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Payment Type</label>
          <select
            className="w-full border rounded px-3 py-2"
            value={selectedPaymentType}
            onChange={(e) => setSelectedPaymentType(e.target.value)}
          >
            {paymentTypes.map((type, idx) => (
              <option key={idx} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block font-medium mb-1">Details</label>
          <textarea
            className="w-full border rounded px-3 py-2"
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            placeholder="Details"
          ></textarea>
        </div>
      </div>
      <div className="overflow-x-auto mt-6">
        <table className="min-w-full border border-gray-200 text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-3 py-2 text-left">Item Information</th>
              <th className="border px-3 py-2">Stock/Quantity</th>
              <th className="border px-3 py-2">Quantity</th>
              <th className="border px-3 py-2">Rate</th>
              <th className="border px-3 py-2">Total</th>
              <th className="border px-3 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id} className="text-center">
                <td className="border px-2 py-1">
                  <select
                    className="w-full border rounded px-2 py-1"
                    value={item.item}
                    onChange={(e) => handleItemChange(item.id, "item", e.target.value)}
                  >
                    <option value="">Select option</option>
                    {productList.map((product) => (
                      <option key={product.id} value={product.name}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </td>
                <td className="border px-2 py-1 bg-gray-100">
                  <input
                    type="number"
                    value={item.stock}
                    disabled
                    className="w-full px-2 py-1 text-center bg-transparent"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(item.id, "quantity", e.target.value)}
                    className="w-full px-2 py-1 text-center border rounded"
                  />
                </td>
                <td className="border px-2 py-1">
                  <input
                    type="number"
                    value={item.rate}
                    onChange={(e) => handleItemChange(item.id, "rate", e.target.value)}
                    className="w-full px-2 py-1 text-center border rounded"
                  />
                </td>
                <td className="border px-2 py-1 bg-gray-100">{item.total.toFixed(2)}</td>
                <td className="border px-2 py-1">
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <button
          onClick={addItem}
          className="mt-3 bg-[#2dbb1e] hover:bg-[#2dbb1e] text-white px-4 py-2 rounded"
        >
          Add More Item
        </button>
      </div>
      <div className="flex justify-end gap-6 mt-6 text-right">
        <div>
          <label className="block font-medium mb-1">Grand Total:</label>
          <input
            type="text"
            value={grandTotal.toFixed(2)}
            readOnly
            className="border rounded px-3 py-2 bg-gray-100"
          />
        </div>
        <div>
          <label className="block font-medium mb-1">Paid Amount:</label>
          <input
            type="number"
            value={paidAmount}
            onChange={(e) => setPaidAmount(e.target.value)}
            className="border rounded px-3 py-2"
          />
        </div>
      </div>

      <button
        onClick={handleSubmitForm}
        className="mt-6 bg-[#2dbb1e] hover:bg-[#2dbb1e] text-white px-6 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
};

export default PurchaseForm;
