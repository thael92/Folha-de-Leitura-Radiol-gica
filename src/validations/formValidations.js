import * as yup from 'yup';

export const formValidationSchema = yup.object().shape({
    personalInfo: yup.object().shape({
        nome: yup.string().required('Nome é obrigatório'),
        dataRx: yup.date().required('Data do RX é obrigatória'),
        numeroRx: yup.string().required('Número do RX é obrigatório'),
        leitor: yup.string().required('Leitor é obrigatório'),
        rxDigital: yup.string().required('RX Digital é obrigatório'),
        leituraNegastoscopio: yup.string().required('Leitura em Negastoscópio é obrigatória')
    }),
    // Adicionar outras validações conforme necessário
}); 