import React, { useState } from "react";
import { Button, TextField, Box } from "@mui/material";

const PainterForm = ({ onAdd }) => {
    const [name, setName] = useState("");
    const [style, setStyle] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        if (name.trim() && style.trim()) {
            onAdd(name, style);
            setName("");
            setStyle("");
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <TextField
                label="Painter Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                margin="normal"
                fullWidth
            />
            <TextField
                label="Style"
                value={style}
                onChange={(e) => setStyle(e.target.value)}
                margin="normal"
                fullWidth
            />
            <Button type="submit" variant="contained" sx={{ mt: 2 }}>
                Add Painter
            </Button>
        </Box>
    );
};

export default PainterForm;
