import './App.css';
import { Link } from "react-router-dom";

//React app does includes our links where the routes are specified
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to={"/users"}/>
        <Link to={"/register"}/>
        <Link to={"/user/:uuid"}/>
      </header>
    </div>
  )
}

export default App;
