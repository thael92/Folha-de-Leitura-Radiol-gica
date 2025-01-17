const Form = require('../models/Form');
const { validateForm } = require('../validators/formValidator');
const PDFGenerator = require('../utils/pdfGenerator');

class FormController {
    async create(req, res) {
        try {
            const validation = validateForm(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    errors: validation.errors
                });
            }

            const form = new Form({
                ...req.body,
                createdBy: req.user.id,
                status: 'active'
            });

            await form.save();

            return res.status(201).json({
                success: true,
                data: form
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao criar formulário',
                error: error.message
            });
        }
    }

    async list(req, res) {
        try {
            const { page = 1, limit = 10, status, startDate, endDate } = req.query;

            const query = {};
            if (status) query.status = status;
            if (startDate || endDate) {
                query.createdAt = {};
                if (startDate) query.createdAt.$gte = new Date(startDate);
                if (endDate) query.createdAt.$lte = new Date(endDate);
            }

            const forms = await Form.find(query)
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .sort({ createdAt: -1 });

            const total = await Form.countDocuments(query);

            return res.json({
                success: true,
                data: {
                    items: forms,
                    total,
                    page: parseInt(page),
                    pageSize: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao listar formulários',
                error: error.message
            });
        }
    }

    async getById(req, res) {
        try {
            const form = await Form.findById(req.params.id);
            if (!form) {
                return res.status(404).json({
                    success: false,
                    message: 'Formulário não encontrado'
                });
            }

            return res.json({
                success: true,
                data: form
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao buscar formulário',
                error: error.message
            });
        }
    }

    async update(req, res) {
        try {
            const validation = validateForm(req.body);
            if (!validation.success) {
                return res.status(400).json({
                    success: false,
                    errors: validation.errors
                });
            }

            const form = await Form.findByIdAndUpdate(
                req.params.id,
                {
                    ...req.body,
                    updatedAt: new Date(),
                    updatedBy: req.user.id
                },
                { new: true }
            );

            if (!form) {
                return res.status(404).json({
                    success: false,
                    message: 'Formulário não encontrado'
                });
            }

            return res.json({
                success: true,
                data: form
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao atualizar formulário',
                error: error.message
            });
        }
    }

    async delete(req, res) {
        try {
            const form = await Form.findByIdAndDelete(req.params.id);
            if (!form) {
                return res.status(404).json({
                    success: false,
                    message: 'Formulário não encontrado'
                });
            }

            return res.json({
                success: true,
                message: 'Formulário excluído com sucesso'
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao excluir formulário',
                error: error.message
            });
        }
    }

    async saveDraft(req, res) {
        try {
            const form = new Form({
                ...req.body,
                createdBy: req.user.id,
                status: 'draft'
            });

            await form.save();

            return res.status(201).json({
                success: true,
                data: form
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao salvar rascunho',
                error: error.message
            });
        }
    }

    async submit(req, res) {
        try {
            const form = await Form.findById(req.params.id);
            if (!form) {
                return res.status(404).json({
                    success: false,
                    message: 'Formulário não encontrado'
                });
            }

            form.status = 'submitted';
            form.submittedAt = new Date();
            form.submittedBy = req.user.id;

            await form.save();

            return res.json({
                success: true,
                data: form
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao submeter formulário',
                error: error.message
            });
        }
    }

    async generatePDF(req, res) {
        try {
            const form = await Form.findById(req.params.id);
            if (!form) {
                return res.status(404).json({
                    success: false,
                    message: 'Formulário não encontrado'
                });
            }

            const pdfBuffer = await PDFGenerator.generate(form);

            res.setHeader('Content-Type', 'application/pdf');
            res.setHeader('Content-Disposition', `attachment; filename=form-${form._id}.pdf`);
            
            return res.send(pdfBuffer);
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao gerar PDF',
                error: error.message
            });
        }
    }

    async search(req, res) {
        try {
            const { q, status, startDate, endDate, page = 1, limit = 10 } = req.query;

            const query = {};
            if (q) {
                query.$or = [
                    { 'personalInfo.nome': new RegExp(q, 'i') },
                    { 'personalInfo.numeroRx': new RegExp(q, 'i') }
                ];
            }
            if (status) query.status = status;
            if (startDate || endDate) {
                query.createdAt = {};
                if (startDate) query.createdAt.$gte = new Date(startDate);
                if (endDate) query.createdAt.$lte = new Date(endDate);
            }

            const forms = await Form.find(query)
                .skip((page - 1) * limit)
                .limit(parseInt(limit))
                .sort({ createdAt: -1 });

            const total = await Form.countDocuments(query);

            return res.json({
                success: true,
                data: {
                    items: forms,
                    total,
                    page: parseInt(page),
                    pageSize: parseInt(limit),
                    totalPages: Math.ceil(total / limit)
                }
            });
        } catch (error) {
            return res.status(500).json({
                success: false,
                message: 'Erro ao pesquisar formulários',
                error: error.message
            });
        }
    }
}

module.exports = new FormController(); 