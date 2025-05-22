import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPatients } from '../../services/databaseService';

const LabelValue = ({ label, value }) => (
  <div className="flex flex-col">
    <span className="text-[#7096D1] text-xs font-semibold uppercase">{label}</span>
    <span className="text-[#081F5C] text-sm">{value?.trim?.() ? value : '—'}</span>
  </div>
);

const PatientDetails = () => {
  const { id } = useParams();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    const fetchData = async () => {
        const patients = await getPatients();
        const match = patients.find(p => String(p.id) === id);
        setPatient(match);
    };
    fetchData();
    }, [id]);


  if (!patient) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-xl shadow border border-[#BAD6EB]/40">
      <h2 className="text-3xl font-bold text-[#334EAC] mb-6 text-center">{patient.name}</h2>

      <div className="mb-6">
        <h3 className="text-[#334EAC] font-semibold text-lg mb-2 border-b border-[#BAD6EB]/30 pb-1">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabelValue label="Date of Birth" value={patient.dob} />
          <LabelValue label="Gender" value={patient.gender} />
          <LabelValue label="Phone Number" value={patient.phone} />
          <LabelValue label="Email" value={patient.email} />
          <LabelValue label="Address" value={patient.address} />
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-[#334EAC] font-semibold text-lg mb-2 border-b border-[#BAD6EB]/30 pb-1">Emergency Contact</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabelValue label="Contact Name" value={patient.emergencycontactname} />
          <LabelValue label="Relation" value={patient.emergencycontactrelation} />
          <LabelValue label="Contact Phone" value={patient.emergencycontactphone} />
        </div>
      </div>

      <div>
        <h3 className="text-[#334EAC] font-semibold text-lg mb-2 border-b border-[#BAD6EB]/30 pb-1">Medical Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <LabelValue label="Blood Group" value={patient.bloodgroup} />
          <LabelValue label="Allergies" value={patient.allergies} />
          <LabelValue label="Medical Conditions" value={patient.conditions} />
        </div>
      </div>
    </div>
  );
};

export default PatientDetails;
