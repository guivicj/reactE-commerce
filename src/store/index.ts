import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';

const loadState = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) return undefined;
        return { cart: JSON.parse(serializedState) };
    } catch (err) {
        console.error('Could not load cart from localStorage', err);
        return undefined;
    }
};

const saveState = (state: any) => {
    try {
        const serializedState = JSON.stringify(state.cart);
        localStorage.setItem('cart', serializedState);
    } catch (err) {
        console.error('Could not save cart to localStorage', err);
    }
};

export const store = configureStore({
    reducer: {
        cart: cartReducer,
    },
    preloadedState: loadState(),
});

store.subscribe(() => {
    saveState(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
