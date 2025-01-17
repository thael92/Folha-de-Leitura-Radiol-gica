import axios from 'axios';
import { RadiologicalFormModel } from '../models/FormModel';

const api = axios.create({
    baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json'
    }
});

// Interceptor para tratar erros
api.interceptors.response.use(
    response => response,
    error => {
        if (error.response) {
            // Erro do servidor (status code não 2xx)
            switch (error.response.status) {
                case 401:
                    // Não autorizado
                    localStorage.removeItem('token');
                    window.location.href = '/login';
                    break;
                case 403:
                    // Proibido
                    throw new Error('Você não tem permissão para realizar esta ação');
                case 404:
                    // Não encontrado
                    throw new Error('Recurso não encontrado');
                case 422:
                    // Erro de validação
                    throw new Error(error.response.data.message || 'Dados inválidos');
                default:
                    throw new Error('Erro no servidor');
            }
        }
        throw new Error('Erro de conexão');
    }
);

export const FormService = {
    async create(formData) {
        try {
            const model = new RadiologicalFormModel(formData);
            const response = await api.post('/forms', model.toJSON());
            return new RadiologicalFormModel(response.data);
        } catch (error) {
            throw new Error(`Erro ao criar formulário: ${error.message}`);
        }
    },

    async update(id, formData) {
        try {
            const model = new RadiologicalFormModel(formData);
            model.id = id;
            model.updatedAt = new Date();
            
            const response = await api.put(`/forms/${id}`, model.toJSON());
            return new RadiologicalFormModel(response.data);
        } catch (error) {
            throw new Error(`Erro ao atualizar formulário: ${error.message}`);
        }
    },

    async getById(id) {
        try {
            const response = await api.get(`/forms/${id}`);
            return new RadiologicalFormModel(response.data);
        } catch (error) {
            throw new Error(`Erro ao buscar formulário: ${error.message}`);
        }
    },

    async list(filters = {}) {
        try {
            const response = await api.get('/forms', { params: filters });
            return {
                items: response.data.items.map(form => new RadiologicalFormModel(form)),
                total: response.data.total,
                page: response.data.page,
                pageSize: response.data.pageSize
            };
        } catch (error) {
            throw new Error(`Erro ao listar formulários: ${error.message}`);
        }
    },

    async delete(id) {
        try {
            await api.delete(`/forms/${id}`);
        } catch (error) {
            throw new Error(`Erro ao excluir formulário: ${error.message}`);
        }
    },

    async saveDraft(formData) {
        try {
            const model = new RadiologicalFormModel(formData);
            model.status = 'draft';
            const response = await api.post('/forms/draft', model.toJSON());
            return new RadiologicalFormModel(response.data);
        } catch (error) {
            throw new Error(`Erro ao salvar rascunho: ${error.message}`);
        }
    },

    async submit(id) {
        try {
            const response = await api.post(`/forms/${id}/submit`);
            return new RadiologicalFormModel(response.data);
        } catch (error) {
            throw new Error(`Erro ao submeter formulário: ${error.message}`);
        }
    }
};