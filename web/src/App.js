import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    🦞Learn React🦞
                </a>
                <button>Login</button>
                <p>
                    Help me make it through the night
                </p>
                <p>
                    🦞 You've been staring at this spinning logo for {Math.floor(Math.random() * 60)} seconds 🦞
                </p>
            </header>
        </div>
    );
}

export default App;