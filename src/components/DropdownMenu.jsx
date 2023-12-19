import React, { useState } from "react";

/**
 * DropdownMenu is a React component that provides a dropdown menu with options.
 *
 * @component
 * @param {Array} options - An array of objects representing dropdown options.
 * @param {Function} onChange - A callback function invoked when the selected option changes.
 * @param {number} startingIndex - The index of the option to be pre-selected initially.
 * @returns {JSX.Element} JSX element representing the dropdown menu.
 *
 */
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
