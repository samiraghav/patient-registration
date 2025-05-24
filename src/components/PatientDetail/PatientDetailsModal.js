import { useEffect } from 'react';
import { FaTimes } from 'react-icons/fa';
import { calculateAge } from '../../helpers/formHelpers';

const LabelValue = ({ label, value, className = '' }) => (
  <div className={`flex flex-col text-left ${className}`}>
    <span className="text-gray-500 text-[13px] tracking-wide uppercase font-semibold">
      {label}
    </span>
    <span className="text-gray-800 text-[15px] font-medium">
      {value || value === 0 ? value : 'Not provided'}
    </span>
  </div>
);

const SectionTitle = ({ children }) => (
  <h3 className="text-base font-bold text-[#2563EB] border-b border-gray-200 pb-1 mb-1 uppercase tracking-wide">
    {children}
  </h3>
);

const PatientDetailsModal = ({ patient, onClose }) => {
  const age = calculateAge(patient.dob);
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60 backdrop-blur-md">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl p-6 md:p-8 relative overflow-y-auto max-h-[75vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <FaTimes size={20} />
        </button>

        <div className="space-y-4">
          <div>
            <SectionTitle>Primary Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <LabelValue label="Full Name" value={patient.name} />
              <LabelValue label="Date of Birth" value={patient.dob} />
              <LabelValue label="Age" value={age} />
              <LabelValue label="Gender" value={patient.gender} />
              <LabelValue label="Phone Number" value={patient.phone} />
              <LabelValue label="Email" value={patient.email} />
              <LabelValue label="Address" value={patient.address} className="md:col-span-2" />
            </div>
          </div>

          <div>
            <SectionTitle>Emergency Contact</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <LabelValue label="Contact Name" value={patient.emergencycontactname} />
              <LabelValue label="Relation" value={patient.emergencycontactrelation} />
              <LabelValue label="Contact Phone" value={patient.emergencycontactphone} />
            </div>
          </div>

          <div>
            <SectionTitle>Medical Details</SectionTitle>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <LabelValue label="Blood Group" value={patient.bloodgroup} />
              <LabelValue label="Allergies" value={patient.allergies} />
              <LabelValue label="Medical Conditions" value={patient.conditions} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
