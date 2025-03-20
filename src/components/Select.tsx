interface SelectProps {
  placeholder?: string;
  label?: string;
  value: string;
  options: string[];
  onChange: (searchTerm: string) => void;
}

const Select = ({
  placeholder,
  label,
  value,
  options,
  onChange,
}: SelectProps) => {
  return (
    <div className="space-x-2">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      <select onChange={(e) => onChange(e.target.value)} value={value}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
