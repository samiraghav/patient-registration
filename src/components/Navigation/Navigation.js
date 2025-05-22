import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const navItems = [
  { id: "register", label: "Register New" },
  { id: "patients", label: "Patients List" },
  { id: "query", label: "Query Patients" },
];

const Navigation = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleNavClick = (id) => {
    setIsOpen(false);
    navigate("/", { replace: true });
    setTimeout(() => {
      const section = document.getElementById(id);
      if (section) section.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <>
      <nav className="hidden md:flex gap-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => handleNavClick(item.id)}
            className="px-4 py-2 hover:bg-white/60 transition-all duration-200 text-[#081F5C] hover:text-[#334EAC] font-medium text-sm"
          >
            {item.label}
          </button>
        ))}
      </nav>

      <div className="md:hidden">
        <button
          onClick={() => setIsOpen(true)}
          className="p-2 text-[#334EAC] focus:outline-none"
        >
          <FaBars size={20} />
        </button>
      </div>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[90%] max-w-xs bg-white z-50 shadow-lg transform transition-transform duration-300 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex justify-end p-4 border-b border-[#BAD6EB]/30">
          <button
            onClick={() => setIsOpen(false)}
            className="text-[#334EAC] hover:text-[#081F5C]"
          >
            <FaTimes size={22} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className="text-left text-[#081F5C] hover:text-[#334EAC] font-medium text-base border-b pb-2 border-[#BAD6EB]/20"
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>
    </>
  );
};

export default Navigation;
