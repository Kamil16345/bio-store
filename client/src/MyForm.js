
import './App.css';
import {
  createReactRouter,
  RouterProvider,
} from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <form action="/api/auth" method="post">
        <input type="text" placeholder="login"></input><br></br>
        <input type="text" placeholder="password"></input><br></br>
        <button type="submit">Sign In</button>
        </form>
        
        
      </header>
    </div>
  );
}

export default App;
