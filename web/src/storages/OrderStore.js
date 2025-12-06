import { makeAutoObservable, runInAction } from "mobx";
import { orderAPI } from "../services/api";

class OrderStore {
    orders = [];
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAllOrders() {
        this.loading = true;
        this.error = null;
        try {
            const orders = await orderAPI.getAll();
            runInAction(() => {
                this.orders = orders;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.loading = false;
            });
        }
    }

    async fetchOrdersByEmail(email) {
        this.loading = true;
        this.error = null;
        try {
            const orders = await orderAPI.getByEmail(email);
            runInAction(() => {
                this.orders = orders;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.loading = false;
            });
        }
    }

    async placeOrder(customerName, customerEmail, cartItems, total) {
        this.loading = true;
        this.error = null;
        try {
            const orderData = {
                customerName,
                customerEmail,
                total,
                status: "COMPLETED",
                orderItems: cartItems.map(item => ({
                    itemName: item.name,
                    itemType: item.type,
                    quantity: item.qty,
                    price: item.price
                }))
            };

            const newOrder = await orderAPI.create(orderData);
            runInAction(() => {
                this.orders.unshift(newOrder);
                this.loading = false;
            });
            return newOrder;
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.loading = false;
            });
            throw error;
        }
    }

    async deleteOrder(orderId) {
        this.loading = true;
        this.error = null;
        try {
            await orderAPI.delete(orderId);
            runInAction(() => {
                this.orders = this.orders.filter(order => order.id !== orderId);
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.loading = false;
            });
            throw error;
        }
    }

    clearError() {
        this.error = null;
    }
}

export const orderStore = new OrderStore();
