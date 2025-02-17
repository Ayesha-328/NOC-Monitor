import { useState, useRef , useEffect} from 'react';
import logo from '../assets/report_logo.png'
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IoMdDownload } from "react-icons/io";
import { getReportsData } from '../api';

const INSPECTION_PARAM = [{
  title: "Inspect Control Module",
  status: "Good"
}, {
  title: "Inspect AC-Alternator, Bearing Etc. Condition",
  status: "Satisfactory"
},
{
  title: "Engine Sound looks",
  status: "Satisfactory"
},
{
  title: "Inspect Coolant water, Hoses for leaks",
  status: "Satisfactory"
},
{
  title: "Inspect Fuel lines, connections",
  status: "Satisfactory"
},
{
  title: "Inspect Air cleaner, Inlet pipes, cover, clamps",
  status: "Satisfactory"
},
{
  title: "Drive belt conditions and tightness",
  status: "Satisfactory"
},
{
  title: "Fan belt inspection for worn/tensions",
  status: "Satisfactory"
},
{
  title: "Check Engine oil condition/leaks",
  status: "Satisfactory"
},
{
  title: "Check Air Fiter condition",
  status: "Satisfactory"
},
{
  title: "Check fuel filter condition",
  status: "Satisfactory"
},
{
  title: "Check High temperature safety",
  status: "Satisfactory"
},
{
  title: "Check Low oil pressure safety",
  status: "Satisfactory"
},
{
  title: "Check Over/Under Voltage Safety",
  status: "Satisfactory"
},
{
  title: "Check Fuel Stop Solenoid",
  status: "Satisfactory"
},
{
  title: "Check if Generator is underload/Overload",
  status: "Satisfactory"
},
{
  title: "Check Site Access (Road or Permit etc)",
  status: "Satisfactory"
},
{
  title: "Check WebNet Device and Signal",
  status: "Satisfactory"
},
{
  title: "Description (Issues not listed here)",
  status: "Satisfactory"
}
]

