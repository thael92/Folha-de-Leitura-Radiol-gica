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
