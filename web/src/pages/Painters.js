import React from "react";
import { observer } from "mobx-react-lite";
import { painterStore } from "../storages/PainterStore";
import PainterCard from "../components/PainterCard";
import PainterForm from "../components/PainterForm";
import BackendStatus from "../components/BackendStatus";
import { Container, Typography, Grid, Box, Alert } from "@mui/material";

const Painters = observer(() => {
    return (
        <Container style={{padding: '40px'}}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">
                    Painters
                </Typography>
                <BackendStatus />
            </Box>

            {!painterStore.useBackend && (
                <Alert severity="info" sx={{ mb: 2 }}>
                    Currently showing static demo data. Toggle "Use Backend" above to fetch from database.
                </Alert>
            )}

            {painterStore.useBackend && (
                <Alert severity="warning" sx={{ mb: 2 }}>
                    (Please no touching! Feature requires login... (in the works))
                </Alert>
            )}

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
