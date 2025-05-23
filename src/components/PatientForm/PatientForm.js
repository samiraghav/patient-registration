import React, { useState } from 'react';
import { InputField, SelectField, genderOptions, bloodGroupOptions, calculateAge } from '../../helpers/formHelpers';
import { useSnackbar } from 'notistack';
import { FaUser, FaCalendarAlt, FaVenusMars, FaPhone, FaEnvelope, FaMapMarkerAlt, FaUserShield, FaSyringe, FaNotesMedical, FaProcedures, FaSave} from "react-icons/fa";

const PatientForm = ({ onAddPatient }) => {
  const { enqueueSnackbar } = useSnackbar();

  const [patient, setPatient] = useState({
    name: '',
    dob: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    address: '',
    emergencycontactname: '',
    emergencycontactrelation: '',
    emergencycontactphone: '',
    bloodgroup: '',
    allergies: '',
    conditions: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "dob") {
      setPatient(prev => ({
        ...prev,
        dob: value,
        age: calculateAge(value)
      }));
    } else {
      setPatient(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cleaned = Object.fromEntries(
      Object.entries(patient).map(([k, v]) => [k, typeof v === 'string' ? v.trim() : v])
    );

    const enteredDate = new Date(cleaned.dob);
    const today = new Date();

    // Validate DOB is not in the future
    if (enteredDate > today) {
      enqueueSnackbar('Please enter a valid Date of Birth.', { variant: 'warning', autoHideDuration: 3000  });
      return;
    }

    try {
      await onAddPatient(cleaned);
      enqueueSnackbar('Patient registered successfully!', { variant: 'success', autoHideDuration: 3000 });
      setPatient({
        name: '',
        dob: '',
        age: '',
        gender: '',
        phone: '',
        email: '',
        address: '',
        emergencycontactname: '',
        emergencycontactrelation: '',
        emergencycontactphone: '',
        bloodgroup: '',
        allergies: '',
        conditions: ''
      });
    } catch (error) {
      enqueueSnackbar('Failed to register patient. Please try again.', { variant: 'error' });
      console.error('Registration error:', error);
    }
  };

  return (
    <div className="bg-white p-2 rounded-2xl">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <h3 className="col-span-full text-[#334EAC] font-bold uppercase text-sm border-b pb-1">
          Personal Information
        </h3>

        <InputField id="name" name="name" value={patient.name} onChange={handleChange} required icon={FaUser} label="Full Name" />
        <InputField id="dob" name="dob" type="date" value={patient.dob} onChange={handleChange} icon={FaCalendarAlt} label="Date of Birth" max={new Date().toISOString().split("T")[0]}/>
        <InputField id="age" name="age" type="number" value={patient.age} onChange={() => {}} icon={FaCalendarAlt} label="Age(Auto from Date of Birth)" />
        <SelectField id="gender" name="gender" value={patient.gender} onChange={handleChange} required icon={FaVenusMars} label="Gender" options={genderOptions} />
        <InputField id="phone" name="phone" type="tel" value={patient.phone} onChange={handleChange} required icon={FaPhone} label="Phone Number" />
        <InputField id="email" name="email" type="email" value={patient.email} onChange={handleChange} icon={FaEnvelope} label="Email Address" />
        <InputField id="address" name="address" type="textarea" value={patient.address} onChange={handleChange} required icon={FaMapMarkerAlt} label="Address" />

        <h3 className="col-span-full text-[#334EAC] font-bold uppercase text-sm border-b pb-1 pt-4">Emergency Contact</h3>
        <InputField id="emergencycontactname" name="emergencycontactname" value={patient.emergencycontactname} onChange={handleChange} icon={FaUserShield} label="Contact Name" />
        <InputField id="emergencycontactrelation" name="emergencycontactrelation" value={patient.emergencycontactrelation} onChange={handleChange} icon={FaUser} label="Relation" />
        <InputField id="emergencycontactphone" name="emergencycontactphone" value={patient.emergencycontactphone} onChange={handleChange} icon={FaPhone} label="Contact Phone" />

        <h3 className="col-span-full text-[#334EAC] font-bold uppercase text-sm border-b pb-1 pt-4">Medical Details</h3>
        <SelectField id="bloodgroup" name="bloodgroup" value={patient.bloodgroup} onChange={handleChange} required icon={FaSyringe} label="Blood Group" options={bloodGroupOptions} />
        <InputField id="allergies" name="allergies" type="textarea" value={patient.allergies} onChange={handleChange} icon={FaNotesMedical} label="Allergies" />
        <InputField id="conditions" name="conditions" type="textarea" value={patient.conditions} onChange={handleChange} required icon={FaProcedures} label="Medical Conditions" />

        <div className="col-span-full flex gap-4 justify-end">
          <button
            type="button"
            onClick={() =>
              setPatient({
                name: '',
                dob: '',
                age: '',
                gender: '',
                phone: '',
                email: '',
                address: '',
                emergencycontactname: '',
                emergencycontactrelation: '',
                emergencycontactphone: '',
                bloodgroup: '',
                allergies: '',
                conditions: ''
              })
            }
            className="px-4 py-2 border border-[#334EAC] text-[#334EAC] rounded-md hover:bg-[#F0F4FF] transition"
          >
            Discard
          </button>

          <button
            type="submit"
            className="px-4 py-2 bg-[rgb(37,99,235)] hover:bg-[#2A3F8D] text-white rounded-md flex items-center gap-2"
          >
            <FaSave />
            Register
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
