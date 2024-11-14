import React from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

const Checkout = ({ cart, resetCart }) => {
  const navigate = useNavigate();
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handlePayment = () => {
    alert("Payment successful!");
    resetCart();
    navigate("/");
  };

  return (
    <div className="checkout-container">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul className="space-y-2">
        {cart.map((item) => (
          <li
            key={item.id}
            className="checkout-item flex justify-between items-center p-3 border rounded bg-gray-50"
          >
            <img
              src={item.images[0]} // Ensure this is the correct property
              alt={item.title}
              className="w-20 h-20 object-cover mr-4"  // Adjust image size as needed
            />
            <span className="text-black">
              {item.title} - ${item.price} x {item.quantity}
            </span>
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold mt-4">
        Total: ${totalAmount.toFixed(2)}
      </p>
      <div className="flex space-x-4 mt-4">
        <button
          onClick={() => navigate(-1)}
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handlePayment}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Pay
        </button>
      </div>
    </div>
  );
};

export default Checkout;
