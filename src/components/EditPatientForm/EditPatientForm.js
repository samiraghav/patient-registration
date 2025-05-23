import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPatients, initDb, updatePatient } from '../../services/databaseService';
import { InputField, SelectField, genderOptions, bloodGroupOptions, calculateAge } from '../../helpers/formHelpers';
import { useSnackbar } from 'notistack';
import { FaUser, FaCalendarAlt, FaVenusMars, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUserShield, FaSyringe, FaNotesMedical, FaProcedures, FaSave} from "react-icons/fa";

const EditPatientForm = ({ onPatientUpdated }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { id } = useParams();
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);

  useEffect(() => {
    const load = async () => {
      await initDb();
      const all = await getPatients();
      const selected = all.find(p => String(p.id) === id);
      setPatient(selected || {});
    };
    load();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      const calculatedAge = calculateAge(value);
      setPatient(prev => ({ ...prev, dob: value, age: calculatedAge }));
    } else {
      setPatient(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {    
    e.preventDefault();

    const cleaned = Object.fromEntries(
      Object.entries(patient).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
    );

    try {
      await updatePatient(id, cleaned);
      enqueueSnackbar('Patient updated successfully!', { variant: 'success' });
      if (onPatientUpdated) onPatientUpdated();
      navigate("/admin");
    } catch (error) {
      enqueueSnackbar('Failed to update patient.', { variant: 'error' });
      console.error('Update failed:', error);
    }
  };

  if (!patient) return <div className="p-10 text-center">Loading...</div>;

  return (
    <div className="max-w-5xl mx-auto mt-10 p-6 bg-white rounded-xl shadow border border-[#BAD6EB]/40">
      <h2 className="text-2xl font-bold text-[#334EAC] mb-6 text-center">Edit Patient</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <InputField id="name" name="name" value={patient.name || ''} onChange={handleChange} required icon={FaUser} label="Full Name" />
        <InputField id="dob" name="dob" type="date" value={patient.dob || ''} onChange={handleChange} icon={FaCalendarAlt} label="Date of Birth" />
        <InputField id="age" name="age" type="number" value={patient.age || ''} onChange={handleChange} icon={FaCalendarAlt} label="Age" />
        <SelectField id="gender" name="gender" value={patient.gender || ''} onChange={handleChange} required icon={FaVenusMars} label="Gender" options={genderOptions} />
        <InputField id="phone" name="phone" type="tel" value={patient.phone || ''} onChange={handleChange} icon={FaPhone} label="Phone Number" />
        <InputField id="email" name="email" type="email" value={patient.email || ''} onChange={handleChange} icon={FaEnvelope} label="Email Address" />
        <InputField id="address" name="address" type="textarea" value={patient.address || ''} onChange={handleChange} icon={FaMapMarkerAlt} label="Address" />

        <h3 className="col-span-full text-[#334EAC] font-bold uppercase text-sm border-b pb-1 pt-4">Emergency Contact</h3>
        <InputField id="emergencycontactname" name="emergencycontactname" value={patient.emergencycontactname || ''} onChange={handleChange} icon={FaUserShield} label="Contact Name" />
        <InputField id="emergencycontactrelation" name="emergencycontactrelation" value={patient.emergencycontactrelation || ''} onChange={handleChange} icon={FaUser} label="Relation" />
        <InputField id="emergencycontactphone" name="emergencycontactphone" value={patient.emergencycontactphone || ''} onChange={handleChange} icon={FaPhone} label="Contact Phone" />

        <h3 className="col-span-full text-[#334EAC] font-bold uppercase text-sm border-b pb-1 pt-4">Medical Details</h3>
        <SelectField id="bloodgroup" name="bloodgroup" value={patient.bloodgroup || ''} onChange={handleChange} icon={FaSyringe} label="Blood Group" options={bloodGroupOptions} />
        <InputField id="allergies" name="allergies" type="textarea" value={patient.allergies || ''} onChange={handleChange} icon={FaNotesMedical} label="Allergies" />
        <InputField id="conditions" name="conditions" type="textarea" value={patient.conditions || ''} onChange={handleChange} icon={FaProcedures} label="Medical Conditions" />

        <div className="col-span-full flex gap-4 justify-end">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="px-4 py-2 border border-[#334EAC] text-[#334EAC] rounded-md hover:bg-[#F0F4FF] transition"
          >
            Discard Changes
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[rgb(37,99,235)] hover:bg-[#2A3F8D] text-white rounded-md flex items-center gap-2"
          >
            <FaSave />
            Update Changes
          </button>
        </div>
      </form>

    </div>
  );
};

export default EditPatientForm;
