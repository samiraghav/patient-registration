import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import MedblocksLogo from "../../medblock_logo.webp";

const Header = () => (
  <header className="bg-white sticky top-0 z-50">
    <div className="container mx-auto px-6 py-4">
      <div className="flex flex-row md:flex-row md:items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <img
              src={MedblocksLogo}
              alt="Medblocks Logo"
              className="w-40"
            />
          </Link>
        </div>
        <Navigation />
      </div>
    </div>
  </header>
);

export default Header;
