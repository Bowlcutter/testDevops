import { Routes, Route, Link } from 'react-router-dom';
import { observer } from "mobx-react-lite";
import { cartStore } from "./storages/CartStore";
import Home from './pages/Home';
import About from './pages/About';
import Painters from './pages/Painters';
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import Users from "./pages/Users";

import {
    AppBar,
    Toolbar,
    Typography,
    IconButton,
    Badge,
    Box
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const App = observer(() => {
    return (
        <>
            <AppBar position="fixed">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: "inherit", textDecoration: "none", marginRight: "15px" }}>
                            Home
                        </Link>
                        <Link to="/painters" style={{ color: "inherit", textDecoration: "none", marginRight: "15px" }}>
                            Painters
                        </Link>
                        <Link to="/store" style={{ color: "inherit", textDecoration: "none", marginRight: "15px" }}>
                            Store
                        </Link>
                        <Link to="/users" style={{ color: "inherit", textDecoration: "none", marginRight: "15px" }}>
                            Users
                        </Link>
                        <Link to="/about" style={{ color: "inherit", textDecoration: "none", marginRight: "15px" }}>
                            About
                        </Link>
                    </Typography>

                    <IconButton component={Link} to="/cart" color="inherit">
                        <Badge badgeContent={cartStore.itemCount} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Box sx={{ mt: 8, p: 2 }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/painters" element={<Painters />} />
                    <Route path="/store" element={<Store />} />
                    <Route path="/users" element={<Users />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="*" element={<h1>404</h1>} />
                </Routes>
            </Box>
        </>
    );
});

export default App;
