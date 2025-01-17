export class RadiologicalFormModel {
    constructor(data = {}) {
        this.id = data.id || null;
        this.createdAt = data.createdAt || new Date();
        this.updatedAt = data.updatedAt || new Date();
        this.status = data.status || 'draft';

        this.personalInfo = {
            nome: data.personalInfo?.nome || '',
            dataRx: data.personalInfo?.dataRx || '',
            numeroRx: data.personalInfo?.numeroRx || '',
            leitor: data.personalInfo?.leitor || '',
            rxDigital: data.personalInfo?.rxDigital || '',
            leituraNegastoscopio: data.personalInfo?.leituraNegastoscopio || ''
        };

        this.qualidadeTecnica = {
            nivel: data.qualidadeTecnica?.nivel || '',
            comentario: data.qualidadeTecnica?.comentario || ''
        };

        this.radiografiaNormal = data.radiografiaNormal || '';

        this.anormalidades = {
            parenquima: {
                presente: data.anormalidades?.parenquima?.presente || false,
                pequenasOpacidades: {
                    primaria: data.anormalidades?.parenquima?.pequenasOpacidades?.primaria || '',
                    secundaria: data.anormalidades?.parenquima?.pequenasOpacidades?.secundaria || '',
                    zonas: {
                        direita: data.anormalidades?.parenquima?.pequenasOpacidades?.zonas?.direita || [],
                        esquerda: data.anormalidades?.parenquima?.pequenasOpacidades?.zonas?.esquerda || []
                    },
                    profusao: data.anormalidades?.parenquima?.pequenasOpacidades?.profusao || ''
                }
            }
        };

        this.conclusao = {
            dataLeitura: data.conclusao?.dataLeitura || '',
            assinatura: data.conclusao?.assinatura || ''
        };

        this.metadata = {
            version: '1.0',
            lastModifiedBy: data.metadata?.lastModifiedBy || '',
            hospital: data.metadata?.hospital || '',
            department: data.metadata?.department || ''
        };
    }

    toJSON() {
        return {
            id: this.id,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            status: this.status,
            personalInfo: this.personalInfo,
            qualidadeTecnica: this.qualidadeTecnica,
            radiografiaNormal: this.radiografiaNormal,
            anormalidades: this.anormalidades,
            conclusao: this.conclusao,
            metadata: this.metadata
        };
    }
} 