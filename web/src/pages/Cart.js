import React, { useState } from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from "../storages/CartStore";
import { orderStore } from "../storages/OrderStore";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Divider,
    TextField,
    Box,
    Paper,
    Alert,
    CircularProgress
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Cart = observer(() => {
    const navigate = useNavigate();
    const [checkoutMode, setCheckoutMode] = useState(false);
    const [customerName, setCustomerName] = useState("");
    const [customerEmail, setCustomerEmail] = useState("");

    const handleCheckout = async (e) => {
        e.preventDefault();
        
        if (!customerName.trim() || !customerEmail.trim()) {
            return;
        }

        try {
            await orderStore.placeOrder(
                customerName,
                customerEmail,
                cartStore.items,
                cartStore.total
            );
            
            // Clear cart and redirect to orders
            cartStore.clearCart();
            navigate('/orders');
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };

    if (checkoutMode) {
        return (
            <Container style={{ padding: '40px' }}>
                <Typography variant="h4" gutterBottom>
                    Checkout
                </Typography>

                {orderStore.error && (
                    <Alert severity="error" sx={{ mb: 2 }} onClose={() => orderStore.clearError()}>
                        {orderStore.error}
                    </Alert>
                )}

                <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Order Summary
                    </Typography>
                    <List>
                        {cartStore.items.map((item) => (
                            <ListItem key={`${item.id}-${item.type}`}>
                                <ListItemText
                                    primary={`${item.name} x${item.qty}`}
                                    secondary={`${item.price} kr. each`}
                                />
                                <Typography variant="body1">
                                    {item.price * item.qty} kr.
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="h6" align="right">
                        Total: {cartStore.total} kr.
                    </Typography>
                </Paper>

                <Paper elevation={2} sx={{ p: 3 }}>
                    <Typography variant="h6" gutterBottom>
                        Customer Information
                    </Typography>
                    <Box component="form" onSubmit={handleCheckout}>
                        <TextField
                            label="Full Name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <TextField
                            label="Email"
                            type="email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                            fullWidth
                            required
                            margin="normal"
                        />
                        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
                            <Button
                                variant="outlined"
                                onClick={() => setCheckoutMode(false)}
                                disabled={orderStore.loading}
                            >
                                Back to Cart
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={orderStore.loading}
                                sx={{ flex: 1 }}
                            >
                                {orderStore.loading ? <CircularProgress size={24} /> : 'Place Order'}
                            </Button>
                        </Box>
                    </Box>
                </Paper>
            </Container>
        );
    }

    return (
        <Container style={{ padding: '40px' }}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>

            {cartStore.items.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <>
                    <List>
                        {cartStore.items.map((item) => (
                            <React.Fragment key={`${item.id}-${item.type}`}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${item.name} x${item.qty}`}
                                        secondary={`${item.price} kr. each`}
                                    />
                                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                        <Typography variant="body1">
                                            {item.price * item.qty} kr.
                                        </Typography>
                                        <Button
                                            color="error"
                                            onClick={() => cartStore.removeItem(item.id, item.type)}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>

                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Total: {cartStore.total} kr.
                    </Typography>

                    <Box sx={{ mt: 2, display: 'flex', gap: 2 }}>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={() => cartStore.clearCart()}
                        >
                            Clear Cart
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={() => setCheckoutMode(true)}
                        >
                            Proceed to Checkout
                        </Button>
                    </Box>
                </>
            )}
        </Container>
    );
});

export default Cart;
