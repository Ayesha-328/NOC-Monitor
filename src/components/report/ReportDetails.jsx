import { useState , useEffect} from 'react';
import RenderInput from './RenderInput';
import RenderInputWithUnit from './RenderInputWithUnit';


const ReportDetails = ({ report, siteOptions, isExportPdf, sites ,technicianOptions}) =>{
    const gOptions = ["01", "02", "03", "04"];
    const [techOptions, setTechOptions] = useState([]);
    console.log(report);

    useEffect(() => {
      setTechOptions(technicianOptions);
    }, [technicianOptions]);
   

   
    const [formData, setFormData] = useState({
        g: "",
        project: "",
        location: "",
        genset: "",
        brand: "",
        power: report.engineload_kw_kva || "",
        capacity: report.engineload_kw_kva || "",
        temp: report.engine_temp,
        voltagePhN: report.engine_volts_ph_n,
        batteryStandby: report.enginebattery_volts_stop,
        technician: "",
        technicianId: report.t_nm,
        siteId: sites[0]?.siteID,
        site1: "",
        engine: "",
        alternatorBrand: "",
        oilPressure: "",
        frequencyLoad: report.engine_freq_load,
        batteryRunning: report.enginebattery_volts_start,
        altSr: "",
        engineSr: "",
        module: "",
        runningHrs: report.engine_rh,
        voltagePhPh: report.engine_volts_ph_ph,
        frequencyNoLoad: report.engine_freq_noload,
        gensetLoad: "",
        inspectedBy: "",
        approvalStatus: ""
      });

      useEffect(() => {
        setFormData((prev) => ({
          ...prev,
          power: report.engineload_kw_kva || "",
          capacity: report.engineload_kw_kva || "",
          temp: report.engine_temp || "",
          voltagePhN: report.engine_volts_ph_n || "",
          batteryStandby: report.enginebattery_volts_stop || "",
          technicianId: report.t_nm || "",
          frequencyLoad: report.engine_freq_load || "",
          batteryRunning: report.enginebattery_volts_start || "",
          runningHrs: report.engine_rh || "",
          voltagePhPh: report.engine_volts_ph_ph || "",
          frequencyNoLoad: report.engine_freq_noload || "",
        }));
      }, [report]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

    return  (
        <div className="grid grid-cols-3 gap-4 mb-4">
          <div>
            <RenderInput label="Site" name="siteId" value={formData.siteId} options={siteOptions} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInput label="Genset" name="genset" value={formData.genset} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInput label="Brand" name="brand" value={formData.brand} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Power" name="power" value={formData.power} unit="KVA" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Capacity" name="capacity" value={formData.capacity} unit="KVA" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Temp" name="temp" value={formData.temp} unit="°C" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Voltage(PH/N)" name="voltagePhN" value={formData.voltagePhN} unit="Volts" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Battery at Standby" name="batteryStandby" value={formData.batteryStandby} unit="Volts" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
          </div>
          <div>
            <RenderInput label="Technician" name="technician" value={formData.technician} options={techOptions} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInput label="Site" name="site1" value={formData.site1} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInput label="Alt. Sr#" name="altSr" value={formData.altSr} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInput label="Engine" name="engine" value={formData.engine} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Alternator Brand" name="alternatorBrand" value={formData.alternatorBrand} unit="" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Oil Pressure" name="oilPressure" value={formData.oilPressure} unit="Bar" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Frequency with load" name="frequencyLoad" value={formData.frequencyLoad} unit="Hz" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Battery at Running" name="batteryRunning" value={formData.batteryRunning} unit="Volts" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
          </div>
          <div>
            <RenderInput label="G" name="g" value={formData.g} options={gOptions} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInput label="Technician" name="technicianId" value={formData.technicianId} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInput label="Engine S#" name="engineSr" value={formData.engineSr} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInput label="Module #" name="module" value={formData.module} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInput label="Running Hrs" name="runningHrs" value={formData.runningHrs} handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Voltage(Ph-Ph)" name="voltagePhPh" value={formData.voltagePhPh} unit="Volts" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Frequency without load" name="frequencyNoLoad" value={formData.frequencyNoLoad} unit="Hz" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
            <RenderInputWithUnit label="Genset Load" name="gensetLoad" value={formData.gensetLoad} unit="KW/KVA" handleInputChange={handleInputChange} isExportPdf={isExportPdf} />
          </div>
        </div>
      );
} 
   

export default ReportDetails;