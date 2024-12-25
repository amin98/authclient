/* eslint-disable react/prop-types */

const InputField = ({ type, name, placeholder, value, onChange }) => {
  return (
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded focus:outline-none focus:ring-1 focus:ring-blue-900 "
    />
  );
};

export default InputField;