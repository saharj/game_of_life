import { useState } from "react";
import "./App.css";
import Grids from "./components/grids"

function App() {
  const [row, setRow] = useState(25);
  const [col, setCol] = useState(25);

  const updateGrid = (r: number, c: number) => {
    setRow(r);
    setCol(c);
  }
  return (
    <div className="App">
      <header className="App-header">Conway's Game of Life</header>
      <div className="body">
        <Grids row={row} col={col} updateGrid={updateGrid} />
      </div>
    </div>
  );
}

export default App;
