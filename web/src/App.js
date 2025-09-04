import logo from './logo.svg';
import './App.css';

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    🍕 Welcome to the Pizza Portal of Procrastination! 🍕
                </p>
                <p>
                    Edit <code>src/App.js</code> and pretend you're being productive.
                </p>
                <p>
                    ⚠️ Warning: This website may cause sudden urges to actually do your homework ⚠️
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React (or learn to procrastinate with style)
                </a>
                <button>Login (to your inevitable doom)</button>
                <p>
                    💡 Fun Fact: You've been staring at this spinning logo for {Math.floor(Math.random() * 60)} seconds
                </p>
                <p>
                    🎭 Current mood: Debugging life, one console.log at a time
                </p>
            </header>
        </div>
    );
}

export default App;