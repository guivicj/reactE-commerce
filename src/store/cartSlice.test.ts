import cartReducer, {
    addToCart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
} from './cartSlice';

const item = { id: 1, title: 'Item', price: 10, image: '', quantity: 1 };

describe('cartSlice', () => {
    it('should add item to cart', () => {
        const state = cartReducer({ items: [] }, addToCart(item));
        expect(state.items).toHaveLength(1);
    });

    it('should increase quantity if item exists', () => {
        const state = cartReducer({ items: [item] }, addToCart(item));
        expect(state.items[0].quantity).toBe(2);
    });

    it('should remove item from cart', () => {
        const state = cartReducer({ items: [item] }, removeFromCart(item.id));
        expect(state.items).toHaveLength(0);
    });

    it('should clear the cart', () => {
        const state = cartReducer({ items: [item] }, clearCart());
        expect(state.items).toEqual([]);
    });

    it('should increase item quantity', () => {
        const state = cartReducer({ items: [item] }, increaseQuantity(item.id));
        expect(state.items[0].quantity).toBe(2);
    });

    it('should decrease item quantity', () => {
        const startState = { items: [{ ...item, quantity: 2 }] };
        const state = cartReducer(startState, decreaseQuantity(item.id));
        expect(state.items[0].quantity).toBe(1);
    });

    it('should remove item if quantity is 1 and decreased', () => {
        const startState = { items: [{ ...item, quantity: 1 }] };
        const state = cartReducer(startState, decreaseQuantity(item.id));
        expect(state.items).toHaveLength(0);
    });
});
