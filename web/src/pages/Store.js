import React from "react";
import { observer } from "mobx-react-lite";
import { painterStore } from "../stores/PainterStore";
import { Container, Typography, Grid, Card, CardContent } from "@mui/material";

const Store = observer(() => {
    return (
        <Container>
            <Typography variant="h4" gutterBottom>
                Art Store
            </Typography>
            <Grid container spacing={2}>
                {painterStore.painters.map((p) => (
                    <Grid item xs={12} sm={6} md={4} key={p.id}>
                        <Card>
                            <CardContent>
                                <Typography variant="h6">{p.name}</Typography>
                                <Typography color="text.secondary">{p.style}</Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    🎨 Buy this artist’s paintings!
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
