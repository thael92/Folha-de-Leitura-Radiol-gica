import React from 'react';

export const PersonalInfo = ({ register, errors }) => {
    return (
        <div className="form-container-name">
            <div className="form-group-name">
                <label htmlFor="nome">Nome</label>
                <input 
                    className="input-name" 
                    type="text" 
                    {...register('personalInfo.nome')} 
                />
                {errors.personalInfo?.nome && 
                    <span className="error">{errors.personalInfo.nome.message}</span>
                }
            </div>

            <div className="form-group-date">
                <label className="text-datarx" htmlFor="data-rx">Data do RX</label>
                <input 
                    className="input-date" 
                    type="date" 
                    {...register('personalInfo.dataRx')}
                />
                {errors.personalInfo?.dataRx && 
                    <span className="error">{errors.personalInfo.dataRx.message}</span>
                }
            </div>

            <div className="form-group-nrx">
                <label htmlFor="numero-rx">Nº do RX</label>
                <input 
                    className="input-numero-rx" 
                    type="text" 
                    {...register('personalInfo.numeroRx')}
                />
                {errors.personalInfo?.numeroRx && 
                    <span className="error">{errors.personalInfo.numeroRx.message}</span>
                }
            </div>

            <div className="form-group-leitor">
                <label htmlFor="leitor">Leitor (Iniciais)</label>
                <input 
                    className="input-Leitor" 
                    type="text" 
                    {...register('personalInfo.leitor')}
                />
                {errors.personalInfo?.leitor && 
                    <span className="error">{errors.personalInfo.leitor.message}</span>
                }
            </div>

            <div className="form-group-rxdigital">
                <label>RX Digital</label>
                <div className="label-rxgidital">
                    <label>
                        <input 
                            type="radio" 
                            {...register('personalInfo.rxDigital')} 
                            value="sim"
                        /> Sim
                    </label>
                    <label>
                        <input 
                            type="radio" 
                            {...register('personalInfo.rxDigital')} 
                            value="nao"
                        /> Não
                    </label>
                </div>
                {errors.personalInfo?.rxDigital && 
                    <span className="error">{errors.personalInfo.rxDigital.message}</span>
                }
            </div>
        </div>
    );
};

export const QualidadeTecnica = ({ register, errors }) => {
    return (
        <div className="form-group-qualidade-tecnica">
            <div className="a1">1A</div>
            <label className="name-label-qualidade">QUALIDADE TÉCNICA:</label>
            <div className="label-qualidade-tecnica">
                {[1, 2, 3, 4].map((value) => (
                    <label key={value}>
                        <input 
                            type="radio" 
                            {...register('qualidadeTecnica.nivel')} 
                            value={value.toString()}
                        /> {value}
                    </label>
                ))}
            </div>
            {errors.qualidadeTecnica?.nivel && 
                <span className="error">{errors.qualidadeTecnica.nivel.message}</span>
            }
            
            <label className="name-label-comentario">Comentário:</label>
            <input 
                className="input-comentario" 
                type="text" 
                {...register('qualidadeTecnica.comentario')}
            />
        </div>
    );
};

export const RadiografiaNormal = ({ register, errors }) => {
    return (
        <div className="form-group-radiografia-normal">
            <div className="b1">1B</div>
            <label className="name-label-radiografia-normal">RADIOGRAFIA NORMAL:</label>
            <div className="labe-radiografia-normal">
                <label>
                    <input 
                        type="radio" 
                        {...register('radiografiaNormal')} 
                        value="sim"
                    /> SIM (finalizar a leitura)
                </label>
                <label>
                    <input 
                        type="radio" 
                        {...register('radiografiaNormal')} 
                        value="nao"
                    /> NÃO (passe p/ a seção 2)
                </label>
            </div>
            {errors.radiografiaNormal && 
                <span className="error">{errors.radiografiaNormal.message}</span>
            }
        </div>
    );
};

export const Anormalidades = ({ register, errors, watch }) => {
    const radiografiaNormal = watch('radiografiaNormal');

    if (radiografiaNormal === 'sim') return null;

    return (
        <div className="form-group-2a">
            <div className="a2">2A</div>
            <label className="label-name-anormalidade-a2">
                ALGUMA ANORMALIDADE DE PARÊNQUIMA CONSISTENTE COM PNEUMOCONIOSE:
            </label>
            <div className="label-anormalidade-a2">
                <label>
                    <input 
                        type="radio" 
                        {...register('anormalidades.parenquima.presente')} 
                        value="sim"
                    /> SIM (complete 2B e 2C)
                </label>
                <label>
                    <input 
                        type="radio" 
                        {...register('anormalidades.parenquima.presente')} 
                        value="nao"
                    /> NÃO (passe para a seção 3)
                </label>
            </div>
            {/* Adicione mais campos de anormalidades conforme necessário */}
        </div>
    );
};

export const Assinatura = ({ register, errors }) => {
    return (
        <>
            <div className="form-group-data-leitura">
                <p>DATA DA LEITURA</p>
                <label htmlFor="date"></label>
                <input 
                    type="date" 
                    id="date" 
                    {...register('conclusao.dataLeitura')}
                />
                {errors.conclusao?.dataLeitura && 
                    <span className="error">{errors.conclusao.dataLeitura.message}</span>
                }
            </div>

            <div className="form-group-assinatura" id="signature-pad">
                <label>ASSINATURA</label>
                {/* Implementar componente de assinatura digital */}
            </div>
        </>
    );
};

export const FormContainer = ({ children }) => (
    <div className="form-container">
        {children}
    </div>
); 