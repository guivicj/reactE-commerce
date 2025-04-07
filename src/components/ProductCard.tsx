import React from "react";
import { Product } from '../types/product';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/cartSlice';
import './ProductCard.scss';
import { toast } from 'react-toastify';

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({ product }) => {
    const dispatch = useAppDispatch();

    const handleAddToCart = () => {
        dispatch(addToCart({ ...product, quantity: 1 }));
        toast.success(`${product.title} added to cart!`);
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} />
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
