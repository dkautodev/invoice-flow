import html2pdf from "html2pdf.js";

export const generatePDF = (filename) => {
  const element = document.getElementById('invoice-capture');
  if (!element) return;

  // Clone element to remove scale transform for capture
  const opt = {
    margin: 0,
    filename: filename || "facture.pdf",
    image: { type: "jpeg", quality: 1 },
    html2canvas: { 
      scale: 3, 
      useCORS: true,
      letterRendering: true,
      scrollY: 0,
      scrollX: 0,
      windowWidth: element.clientWidth,
      windowHeight: element.clientHeight
    },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  };

  // Temporarily reset transform for capture
  const originalTransform = element.style.transform;
  element.style.transform = 'none';

  html2pdf().set(opt).from(element).save().then(() => {
    element.style.transform = originalTransform;
  });
};
