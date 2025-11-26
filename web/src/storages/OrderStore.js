import { makeAutoObservable, runInAction } from "mobx";
import { orderApi } from "../services/orderApi";

class OrderStore {
    orders = [];
    loading = false;
    error = null;
    currentCustomerEmail = ""; // In real app, would come from auth

    constructor() {
        makeAutoObservable(this);
    }

    async fetchAllOrders() {
        this.loading = true;
        this.error = null;
        try {
            const orders = await orderApi.getAllOrders();
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
            const orders = await orderApi.getOrdersByEmail(email);
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

            const newOrder = await orderApi.createOrder(orderData);
            runInAction(() => {
                this.orders.unshift(newOrder);
                this.currentCustomerEmail = customerEmail;
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

    clearError() {
        this.error = null;
    }
}

export const orderStore = new OrderStore();
