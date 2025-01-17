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

    qualidadeTecnica: yup.object().shape({
        nivel: yup.string().required('Nível é obrigatório'),
        comentario: yup.string().nullable()
    }),

    radiografiaNormal: yup.string().required('Campo obrigatório'),

    anormalidades: yup.object().shape({
        parenquima: yup.object().shape({
            presente: yup.boolean().required('Campo obrigatório'),
            pequenasOpacidades: yup.object().when('presente', {
                is: true,
                then: yup.object().shape({
                    primaria: yup.string().required('Forma/tamanho primário é obrigatório'),
                    secundaria: yup.string().required('Forma/tamanho secundário é obrigatório'),
                    zonas: yup.object().shape({
                        direita: yup.array().of(yup.string()).min(1, 'Selecione pelo menos uma zona'),
                        esquerda: yup.array().of(yup.string()).min(1, 'Selecione pelo menos uma zona')
                    }),
                    profusao: yup.string().required('Profusão é obrigatória')
                })
            }),
            grandesOpacidades: yup.string().when('presente', {
                is: true,
                then: yup.string().required('Campo obrigatório')
            })
        }),
        pleural: yup.object().shape({
            presente: yup.boolean(),
            placasPleurais: yup.object().when('presente', {
                is: true,
                then: yup.object().shape({
                    presente: yup.boolean(),
                    local: yup.object().shape({
                        paredeEmPerfil: yup.object().shape({
                            posicao: yup.array().of(yup.string()),
                            calcificacao: yup.array().of(yup.string())
                        }),
                        frontal: yup.object().shape({
                            posicao: yup.array().of(yup.string()),
                            calcificacao: yup.array().of(yup.string())
                        }),
                        diafragma: yup.object().shape({
                            posicao: yup.array().of(yup.string()),
                            calcificacao: yup.array().of(yup.string())
                        }),
                        outrosLocais: yup.object().shape({
                            posicao: yup.array().of(yup.string()),
                            calcificacao: yup.array().of(yup.string())
                        })
                    }),
                    extensao: yup.object().shape({
                        direita: yup.string(),
                        esquerda: yup.string()
                    }),
                    largura: yup.object().shape({
                        direita: yup.string(),
                        esquerda: yup.string()
                    })
                })
            }),
            obliteracaoSeio: yup.object().when('presente', {
                is: true,
                then: yup.object().shape({
                    direita: yup.boolean(),
                    esquerda: yup.boolean()
                })
            }),
            espessamentoPleural: yup.object().when('presente', {
                is: true,
                then: yup.object().shape({
                    presente: yup.boolean(),
                    local: yup.object().shape({
                        paredeEmPerfil: yup.object().shape({
                            posicao: yup.array().of(yup.string()),
                            calcificacao: yup.array().of(yup.string())
                        }),
                        frontal: yup.object().shape({
                            posicao: yup.array().of(yup.string()),
                            calcificacao: yup.array().of(yup.string())
                        })
                    })
                })
            })
        })
    }),

    outrasAnormalidades: yup.object().shape({
        presente: yup.boolean(),
        simbolos: yup.array().of(yup.string()).when('presente', {
            is: true,
            then: yup.array().min(1, 'Selecione pelo menos um símbolo')
        }),
        comentarios: yup.string().when('presente', {
            is: true,
            then: yup.string().required('Comentário é obrigatório quando há outras anormalidades')
        })
    }),

    conclusao: yup.object().shape({
        dataLeitura: yup.date().required('Data da leitura é obrigatória'),
        assinatura: yup.string().required('Assinatura é obrigatória')
    }),

    metadata: yup.object().shape({
        version: yup.string(),
        lastModifiedBy: yup.string(),
        hospital: yup.string(),
        department: yup.string()
    })
}); 