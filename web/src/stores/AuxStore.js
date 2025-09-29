import { makeAutoObservable } from "mobx";

class AuxStore {
    items = [
        { id: 1, name: "Canvas (40x40cm)", price: 200 },
        { id: 2, name: "Paint Brush Set", price: 150 },
        { id: 3, name: "Frame (60x80cm)", price: 400 },
    ];

    constructor() {
        makeAutoObservable(this);
    }
}

export const auxStore = new AuxStore();
