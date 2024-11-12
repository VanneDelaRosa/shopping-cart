
import React from "react";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, resetCart }) {
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
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Checkout</h1>
      <ul className="space-y-2">
        {cart.map((item) => (
          <li
            key={item.id}
            className="flex justify-between p-3 border rounded bg-gray-50"
          >
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
}

export default Checkout;
