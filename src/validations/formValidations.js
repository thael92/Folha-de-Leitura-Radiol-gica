import * as yup from 'yup';

export const formValidationSchema = yup.object().shape({
    personalInfo: yup.object().shape({
        nome: yup.string().required('Nome é obrigatório'),
        dataRx: yup.date().required('Data do RX é obrigatória'),
        numeroRx: yup.string().required('Número do RX é obrigatório'),
        leitor: yup.string().required('Leitor é obrigatório'),
        rxDigital: yup.boolean().required('Selecione uma opção'),
        leituraNegastoscopio: yup.boolean().required('Selecione uma opção')
    }),
    qualidadeTecnica: yup.object().shape({
        nivel: yup.string().required('Selecione o nível'),
        comentario: yup.string().when('nivel', {
            is: (nivel) => nivel === '4',
            then: yup.string().required('Comentário obrigatório para nível 4')
        })
    }),
    // ... outras validações
}); 