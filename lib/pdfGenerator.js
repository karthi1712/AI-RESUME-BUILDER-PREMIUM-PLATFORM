// lib/pdfGenerator.js
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Generates and downloads a clean, high-resolution PDF from a DOM element
 * @param {string} elementId - ID of the container element holding the resume
 * @param {string} filename - Filename for the downloaded PDF
 */
export async function downloadResumePDF(elementId = 'resume-preview-container', filename = 'Resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found for PDF generation.`);
    alert('Could not locate the resume preview. Please make sure the preview is visible.');
    return;
  }

  try {
    // Show temporary rendering state
    const originalStyle = element.style.cssText;
    
    // Create canvas with high pixel ratio for crisp typography
    const canvas = await html2canvas(element, {
      scale: 2, // 2x retina scale
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      windowWidth: 1200
    });

    const imgData = canvas.toDataURL('image/jpeg', 0.98);

    // Standard A4 dimensions in mm: 210 x 297
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4',
      compress: true
    });

    const pdfWidth = 210;
    const pageHeight = 297;
    const imgWidth = pdfWidth;
    const imgHeight = (canvas.height * pdfWidth) / canvas.width;

    let heightLeft = imgHeight;
    let position = 0;

    // Add first page
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
    heightLeft -= pageHeight;

    // Handle multi-page if content exceeds standard A4 height
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST');
      heightLeft -= pageHeight;
    }

    pdf.save(filename);
    return true;
  } catch (error) {
    console.error('Error generating PDF with html2canvas/jspdf:', error);
    // Fallback to browser print if canvas generation encounters an issue
    window.print();
    return false;
  }
}
