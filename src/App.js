import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <Header />
        </div>
      </div>
    </Router>
  );
};

export default App;
