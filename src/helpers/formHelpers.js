export const calculateAge = (dobString) => {
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

export const genderOptions = [
  { value: "", label: "Select gender", disabled: true },
  { value: "Male", label: "Male" },
  { value: "Female", label: "Female" },
  { value: "Other", label: "Other" },
];

export const bloodGroupOptions = [
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

export const InputField = ({ id, name, type = "text", value, onChange, placeholder, required, icon: Icon, label }) => (
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

export const SelectField = ({ id, name, value, onChange, required, icon: Icon, label, options }) => (
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
