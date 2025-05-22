import { useNavigate } from 'react-router-dom';
import { FaUserCircle, FaEdit, FaTrash } from 'react-icons/fa';
import { deletePatient } from '../../services/databaseService';
import { useSnackbar } from 'notistack';

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

const PatientCard = ({ patient, index, onDelete }) => {
  const navigate = useNavigate();
  const age = calculateAge(patient.dob);

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDelete = () => {
    const action = (snackbarId) => (
      <div className="flex gap-2">
        <button
          className="text-red-500 font-semibold text-sm"
          onClick={async () => {
            await deletePatient(patient.id);
            enqueueSnackbar('Patient deleted successfully!', { variant: 'success' });
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
    });
  };

  return (
    <div
      className="relative bg-white border border-[#BAD6EB]/30 rounded-xl shadow-sm p-4 flex items-center justify-between"
      style={{
        animationDelay: `${index * 50}ms`,
        animation: 'fadeInUp 0.5s ease-out forwards',
      }}
    >
      <div className="flex items-center gap-4 cursor-pointer" onClick={() => navigate(`/patients/${patient.id}`)}>
        <div className="w-12 h-12 rounded-full bg-[rgb(37,99,235)] text-white flex items-center justify-center shadow">
          <FaUserCircle size={28} />
        </div>
        <div className="flex flex-col">
          <span className="text-[#081F5C] font-medium text-base">{patient.name}</span>
          <span className="text-sm text-[#7096D1]">
            {patient.gender} {age ? `• ${age} yrs` : ''}
          </span>
        </div>
      </div>

      <div className="flex gap-3">
        <button
          className="text-[#334EAC] hover:text-[#2a3f8d]"
          onClick={() => navigate(`/edit/${patient.id}`)}
        >
          <FaEdit size={18} />
        </button>
        <button
          className="text-red-500 hover:text-red-700"
          onClick={handleDelete}
        >
          <FaTrash size={18} />
        </button>
      </div>
    </div>
  );
};

const PatientList = ({ patients, onDelete }) => {
  return (
    <div className="flex flex-col space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#BAD6EB]">
      {patients.length === 0 ? (
        <p className="text-sm text-[#7096D1] text-center">No patients found.</p>
      ) : (
        patients.map((patient, index) => (
          <PatientCard key={patient.id} patient={patient} index={index} onDelete={onDelete} />
        ))
      )}
    </div>
  );
};

export default PatientList;
