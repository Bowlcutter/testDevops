import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <Box
            sx={{
                height: "100vh",
                backgroundImage: `url(${process.env.PUBLIC_URL}/images/front.jpg)`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundAttachment: "fixed",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                textAlign: "center",
            }}
        >
        >
            <Box
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    bgcolor: "rgba(0,0,0,0.5)",
                }}
            />

            <Box sx={{ position: "relative", zIndex: 1, p: 2 }}>
                <Typography variant="h2" gutterBottom sx={{ fontWeight: "bold" }}>
                    Welcome to the Art Store
                </Typography>
                <Typography variant="h5" gutterBottom>
                    Discover unique works from up and coming artists
                </Typography>
                <Button
                    component={Link}
                    to="/store"
                    variant="contained"
                    color="primary"
                    size="large"
                    sx={{ mt: 3 }}
                >
                    Browse the Collection
                </Button>
            </Box>
        </Box>
    );
}
