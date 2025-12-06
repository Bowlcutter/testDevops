import { makeAutoObservable, runInAction } from "mobx";
import { userAPI } from "../services/api";

class UserStore {
    users = [];
    loading = false;
    error = null;

    constructor() {
        makeAutoObservable(this);
    }

    async fetchUsers() {
        this.loading = true;
        this.error = null;
        try {
            const users = await userAPI.getAll();
            runInAction(() => {
                this.users = users;
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.loading = false;
            });
        }
    }

    async addUser(name, email) {
        try {
            const newUser = await userAPI.create({ name, email });
            runInAction(() => {
                this.users.push(newUser);
            });
            return newUser;
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
            throw error;
        }
    }

    async updateUser(id, name, email) {
        try {
            const updatedUser = await userAPI.update(id, { name, email });
            runInAction(() => {
                const index = this.users.findIndex(u => u.id === id);
                if (index !== -1) {
                    this.users[index] = updatedUser;
                }
            });
            return updatedUser;
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
            throw error;
        }
    }

    async removeUser(id) {
        try {
            await userAPI.delete(id);
            runInAction(() => {
                this.users = this.users.filter(u => u.id !== id);
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
            });
        }
    }

    clearError() {
        this.error = null;
    }
}

export const userStore = new UserStore();
