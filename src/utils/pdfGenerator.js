import { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';

export const generatePDF = async (formData) => {
    const doc = new jsPDF({
        format: 'a4',
        unit: 'mm',
        orientation: 'portrait'
    });

    try {
        const form = document.querySelector('.form-container');
        const canvas = await html2canvas(form, {
            scale: 0.65,
            useCORS: true,
            scrollX: 0,
            scrollY: 0,
            windowWidth: form.offsetWidth,
            windowHeight: form.offsetHeight
        });

        const imgData = canvas.toDataURL('image/png');
        const imgWidth = 210; // A4 width
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        doc.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
        doc.save('laudo-radiologico.pdf');
    } catch (error) {
        throw new Error('Erro ao gerar PDF: ' + error.message);
    }
}; 