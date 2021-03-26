import "./App.css";
import Grids from "./components/grids"

function App() {
  return (
    <div className="App">
      <header className="App-header">Conway's Game of Life</header>
      <div className="body">
        <Grids row={25} col={25} />
      </div>
    </div>
  );
}

export default App;
