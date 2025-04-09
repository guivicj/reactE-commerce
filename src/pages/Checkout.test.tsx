import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Checkout from './Checkout';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';
import { MemoryRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const sampleItem = {
    id: 1,
    title: 'Sample Product',
    price: 20,
    quantity: 2,
    image: '',
};

const renderCheckout = (preloadedState = { cart: { items: [sampleItem] } }) => {
    const store = configureStore({
        reducer: { cart: cartReducer },
        preloadedState,
    });

    render(
        <Provider store={store}>
            <MemoryRouter>
                <ToastContainer autoClose={1500} />
                <Checkout />
            </MemoryRouter>
        </Provider>
    );
};

describe('Checkout page', () => {
    it('renders the form and summary', () => {
        renderCheckout();

        expect(screen.getByPlaceholderText(/full name/i)).toBeInTheDocument();
        expect(screen.getByText(/sample product/i)).toBeInTheDocument();
        expect(screen.getByText(/total: \$40.00/i)).toBeInTheDocument();
    });

    it('shows error toast if form is incomplete', async () => {
        renderCheckout();

        fireEvent.click(screen.getByText(/place order/i));

        await waitFor(() => {
            expect(screen.getByText(/please fill out all fields/i)).toBeInTheDocument();
        });
    });

    it('submits successfully and shows success toast', async () => {
        renderCheckout();

        fireEvent.change(screen.getByPlaceholderText(/full name/i), { target: { value: 'John Doe' } });
        fireEvent.change(screen.getByPlaceholderText(/address/i), { target: { value: '123 Main St' } });
        fireEvent.change(screen.getByPlaceholderText(/city/i), { target: { value: 'New York' } });
        fireEvent.change(screen.getByPlaceholderText(/postal code/i), { target: { value: '12345' } });
        fireEvent.change(screen.getByPlaceholderText(/email/i), { target: { value: 'test@example.com' } });

        fireEvent.click(screen.getByText(/place order/i));

        await waitFor(() => {
            expect(screen.getByText(/order placed successfully!/i)).toBeInTheDocument();
        });
    });
});
