import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Painters from './pages/Painters';
import Store from "./pages/Store";

function App() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/painters">Painters</Link> |{" "}
                <Link to="/store">Store</Link> |{" "}
                <Link to="/about">About</Link> |{" "}
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/painters" element={<Painters />} />
                <Route path="/store" element={<Store />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </div>
    );
}

export default App;
