import { useState, useEffect } from 'react';
import RenderInput from './RenderInput';

const ReportFooter = ({ report, isExportPdf , technicianOptions}) => {
  const [formData, setFormData] = useState({
    inspectedBy: report.inspected_by || "",
    approvalStatus: report.approvalStatus || ""
  })
  const [techOptions, setTechOptions] = useState([]);
  const approvalStatusOptions = ["Not approved", "Approved",  "Need Correction", "Pending", "Other"];
  
      useEffect(() => {
        setFormData((prev) => ({
          ...prev,
          inspectedBy: report.inspected_by || "",
        }));
        setTechOptions(technicianOptions);
      }, [technicianOptions,report]);

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };

  return (
    <div className="flex justify-between items-center mt-4 border-t pt-2">
      <RenderInput label="Inspected by" name="inspectedBy"  value={formData.inspectedBy} handleInputChange={handleInputChange}  options={techOptions} isExportPdf={isExportPdf} />
      <RenderInput label="Approval Status" name="approvalStatus" value={formData.approvalStatus}  handleInputChange={handleInputChange}  options={approvalStatusOptions} isExportPdf={isExportPdf} />
      <p className="text-xs">7:47 PM</p>
    </div>
  );
}

export default ReportFooter;