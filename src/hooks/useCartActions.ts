import {useAppDispatch} from '../store/hooks';
import {addToCart, removeFromCart} from '../store/cartSlice';
import {Product} from '../types/product';

export function useCartActions() {
    const dispatch = useAppDispatch();

    return {
        add: (product: Product) => {
            dispatch(addToCart({...product, quantity: 1}));
            return `${product.title} added to cart!`;
        },
        remove: (id: number, title: string) => {
            dispatch(removeFromCart(id));
            return `${title} removed from cart.`;
        }
    };
}
