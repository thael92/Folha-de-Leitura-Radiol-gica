export const sanitizeFormData = (data) => {
    // Implementar sanitização de dados
    return Object.entries(data).reduce((acc, [key, value]) => ({
        ...acc,
        [key]: typeof value === 'string' ? value.trim() : value
    }), {});
}; 