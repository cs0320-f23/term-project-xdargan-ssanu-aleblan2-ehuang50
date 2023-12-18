import React, { useState } from "react";

const DropdownMenu = ({ options, onChange, startingIndex }) => {
  const [selectedOption, setSelectedOption] = useState(
    options[startingIndex].value
  );

  const handleDropdownChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    onChange(selectedValue);
  };

  return (
    <select
      id="dropdown-menu"
      value={selectedOption}
      onChange={handleDropdownChange}
      style={{ backgroundColor: "#F0EDE2", color: "#637155" }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

export default DropdownMenu;
