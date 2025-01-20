function adjustZoom() {
    const zoomWrapper = document.querySelector('.zoom-wrapper');
    const formContainer = document.querySelector('.form-container');

    // Dimensões da janela
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Dimensões do formulário
    const formWidth = formContainer.offsetWidth;
    const formHeight = formContainer.offsetHeight;

    // Verifica o tipo de dispositivo (mobile ou desktop)
    const isMobile = /Android|iPhone|iPad|iPod|Windows Phone/i.test(navigator.userAgent);

    // Verifica a orientação do dispositivo
    const isLandscape = windowWidth > windowHeight;

    let scale;

    if (isMobile) {
        if (isLandscape) {
            // No modo paisagem, prioriza o preenchimento da altura para melhorar o uso
            scale = windowHeight / formHeight;
        } else {
            // No modo retrato, prioriza o preenchimento da largura
            scale = windowWidth / formWidth;
        }

        // Aplica o zoom com centralização
        formContainer.style.transform = `scale(${scale})`;
        zoomWrapper.style.position = "absolute";
        zoomWrapper.style.top = "50%";
        zoomWrapper.style.left = "50%";
        zoomWrapper.style.transform = `translate(-50%, -50%)`;
    } else {
        // No computador, não aplica zoom e centraliza com flexbox
        formContainer.style.transform = `scale(1)`;
        formContainer.style.position = "relative";
        zoomWrapper.style.display = "flex";
        zoomWrapper.style.alignItems = "center";
        zoomWrapper.style.justifyContent = "center";
    }

    // Debug: exibe as dimensões e escala no console
    console.log(`windowWidth: ${windowWidth}, windowHeight: ${windowHeight}`);
    console.log(`formWidth: ${formWidth}, formHeight: ${formHeight}`);
    console.log(`scale: ${scale}`);
}

// Ajusta ao carregar a página, redimensionar e mudar de orientação
window.addEventListener('load', adjustZoom);
window.addEventListener('resize', adjustZoom);
window.addEventListener('orientationchange', adjustZoom);
const doc = new jsPDF({
    format: 'a4',
    unit: 'mm',
    orientation: 'portrait'
});

doc.html(document.querySelector('.form-container'), {
    callback: function (doc) {
      doc.save('document.pdf');
    },
    x: 5,        // 5mm da margem esquerda
    y: 5,        // 5mm do topo
    width: 200,  // Largura do conteúdo em mm
    windowWidth: 1087, // Largura original do container
    
    html2canvas: {
        
        letterRendering: true,
        useCORS: true,
        logging: true,
        imageTimeout: 0,
        removeContainer: true
    },
    margin: [5, 5, 5, 5] // margens [superior, esquerda, inferior, direita]
});

window.addEventListener('beforeprint', function() {
    document.querySelector('.zoom-wrapper').style.transform = 'zoom(1)'; // Ajuste a escala conforme necessário
    document.querySelector('.zoom-wrapper').style.transformOrigin = 'top left';
});

window.addEventListener('afterprint', function() {
    document.querySelector('.zoom-wrapper').style.transform = ''; // Remove a escala após a impressão
});
/**
 * Adjusts the zoom and centering of the form container based on the window size.
 * This function is called on page load, window resize, and orientation change events.
 * It scales the form container to fit the window while maintaining the aspect ratio,
 * and centers the scaled form container both vertically and horizontally.
 */

  

