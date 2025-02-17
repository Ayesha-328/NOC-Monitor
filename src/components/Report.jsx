import React, { useState, useRef, useEffect } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { IoMdDownload } from "react-icons/io";
import { getReportsData, getTechnicians, getInspectors } from '../api';
import ReportHeader from './report/ReportHeader';
import ReportFooter from './report/ReportFooter';
import InspectionTable from './report/InspectionTable';
import ReportDetails from './report/ReportDetails';
import ReportImages from './report/ReportImages';
import { Callout } from '@radix-ui/themes';
import { FaTriangleExclamation} from "react-icons/fa6";
import { FaSave } from "react-icons/fa";

const Report = ({ type, sites }) => {
  const [reportsData, setReportsData] = useState([]);
  const [reportId, setReportId] = useState(null);
  const [technicians, setTechnicians] = useState([]);
  const [inspectors, setInspectors] = useState([]);
  const [isManualChange, setIsManualChange] = useState(false);
  const [reportExists, setReportExists] = useState(true); // State to track if report exists
  const technicianOptions = technicians?.map(tech => tech.T_NM);
  const inspectorOptions = inspectors?.map(tech => tech.T_NM);
  const filteredReportData = reportsData.filter((report) => report.id === reportId);

  useEffect(() => {
    if (reportsData.length > 0 && !isManualChange) {
      const latestReportId = reportsData[reportsData.length - 1]?.id;
      setReportId(latestReportId);
    }
  }, [reportsData]);

  const printRef = useRef(null);
  const [isExportPdf, setIsExportPdf] = useState(false);

  useEffect(() => {
    getReportsData().then((data) => {
      if (data) {
        setReportsData(data);
      }
    });
    getTechnicians().then(data => setTechnicians(data));
    getInspectors().then(data => setInspectors(data));
  }, []);

  useEffect(() => {
    // Check if the report exists
    setReportExists(filteredReportData.length > 0);
  }, [reportId, reportsData]);

  const handleDownloadPdf = async () => {
    setIsExportPdf(true);
    await new Promise((resolve) => setTimeout(resolve, 100));
    const element = printRef.current;
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        useCORS: true,
        allowTaint: true,
      });

      const data = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4",
      });
      const imgProperties = pdf.getImageProperties(data);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProperties.height * pdfWidth) / imgProperties.width;
      pdf.addImage(data, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("examplepdf.pdf");
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setIsExportPdf(false);
    }
  };

  const siteOptions = sites?.map((site) => site.siteID);

  return (
    <div className="flex flex-col overflow-hidden items-center w-full p-2 bg-gradient">
      {!reportExists && (
        <Callout.Root color="gray" role="alert" variant='outline' highContrast>
        <Callout.Icon>
        <FaTriangleExclamation />
        </Callout.Icon>
        <Callout.Text>
          Report does not exsits. Fill the form to create a new report.
        </Callout.Text>
      </Callout.Root>
      )}

      {reportExists ? (
        <button
        onClick={handleDownloadPdf}
        className='btn self-end h-8'
      >
        <IoMdDownload />
        Export PDF
      </button>
      ) : (
      <button
        onClick={handleDownloadPdf}
        className='btn self-end h-8 !bg-green-600 cursor-pointer'
      >
        <FaSave />
        Save
      </button>
      )}
      

      <div style={{ overflowX: 'auto', maxWidth: '100%' }}>
        <div style={{ minWidth: '600px' }}>
          <div ref={printRef} className="w-a4 h-auto mx-auto p-4 border mt-3 mb-10 border-gray-300 bg-white text-sm font-sans">
            <ReportHeader
              type={type}
              report={filteredReportData[0]}
              setReportId={(id) => {
                setReportId(id);
                setIsManualChange(true);
              }}
              isExportPdf={isExportPdf}
            />

            <ReportDetails
              report={filteredReportData[0] || {}}
              isExportPdf={isExportPdf}
              siteOptions={siteOptions}
              sites={sites}
              technicianOptions={technicianOptions}
            />

            <InspectionTable
              report={filteredReportData[0] || {}}
              isExportPdf={isExportPdf}
            />

            <ReportImages
              report={filteredReportData[0] || {}}
            />

            <ReportFooter
              report={filteredReportData[0] || {}}
              isExportPdf={isExportPdf}
              technicianOptions={inspectorOptions}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Report;