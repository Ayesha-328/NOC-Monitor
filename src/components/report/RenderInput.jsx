import React from 'react'

const RenderInput = ({label, name, value, handleInputChange, options = null, isExportPdf=false}) => {
  return (
    <p>
    <span className="font-bold">{label}:</span>{" "}
    {options ? (
      isExportPdf
        ?
        (<span className='text-sm'>{value}</span>)
        :
        (
          <select
            name={name}
            value={value}
            onChange={handleInputChange}
            className="focus:border-gray-300 focus:border py-0 rounded px-1 text-sm max-w-32"
          >
            {options.map((option, idx) => (
              <option key={idx} value={option}>
                {option}
              </option>
            ))}
          </select>
        )
    ) : (
      isExportPdf
        ?
        (<span className='text-sm'>{value}</span>)
        :
        (
          <input
            type="text"
            name={name}
            value={value}
            onChange={handleInputChange}
            className="focus:border-gray-300 focus:border py-0 rounded px-1 text-sm max-w-32"
          />)
    )}
  </p>
  )
}

export default RenderInput