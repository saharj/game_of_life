import { useState } from "react";
import "./App.css";
import Grids from "./components/grids"

function App() {
  return (
    <div className="App">
      <header className="App-header">Conway's Game of Life</header>
      <div className="body">
        <Grids />
      </div>
    </div>
  );
}

export default App;
