import React from 'react';

const RenderInputWithUnit = ({ label, name, value, unit, handleInputChange, isExportPdf }) => (
  <p>
    <span className="font-bold">{label}:</span>{" "}
    {isExportPdf
      ? (<span className='text-sm'>{value}</span>)
      : (
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          className="focus:border-gray-300 focus:border py-0 rounded px-1 text-sm max-w-12"
        />
      )
    }
    {unit && <span className="ml-1 text-gray-500">{unit}</span>}
  </p>
);

export default RenderInputWithUnit;