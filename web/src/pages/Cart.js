import React from "react";
import { observer } from "mobx-react-lite";
import { cartStore } from "../storages/CartStore";
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    Button,
    Divider
} from "@mui/material";

const Cart = observer(() => {
    return (
        <Container style={{padding: '40px'}}>
            <Typography variant="h4" gutterBottom>
                Your Cart
            </Typography>

            {cartStore.items.length === 0 ? (
                <Typography>Your cart is empty.</Typography>
            ) : (
                <>
                    <List>
                        {cartStore.items.map((item) => (
                            <React.Fragment key={item.id}>
                                <ListItem>
                                    <ListItemText
                                        primary={`${item.name} x${item.qty}`}
                                        secondary={`${item.price} kr. each`}
                                    />
                                    <Button
                                        color="error"
                                        onClick={() => cartStore.removeItem(item.id, item.type)}
                                    >
                                        Remove
                                    </Button>

                                </ListItem>
                                <Divider />
                            </React.Fragment>
                        ))}
                    </List>

                    <Typography variant="h6" sx={{ mt: 2 }}>
                        Total: {cartStore.total} kr.
                    </Typography>

                    <Button
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                        onClick={() => {
                            alert("Checkout complete! 🛒");
                            cartStore.clearCart();
                        }}
                    >
                        Checkout
                    </Button>
                </>
            )}
        </Container>
    );
});

export default Cart;
