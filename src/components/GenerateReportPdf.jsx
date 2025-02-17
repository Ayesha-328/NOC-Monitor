import jsPDF from "jspdf";
import "jspdf-autotable";
import ReportLogo from '../assets/report_logo.png';

const GenerateReportPdf = ({formData, inspectionParams, type}) => {
  const doc = new jsPDF();

  // Add Logo
  const logo = new Image();
  logo.src = ReportLogo; // Replace with the path to your logo
  doc.addImage(logo, "PNG", 10, 10, 30, 30);

  // Report Title
  doc.setFontSize(16);
  doc.text(`${type} Detail Report`, 105, 20, null, null, "center");
  doc.setFontSize(13);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, 200, 30, null, null, "right");

  // Section: Technical Details

  // Prepare form data into 3 columns
  const formDataEntries = Object.entries(formData);
  const totalItems = formDataEntries.length;
  const columnCount = 3;
  const itemsPerColumn = Math.ceil(totalItems / columnCount);

  const columns = [
    formDataEntries.slice(0, itemsPerColumn),
    formDataEntries.slice(itemsPerColumn, itemsPerColumn * 2),
    formDataEntries.slice(itemsPerColumn * 2),
  ];

  const margin = 10;
  const columnWidth = (doc.internal.pageSize.width - 2 * margin) / columnCount;
  columns.forEach((column, columnIndex) => {
    const x = margin + columnIndex * columnWidth;
    let y = 60; // Starting y-position for details

    column.forEach(([key, value]) => {
      doc.setFontSize(10);
      doc.text(`${key}: ${value}`, x, y);
      y += 10; // Space between rows
    });
  });

  // Section: Inspection Parameters
  doc.text("Inspection Parameters", 8, doc.autoTable.previous ? doc.autoTable.previous.finalY + 10 : 120);
  const inspectionRows = inspectionParams.map((item) => [item.title, item.status]);

  doc.autoTable({
    startY: doc.autoTable.previous ? doc.autoTable.previous.finalY + 15 : 130,
    head: [["Inspection Item", "Status"]],
    body: inspectionRows,
    styles: { fontSize: 9, cellPadding: 1 },
  });

  // Save the PDF
  doc.save(`${formData.project}_Detail_Report.pdf`);
};

export default GenerateReportPdf;
