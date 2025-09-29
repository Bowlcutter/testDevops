import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { painterStore } from "../stores/PainterStore";
import { auxStore } from "../stores/AuxStore";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    TextField,
    Button
} from "@mui/material";

const Store = observer(() => {
    const [bids, setBids] = useState({}); // track user bids

    const handleBid = (painterId, artworkId) => {
        const painter = painterStore.painters.find(p => p.id === painterId);
        if (!painter) return;

        const artwork = painter.artworks.find(a => a.id === artworkId);
        const bidValue = parseInt(bids[artworkId] || 0, 10);

        if (artwork && bidValue >= artwork.secretPrice) {
            alert(`✅ Congrats! Your bid of ${bidValue}kr. was accepted for "${artwork.title}".`);
        } else {
            alert(`❌ Sorry, your bid of ${bidValue}kr. was too low for "${artwork.title}".`);
        }
    };

    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Art Store
            </Typography>

            <Grid container spacing={3}>
                {painterStore.painters.map((p) => (
                    <Grid item xs={12} key={p.id}>
                        <Card sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5">{p.name}</Typography>
                                <Typography color="text.secondary">{p.style}</Typography>
                                <Divider sx={{ my: 2 }} />

                                <Grid container spacing={2}>
                                    {p.artworks.map((a) => (
                                        <Grid item xs={12} sm={6} md={4} key={a.id}>
                                            <Card variant="outlined" sx={{ p: 2 }}>
                                                <CardContent>
                                                    <Typography variant="h6">{a.title}</Typography>

                                                    <Grid container spacing={1} alignItems="center" sx={{ mt: 1 }}>
                                                        <Grid item xs={7}>
                                                            <TextField
                                                                label="Your Bid (kr.)"
                                                                type="number"
                                                                size="small"
                                                                inputProps={{ min: 1 }}   // minimum bid = 1
                                                                value={bids[a.id] || ""}
                                                                onChange={(e) =>
                                                                    setBids({
                                                                        ...bids,
                                                                        [a.id]: e.target.value
                                                                    })
                                                                }
                                                                fullWidth
                                                            />
                                                        </Grid>
                                                        <Grid item xs={5}>
                                                            <Button
                                                                fullWidth
                                                                variant="contained"
                                                                onClick={() => handleBid(p.id, a.id)}
                                                                disabled={!bids[a.id] || bids[a.id] < 1} // disable if invalid
                                                            >
                                                                Place Bid
                                                            </Button>
                                                        </Grid>
                                                    </Grid>
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                    ))}

                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Typography variant="h5" gutterBottom sx={{ mt: 4 }}>
                Auxiliary Items
            </Typography>
            <Grid container spacing={3}>
                {auxStore.items.map((i) => (
                    <Grid item xs={12} sm={6} md={4} key={i.id}>
                        <Card variant="outlined" sx={{ p: 2 }}>
                            <CardContent>
                                <Typography variant="h6">{i.name}</Typography>
                                <Typography variant="body2">
                                    Price: {i.price} kr.
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
});

export default Store;
