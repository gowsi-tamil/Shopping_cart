import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ProductList from '../components/Products/ProductList';
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';

const HomePage = () => {
  const [cart, setCart] = useState([]);
  const { logout, user } = useContext(AuthContext);
  const navigate = useNavigate();

  // Example product data with real image URLs
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 29.99,
      imageUrl: 'https://via.placeholder.com/200/FF5733/FFFFFF?text=Product+1',
    },
    {
      id: 2,
      name: 'Product 2',
      price: 49.99,
      imageUrl: 'https://via.placeholder.com/200/33FF57/FFFFFF?text=Product+2',
    },
    {
      id: 3,
      name: 'Product 3',
      price: 19.99,
      imageUrl: 'https://via.placeholder.com/200/3357FF/FFFFFF?text=Product+3',
    },
    {
      id: 4,
      name: 'Product 4',
      price: 39.99,
      imageUrl: 'https://via.placeholder.com/200/FF33A1/FFFFFF?text=Product+4',
    },
  ];

  // Helper to get token from storage or context
  const getToken = () => {
    return localStorage.getItem('authToken'); // Replace with your token retrieval method
  };

  useEffect(() => {
    // Fetch the cart items when the component mounts
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/cart/view', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setCart(response.data.cart || []);
    } catch (error) {
      console.error(
        'Error fetching cart:',
        error.response?.data || error.message
      );
    }
  };

  const handleAddToCart = async (product) => {
    try {
      const existingProduct = cart.find((item) => item.id === product.id);

      if (existingProduct) {
        // If product already in cart, update the quantity
        await axios.put(
          'http://localhost:5000/api/cart/add-item',
          { productId: product.id, quantity: existingProduct.quantity + 1 },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        // Optimistically update the cart by increasing the quantity
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
      } else {
        // Add product if not already in cart
        let userId = localStorage.getItem('userId');
        await axios.post(
          'http://localhost:5000/api/cart/add-item',
          { productId: product.id, userId: userId, quantity: 1 },
          {
            headers: {
              Authorization: `Bearer ${getToken()}`,
            },
          }
        );
        setCart([...cart, { ...product, quantity: 1 }]); // Optimistically update the cart
      }

      console.log('Product added to cart');
    } catch (error) {
      console.error(
        'Error adding product to cart:',
        error.response?.data || error.message
      );
    }
  };

  const handleRemoveFromCart = async (productId) => {
    try {
      await axios.delete('http://localhost:5000/api/cart/remove-item', {
        data: { productId },
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });

      setCart(cart.filter((product) => product.id !== productId)); // Update the cart
      console.log('Product removed from cart');
    } catch (error) {
      console.error(
        'Error removing product from cart:',
        error.response?.data || error.message
      );
    }
  };

  const handleClearCart = async () => {
    try {
      await axios.delete('http://localhost:5000/api/cart/clear', {
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      });
      setCart([]); // Clear the cart locally
      console.log('Cart cleared');
    } catch (error) {
      console.error(
        'Error clearing cart:',
        error.response?.data || error.message
      );
    }
  };

  const handleLogout = () => {
    logout(); // Clear auth context and storage
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="app">
      <header className="header">
        <h1>Product List</h1>
        <button className="logout-button" onClick={handleLogout}>
          Logout
        </button>
      </header>
      <main>
        <ProductList products={products} onAddToCart={handleAddToCart} />
        <div className="cart">
          <h2>Cart ({cart.length})</h2>
          <ul>
            {cart.map((product) => (
              <li key={product.id}>
                {product.name} - ${product.price.toFixed(2)} (x
                {product.quantity})
                <button onClick={() => handleRemoveFromCart(product.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
          {cart.length > 0 && (
            <button className="clear-cart-button" onClick={handleClearCart}>
              Clear Cart
            </button>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
