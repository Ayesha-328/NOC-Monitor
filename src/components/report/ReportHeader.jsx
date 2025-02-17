import React, { useState } from 'react';
import RenderInput from './RenderInput';
import logo from '../../assets/report_logo.png';

const ReportHeader = ({report, setReportId, type, isExportPdf }) => {
  const [formData, setFormData] = useState({
    reportId: report?.id,
  })
  
    Date.prototype.today = function () {
        return ((this.getDate() < 10) ? "0" : "") + this.getDate() + "/" + (((this.getMonth() + 1) < 10) ? "0" : "") + (this.getMonth() + 1) + "/" + this.getFullYear();
      }
      Date.prototype.timeNow = function () {
        return ((this.getHours() < 10) ? "0" : "") + this.getHours() + ":" + ((this.getMinutes() < 10) ? "0" : "") + this.getMinutes();
      }
      var newDate = new Date();

 const handleReportIdChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({...prev, [name]: value}));
        console.log(value);
        setReportId(value);
 }

    return (
      <div className="grid grid-cols-3 mx-3 justify-around items-center border-b pb-2 mb-4">
        <div>
        <img src={logo} alt="Logo" className="h-16" />
        <RenderInput label="Project" name="project" value="SAR" isExportPdf={isExportPdf} />
        <RenderInput label="Location" name="location" value="East"  isExportPdf={isExportPdf} />
        </div>
        <div className="text-center">
        <h1 className="text-lg font-bold">{type} Detail Report</h1>
        <p className="text-xs">{newDate.today()}</p>
        <p className="text-xs">{newDate.timeNow()}</p>
        </div>
        <div className="text-right">
        {isExportPdf
          ? (<span className='text-sm'>{report?.id}</span>)
          : (
          <input 
          type='number' 
          className="underline font-bold text-sm text-right" 
          name='reportId' 
          onChange={handleReportIdChange}
          value={formData.reportId || report?.id} />
          )}
        <p className="text-xs">{newDate.timeNow()}</p>
        </div>
      </div>
      );
}
    

export default ReportHeader;