import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Painters from "./pages/Painters";
import About from "./pages/About";

function App() {
    return (
        <div>
            <nav>
                <Link to="/">Home</Link> |{" "}
                <Link to="/painters">Painters</Link> |{" "}
                <Link to="/about">About</Link>
            </nav>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/painters" element={<Painters />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<h1>404</h1>} />
            </Routes>
        </div>
    );
}

export default App;
