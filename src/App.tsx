import "./App.css";
import Grids from "./components/grids"

function App() {
  return (
    <div className="App">
      <header className="App-header">Conway's Game of Life</header>
      <body>
        <Grids />
      </body>
    </div>
  );
}

export default App;
