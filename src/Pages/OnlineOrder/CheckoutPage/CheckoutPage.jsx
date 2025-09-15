import React, { useContext, useState } from "react";
import { useLocation } from "react-router";
import axios from "axios";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import CardPage from "../CardPage/CardPage";
import { AuthContext } from "../../../Contexts/Context";


const CheckoutPage = () => {
  const location = useLocation();
 const { user } = useContext(AuthContext);

  const [cart, setCart] = useState(location.state?.cart || []);
  const [shipping, setShipping] = useState("Pickup");
  const [coupon, setCoupon] = useState("");

  const deliveryCharge = shipping === "Home Delivery" ? 60 : 0;
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const vat = subtotal * 0.05;
  const discount = 0;
  const total = subtotal + vat + deliveryCharge - discount;

  const handleQuantityChange = (id, action) => {
    const index = cart.findIndex((item) => item._id === id);
    if (index === -1) return;

    const updatedCart = [...cart];
    if (action === "inc") updatedCart[index].quantity += 1;
    if (action === "dec" && updatedCart[index].quantity > 1) updatedCart[index].quantity -= 1;

    setCart(updatedCart);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to remove this item from the cart?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#c09342",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCart = cart.filter((item) => item._id !== id);
        setCart(updatedCart);
        Swal.fire("Deleted!", "Item has been removed.", "success");
      }
    });
  };

  const handleBooking = async () => {
    if (cart.length === 0) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Your cart is empty!",
      });
      return;
    }

    try {
      const bookingData = {
        items: cart,
        shippingMethod: shipping,
        coupon,
        subtotal,
        vat,
        discount,
        deliveryCharge,
        total,
        orderDate: new Date().toISOString(),
         userEmail: user?.email || "Guest",
      };
console.log("Booking user:", user);
      const response = await axios.post("http://localhost:3000/api/bookings", bookingData);

      if (response.data.success) {
        Swal.fire({
          icon: "success",
          title: "Booking Successful!",
          text: "Your order has been placed.",
          confirmButtonText: "OK",
        }).then(() => {
          setCart([]); 
          
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Booking Failed",
          text: "Please try again later.",
        });
      }
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: "error",
        title: "Something went wrong",
        text: "Please try again later.",
      });
    }
  };

  return (
    
    <div className="bg-[#f5f2ea] mt-10 text-[#000]">
       <CardPage></CardPage>
      <div className="max-w-6xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {/* Cart Products */}
        <table className="w-full mb-6 text-left border-b">
          <thead>
            <tr className="border-b">
              <th className="py-2">Product</th>
              <th>Food Name</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Total</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item._id} className="border-b">
                <td className="py-4">
                  <img src={item.image} alt={item.name} className="w-16 h-16 rounded" />
                </td>
                <td>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-gray-500">Description here</p>
                </td>
                <td>
                  <div className="flex items-center border px-2 rounded w-fit space-x-2">
                    <button onClick={() => handleQuantityChange(item._id, "dec")}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleQuantityChange(item._id, "inc")}>+</button>
                  </div>
                </td>
                <td>${item.price}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
                <td>
                  <button onClick={() => handleDelete(item._id)} className="text-red-500">
                    🗑
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Main Section */}
        <div className="grid grid-cols-3 gap-6">
          {/* Left Image */}
          <div className="rounded h-[516px] overflow-hidden flex items-center justify-center">
            {cart.length > 0 ? (
              <img src={cart[0].image} alt={cart[0].name} className="w-full h-full object-cover rounded" />
            ) : (
              <div className="bg-gray-300 w-full h-full flex items-center justify-center text-white text-xl">
                No Image
              </div>
            )}
          </div>

          {/* Middle - Shipping Info */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Shipping Method</h2>
            <div className="space-y-2 mb-4">
              {["Dine-in", "Pickup", "Home Delivery"].map((method) => (
                <div key={method} className="flex justify-between">
                  <label>
                    <input
                      type="radio"
                      value={method}
                      checked={shipping === method}
                      onChange={(e) => setShipping(e.target.value)}
                      className="mr-2"
                    />
                    {method}
                  </label>
                  <span>{method === "Home Delivery" ? "$60.00" : "$0.00"}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between mb-4">
              <div>
                <p className="text-sm mb-1">Order Date</p>
                <div className="bg-gray-100 px-4 py-2 rounded">{new Date().toISOString().split("T")[0]}</div>
              </div>
              <div>
                <p className="text-sm mb-1">Receive Time</p>
                <div className="bg-gray-100 px-4 py-2 rounded">12:43</div>
              </div>
            </div>

            <div className="bg-[#f5f2ea] p-4 rounded">
              <h3 className="font-semibold mb-2">Coupon Code</h3>
              <p className="text-sm text-gray-500 mb-2">Enter Your Coupon Code If You Have One.</p>
              <div className="flex">
                <input
                  type="text"
                  value={coupon}
                  onChange={(e) => setCoupon(e.target.value)}
                  placeholder="Enter your coupon code.."
                  className="px-3 py-2 rounded-l bg-white w-full focus:outline-none"
                />
                <button className="bg-[#c09342] px-4 rounded-r text-white hover:bg-[#a37b30]">
                  Apply Coupon
                </button>
              </div>
            </div>
          </div>

          {/* Right - Cart Total */}
          <div className="bg-[#f5f2ea] p-6 rounded text-sm space-y-2 h-fit">
            <h2 className="text-lg font-semibold mb-4">Cart Total</h2>
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
              <span>${discount}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery Charge</span>
              <span>${deliveryCharge}</span>
            </div>
            <div className="flex justify-between font-bold border-t pt-2 mt-2 text-md">
              <span>Grand Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleBooking}
              className="w-full mt-4 bg-[#c09342] hover:bg-[#a37b30] text-white py-2 rounded"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;
