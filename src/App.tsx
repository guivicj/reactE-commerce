// App.tsx
import React from 'react';
import {Routes, Route, Link} from 'react-router-dom';
import Home from './pages/Home';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import {useAppSelector} from './store/hooks';
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './styles/App.scss';

const App: React.FC = () => {
    const cartItems = useAppSelector(state => state.cart.items);
    const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    return (
        <div className="app">
            <header className="navbar">
                <Link to="/" className="logo">MyStore</Link>
                <nav>
                    <Link to="/">Home</Link>
                    <Link to="/cart" className="cart-link">
                        Cart
                        {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
                    </Link>
                    <Link to="/checkout">Checkout</Link>
                </nav>
            </header>

            <main>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/checkout" element={<Checkout/>}/>
                </Routes>
            </main>

            <ToastContainer position="top-right" autoClose={2000}/>
        </div>
    );
};

export default App;
