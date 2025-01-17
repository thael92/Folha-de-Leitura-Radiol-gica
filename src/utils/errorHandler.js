export const handleApiError = (error) => {
    if (error.response) {
        // Erro com resposta do servidor
        const { status, data } = error.response;
        
        switch (status) {
            case 400:
                return {
                    type: 'validation',
                    message: data.message || 'Dados inválidos',
                    errors: data.errors
                };
            case 401:
                return {
                    type: 'auth',
                    message: 'Sessão expirada'
                };
            case 403:
                return {
                    type: 'permission',
                    message: 'Sem permissão'
                };
            default:
                return {
                    type: 'server',
                    message: 'Erro no servidor'
                };
        }
    }
    
    return {
        type: 'network',
        message: 'Erro de conexão'
    };
}; 