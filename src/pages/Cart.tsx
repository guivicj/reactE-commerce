import React from 'react';
import {useAppSelector, useAppDispatch} from '../store/hooks';
import {removeFromCart, clearCart, increaseQuantity, decreaseQuantity} from '../store/cartSlice';
import {toast} from 'react-toastify';
import './Cart.scss';

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const cartItems = useAppSelector(state => state.cart.items);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="cart">
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? (
                <p>Your cart is empty.</p>
            ) : (
                <div>
                    <ul className="cart-list">
                        {cartItems.map(item => (
                            <li key={item.id} className="cart-item">
                                <img src={item.image} alt={item.title}/>
                                <div className="details">
                                    <h3>{item.title}</h3>
                                    <div className="quantity-control">
                                        <button onClick={() => dispatch(decreaseQuantity(item.id))}>−</button>
                                        <span>{item.quantity}</span>
                                        <button onClick={() => dispatch(increaseQuantity(item.id))}>+</button>
                                    </div>
                                    <p>${item.price.toFixed(2)} each</p>
                                    <button onClick={() => {
                                        dispatch(removeFromCart(item.id))
                                        toast.info(`${item.title} removed from cart.`);
                                    }}>Remove
                                    </button>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className="cart-summary">
                        <h2>Total: ${total.toFixed(2)}</h2>
                        <button onClick={() => {
                            dispatch(clearCart())
                            toast.warn(`Cart cleared.`);
                        }}>Clear Cart
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
