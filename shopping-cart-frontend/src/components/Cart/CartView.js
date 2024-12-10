import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CartItem from './CartItem';

const CartView = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        // Fetch cart items when the component mounts
        const fetchCart = async () => {
            try {
                const response = await axios.get('/api/cart/view', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
                });
                setCartItems(response.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchCart();
    }, []);

    const removeItemFromCart = async (itemId) => {
        try {
            await axios.delete('/api/cart/remove-item', {
                data: { id: itemId },
                headers: { Authorization: `Bearer ${localStorage.getItem('authToken')}` },
            });
            setCartItems(cartItems.filter((item) => item.id !== itemId));
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div>
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p>Your cart is empty</p>
            ) : (
                cartItems.map((item) => (
                    <CartItem key={item.id} item={item} removeItemFromCart={removeItemFromCart} />
                ))
            )}
        </div>
    );
};

export default CartView;
