import { cartStore } from './CartStore';

describe('CartStore', () => {
    // Reset cart before each test
    beforeEach(() => {
        cartStore.clearCart();
    });

    test('cart starts empty', () => {
        expect(cartStore.items.length).toBe(0);
        expect(cartStore.total).toBe(0);
        expect(cartStore.itemCount).toBe(0);
    });

    test('can add an auxiliary item to cart', () => {
        const item = { id: 1, name: 'Frame', price: 50, type: 'aux' };
        cartStore.addItem(item);
        
        expect(cartStore.items.length).toBe(1);
        expect(cartStore.itemCount).toBe(1);
        expect(cartStore.total).toBe(50);
    });

    test('can add multiple auxiliary items and qty increases', () => {
        const item = { id: 1, name: 'Frame', price: 50, type: 'aux' };
        cartStore.addItem(item);
        cartStore.addItem(item);
        
        expect(cartStore.items.length).toBe(1);
        expect(cartStore.itemCount).toBe(2);
        expect(cartStore.total).toBe(100);
    });

    test('can add a painting to cart', () => {
        const painting = { id: 1, name: 'Starry Night', price: 1000, type: 'painting' };
        cartStore.addItem(painting);
        
        expect(cartStore.items.length).toBe(1);
        expect(cartStore.itemCount).toBe(1);
        expect(cartStore.total).toBe(1000);
    });

    test('cannot add duplicate painting to cart', () => {
        // Mock alert
        global.alert = jest.fn();
        
        const painting = { id: 1, name: 'Mona Lisa', price: 5000, type: 'painting' };
        cartStore.addItem(painting);
        cartStore.addItem(painting);
        
        expect(cartStore.items.length).toBe(1);
        expect(cartStore.itemCount).toBe(1);
        expect(global.alert).toHaveBeenCalled();
    });

    test('can remove auxiliary item', () => {
        const item = { id: 1, name: 'Frame', price: 50, type: 'aux' };
        cartStore.addItem(item);
        cartStore.addItem(item);
        cartStore.removeItem(1, 'aux');
        
        expect(cartStore.itemCount).toBe(1);
    });

    test('can clear entire cart', () => {
        cartStore.addItem({ id: 1, name: 'Frame', price: 50, type: 'aux' });
        cartStore.addItem({ id: 2, name: 'Painting', price: 1000, type: 'painting' });
        
        expect(cartStore.items.length).toBe(2);
        
        cartStore.clearCart();
        
        expect(cartStore.items.length).toBe(0);
        expect(cartStore.total).toBe(0);
    });

    test('calculates total correctly with multiple items', () => {
        cartStore.addItem({ id: 1, name: 'Frame', price: 50, type: 'aux' });
        cartStore.addItem({ id: 1, name: 'Frame', price: 50, type: 'aux' });
        cartStore.addItem({ id: 2, name: 'Painting', price: 1000, type: 'painting' });

        expect(cartStore.total).toBe(1100);
    });
});
