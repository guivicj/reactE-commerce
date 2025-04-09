import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ProductCard from './ProductCard';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from '../store/cartSlice';
import { Product } from '../types/product';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const renderWithStore = (component: React.ReactNode) => {
    const store = configureStore({ reducer: { cart: cartReducer } });

    return render(
        <Provider store={store}>
        <ToastContainer autoClose={2000} />
    {component}
    </Provider>
);
};

const product: Product = {
    id: 1,
    title: 'Test Product',
    description: 'Test Description',
    category: '',
    price: 19.99,
    image: '',
};

describe('ProductCard', () => {
    it('renders product details', () => {
        renderWithStore(<ProductCard product={product} />);

        expect(screen.getByText('Test Product')).toBeInTheDocument();
        expect(screen.getByText('$19.99')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /add to cart/i })).toBeInTheDocument();
    });

    it('adds product to cart and shows toast', () => {
        renderWithStore(<ProductCard product={product} />);
        const addButton = screen.getByRole('button', { name: /add to cart/i });

        fireEvent.click(addButton);

        expect(screen.getByText(/Test Product added to cart/i)).toBeInTheDocument();
    });
});
