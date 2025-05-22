import React, { useState } from 'react';
import {
  FaUser, FaCalendarAlt, FaVenusMars, FaMapMarkerAlt, FaPhone, FaEnvelope,
  FaSave, FaSyringe, FaProcedures, FaNotesMedical, FaUserShield
} from 'react-icons/fa';

const InputField = ({ id, name, type = "text", value, onChange, placeholder, required, icon: Icon, label }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-[#081F5C] flex items-center gap-1">
        <Icon className="text-[#334EAC]" />
        {label}
      </label>
      {type === "textarea" ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          rows={2}
          className="px-3 py-2 border border-[#BAD6EB]/40 rounded-md shadow-sm focus:ring-2 focus:ring-[#334EAC]/30 focus:border-[#334EAC]"
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          required={required}
          className="px-3 py-2 border border-[#BAD6EB]/40 rounded-md shadow-sm focus:ring-2 focus:ring-[#334EAC]/30 focus:border-[#334EAC]"
        />
      )}
    </div>
  );
};

const SelectField = ({ id, name, value, onChange, required, icon: Icon, label, options }) => {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-sm font-medium text-[#081F5C] flex items-center gap-1">
        <Icon className="text-[#334EAC]" />
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="px-3 py-2 border border-[#BAD6EB]/40 rounded-md shadow-sm focus:ring-2 focus:ring-[#334EAC]/30 focus:border-[#334EAC]"
      >
        {options.map(option => (
          <option key={option.value} value={option.value} disabled={option.disabled}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

const PatientForm = ({ onAddPatient }) => {
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
      const birthDate = new Date(value);
      const today = new Date();
      const calculatedAge = today.getFullYear() - birthDate.getFullYear();
      const monthDiff = today.getMonth() - birthDate.getMonth();
      const dayDiff = today.getDate() - birthDate.getDate();
      const finalAge = (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) ? calculatedAge - 1 : calculatedAge;

      setPatient((prev) => ({
        ...prev,
        dob: value,
        age: isNaN(finalAge) ? '' : finalAge.toString()
      }));
    } else {
      setPatient({ ...patient, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Trim all values before saving
    const cleanedPatient = Object.fromEntries(
        Object.entries(patient).map(([key, val]) => [key, val?.trim() || null])
    );

    await onAddPatient(cleanedPatient);

    setPatient({
        name: '',
        dob: '',
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
    };

  const genderOptions = [
    { value: "", label: "Select gender", disabled: true },
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const bloodgroupOptions = [
    { value: "", label: "Select blood group", disabled: true },
    { value: "A+", label: "A+" },
    { value: "A-", label: "A-" },
    { value: "B+", label: "B+" },
    { value: "B-", label: "B-" },
    { value: "AB+", label: "AB+" },
    { value: "AB-", label: "AB-" },
    { value: "O+", label: "O+" },
    { value: "O-", label: "O-" },
  ];

  return (
    <div className="bg-white p-2 rounded-2xl">
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <h3 className="col-span-full text-[#334EAC] font-bold uppercase text-sm border-b pb-1">
          Personal Information
        </h3>

        <InputField id="name" name="name" value={patient.name} onChange={handleChange} placeholder="Enter full name" required icon={FaUser} label="Full Name" />
        <InputField id="dob" name="dob" type="date" value={patient.dob} onChange={handleChange} placeholder="Select DOB" icon={FaCalendarAlt} label="Date of Birth" />
        {!patient.dob && (
          <InputField
            id="age"
            name="age"
            type="number"
            value={patient.age}
            onChange={handleChange}
            placeholder="Enter age"
            required
            icon={FaCalendarAlt}
            label="Age"
          />
        )}
        {patient.dob && (
          <InputField
            id="age"
            name="age"
            type="number"
            value={patient.age}
            onChange={() => {}}
            icon={FaCalendarAlt}
            label="Age"
          />
        )}
        <SelectField id="gender" name="gender" value={patient.gender} onChange={handleChange} required icon={FaVenusMars} label="Gender" options={genderOptions} />
        <InputField id="phone" name="phone" type="tel" value={patient.phone} onChange={handleChange} placeholder="Enter phone number" required icon={FaPhone} label="Phone Number" />
        <InputField id="email" name="email" type="email" value={patient.email} onChange={handleChange} placeholder="Enter email address" required icon={FaEnvelope} label="Email Address" />
        <InputField id="address" name="address" type="textarea" value={patient.address} onChange={handleChange} placeholder="Enter address" required icon={FaMapMarkerAlt} label="Address" />

        <h3 className="col-span-full text-[#334EAC] font-bold uppercase text-sm border-b pb-1 pt-4">
          Emergency Contact
        </h3>

        <InputField id="emergencycontactname" name="emergencycontactname" value={patient.emergencycontactname} onChange={handleChange} placeholder="Name of emergency contact" icon={FaUserShield} label="Contact Name" />
        <InputField id="emergencycontactrelation" name="emergencycontactrelation" value={patient.emergencycontactrelation} onChange={handleChange} placeholder="Relationship" icon={FaUser} label="Relation" />
        <InputField id="emergencycontactphone" name="emergencycontactphone" type="tel" value={patient.emergencycontactphone} onChange={handleChange} placeholder="Phone number" icon={FaPhone} label="Contact Phone" />

        <h3 className="col-span-full text-[#334EAC] font-bold uppercase text-sm border-b pb-1 pt-4">
          Medical Details
        </h3>

        <SelectField id="bloodgroup" name="bloodgroup" value={patient.bloodgroup} onChange={handleChange} required icon={FaSyringe} label="Blood Group" options={bloodgroupOptions} />
        <InputField id="allergies" name="allergies" type="textarea" value={patient.allergies} onChange={handleChange} placeholder="List known allergies" required icon={FaNotesMedical} label="Allergies" />
        <InputField id="conditions" name="conditions" type="textarea" value={patient.conditions} onChange={handleChange} placeholder="Any existing conditions" required icon={FaProcedures} label="Medical Conditions" />

        <div className="col-span-full">
          <button
            type="submit"
            className="w-full py-2 bg-[rgb(37,99,235)] hover:from-[#2A3F8D] hover:to-[#5C7AB0] text-white font-medium text-sm rounded-md flex items-center justify-center gap-2"
          >
            <FaSave />
            Register Patient
          </button>
        </div>
      </form>
    </div>
  );
};

export default PatientForm;
