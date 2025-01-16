export class RadiologicalFormModel {
    constructor() {
        return {
            personalInfo: {
                nome: '',
                dataRx: '',
                numeroRx: '',
                leitor: '',
                rxDigital: null,
                leituraNegastoscopio: null
            },
            qualidadeTecnica: {
                nivel: '',
                comentario: ''
            },
            radiografiaNormal: null,
            anormalidadeParenquima: {
                status: null,
                pequenasOpacidades: {
                    formaTamanhoPrimaria: '',
                    formaTamanhoSecundaria: '',
                    zonas: [],
                    profusao: ''
                },
                grandesOpacidades: ''
            },
            anormalidadePleural: {
                status: null,
                placasPleurais: {
                    status: null,
                    local: {
                        paredeEmPerfil: [],
                        frontal: [],
                        diafragma: [],
                        outrosLocais: []
                    },
                    calcificacao: [],
                    extensao: []
                }
            },
            outrasAnormalidades: {
                status: null,
                simbolos: [],
                comentarios: ''
            },
            dataLeitura: '',
            assinatura: null
        };
    }
} 