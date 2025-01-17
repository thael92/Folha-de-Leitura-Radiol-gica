import { RadiologicalFormModel } from './FormModel';

describe('RadiologicalFormModel', () => {
    test('deve criar modelo com valores padrão', () => {
        const model = new RadiologicalFormModel();
        expect(model.personalInfo.nome).toBe('');
        expect(model.qualidadeTecnica.nivel).toBe('');
    });
}); 