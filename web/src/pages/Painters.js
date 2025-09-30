import React from "react";
import { observer } from "mobx-react-lite";
import { painterStore } from "../stores/PainterStore";
import PainterCard from "../components/PainterCard";
import PainterForm from "../components/PainterForm";
import { Container, Typography, Grid } from "@mui/material";

const Painters = observer(() => {
    return (
        <Container style={{padding: '40px'}}>
            <Typography variant="h4" gutterBottom>
                Painters
            </Typography>
            <h2>
                (Please no touching! Feature requires login... (in the works))
            </h2>

            <PainterForm onAdd={(name, style) => painterStore.addPainter(name, style)} />

            <Grid container spacing={2} sx={{ mt: 2 }}>
                {painterStore.painters.map((p) => (
                    <Grid item xs={12} sm={6} md={4} key={p.id}>
                        <PainterCard name={p.name} style={p.style} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
});

export default Painters;
