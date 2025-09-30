import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Painters from "./pages/Painters";
import Store from "./pages/Store";
import Cart from "./pages/Cart";
import { observer } from "mobx-react-lite";
import { cartStore } from "./stores/CartStore";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { AppBar, Toolbar, Typography, IconButton, Badge } from "@mui/material";

const App = observer(() => {
    return (
        <div>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>
                            Home
                        </Link>
                        {" | "}
                        <Link to="/painters" style={{ color: "inherit", textDecoration: "none" }}>
                            Painters
                        </Link>
                        {" | "}
                        <Link to="/store" style={{ color: "inherit", textDecoration: "none" }}>
                            Store
                        </Link>
                        {" | "}
                        <Link to="/about" style={{ color: "inherit", textDecoration: "none" }}>
                            About
                        </Link>
                    </Typography>

                    <IconButton color="inherit" component={Link} to="/cart">
                        <Badge badgeContent={cartStore.items.length} color="error">
                            <ShoppingCartIcon />
                        </Badge>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/painters" element={<Painters />} />
                <Route path="/store" element={<Store />} />
                <Route path="/about" element={<About />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </div>
    );
});

export default App;
