import { makeAutoObservable } from "mobx";

class AuxStore {
    items = [
        { id: 1, name: "Canvas (40x40cm)", price: 200, image: "/images/40x40canvas.jpg" },
        { id: 2, name: "Paint Brush Set", price: 150, image: "/images/brushset.jpg" },
        { id: 3, name: "Frame (60x80cm)", price: 400, image: "/images/60x80frame.jpg" },
    ];

    constructor() {
        makeAutoObservable(this);
    }
}

export const auxStore = new AuxStore();
