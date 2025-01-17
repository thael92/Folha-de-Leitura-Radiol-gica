import { render, screen, fireEvent } from '@testing-library/react';
import App from '../App';

describe('Formulário Radiológico', () => {
    test('deve renderizar o formulário corretamente', () => {
        render(<App />);
        
        // Verifica elementos básicos
        expect(screen.getByLabelText(/nome/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/data do rx/i)).toBeInTheDocument();
        expect(screen.getByText(/gerar pdf/i)).toBeInTheDocument();
    });

    test('deve validar campos obrigatórios', async () => {
        render(<App />);
        
        // Tenta submeter formulário vazio
        const submitButton = screen.getByText(/gerar pdf/i);
        fireEvent.click(submitButton);
        
        // Verifica mensagens de erro
        expect(screen.getByText(/nome é obrigatório/i)).toBeInTheDocument();
    });

    test('deve preencher formulário com sucesso', async () => {
        render(<App />);
        
        // Preenche campos
        fireEvent.change(screen.getByLabelText(/nome/i), {
            target: { value: 'João da Silva' }
        });
        
        fireEvent.change(screen.getByLabelText(/data do rx/i), {
            target: { value: '2024-03-19' }
        });
        
        // Verifica se os valores foram preenchidos
        expect(screen.getByLabelText(/nome/i)).toHaveValue('João da Silva');
        expect(screen.getByLabelText(/data do rx/i)).toHaveValue('2024-03-19');
    });
}); 