import React from "react";
import { Card, CardContent, Typography } from "@mui/material";

const PainterCard = ({ name, style }) => (
    <Card>
        <CardContent>
            <Typography variant="h6">{name}</Typography>
            <Typography color="text.secondary">{style}</Typography>
        </CardContent>
    </Card>
);

export default PainterCard;
