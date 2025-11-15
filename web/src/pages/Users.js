import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { userStore } from "../storages/UserStore";
import {
    Container,
    Typography,
    Button,
    TextField,
    List,
    ListItem,
    ListItemText,
    IconButton,
    CircularProgress,
    Alert,
    Paper,
    Box,
    Chip
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";

const Users = observer(() => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        userStore.fetchUsers();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (name.trim() && email.trim()) {
            try {
                await userStore.addUser(name, email);
                setName("");
                setEmail("");
            } catch (error) {
                console.error("Failed to add user:", error);
            }
        }
    };

    const formatDate = (dateString) => {
        if (!dateString) return 'N/A';
        const date = new Date(dateString);
        return date.toLocaleString();
    };

    return (
        <Container style={{ padding: "40px" }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography variant="h4">
                    User Management
                </Typography>
                <Chip 
                    label="Backend Integration Demo" 
                    color="primary" 
                    variant="outlined"
                />
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                This page demonstrates full-stack integration: React → Spring Boot → PostgreSQL
            </Typography>

            {userStore.error && (
                <Alert 
                    severity="error" 
                    sx={{ mb: 2 }}
                    onClose={() => userStore.clearError()}
                >
                    {userStore.error}
                </Alert>
            )}

            <Paper elevation={2} sx={{ p: 3, mb: 3 }}>
                <Typography variant="h6" gutterBottom>
                    Add New User
                </Typography>
                <Box component="form" onSubmit={handleSubmit}>
                    <TextField
                        label="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <TextField
                        label="Email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        fullWidth
                        margin="normal"
                        required
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={{ mt: 2 }}
                    >
                        Add User
                    </Button>
                </Box>
            </Paper>

            <Paper elevation={2} sx={{ p: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Typography variant="h6">
                        Users from Database ({userStore.users.length})
                    </Typography>
                    <IconButton 
                        onClick={() => userStore.fetchUsers()}
                        disabled={userStore.loading}
                        color="primary"
                    >
                        <RefreshIcon />
                    </IconButton>
                </Box>

                {userStore.loading ? (
                    <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
                        <CircularProgress />
                    </Box>
                ) : userStore.users.length === 0 ? (
                    <Typography color="text.secondary" sx={{ p: 2, textAlign: 'center' }}>
                        No users yet. Add one above! 👆
                    </Typography>
                ) : (
                    <List>
                        {userStore.users.map((user) => (
                            <ListItem
                                key={user.id}
                                sx={{ 
                                    borderBottom: '1px solid #eee',
                                    '&:last-child': { borderBottom: 'none' }
                                }}
                                secondaryAction={
                                    <IconButton
                                        edge="end"
                                        onClick={() => userStore.removeUser(user.id)}
                                        color="error"
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                }
                            >
                                <ListItemText
                                    primary={
                                        <Typography variant="body1" fontWeight="bold">
                                            {user.name}
                                        </Typography>
                                    }
                                    secondary={
                                        <>
                                            <Typography variant="body2" component="span" display="block">
                                                📧 {user.email}
                                            </Typography>
                                            <Typography variant="caption" component="span" display="block" sx={{ mt: 0.5 }}>
                                                ID: {user.id} | Created: {formatDate(user.createdAt)}
                                            </Typography>
                                        </>
                                    }
                                />
                            </ListItem>
                        ))}
                    </List>
                )}
            </Paper>
        </Container>
    );
});

export default Users;
