// Serviço para gerenciar os dados do formulário
export class FormService {
    static createFormObject(formData) {
        return new RadiologicalFormModel(formData);
    }

    static async saveForm(formData) {
        const formModel = this.createFormObject(formData);
        
        // Valida os dados antes de salvar
        const validation = formModel.validate();
        if (!validation.isValid) {
            throw new Error('Dados inválidos');
        }

        // Converte para JSON e salva
        const jsonData = formModel.toJSON();
        // ... lógica para salvar no backend
    }
} 