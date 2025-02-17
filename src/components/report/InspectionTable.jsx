import React, { useState, useEffect } from 'react';

// filepath: /c:/Users/ayesh/Full Stack/generator-app/src/components/report/InspectionTable.jsx
const INSPECTION_PARAM = [
  { title: "Fuel Lines for Leakages", key: "ch_Fuellines_for_leakages" },
  { title: "Over/Low Voltage Safety", key: "ch_Over_low_volt_safty" },
  { title: "Abnormal Sound", key: "ch_abnormal_sound" },
  { title: "Air Filter", key: "ch_air_filter" },
  { title: "Air Cleaner Accessories", key: "ch_aircleaner_accessories" },
  { title: "All Fuel Pipes Connections", key: "ch_all_fuel_pipes_concts" },
  { title: "Coolant Pipes Hoses", key: "ch_cooland_pipes_hoses" },
  { title: "Description", key: "ch_desc" },
  { title: "Drive Belt", key: "ch_drive_belt" },
  { title: "Fan Belt", key: "ch_fan_belt" },
  { title: "Fuel Filter", key: "ch_fuel_filter" },
  { title: "High Temperature Safety", key: "ch_high_temp_safty" },
  { title: "Low Oil Pressure Safety", key: "ch_low_oil_pressuere_safty" },
  { title: "Oil for Leakages", key: "ch_oil_for_leakages" },
  { title: "Stop Solenoid Safety", key: "ch_stop_solenoid_safty" },
  { title: "Check DSEWebNet", key: "check_dsewebnet" },
  { title: "Check Road", key: "check_road" },
  { title: "AC Alternator or Bearing", key: "chk_ac_alt_or_bearing" },
  { title: "Engine Control Module Condition", key: "enginecontrol_module_cond" },
  { title: "Under/Overload Safety", key: "gen_under_overload_safty" },
  // Add more inspection parameters as needed
];

const InspectionTable = ({ report, isExportPdf }) => {
  const [inspectionParams, setInspectionParams] = useState([]);

  useEffect(() => {
    const initialParams = INSPECTION_PARAM.map(param => ({
      ...param,
      status: report[param.key] || ""
    }));
    setInspectionParams(initialParams);
  }, [report]);

  const [customComments, setCustomComments] = useState({});

  const handleStatusChange = (index, newStatus) => {
    setInspectionParams(prevParams =>
      prevParams.map((item, idx) =>
        idx === index ? { ...item, status: newStatus } : item
      )
    );

    if (newStatus !== "Other") {
      setCustomComments((prevComments) => {
        const newComments = { ...prevComments };
        delete newComments[index];
        return newComments;
      });
    }
  };

  return (
    <table className="w-full border-collapse border border-gray-400 text-sm mb-4">
      <tbody>
        {inspectionParams.map((item, idx) => (
          <tr key={idx}>
            <td className="border border-gray-400 p-1">{item.title}:</td>
            <td className="border border-gray-400 p-1">
              {isExportPdf ? (
                <span className='text-sm'>{item.status}</span>
              ) : (
                <select
                  value={item.status}
                  onChange={(e) => handleStatusChange(idx, e.target.value)}
                  className="focus:border focus:border-gray-300 rounded px-1 text-sm w-full"
                >
                  <option value="Good">Good</option>
                  <option value="Bad">Bad</option>
                  <option value="Satisfactory">Satisfactory</option>
                  <option value="Need Replacement">Need replacement</option>
                  <option value="Faulty">Faulty</option>
                  <option value="Requested but not recieved">Requested but not recieved</option>
                  <option value="Replaced today">Replaced today</option>
                  <option value="Not checked">Not checked</option>
                  <option value="Other">Other</option>
                </select>
              )}
              {item.status === "Other" && !isExportPdf && (
                <input
                  type="text"
                  value={customComments[idx] || ""}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCustomComments((prevComments) => ({
                      ...prevComments,
                      [idx]: value
                    }));
                    handleStatusChange(idx, "Other");
                  }}
                  className="focus:border focus:border-gray-300 rounded px-1 text-sm w-full mt-1"
                  placeholder="Enter custom comment"
                />
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InspectionTable;