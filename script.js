
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
    