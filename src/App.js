import React, { useEffect, useState, useCallback } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { initDb, getPatients, addPatient } from "./services/databaseService";
import PatientForm from "./components/PatientForm/PatientForm";
import PatientList from "./components/PatientList/PatientList";
import PatientDetailPage from "./components/PatientDetail/PatientDetail";
import QueryForm from "./components/QueryForm/QueryForm";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import EditPatientForm from "./components/EditPatientForm/EditPatientForm";
import { FaUsers, FaSearch, FaPlus, FaUserPlus, FaClipboardList } from "react-icons/fa";

const Section = ({ id, title, children, span = "md:col-span-1" }) => {
  const icons = {
    register: <FaPlus size={20} className="text-[#334EAC]" />,
    patients: <FaUsers size={20} className="text-[#334EAC]" />,
    query: <FaSearch size={20} className="text-[#334EAC]" />
  };

  return (
    <section
      id={id}
      className={`${span} relative overflow-hidden bg-white p-3 rounded-lg shadow-sm border border-[#BAD6EB]/20`}
    >
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-5 pb-2 border-b border-[#BAD6EB]/20">
          <div className="flex items-center gap-2">
            {icons[id]}
            <h2 className="text-lg font-medium text-[#081F5C]">{title}</h2>
          </div>
          {id === "patients" && children.patientCount}
        </div>
        {id === "patients" ? children.content : children}
      </div>
    </section>
  );
};

const App = () => {
  const [patients, setPatients] = useState([]);

  const fetchData = useCallback(async () => {
    try {
      await initDb();
      const data = await getPatients();
      setPatients(data);
      localStorage.setItem("patients", JSON.stringify(data));
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, []);

  const handleAddPatient = useCallback(
    async (patient) => {
      try {
        await addPatient(patient);
        await fetchData();
      } catch (error) {
        console.error("Error adding patient:", error);
      }
    },
    [fetchData]
  );

  // Initial hydration from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("patients");
    if (stored) {
      setPatients(JSON.parse(stored));
    } else {
      fetchData();
    }
  }, [fetchData]);

  // Multi-tab sync
  useEffect(() => {
    const handleStorageChange = (e) => {
      if (e.key === "patients") {
        const updated = JSON.parse(e.newValue || "[]");
        setPatients(updated);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <Header />
          <div className="min-h-screen flex flex-col items-center justify-center text-center bg-white px-4 py-4">
            <h1 className="text-4xl md:text-5xl font-bold text-[#081F5C] mb-4">
              Welcome to <span className="text-[#2563EB]">Medblocks</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mb-8">
              Manage patient records with ease. Register new patients, view the full list, and perform advanced queries — all in one place.
            </p>

            <section className="py-16">
              <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold text-[#081F5C] mb-10">
                  Are you struggling with patient management?
                </h2>
                <div className="grid md:grid-cols-3 gap-10 text-left">
                  <div className="flex flex-col items-center text-center">
                    <FaUserPlus size={40} className="text-[#334EAC] mb-4" />
                    <h3 className="text-xl font-semibold text-[#081F5C] mb-2">Manual Record Keeping?</h3>
                    <p className="text-sm text-gray-600 max-w-xs">
                      Forget pen and paper. Quickly register patients with structured digital forms — organized, accessible, and future-ready.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <FaClipboardList size={40} className="text-[#334EAC] mb-4" />
                    <h3 className="text-xl font-semibold text-[#081F5C] mb-2">Lost in Spreadsheets?</h3>
                    <p className="text-sm text-gray-600 max-w-xs">
                      View all patient records at a glance. Easily browse, edit, or remove any record — no spreadsheet chaos, just clarity.
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <FaSearch size={40} className="text-[#334EAC] mb-4" />
                    <h3 className="text-xl font-semibold text-[#081F5C] mb-2">Struggling to Find Info?</h3>
                    <p className="text-sm text-gray-600 max-w-xs">
                      Run custom queries on your patient database with ease. Get exactly the data you need, instantly.
                    </p>
                  </div>
                </div>
              </div>
            </section>

          </div>

          <Routes>
            <Route
              path="/"
              element={
                <main className="container mx-auto px-4 py-10">
                  <div className="flex flex-col gap-8">
                    <Section id="register" title="Register Patient">
                      <PatientForm onAddPatient={handleAddPatient} />
                    </Section>

                    <Section id="patients" title="Patients List" span="md:col-span-2">
                      {{
                        content: (
                          <div>
                            <PatientList patients={patients} onDelete={fetchData} />
                          </div>
                        )
                      }}
                    </Section>

                    <Section id="query" title="Query Patients" span="md:col-span-3">
                      <div>
                        <QueryForm onQueryExecuted={fetchData} />
                      </div>
                    </Section>
                  </div>
                </main>
              }
            />
            <Route path="/patients/:id" element={<PatientDetailPage />} />
            <Route path="/edit/:id" element={<EditPatientForm onPatientUpdated={fetchData} />} />
          </Routes>

          <Footer />
        </div>
      </div>
    </Router>
  );
};

export default App;
