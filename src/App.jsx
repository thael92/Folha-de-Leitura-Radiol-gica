import React from 'react';
import { ToastContainer } from 'react-toastify';
import { useFormManager } from './hooks/useForm';
import { PersonalInfo, QualidadeTecnica, RadiografiaNormal, Anormalidades, Assinatura } from './components/Form';
import 'react-toastify/dist/ReactToastify.css';

const App = ({ formId }) => {
    const { loading, methods, saveForm } = useFormManager(formId);

    const onSubmit = async (data) => {
        const success = await saveForm(data);
        if (success && !formId) {
            methods.reset();
        }
    };

    if (loading) return <div>Carregando...</div>;

    return (
        <>
            <div className="zoom-wrapper">
                <form onSubmit={methods.handleSubmit(onSubmit)} className="form-container">
                    <PersonalInfo register={methods.register} errors={methods.formState.errors} />
                    <QualidadeTecnica register={methods.register} errors={methods.formState.errors} />
                    <RadiografiaNormal register={methods.register} errors={methods.formState.errors} />
                    <Anormalidades 
                        register={methods.register} 
                        errors={methods.formState.errors} 
                        watch={methods.watch}
                    />
                    <Assinatura register={methods.register} errors={methods.formState.errors} />
                    
                    <button type="submit" disabled={loading}>
                        {formId ? 'Atualizar' : 'Criar'} Formulário
                    </button>
                </form>
            </div>
            <ToastContainer />
        </>
    );
};

export default App; 