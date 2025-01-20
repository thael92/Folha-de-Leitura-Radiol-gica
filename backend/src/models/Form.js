const mongoose = require('mongoose');

const formSchema = new mongoose.Schema({
    personalInfo: {
        nome: { type: String, required: true },
        dataRx: { type: Date, required: true },
        numeroRx: { type: String, required: true },
        leitor: { type: String, required: true },
        rxDigital: { type: String, required: true },
        leituraNegastoscopio: { type: String, required: true }
    },
    qualidadeTecnica: {
        nivel: { type: String, required: true },
        comentario: String
    },
    radiografiaNormal: { type: String, required: true },
    anormalidades: {
        // ... esquema completo das anormalidades
    },
    conclusao: {
        dataLeitura: { type: Date, required: true },
        assinatura: { type: String, required: true }
    },
    metadata: {
        version: String,
        createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        status: {
            type: String,
            enum: ['draft', 'submitted', 'approved'],
            default: 'draft'
        }
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Form', formSchema); 