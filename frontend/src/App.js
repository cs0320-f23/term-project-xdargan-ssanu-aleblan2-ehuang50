import React from "react";
import Stage from "./components/Stage";
import "./App.css";

/**
 * Main application component that renders the Stage component.
 *
 * @function
 * @returns {JSX.Element} JSX element representing the entire application.
 */
function App() {
  return (
    <div className="bg-sage">
      <Stage />
    </div>
  );
}

export default App;
