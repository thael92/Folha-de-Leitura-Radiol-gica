document.getElementById('radiological-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio padrão do formulário

    const formData = new FormData(event.target);

    const data = {};
    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log('Dados enviados:', data);
    alert('Formulário enviado com sucesso!');
});
// Configuração do canvas para assinatura
const canvas = document.getElementById('signatureCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

canvas.addEventListener('mousedown', () => drawing = true);
canvas.addEventListener('mouseup', () => drawing = false);
canvas.addEventListener('mouseout', () => drawing = false);
canvas.addEventListener('mousemove', draw);

function draw(event) {
    if (!drawing) return;
    const rect = canvas.getBoundingClientRect();
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.strokeStyle = 'black';
    ctx.lineTo(event.clientX - rect.left, event.clientY - rect.top);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.clientX - rect.left, event.clientY - rect.top);
}

// Limpar o canvas
document.getElementById('clear').addEventListener('click', () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
});

// Salvar a assinatura como imagem
document.getElementById('save').addEventListener('click', () => {
    const dataURL = canvas.toDataURL('image/png');
    const link = document.createElement('a');
    link.href = dataURL;
    link.download = 'assinatura.png';
    link.click();
});

// Fazer upload de uma imagem de assinatura
document.getElementById('upload').addEventListener('change', (event) => {
    const file = event.target.files[0];
    if (file) {
        const img = new Image();
        img.onload = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        };
        img.src = URL.createObjectURL(file);
    }
});
