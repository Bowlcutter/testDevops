import { makeAutoObservable } from "mobx";

class PainterStore {
    painters = [
        { id: 1, name: "Bo", style: "Abstract" },
        { id: 2, name: "Christian", style: "Realism" },
        { id: 3, name: "Daniel", style: "Anime" },
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
