import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Cart from './Cart';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const setup = (preloadedState = {}) => {
    const store = configureStore({
        reducer: { cart: cartReducer },
        preloadedState,
    });

    render(
        <Provider store={store}>
            <ToastContainer autoClose={2000} />
            <Cart />
        </Provider>
    );

    return store;
};

const sampleItem = {
    id: 1,
    title: 'Test Item',
    price: 15.0,
    quantity: 2,
    image: 'https://via.placeholder.com/150'
};

describe('Cart page', () => {
    it('shows empty cart message', () => {
        setup({ cart: { items: [] } });
        expect(screen.getByText(/your cart is empty/i)).toBeInTheDocument();
    });

    it('displays cart items and total', () => {
        setup({ cart: { items: [sampleItem] } });

        expect(screen.getByText('Test Item')).toBeInTheDocument();
        expect(screen.getByText('$15.00 each')).toBeInTheDocument();
        expect(screen.getByText('Total: $30.00')).toBeInTheDocument();
    });

    it('increases quantity when + button is clicked', () => {
        setup({ cart: { items: [sampleItem] } });

        const increaseBtn = screen.getByText('+');
        fireEvent.click(increaseBtn);

        expect(screen.getByText('3')).toBeInTheDocument();
    });

    it('decreases quantity when − button is clicked', () => {
        setup({ cart: { items: [{ ...sampleItem, quantity: 3 }] } });

        const decreaseBtn = screen.getByText('−');
        fireEvent.click(decreaseBtn);

        expect(screen.getByText('2')).toBeInTheDocument();
    });

    it('removes item from cart', () => {
        setup({ cart: { items: [sampleItem] } });

        fireEvent.click(screen.getByRole('button', { name: /remove/i }));

        expect(screen.getByText(/removed from cart/i)).toBeInTheDocument();
    });

    it('clears the cart', () => {
        setup({ cart: { items: [sampleItem] } });

        fireEvent.click(screen.getByRole('button', { name: /clear cart/i }));

        expect(screen.getByText(/cart cleared/i)).toBeInTheDocument();
    });
});
