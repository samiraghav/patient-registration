import { FaUserCircle } from 'react-icons/fa';

const PatientList = ({ patients }) => {
  return (
    <div className="flex flex-col space-y-4 max-h-[600px] overflow-y-auto scrollbar-thin scrollbar-thumb-[#BAD6EB]">
      {patients.length === 0 ? (
        <p className="text-sm text-[#7096D1] text-center mt-10">No patients found.</p>
      ) : (
        patients.map((patient, index) => (
          <div
            key={patient.id}
            className="bg-white border border-[#BAD6EB]/30 rounded-xl shadow-sm p-4 flex items-center gap-4"
            style={{
              animationDelay: `${index * 50}ms`,
              animation: 'fadeInUp 0.5s ease-out forwards',
            }}
          >
            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[rgb(37,99,235)] text-white flex items-center justify-center shadow">
              <FaUserCircle size={28} />
            </div>

            <div className="flex flex-col">
              <span className="text-[#081F5C] font-medium text-base">{patient.name}</span>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PatientList;
