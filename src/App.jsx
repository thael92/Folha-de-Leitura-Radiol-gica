import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { RadiologicalFormModel } from './models/FormModel';
import { formValidationSchema } from './validations/formValidations';
import { generatePDF } from './utils/pdfGenerator';
import { PersonalInfo, QualidadeTecnica, RadiografiaNormal, Anormalidades, Assinatura } from './components/Form';

const App = () => {
    const [formData, setFormData] = useState(new RadiologicalFormModel());
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        resolver: yupResolver(formValidationSchema),
        defaultValues: formData
    });

    const onSubmit = async (data) => {
        try {
            await generatePDF(data);
        } catch (error) {
            console.error('Erro ao gerar PDF:', error);
        }
    };

    return (
        <div className="zoom-wrapper">
            <form onSubmit={handleSubmit(onSubmit)} className="form-container">
                <PersonalInfo register={register} errors={errors} />
                <QualidadeTecnica register={register} errors={errors} />
                <RadiografiaNormal register={register} errors={errors} />
                <Anormalidades register={register} errors={errors} watch={watch} />
                <Assinatura register={register} errors={errors} />
                <button type="submit">Gerar PDF</button>
            </form>
        </div>
    );
};

export default App; 