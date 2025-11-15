import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { painterStore } from "../storages/PainterStore";
import { auxStore } from "../storages/AuxStore";
import { cartStore } from "../storages/CartStore";
import BackendStatus from "../components/BackendStatus";
import {
    Container,
    Typography,
    Grid,
    Card,
    CardContent,
    Divider,
    TextField,
    Button,
    Box,
    CardMedia,
    Alert
} from "@mui/material";

const Store = observer(() => {
    const [bids, setBids] = useState({}); // track user bids

    const handleBid = (painterId, artworkId) => {
        const painter = painterStore.painters.find(p => p.id === painterId);
        if (!painter) return;

        const artwork = painter.artworks.find(a => a.id === artworkId);
        const bidValue = parseInt(bids[artworkId] || 0, 10);

        if (!artwork) return;

        if (bidValue < 1) {
            alert("⚠️ Minimum bid is 1 kr.");
            return;
        }

        if (bidValue >= artwork.secretPrice) {
            alert(`✅ Congrats! Your bid of ${bidValue}kr. was accepted for "${artwork.title}".`);
            cartStore.addItem({
                id: artwork.id,
                name: artwork.title,
                price: bidValue,
                type: "painting"
            });
        } else {
            alert(`❌ Sorry, your bid of ${bidValue}kr. was too low for "${artwork.title}".`);
        }
    };

    return (
        <Container style={{ padding: "40px" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">
                    Art Store
                </Typography>
                <BackendStatus />
            </Box>

            {!painterStore.useBackend && (
                <Alert severity="info" sx={{ mb: 3 }}>
                    Currently showing static demo data. Toggle "Use Backend" above to fetch from database.
                </Alert>
            )}

            <Grid container spacing={3}>
                {painterStore.painters.map((p) => (
                    <Grid item xs={12} key={p.id}>
                        <Card sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="h5">{p.name}</Typography>
                                <Typography color="text.secondary">{p.style}</Typography>
                                <Divider sx={{ my: 2 }} />

                                <Grid container spacing={2}>
                                    {p.artworks && p.artworks.length > 0 ? (
                                        p.artworks.map((a) => (
                                            <Grid item xs={12} sm={6} md={4} key={a.id}>
                                                <Card variant="outlined" sx={{ p: 2 }}>
                                                    {(a.image || a.imageUrl) && (
                                                        <CardMedia
                                                            component="img"
                                                            height="400"
                                                            image={a.image || a.imageUrl}
                                                            alt={a.title}
                                                            sx={{ objectFit: "cover", mb: 1 }}
                                                        />
                                                    )}
                                                    <CardContent>
                                                        <Typography variant="h6">{a.title}</Typography>
                                                        <Box sx={{ display: "flex", gap: 1, mt: 1 }}>
                                                            <TextField
                                                                label="Your Bid (kr)"
                                                                type="number"
                                                                size="small"
                                                                value={bids[a.id] || ""}
                                                                onChange={(e) =>
                                                                    setBids({
                                                                        ...bids,
                                                                        [a.id]: e.target.value
                                                                    })
                                                                }
                                                                inputProps={{ min: 1 }}
                                                                sx={{ flex: 1 }}
                                                            />
                                                            <Button
                                                                variant="contained"
                                                                onClick={() => handleBid(p.id, a.id)}
                                                            >
                                                                Place Bid
                                                            </Button>
                                                        </Box>
                                                    </CardContent>
                                                </Card>
                                            </Grid>
                                        ))
                                    ) : (
                                        <Grid item xs={12}>
                                            <Typography color="text.secondary" align="center">
                                                No artworks available for this painter yet.
                                            </Typography>
                                        </Grid>
                                    )}
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
                            {i.image && (
                                <CardMedia
                                    component="img"
                                    height="140"
                                    image={i.image}
                                    alt={i.name}
                                    sx={{ objectFit: "contain", mb: 1 }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="h6">{i.name}</Typography>
                                <Typography variant="body2" gutterBottom>
                                    Price: {i.price} kr.
                                </Typography>
                                <Button
                                    variant="contained"
                                    onClick={() =>
                                        cartStore.addItem({
                                            id: i.id,
                                            name: i.name,
                                            price: i.price,
                                            type: "aux"
                                        })
                                    }
                                >
                                    Add to Cart
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
});

export default Store;
