import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col justify-between">
        <Header />
        <main className="flex-grow flex items-center justify-center text-[#081F5C] text-xl font-semibold">
          Welcome to Patient Registration App!
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
