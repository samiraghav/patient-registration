import React, { useCallback } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { initDb, addPatient } from "./services/databaseService";
import PatientForm from "./components/PatientForm/PatientForm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";

const App = () => {
  const handleAddPatient = useCallback(async (patient) => {
    try {
      await initDb();
      await addPatient(patient);
      console.log("Patient added successfully");
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />

        <main className="flex-grow container mx-auto px-4 py-10">
          <section className="bg-white p-6 rounded-lg shadow border border-[#BAD6EB]/20">
            <h2 className="text-lg font-medium text-[#081F5C] mb-4 flex items-center gap-2">
              <span className="text-[#334EAC]">
                <svg width="20" height="20" fill="currentColor">
                  <circle cx="10" cy="10" r="10" />
                </svg>
              </span>
              Register New Patient
            </h2>
            <PatientForm onAddPatient={handleAddPatient} />
          </section>
        </main>

        <Footer />
      </div>
    </Router>
  );
};

export default App;
