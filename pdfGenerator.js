// First, add the html2pdf.js library to your HTML file
// <script src="https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js"></script>

// PDF generation functionality
function generatePDF() {
    // Get the form container element
    const element = document.querySelector('.form-container');
    
    // Configure PDF options
    const opt = {
        margin: [10, 10],
        filename: 'formulario-radiologico.pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { 
            scale: 2,
            useCORS: true,
            logging: false,
            letterRendering: true
        },
        jsPDF: { 
            unit: 'mm', 
            format: 'a4', 
            orientation: 'portrait'
        }
    };

    // Generate PDF
    html2pdf().set(opt).from(element).save().catch(error => {
        console.error('Error generating PDF:', error);
        alert('Erro ao gerar PDF. Por favor, tente novamente.');
    });
}

// Function to handle print button click
function handlePrintClick() {
    // Add a loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-indicator';
    loadingDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(255, 255, 255, 0.9);
        padding: 20px;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0,0,0,0.2);
        z-index: 9999;
    `;
    loadingDiv.textContent = 'Gerando PDF...';
    document.body.appendChild(loadingDiv);

    // Generate PDF with slight delay to allow loading indicator to appear
    setTimeout(() => {
        generatePDF();
        document.body.removeChild(loadingDiv);
    }, 100);
}

// Add print button to the page
function addPrintButton() {
    const printButton = document.createElement('button');
    printButton.textContent = 'Gerar PDF';
    printButton.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 10px 20px;
        background-color: #008000;
        color: white;
        border: none;
        border-radius: 5px;
        cursor: pointer;
        font-size: 16px;
        z-index: 1000;
    `;
    printButton.addEventListener('click', handlePrintClick);
    document.body.appendChild(printButton);
}

// Initialize when document is ready
document.addEventListener('DOMContentLoaded', () => {
    addPrintButton();
});