const Report = ({ type , sites}) => {
  const [reportsData, setReportsData] = useState([]);
  const [reportId, setReportId] = useState(null);

  useEffect(() => {
    if (reportsData.length > 0) {
      const latestReportId = reportsData[reportsData.length - 1]?.id;
      setFormData((prev) => ({
        ...prev,
        reportId: latestReportId,
      }));
      setReportId(latestReportId);
    }
  }, [reportsData]);

  const filteredReportData = reportsData.filter((report) => report.id === reportId);
  console.log(filteredReportData[0]);

  const [formData, setFormData] = useState({
    reportId: reportId,
    g: "",
    project: "SAR",
    location: "Southern",
    genset: "01",
    brand: "Perkins",
    power: "30",
    capacity: "30",
    temp: "",
    voltagePhN: filteredReportData[0]?.engine_volts_ph_n,
    batteryStandby: "",
    technician: "Syed Taha",
    technician2: "",
    siteId: sites[0]?.siteID,
    site1: "234",
    engine: "Perkins",
    alternatorBrand: "5263",
    oilPressure: "25",
    frequencyLoad: filteredReportData[0]?.engine_freq_load,
    batteryRunning: "",
    altSr: "123456",
    engineSr: "123456",
    module: "7230",
    runningHrs: "Engine R.hrs",
    voltagePhPh: "230",
    frequencyNoLoad: "",
    gensetLoad: "62",
    inspectedBy: "Syed Taha",
    approvalStatus: "approved"
  });
  const [inspectionParams, setInspectionParams] = useState(INSPECTION_PARAM);
  const printRef = useRef(null);
  const [isExportPdf, setIsExportPdf] = useState(false);
 

  

  
  useEffect(() => {
    getReportsData().then((data) => {
      if (data){
        setReportsData(data)
      }
  })}, [formData.reportId]);

  // in order to fit the report to the screen size
  // useEffect(() => {
  //   const handleResize = () => {
  //     const reportElement = printRef.current;
  //     if (reportElement) {
  //       const scale = Math.min(window.innerWidth / reportElement.offsetWidth, 1);
  //       reportElement.style.transform = `scale(${scale})`;
  //       reportElement.style.transformOrigin = 'top left';
  //     }
  //   };

  //   window.addEventListener('resize', handleResize);
  //   handleResize();

  //   return () => {
  //     window.removeEventListener('resize', handleResize);
  //   };
  // }, []);

  const handleStatusChange = (index, newStatus) => {
    setInspectionParams((prevParams) =>
      prevParams.map((item, idx) =>
        idx === index ? { ...item, status: newStatus } : item
      )
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDownloadPdf = async () => {
    setIsExportPdf(true);

    // Wait for React to render the updated state
    await new Promise((resolve) => setTimeout(resolve, 100)); // Add a short delay

    const element = printRef.current;
    if (!element) return;

    try {
      // Generate the canvas
      const canvas = await html2canvas(element);
      const data = canvas.toDataURL("image/png");

      // Create the PDF
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });

      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;

      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);

      // Save the PDF
      pdf.save("examplepdf.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      // Reset the state after the PDF is generated
      setIsExportPdf(false);
    }
  };



  Date.prototype.today = function () {
    return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
  }
  Date.prototype.timeNow = function () {
    return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes();
  }
  var newDate = new Date();

  const renderInputWithUnit = (label, name, value, unit = "") => (
    <p>
      <span className="font-bold">{label}:</span>{" "}
      {isExportPdf
        ?
        (<span className='text-sm'>{value}</span>)
        :
        (<input
          type="text"
          name={name}
          value={value}
          onChange={handleInputChange}
          className="focus:border-gray-300 focus:border py-0 rounded px-1 text-sm max-w-12"
        />)
      }

      {unit && <span className="ml-1 text-gray-500">{unit}</span>}
    </p>
  );

  const renderInput = (label, name, value, options = null) => (
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
  );

  const siteOptions = sites?.map((site) => site.siteID);
  const technicianOptions = ["Syed Taha", "Ali Khan", "John Doe"];
  const gOptions = ["01", "02", "03", "04"];
  
  return (
    <div className="flex flex-col overflow-hidden items-center w-full p-2 bg-gradient">
      <button
        onClick={handleDownloadPdf}
        className='btn self-end h-8'
      >
        <IoMdDownload />
        Export PDF
      </button>
      
      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
      <div style={{ minWidth: '600px' }}>
        {/* To put scroll bar for report to resize uncomment the two above lines */}
      <div ref={printRef} className="w-a4 h-auto mx-auto p-4 border mt-3 mb-10 border-gray-300 bg-white text-sm font-sans">
        {/* Header Section */}
        <div className="grid grid-cols-3 mx-3 justify-around items-center border-b pb-2 mb-4">
          <div>
            <img
              src={logo}
              alt="Logo"
              className="h-16"
            />
            {renderInput("Project", "project", formData.project)}
            {renderInput("Location", "location", formData.location)}
          </div>
          <div className="text-center">
            <h1 className="text-lg font-bold">{type} Detail Report</h1>
            <p className="text-xs">{newDate.today()}</p>
            <p className="text-xs">{newDate.timeNow()}</p>
          </div>
          <div className="text-right">
            {isExportPdf
              ?
              (<span className='text-sm'>{formData.reportId}</span>)
              :
              (
                <input type='number' className="underline font-bold text-sm text-right" name='reportId' onChange={handleInputChange} value={formData.reportId} />
              )}
            <p className="text-xs">{newDate.timeNow()}</p>
          </div>
        </div>

        {/* Technician Details */}
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            {renderInput("Site", "siteId", formData.siteId, siteOptions)}
            {renderInput("Genset", "genset", formData.genset)}
            {renderInput("Brand", "brand", formData.brand)}
            {renderInputWithUnit("Power", "power", formData.power, "KVA")}
            {renderInputWithUnit("Capacity", "capacity", formData.capacity, "KVA")}
            {renderInputWithUnit("Temp", "temp", formData.temp, "°C")}
            {renderInputWithUnit("Voltage(PH/N)", "voltagePhN", formData.voltagePhN, "Volts")}
            {renderInputWithUnit("Battery at Standby", "batteryStandby", formData.batteryStandby, "Volts")}
          </div>
          <div>
            {renderInput("Technician", "technician", formData.technician, technicianOptions)}
            {renderInput("Site", "site1", formData.site1)}
            {renderInput("Alt. Sr#", "altSr", formData.altSr)}
            {renderInput("Engine", "engine", formData.engine)}
            {renderInputWithUnit("Alternator Brand", "alternatorBrand", formData.alternatorBrand)}
            {renderInputWithUnit("Oil Pressure", "oilPressure", formData.oilPressure, "Bar")}
            {renderInputWithUnit("Frequency with load", "frequencyLoad", formData.frequencyLoad, "Hz")}
            {renderInputWithUnit("Battery at Running", "batteryRunning", formData.batteryRunning, "Volts")}
          </div>
          <div>
            {renderInput("G", "g", formData.g, gOptions)}
            {renderInput("Technician", "technician2", formData.technician2)}

            {renderInput("Engine S#", "engineSr", formData.engineSr)}
            {renderInput("Module #", "module", formData.module)}
            {renderInput("Running Hrs", "runningHrs", formData.runningHrs)}
            {renderInputWithUnit("Voltage(Ph-Ph)", "voltagePhPh", formData.voltagePhPh, "Volts")}
            {renderInputWithUnit("Frequency without load", "frequencyNoLoad", formData.frequencyNoLoad, "Hz")}
            {renderInputWithUnit("Genset Load", "gensetLoad", formData.gensetLoad, "KW/KVA")}
          </div>
        </div>

        {/* Inspection Table */}
        <table className="w-full border-collapse border border-gray-400 text-sm mb-4">
          <tbody>
            {inspectionParams.map((item, idx) => (
              <tr key={idx}>
                <td className="border border-gray-400 p-1">{item.title}:</td>
                <td className="border border-gray-400 p-1">
                  {isExportPdf
                    ?
                    (<span className='text-sm'>{item.status}</span>)
                    :
                    (
                      <input
                        type="text"
                        value={item.status}
                        onChange={(e) => handleStatusChange(idx, e.target.value)}
                        className="focus:border focus:border-gray-300 rounded px-1 text-sm w-full"
                      />
                    )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Images */}
        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div key={idx} className="w-1/6">
              <img
                src={`https://firebasestorage.googleapis.com/v0/b/rviewtutorial.appspot.com/o/mloads%2F12%2F5678%2F5678_12_9_8_20230.jpg?alt=media&token=a04fcb4a-5740-476a-8ca2-309bfa339fb0`}
                alt={`Screenshot ${idx}`}
                className="w-full border border-gray-300"
              />
            </div>
          ))}
        </div>

        {/* Footer Section */}
        <div className="flex justify-between items-center mt-4 border-t pt-2">
        {renderInput("Inspected by", "inspectedBy", formData.inspectedBy)}
        {renderInput("Approval Status", "approvalStatus", formData.approvalStatus)}
          <p className="text-xs">7:47 PM</p>
        </div>
      </div>
      </div>
     </div>
     </div>   
  )
}

export default Report