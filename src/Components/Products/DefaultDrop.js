import React, { useState } from "react";

const DefaultDrop = ({ options, selectedOptions, updateSelectedOptions }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleOptionSelect = (option) => {
    const isSelected = selectedOptions.includes(option);

    updateSelectedOptions((prevSelectedOptions) =>
      isSelected
        ? prevSelectedOptions.filter((selected) => selected !== option)
        : [...prevSelectedOptions, option]
    );
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  const handleRemoveOption = (option) => {
    updateSelectedOptions((prevSelectedOptions) =>
      prevSelectedOptions.filter((selected) => selected !== option)
    );
  };

  return (
    <>
      <div className="my-9">
        <div className="relative w-full">
          <input
            type="text"
            className="w-full border p-2 rounded-md mb-2"
            placeholder="Select options"
            value={selectedOptions.join(", ") || ""}
            readOnly
            onClick={toggleDropdown}
          />
          <div
            className={`${
              isDropdownOpen ? "block" : "hidden"
            } origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5`}
          >
            <div className="py-1">
              {options.map((option) => (
                <div
                  key={option}
                  className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                >
                  <input
                    type="checkbox"
                    className="mr-2"
                    value={option}
                    checked={selectedOptions.includes(option)}
                    onChange={() => handleOptionSelect(option)}
                  />
                  <span>{option}</span>
                  {selectedOptions.includes(option) && (
                    <button
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleRemoveOption(option)}
                    >
                      &#10006;
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 11.586l3.293-3.293a1 1 0 011.414 0 1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </>
  );
};

export default DefaultDrop;
