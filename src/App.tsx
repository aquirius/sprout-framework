import './App.css';
import { Link } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/users"}></Link>
        <Link to={"/register"}></Link>
      </header>
    </div>
  )
}

export default App;
