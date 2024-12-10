import React from 'react';

const CartItem = ({ item, removeItemFromCart }) => {
    return (
        <div>
            <h4>{item.name}</h4>
            <p>Price: ${item.price}</p>
            <p>Quantity: {item.quantity}</p>
            <button onClick={() => removeItemFromCart(item.id)}>Remove</button>
        </div>
    );
};

export default CartItem;
