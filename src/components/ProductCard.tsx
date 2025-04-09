import React from "react";
import {Product} from '../types/product';
import './ProductCard.scss';
import {toast} from 'react-toastify';
import {useCartActions} from "../hooks/useCartActions";

interface Props {
    product: Product;
}

const ProductCard: React.FC<Props> = ({product}) => {
    const {add} = useCartActions();

    const handleAddToCart = () => {
        const msg = add(product);
        toast.success(msg);
    };

    return (
        <div className="product-card">
            <img src={product.image} alt={product.title}/>
            <h3>{product.title}</h3>
            <p>${product.price.toFixed(2)}</p>
            <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
    );
};

export default ProductCard;
