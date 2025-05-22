import React from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-4">
      <h1 className="text-4xl md:text-5xl font-bold text-[#081F5C] mb-4">
        Welcome to <span className="text-[#2563EB]">Medblocks</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-xl mb-8">
        Manage patient records with ease. Register new patients, view the full list, and perform advanced queries — all in one place.
      </p>
      <button
        onClick={() => navigate('/register')}
        className="px-6 py-3 bg-[#2563EB] text-white rounded-md font-medium hover:bg-[#1E40AF] transition"
      >
        Register New Patient
      </button>
    </div>
  );
};

export default LandingPage;
