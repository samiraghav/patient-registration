import React, { useEffect, useState, useCallback } from "react";
import { initDb, getPatients, addPatient } from "../../services/databaseService";
import PatientForm from "../PatientForm/PatientForm";
import PatientList from "../PatientList/PatientList";
import QueryForm from "../QueryForm/QueryForm";
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

const AdminDashboard = () => {
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
    <div className="min-h-screen relative overflow-hidden">
      <div className="relative z-10">
        <main className="container mx-auto px-4 py-10">
          <div className="flex flex-col gap-8">
            <Section id="register" title="Register Patient">
              <PatientForm onAddPatient={handleAddPatient} />
              </Section>

              <Section id="patients" title="List" span="md:col-span-2">
                  <PatientList patients={patients} onDelete={fetchData} />
              </Section>

              <Section id="query" title="Query Patients" span="md:col-span-3">
              <QueryForm onQueryExecuted={fetchData} />
            </Section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
