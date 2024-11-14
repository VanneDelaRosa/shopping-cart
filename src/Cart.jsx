import React from "react";
import { useNavigate } from "react-router-dom";
import './App.css';

function Cart({ cart }) {
  const navigate = useNavigate();
  const totalAmount = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Cart</h1>
      <ul className="space-y-2">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between p-3 border rounded bg-gray-50"
          >
            <div className="flex items-center">
              <img
                src={item.images[0]} // Make sure this points to the correct image URL
                alt={item.title}
                className="w-20 h-20 object-cover mr-4"  // Adjust image size as needed
              />
              <span className="text-black">
                {item.title} - ${item.price} x {item.quantity}
              </span>
            </div>
          </li>
        ))}
      </ul>
      <p className="text-lg font-semibold mt-4">
        Total: ${totalAmount.toFixed(2)}
      </p>
      <button
        onClick={() => navigate("/")}
        className="bg-gray-300 text-gray-700 px-4 mx-4 py-2 rounded hover:bg-gray-400"
      >
        Back to Products
      </button>
      <button
        onClick={() => navigate("/checkout")}
        className="bg-green-500 text-white px-4 py-2 mx-4 mt-4 rounded hover:bg-green-600"
      >
        Go to Checkout
      </button>
    </div>
  );
}

export default Cart;
