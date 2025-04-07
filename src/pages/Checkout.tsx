import React from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { clearCart } from '../store/cartSlice';
import './Checkout.scss';

const Checkout: React.FC = () => {
    const cartItems = useAppSelector(state => state.cart.items);
    const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const form = e.currentTarget as HTMLFormElement;
        const inputs = Array.from(form.querySelectorAll('input'));
        const allFilled = inputs.every(input => input.value.trim() !== '');

        if (!allFilled) {
            toast.error('Please fill out all fields');
            return;
        }

        toast.success('Order placed successfully!');
        dispatch(clearCart());
        setTimeout(() => {
            navigate('/');
        }, 1500);
    };

    return (
        <div className="checkout">
            <h1>Checkout</h1>
            <form className="checkout-form" onSubmit={handleSubmit}>
                <h2>Shipping Information</h2>
                <input type="text" placeholder="Full Name" required />
                <input type="text" placeholder="Address" required />
                <input type="text" placeholder="City" required />
                <input type="text" placeholder="Postal Code" required />
                <input type="email" placeholder="Email" required />

                <h2>Order Summary</h2>
                <ul>
                    {cartItems.map(item => (
                        <li key={item.id}>
                            {item.title} x {item.quantity} - ${item.price.toFixed(2)}
                        </li>
                    ))}
                </ul>

                <h3>Total: ${total.toFixed(2)}</h3>

                <button type="submit">Place Order</button>
            </form>
        </div>
    );
};

export default Checkout;
