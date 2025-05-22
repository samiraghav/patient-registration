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
import { FaUsers, FaSearch, FaPlus } from "react-icons/fa";

const Section = ({ id, title, children, span = "md:col-span-1" }) => {
  const icons = {
    register: <FaPlus size={20} className="text-[#334EAC]" />,
    patients: <FaUsers size={20} className="text-[#334EAC]" />,
    query: <FaSearch size={20} className="text-[#334EAC]" />,
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
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleAddPatient = useCallback(async (patient) => {
    try {
      await addPatient(patient);
      await fetchData();
    } catch (error) {
      console.error("Error adding patient:", error);
    }
  }, [fetchData]);

  return (
    <Router>
      <div className="min-h-screen relative overflow-hidden">
        <div className="relative z-10">
          <Header />
          <Routes>
            <Route
              path="/"
              element={
                <main className="container mx-auto px-4 py-10">
                  <div className="flex flex-col gap-8">
                    <Section id="register" title="Register New Patient">
                      <PatientForm onAddPatient={handleAddPatient} />
                    </Section>

                    <Section id="patients" title="Patients List" span="md:col-span-2">
                      {{
                        content: (
                          <div>
                            <PatientList patients={patients} onDelete={fetchData} />
                          </div>
                        ),
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
