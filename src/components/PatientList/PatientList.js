import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaTrash, FaEye } from 'react-icons/fa';
import { deletePatient } from '../../services/databaseService';
import { useSnackbar } from 'notistack';
import PatientDetailsModal from '../PatientDetail/PatientDetailsModal';

const calculateAge = (dobString) => {
  if (!dobString) return '';
  const dob = new Date(dobString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const hasHadBirthdayThisYear =
    today.getMonth() > dob.getMonth() ||
    (today.getMonth() === dob.getMonth() && today.getDate() >= dob.getDate());
  if (!hasHadBirthdayThisYear) age--;
  return age;
};

const PatientCard = ({ patient, index, onDelete, onOpenModal }) => {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const age = calculateAge(patient.dob);

  const handleDelete = () => {
    const action = (snackbarId) => (
      <div className="flex gap-2">
        <button
          className="text-red-500 font-semibold text-sm"
          onClick={async () => {
            await deletePatient(patient.id);
            enqueueSnackbar('Patient deleted successfully!', { variant: 'success', autoHideDuration: 3000, });
            if (onDelete) onDelete();
            closeSnackbar(snackbarId);
          }}
        >
          Confirm
        </button>
        <button
          className="text-blue-500 font-semibold text-sm"
          onClick={() => closeSnackbar(snackbarId)}
        >
          Cancel
        </button>
      </div>
    );

    enqueueSnackbar(`Delete "${patient.name}"?`, {
      variant: 'warning',
      action,
      persist: true,
      autoHideDuration: 3000,
    });
  };

  return (
    <div
      className="relative bg-white border border-[#BAD6EB]/30 rounded-xl shadow-sm p-4 flex items-center justify-between"
      style={{
        animationName: 'fadeInUp',
        animationDuration: '0.5s',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'forwards',
        animationDelay: `${index * 50}ms`,
      }}
    >
      <div className="flex items-center gap-2">
        <div className="hidden md:flex w-12 h-12 rounded-full bg-[rgb(37,99,235)] text-white items-center justify-center shadow">
          <FaUserCircle size={28} />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-[#081F5C] font-medium text-base">
            {patient.name.length > 20 ? patient.name.slice(0, 20) + '...' : patient.name}
          </span>
          <span className="text-sm text-[#7096D1]">
            {patient.gender} {age ? `• ${age} yrs` : ''}
          </span>
        </div>
      </div>

      <div className="flex gap-4 items-center">
        <button
          className="text-[#334EAC] hover:text-[#2a3f8d]"
          onClick={() => onOpenModal(patient)}
          title="View Details"
        >
          <FaEye size={18} />
        </button>
        <button
          className="text-[#334EAC] hover:text-[#2a3f8d]"
          onClick={() => navigate(`/edit/${patient.id}`)}
          title="Edit Patient"
        >
          <FaEdit size={18} />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
          title="Delete Patient"
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

const PatientList = ({ patients, onDelete }) => {
  const [sortBy, setSortBy] = useState('created_at');
  const [selectedPatient, setSelectedPatient] = useState(null);

  const sortedPatients = useMemo(() => {
    return [...patients].sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      if (sortBy === 'age') return calculateAge(b.dob) - calculateAge(a.dob);
      return new Date(b.created_at) - new Date(a.created_at);
    });
  }, [patients, sortBy]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end mb-2">
        <select
          className="text-sm border px-2 py-1 rounded-md text-[#081F5C] border-[#BAD6EB]/40"
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="created_at">Sort by: Created At</option>
          <option value="name">Sort by: Name</option>
          <option value="age">Sort by: Age</option>
        </select>
      </div>

      <div className="flex flex-col space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#BAD6EB]">
        {sortedPatients.length === 0 ? (
          <p className="text-sm text-[#7096D1] text-center">No patients found.</p>
        ) : (
          sortedPatients.map((patient, index) => (
            <PatientCard
              key={patient.id}
              patient={patient}
              index={index}
              onDelete={onDelete}
              onOpenModal={setSelectedPatient}
            />
          ))
        )}
      </div>

      {selectedPatient && (
        <PatientDetailsModal
          patient={selectedPatient}
          onClose={() => setSelectedPatient(null)}
        />
      )}
    </div>
  );
};

export default PatientList;
