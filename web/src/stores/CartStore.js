import { makeAutoObservable } from "mobx";

class CartStore {
    items = []; // {id, name, price, qty, type}

    constructor() {
        makeAutoObservable(this);
    }

    addItem(item) {
        const existing = this.items.find(i => i.id === item.id && i.type === item.type);
        if (existing) {
            existing.qty += 1;
        } else {
            this.items.push({ ...item, qty: 1 });
        }
    }

    removeItem(id) {
        this.items = this.items.filter(i => i.id !== id);
    }

    clearCart() {
        this.items = [];
    }

    get total() {
        return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    }
}

export const cartStore = new CartStore();
