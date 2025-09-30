
import { makeAutoObservable } from "mobx";

class CartStore {
    items = []; // {id, name, price, qty, type}

    constructor() {
        makeAutoObservable(this);
    }

    addItem(item) {
        const existing = this.items.find(
            (i) => i.id === item.id && i.type === item.type
        );

        if (item.type === "painting") {
            if (!existing) {
                this.items.push({ ...item, qty: 1 });
            } else {
                alert(`🎨 "${item.name}" is already in your cart.`);
            }
        } else {
            if (existing) {
                existing.qty += 1;
            } else {
                this.items.push({ ...item, qty: 1 });
            }
        }
    }

    removeItem(id, type) {
        const existing = this.items.find(i => i.id === id && i.type === type);

        if (!existing) return;

        if (type === "aux") {
            if (existing.qty > 1) {
                existing.qty -= 1;
            } else {
                this.items = this.items.filter(i => !(i.id === id && i.type === type));
            }
        } else {
            this.items = this.items.filter(i => !(i.id === id && i.type === type));
        }
    }



    clearCart() {
        this.items = [];
    }

    get total() {
        return this.items.reduce((sum, i) => sum + i.price * i.qty, 0);
    }

    get itemCount() {
        return this.items.reduce((sum, i) => sum + i.qty, 0);
    }

}

export const cartStore = new CartStore();
