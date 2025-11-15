import { makeAutoObservable, runInAction } from "mobx";
import { painterAPI } from "../services/api";

class PainterStore {
    painters = [];
    loading = false;
    error = null;
    useBackend = false; // Toggle between backend and static data

    // Static fallback data (for when backend is unavailable or useBackend is false)
    staticPainters = [
        {
            id: 1,
            name: "Bo",
            style: "Abstract",
            artworks: [
                { id: 101, title: "Random Shapes", secretPrice: 12000, imageUrl: `${process.env.PUBLIC_URL}/images/shapes.jpg` },
                { id: 102, title: "Storm", secretPrice: 8000, imageUrl: `${process.env.PUBLIC_URL}/images/storm.jpg` },
            ]
        },
        {
            id: 2,
            name: "Christian",
            style: "Realism",
            artworks: [
                { id: 201, title: "Sunset Over Lake", secretPrice: 15000, imageUrl: `${process.env.PUBLIC_URL}/images/sunsetoverlake.jpg` },
                { id: 202, title: "Barn", secretPrice: 9500, imageUrl: `${process.env.PUBLIC_URL}/images/barn.jpg` },
            ]
        },
        {
            id: 3,
            name: "Hank",
            style: "Hills",
            artworks: [
                { id: 301, title: "Green Hills", secretPrice: 9000, imageUrl: `${process.env.PUBLIC_URL}/images/greenhills.jpg` },
                { id: 302, title: "Snowy Hills", secretPrice: 8000, imageUrl: `${process.env.PUBLIC_URL}/images/snowyhills.jpg` },
                { id: 303, title: "Dark Hills", secretPrice: 7000, imageUrl: `${process.env.PUBLIC_URL}/images/darkhills.jpg` },
                { id: 304, title: "Dry Hills", secretPrice: 6000, imageUrl: `${process.env.PUBLIC_URL}/images/dryhills.jpg` },
            ]
        },
    ];

    constructor() {
        makeAutoObservable(this);
        this.initializePainters();
    }

    initializePainters() {
        if (this.useBackend) {
            this.fetchPainters();
        } else {
            this.painters = this.staticPainters;
        }
    }

    async fetchPainters() {
        this.loading = true;
        this.error = null;
        try {
            const data = await painterAPI.getAll();
            runInAction(() => {
                // Transform backend data to match frontend format
                this.painters = data.map(painter => ({
                    ...painter,
                    artworks: painter.artworks?.map(artwork => ({
                        ...artwork,
                        imageUrl: artwork.imageUrl ? `${process.env.PUBLIC_URL}${artwork.imageUrl}` : null
                    })) || []
                }));
                this.loading = false;
            });
        } catch (error) {
            runInAction(() => {
                this.error = error.message;
                this.loading = false;
                // Fallback to static data if backend fails
                console.warn('Failed to fetch painters from backend, using static data');
                this.painters = this.staticPainters;
            });
        }
    }

    async addPainter(name, style) {
        if (!this.useBackend) {
            // Static mode: just add to local array
            this.painters.push({
                id: Date.now(),
                name,
                style,
                artworks: []
            });
            return;
        }

        // Backend mode: save to database
        this.loading = true;
        try {
            const newPainter = await painterAPI.create({ name, style });
            runInAction(() => {
                this.painters.push(newPainter);
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

    async deletePainter(id) {
        if (!this.useBackend) {
            this.painters = this.painters.filter(p => p.id !== id);
            return;
        }

        this.loading = true;
        try {
            await painterAPI.delete(id);
            runInAction(() => {
                this.painters = this.painters.filter(p => p.id !== id);
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

    toggleBackendMode() {
        this.useBackend = !this.useBackend;
        this.initializePainters();
    }
}

export const painterStore = new PainterStore();
