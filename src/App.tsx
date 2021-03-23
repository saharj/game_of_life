import "./App.css";
import Grids from "./components/grids"

function App() {
  return (
    <div className="App">
      <header className="App-header">Conway's Game of Life</header>
      <div className="body">
        <Grids row={15} col={15} />
      </div>
    </div>
  );
}

export default App;
