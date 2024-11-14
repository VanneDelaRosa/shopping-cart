import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import './App.css';

const ProductList = ({ products, addToCart }) => {
  const [filter, setFilter] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await fetch("https://api.escuelajs.co/api/v1/products");
      const data = await response.json();
      setProducts(data);
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(filter.toLowerCase()) ||
      product.price.toString().includes(filter)
  );

  const handleViewDetails = (product) => {
    setSelectedProduct(product);
    setCurrentImageIndex(0);
  };

  const closeDialog = () => {
    setSelectedProduct(null);
  };

  const handlePrevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex < selectedProduct.images.length - 1 ? prevIndex + 1 : prevIndex
    );
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    setNotification(`${product.title} added successfully!`);
    setTimeout(() => {
      setNotification("");
    }, 3000);
  };

  return (
    <div className="mx-auto p-4 w-fit">
      <h1 className="text-3xl font-bold mb-4 text-center">Shopping Cart</h1>

      <Link
        to="/cart"
        className="text-blue-500 mb-4 block text-center flex justify-center items-center gap-2"
      >
        View Cart 
      </Link>

      <input
        type="text"
        className="search-bar border border-gray-300 rounded px-3 py-1 mb-4 w-full"
        placeholder="Filter by name or price"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />

      {filteredProducts.length === 0 ? (
        <div className="flex items-center justify-center h-64">
          <p className="text-center text-gray-500 text-lg">No items found</p>
        </div>
      ) : (
        <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 w-full max-w-screen-xl mx-auto justify-items-center">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="border p-2 rounded shadow w-full flex flex-col justify-between"
              style={{ minHeight: "250px" }}
            >
              <div>
                <img
                  src={product.images[0]}
                  alt={product.title}
                  className="h-52 w-full object-cover rounded"
                />
                <h2 className="font-semibold text-sm mt-2">{product.title}</h2>
                <p className="text-gray-600 text-sm">${product.price}</p>
              </div>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="add-to-cart-button"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => handleViewDetails(product)}
                  className="view-item-button"
                >
                  View Details
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {notification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg">
          {notification}
        </div>
      )}

      {selectedProduct && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
          onClick={closeDialog}
        >
          <div
            className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-2 text-black">
              {selectedProduct.title}
            </h2>

            <div className="relative">
              <img
                className="object-cover rounded my-3"
                src={selectedProduct.images[currentImageIndex]}
              />

              <button
                onClick={handlePrevImage}
                disabled={currentImageIndex === 0}
                className="absolute top-1/2 left-1 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-l"
              >
                Prev
              </button>

              <button
                onClick={handleNextImage}
                disabled={
                  currentImageIndex === selectedProduct.images.length - 1
                }
                className="absolute top-1/2 right-1 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-400 px-2 py-1 rounded-r"
              >
                Next
              </button>
            </div>

            <p className="text-gray-700 mb-4">${selectedProduct.price}</p>
            <p className="text-gray-600">{selectedProduct.description}</p>
            <button
              onClick={closeDialog}
              className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProductList;
