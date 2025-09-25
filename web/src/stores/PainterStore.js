import { makeAutoObservable } from "mobx";

class PainterStore {
    painters = [
        { id: 1, name: "Christian", style: "Abstract" },
        { id: 2, name: "Bente", style: "Realism" },
        { id: 3, name: "Donnie", style: "Cubism" },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    addPainter(name, style) {
        const newPainter = {
            id: Date.now(),
            name,
            style,
        };
        this.painters.push(newPainter);
    }
}

export const painterStore = new PainterStore();
