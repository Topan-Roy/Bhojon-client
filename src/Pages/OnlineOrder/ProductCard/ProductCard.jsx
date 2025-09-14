import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router"; 

const ProductCard = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All Items");
  const [cart, setCart] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [search, setSearch] = useState("");

  
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const navigate = useNavigate(); 

  useEffect(() => {
    fetch("http://localhost:3000/api/categories")
      .then((res) => res.json())
      .then((data) => setCategories(data.map((cat) => cat.name)));

    fetch("http://localhost:3000/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const incrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: (prev[id] || 0) + 1,
    }));
  };

  const decrementQuantity = (id) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: prev[id] > 0 ? prev[id] - 1 : 0,
    }));
  };

 
  const handleOpenModal = (product) => {
    const quantity = quantities[product._id] || 0;
    if (quantity === 0) return;
    setSelectedProduct({ ...product, quantity });
    setShowModal(true);
  };

 
  const handleConfirmAdd = () => {
    if (!selectedProduct) return;
    const found = cart.find((item) => item._id === selectedProduct._id);
    if (found) {
      setCart(
        cart.map((item) =>
          item._id === selectedProduct._id
            ? { ...item, quantity: item.quantity + selectedProduct.quantity }
            : item
        )
      );
    } else {
      setCart([...cart, selectedProduct]);
    }

    setQuantities((prev) => ({
      ...prev,
      [selectedProduct._id]: 0,
    }));
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleDeleteFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item._id !== id));
  };

  const filteredProducts = products.filter((p) => {
    const matchCategory =
      selectedCategory === "All Items" || p.category === selectedCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCategory && matchSearch;
  });

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const vat = subtotal * 0.05;
  const discount = 0;
  const total = subtotal + vat - discount;

  
  const handleGoToCheckout = () => {
    navigate("/checkoutpage", { state: { cart } });
  };

  return (
    <div className="flex p-6 bg-[#f5f2ea] min-h-screen">
      {/* Left side */}
      <div className="w-3/4 pr-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl text-[#000] font-semibold">Category Food</h1>
          <input
            type="text"
            placeholder="🔍 Search food..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="border px-3 py-1 text-[#000] rounded w-60 focus:outline-none"
          />
        </div>

        {/* Categories */}
        <div className="flex text-[#000] space-x-4 overflow-x-auto mb-4">
          {["", ...categories].map((cat, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedCategory(cat)}
              className={`text-sm px-3 py-1 border-b-2 ${
                selectedCategory === cat
                  ? "border-[#c09342] font-semibold"
                  : "border-transparent"
              } hover:border-[#c09342] transition`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Product grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {filteredProducts.map((product) => {
            const quantity = quantities[product._id] || 0;
            return (
              <div
                key={product._id}
                className="bg-white p-4 rounded shadow flex items-center space-x-4"
              >
                <div className="w-28 h-28 flex-shrink-0">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="flex flex-col text-[#000] items-center space-y-2 flex-grow">
                  <div className="font-semibold text-lg">{product.name}</div>
                  <div className="font-semibold text-[#c09342]">
                    ${product.price}
                  </div>

                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => decrementQuantity(product._id)}
                      disabled={quantity === 0}
                      className="px-4 py-1 text-2xl bg-[#e9ecef] rounded"
                    >
                      -
                    </button>
                    <span className="w-6 text-center font-semibold">
                      {quantity}
                    </span>
                    <button
                      onClick={() => incrementQuantity(product._id)}
                      className="bg-[#e9ecef] text-2xl px-4 py-1 rounded"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => handleOpenModal(product)}
                    disabled={quantity === 0}
                    className={`px-6 py-2 rounded text-white w-full ${
                      quantity === 0
                        ? "bg-[#c09342] cursor-not-allowed"
                        : "bg-[#c09342]"
                    }`}
                  >
                    🛒 Add Cart
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Right side - Cart */}
      <div className="w-1/4 bg-white text-[#000] p-4 rounded shadow h-fit">
        <h2 className="text-lg font-semibold mb-4">Cart</h2>
        {cart.length === 0 ? (
          <p className="text-sm text-gray-500">No items in cart</p>
        ) : (
          cart.map((item) => (
            <div
              key={item._id}
              className="flex justify-between items-center mb-2"
            >
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs">
                  {item.quantity} X ${item.price}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <p className="text-sm">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>
                <button
                  onClick={() => handleDeleteFromCart(item._id)}
                  className="text-red-500 hover:text-red-700 font-bold px-2"
                >
                  ❌
                </button>
              </div>
            </div>
          ))
        )}

        {/* Summary */}
        <hr className="my-3" />
        <div className="text-sm space-y-1">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Vat</span>
            <span>${vat.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span>${discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-md">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>
        </div>

        <button
          onClick={handleGoToCheckout}
          className="mt-4 w-full bg-[#c09342] text-white py-2 rounded hover:bg-[#a37b30]"
        >
          🛒 Go to Checkout
        </button>
      </div>

      {/* Modal */}
      {showModal && selectedProduct && (
        <div className="fixed inset-0 flex text-[#000] items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg w-96 p-6">
            <h2 className="text-xl font-bold mb-4">Food Details</h2>
            <div className="flex items-center space-x-4 mb-4">
              <img
                src={selectedProduct.image}
                alt={selectedProduct.name}
                className="w-20 h-20 object-cover rounded"
              />
              <div>
                <h3 className="text-lg font-semibold">{selectedProduct.name}</h3>
                <p className="text-[#c09342] font-bold">
                  ${selectedProduct.price.toFixed(2)}
                </p>
                <p>Quantity: {selectedProduct.quantity}</p>
              </div>
            </div>

            <div className="flex justify-between font-bold text-lg border-t pt-2 mt-2">
              <span>Total</span>
              <span>
                ${(selectedProduct.price * selectedProduct.quantity).toFixed(2)}
              </span>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 rounded bg-gray-400 text-white hover:bg-gray-500"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdd}
                className="px-4 py-2 rounded bg-[#c09342] text-white hover:bg-[#198754]"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
