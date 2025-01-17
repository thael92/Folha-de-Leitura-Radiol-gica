// Classe que representa a estrutura dos dados
export class RadiologicalFormModel {
    constructor(data = {}) {
        // Dados pessoais
        this.personalInfo = {
            nome: data.personalInfo?.nome || '',
            dataRx: data.personalInfo?.dataRx || '',
            numeroRx: data.personalInfo?.numeroRx || '',
            leitor: data.personalInfo?.leitor || '',
            rxDigital: data.personalInfo?.rxDigital || '',
            leituraNegastoscopio: data.personalInfo?.leituraNegastoscopio || ''
        };

        // Qualidade técnica
        this.qualidadeTecnica = {
            nivel: data.qualidadeTecnica?.nivel || '',
            comentario: data.qualidadeTecnica?.comentario || ''
        };

        // Radiografia normal
        this.radiografiaNormal = data.radiografiaNormal || '';

        // Anormalidades
        this.anormalidades = {
            parenquima: {
                presente: data.anormalidades?.parenquima?.presente || false,
                pequenasOpacidades: {
                    primaria: data.anormalidades?.parenquima?.pequenasOpacidades?.primaria || '',
                    secundaria: data.anormalidades?.parenquima?.pequenasOpacidades?.secundaria || '',
                    profusao: data.anormalidades?.parenquima?.pequenasOpacidades?.profusao || '',
                    zonas: {
                        direita: data.anormalidades?.parenquima?.pequenasOpacidades?.zonas?.direita || [],
                        esquerda: data.anormalidades?.parenquima?.pequenasOpacidades?.zonas?.esquerda || []
                    }
                },
                grandesOpacidades: {
                    presente: data.anormalidades?.parenquima?.grandesOpacidades?.presente || false,
                    categoria: data.anormalidades?.parenquima?.grandesOpacidades?.categoria || ''
                }
            },
            pleural: {
                presente: data.anormalidades?.pleural?.presente || false,
                placasPleurais: {
                    presente: data.anormalidades?.pleural?.placasPleurais?.presente || false,
                    localizacao: {
                        direita: data.anormalidades?.pleural?.placasPleurais?.localizacao?.direita || [],
                        esquerda: data.anormalidades?.pleural?.placasPleurais?.localizacao?.esquerda || []
                    },
                    calcificacao: data.anormalidades?.pleural?.placasPleurais?.calcificacao || [],
                    extensao: {
                        direita: data.anormalidades?.pleural?.placasPleurais?.extensao?.direita || '',
                        esquerda: data.anormalidades?.pleural?.placasPleurais?.extensao?.esquerda || ''
                    }
                },
                espessamentoDifuso: {
                    presente: data.anormalidades?.pleural?.espessamentoDifuso?.presente || false,
                    localizacao: {
                        direita: data.anormalidades?.pleural?.espessamentoDifuso?.localizacao?.direita || [],
                        esquerda: data.anormalidades?.pleural?.espessamentoDifuso?.localizacao?.esquerda || []
                    },
                    extensao: {
                        direita: data.anormalidades?.pleural?.espessamentoDifuso?.extensao?.direita || '',
                        esquerda: data.anormalidades?.pleural?.espessamentoDifuso?.extensao?.esquerda || ''
                    }
                },
                obliteracaoSeio: {
                    direita: data.anormalidades?.pleural?.obliteracaoSeio?.direita || false,
                    esquerda: data.anormalidades?.pleural?.obliteracaoSeio?.esquerda || false
                }
            }
        };

        // Símbolos
        this.simbolos = data.simbolos || [];

        // Comentários
        this.comentarios = data.comentarios || '';

        // Metadata
        this.metadata = {
            version: '1.0',
            createdAt: data.metadata?.createdAt || new Date(),
            updatedAt: data.metadata?.updatedAt || new Date(),
            status: data.metadata?.status || 'draft',
            createdBy: data.metadata?.createdBy || null,
            updatedBy: data.metadata?.updatedBy || null
        };
    }

    // Método para validar os dados
    validate() {
        const errors = {};
        
        // Validação de Informações Pessoais
        if (!this.personalInfo.nome) {
            errors.nome = 'Nome é obrigatório';
        }
        if (!this.personalInfo.dataRx) {
            errors.dataRx = 'Data do RX é obrigatória';
        }
        if (!this.personalInfo.numeroRx) {
            errors.numeroRx = 'Número do RX é obrigatório';
        }
        if (!this.personalInfo.leitor) {
            errors.leitor = 'Leitor é obrigatório';
        }
        if (!this.personalInfo.rxDigital) {
            errors.rxDigital = 'RX Digital é obrigatório';
        }
        
        // Validação de Qualidade Técnica
        if (!this.qualidadeTecnica.nivel) {
            errors.qualidadeTecnica = 'Nível de qualidade técnica é obrigatório';
        }
        
        // Validação de Radiografia Normal
        if (!this.radiografiaNormal) {
            errors.radiografiaNormal = 'É necessário indicar se a radiografia é normal';
        }
        
        // Validações condicionais para anormalidades
        if (this.radiografiaNormal === 'nao') {
            if (this.anormalidades.parenquima.presente) {
                const pequenasOp = this.anormalidades.parenquima.pequenasOpacidades;
                if (!pequenasOp.primaria) {
                    errors.pequenasOpacidadesPrimaria = 'Forma/tamanho primário é obrigatório';
                }
                if (!pequenasOp.profusao) {
                    errors.pequenasOpacidadesProfusao = 'Profusão é obrigatória';
                }
                if (pequenasOp.zonas.direita.length === 0 && pequenasOp.zonas.esquerda.length === 0) {
                    errors.zonas = 'Pelo menos uma zona deve ser selecionada';
                }
            }
            
            if (this.anormalidades.pleural.presente) {
                const placas = this.anormalidades.pleural.placasPleurais;
                if (placas.presente && placas.localizacao.direita.length === 0 && 
                    placas.localizacao.esquerda.length === 0) {
                    errors.placasPleurais = 'Localização das placas pleurais é obrigatória';
                }
            }
        }

        return {
            isValid: Object.keys(errors).length === 0,
            errors
        };
    }

    // Método para converter para JSON
    toJSON() {
        return {
            personalInfo: this.personalInfo,
            qualidadeTecnica: this.qualidadeTecnica,
            radiografiaNormal: this.radiografiaNormal,
            anormalidades: this.anormalidades,
            simbolos: this.simbolos,
            comentarios: this.comentarios,
            metadata: this.metadata
        };
    }

    static fromJSON(json) {
        return new RadiologicalFormModel(json);
    }

    clone() {
        return RadiologicalFormModel.fromJSON(this.toJSON());
    }

    isDraft() {
        return this.metadata.status === 'draft';
    }

    isComplete() {
        return this.validate().isValid;
    }

    setStatus(status) {
        this.metadata.status = status;
        this.metadata.updatedAt = new Date();
        return this;
    }
} 