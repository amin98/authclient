import  { useState } from 'react';

// eslint-disable-next-line react/prop-types
const InputField = ({ type, name, placeholder, value, onChange, maxLength }) => {
  const [isMaxLengthReached, setIsMaxLengthReached] = useState(false);

  const handleChange = (e) => {
    if (e.target.value.length >= maxLength) {
      setIsMaxLengthReached(true);
    } else {
      setIsMaxLengthReached(false);
    }
    onChange(e);
  };

  return (
    <div className="relative flex flex-col">
      <div
        className={`text-sm absolute right-3 top-3 text-orange-500 transition-all duration-300 ease-in-out transform ${
          isMaxLengthReached ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
        }`}
      >
        Max {maxLength} characters allowed
      </div>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        maxLength={maxLength}
        className={`w-full p-2 border rounded focus:outline-none ${
          isMaxLengthReached ? 'border-orange-500' : 'focus:ring-1 focus:ring-blue-900'
        }`}
      />
    </div>
  );
};

export default InputField;