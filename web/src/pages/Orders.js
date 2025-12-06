import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { orderStore } from "../storages/OrderStore";
import {
    Container,
    Typography,
    Paper,
    List,
    ListItem,
    ListItemText,
    Divider,
    Chip,
    CircularProgress,
    Alert,
    Box,
    TextField,
    Button,
    Accordion,
    AccordionSummary,
    AccordionDetails
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DeleteIcon from "@mui/icons-material/Delete";

const Orders = observer(() => {
    const [emailFilter, setEmailFilter] = useState("");

    useEffect(() => {
        orderStore.fetchAllOrders();
    }, []);

    const handleFilterByEmail = () => {
        if (emailFilter.trim()) {
            orderStore.fetchOrdersByEmail(emailFilter);
        } else {
            orderStore.fetchAllOrders();
        }
    };

    const handleDeleteOrder = async (orderId) => {
        if (window.confirm('Are you sure you want to delete this order? This action cannot be undone.')) {
            try {
                await orderStore.deleteOrder(orderId);
            } catch (error) {
                console.error('Failed to delete order:', error);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'COMPLETED': return 'success';
            case 'PENDING': return 'warning';
            case 'CANCELLED': return 'error';
            default: return 'default';
        }
    };

    return (
        <Container style={{ padding: '40px' }}>
            <Typography variant="h4" gutterBottom>
                Order History
            </Typography>

            {orderStore.error && (
                <Alert severity="error" sx={{ mb: 2 }} onClose={() => orderStore.clearError()}>
                    {orderStore.error}
                </Alert>
            )}

            <Paper elevation={2} sx={{ p: 2, mb: 3 }}>
                <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <TextField
                        label="Filter by Email"
                        value={emailFilter}
                        onChange={(e) => setEmailFilter(e.target.value)}
                        size="small"
                        sx={{ flex: 1 }}
                    />
                    <Button variant="contained" onClick={handleFilterByEmail}>
                        Filter
                    </Button>
                    <Button 
                        variant="outlined" 
                        onClick={() => {
                            setEmailFilter("");
                            orderStore.fetchAllOrders();
                        }}
                    >
                        Clear
                    </Button>
                </Box>
            </Paper>

            {orderStore.loading ? (
                <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                    <CircularProgress />
                </Box>
            ) : orderStore.orders.length === 0 ? (
                <Typography color="text.secondary" align="center" sx={{ p: 3 }}>
                    No orders found.
                </Typography>
            ) : (
                <Box>
                    {orderStore.orders.map((order) => (
                        <Accordion key={order.id} sx={{ mb: 2 }}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, width: '100%', pr: 2 }}>
                                    <Typography variant="h6">
                                        Order #{order.id}
                                    </Typography>
                                    <Chip 
                                        label={order.status} 
                                        color={getStatusColor(order.status)}
                                        size="small"
                                    />
                                    <Typography variant="body2" color="text.secondary" sx={{ ml: 'auto' }}>
                                        {formatDate(order.createdAt)}
                                    </Typography>
                                </Box>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Box>
                                    <Typography variant="body1" gutterBottom>
                                        <strong>Customer:</strong> {order.customerName} ({order.customerEmail})
                                    </Typography>
                                    
                                    <Divider sx={{ my: 2 }} />
                                    
                                    <Typography variant="h6" gutterBottom>
                                        Items:
                                    </Typography>
                                    <List>
                                        {order.orderItems && order.orderItems.map((item, index) => (
                                            <ListItem key={index}>
                                                <ListItemText
                                                    primary={`${item.itemName} (${item.itemType})`}
                                                    secondary={`Quantity: ${item.quantity} × ${item.price} kr.`}
                                                />
                                                <Typography variant="body1">
                                                    {item.quantity * item.price} kr.
                                                </Typography>
                                            </ListItem>
                                        ))}
                                    </List>
                                    
                                    <Divider sx={{ my: 2 }} />
                                    
                                    <Typography variant="h6" align="right">
                                        Total: {order.total} kr.
                                    </Typography>

                                    <Box sx={{ mt: 2, display: 'flex', justifyContent: 'flex-end' }}>
                                        <Button 
                                            variant="outlined" 
                                            color="error"
                                            startIcon={<DeleteIcon />}
                                            onClick={() => handleDeleteOrder(order.id)}
                                        >
                                            Delete Order
                                        </Button>
                                    </Box>
                                </Box>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            )}
        </Container>
    );
});

export default Orders;
