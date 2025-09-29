import { makeAutoObservable } from "mobx";

class PainterStore {
    painters = [
        {
            id: 1,
            name: "Bo",
            style: "Abstract",
            artworks: [
                { id: 101, title: "Random Shapes", secretPrice: 12000 },
                { id: 102, title: "Storm", secretPrice: 8000 },
            ]
        },
        {
            id: 2,
            name: "Christian",
            style: "Realism",
            artworks: [
                { id: 201, title: "Sunset Over Lake", secretPrice: 15000 },
                { id: 202, title: "Barn", secretPrice: 9500 },
            ]
        },
        {
            id: 3,
            name: "Hank",
            style: "Hills",
            artworks: [
                { id: 301, title: "Green Hills", secretPrice: 9000 },
                { id: 302, title: "Snowy Hills", secretPrice: 8000 },
                { id: 303, title: "Dark Hills", secretPrice: 7000 },
                { id: 304, title: "Dry Hills", secretPrice: 6000 },
            ]
        },
    ];

    constructor() {
        makeAutoObservable(this);
    }

    addPainter(name, style) {
        this.painters.push({
            id: Date.now(),
            name,
            style,
            artworks: []
        });
    }

    addArtwork(painterId, title, secretPrice) {
        const painter = this.painters.find(p => p.id === painterId);
        if (painter) {
            painter.artworks.push({
                id: Date.now(),
                title,
                secretPrice
            });
        }
    }
}

export const painterStore = new PainterStore();
