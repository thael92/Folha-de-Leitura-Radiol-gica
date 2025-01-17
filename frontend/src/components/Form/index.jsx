import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { toast } from 'react-toastify';
import './styles.css';

const RadiologicalForm = () => {
    const { register, handleSubmit, watch, formState: { errors } } = useForm({
        defaultValues: {
            personalInfo: {
                nome: '',
                dataRx: '',
                numeroRx: '',
                leitor: '',
                rxDigital: '',
                leituraNegastoscopio: ''
            },
            qualidadeTecnica: {
                nivel: '',
                comentario: ''
            },
            radiografiaNormal: '',
            anormalidades: {
                parenquima: {
                    presente: false,
                    pequenasOpacidades: {
                        primaria: '',
                        secundaria: '',
                        profusao: '',
                        zonas: {
                            direita: [],
                            esquerda: []
                        }
                    },
                    grandesOpacidades: ''
                },
                pleural: {
                    presente: false,
                    placasPleurais: {
                        presente: false,
                        calcificacao: [],
                        localizacao: {
                            direita: [],
                            esquerda: []
                        }
                    },
                    espessamentoDifuso: {
                        presente: false,
                        localizacao: {
                            direita: [],
                            esquerda: []
                        }
                    }
                }
            },
            simbolos: [],
            comentarios: ''
        }
    });

    const formValues = watch();

    const onSubmit = async (data) => {
        try {
            console.log('Dados do formulário:', data);
            toast.success('Formulário enviado com sucesso!');
        } catch (error) {
            toast.error('Erro ao enviar formulário');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="radiological-form">
            {/* Seção 1: Informações Pessoais */}
            <section className="form-section">
                <h2>1. Informações Pessoais</h2>
                <div className="form-row">
                    <div className="form-group">
                        <label>Nome</label>
                        <input {...register('personalInfo.nome')} className="form-control" />
                        {errors.personalInfo?.nome && (
                            <span className="error">{errors.personalInfo.nome.message}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Data do RX</label>
                        <input type="date" {...register('personalInfo.dataRx')} className="form-control" />
                        {errors.personalInfo?.dataRx && (
                            <span className="error">{errors.personalInfo.dataRx.message}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Nº do RX</label>
                        <input {...register('personalInfo.numeroRx')} className="form-control" />
                        {errors.personalInfo?.numeroRx && (
                            <span className="error">{errors.personalInfo.numeroRx.message}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label>Leitor (Iniciais)</label>
                        <input {...register('personalInfo.leitor')} className="form-control" />
                        {errors.personalInfo?.leitor && (
                            <span className="error">{errors.personalInfo.leitor.message}</span>
                        )}
                    </div>
                </div>
            </section>

            {/* Seção 2: Qualidade Técnica */}
            <section className="form-section">
                <h2>2. Qualidade Técnica</h2>
                <div className="form-group">
                    <label>Qualidade</label>
                    <select {...register('qualidadeTecnica.nivel')} className="form-control">
                        <option value="">Selecione...</option>
                        <option value="1">1 - Boa</option>
                        <option value="2">2 - Aceitável</option>
                        <option value="3">3 - Baixa qualidade</option>
                        <option value="4">4 - Inaceitável</option>
                    </select>
                    {errors.qualidadeTecnica?.nivel && (
                        <span className="error">{errors.qualidadeTecnica.nivel.message}</span>
                    )}
                </div>
            </section>

            {/* Seção 3: Parênquima */}
            <section className="form-section">
                <h2>3. Anormalidades Parenquimatosas</h2>
                <div className="form-group">
                    <label>
                        <input 
                            type="checkbox" 
                            {...register('anormalidades.parenquima.presente')} 
                        /> 
                        Presentes
                    </label>
                </div>

                {formValues.anormalidades.parenquima.presente && (
                    <>
                        <div className="form-group">
                            <h3>3.1 Pequenas Opacidades</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Forma/Tamanho Primário</label>
                                    <select {...register('anormalidades.parenquima.pequenasOpacidades.primaria')} className="form-control">
                                        <option value="">Selecione...</option>
                                        <option value="p">p</option>
                                        <option value="q">q</option>
                                        <option value="r">r</option>
                                        <option value="s">s</option>
                                        <option value="t">t</option>
                                        <option value="u">u</option>
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label>Profusão</label>
                                    <select {...register('anormalidades.parenquima.pequenasOpacidades.profusao')} className="form-control">
                                        <option value="">Selecione...</option>
                                        <option value="0/1">0/1</option>
                                        <option value="1/0">1/0</option>
                                        <option value="1/1">1/1</option>
                                        <option value="1/2">1/2</option>
                                        <option value="2/1">2/1</option>
                                        <option value="2/2">2/2</option>
                                        <option value="2/3">2/3</option>
                                        <option value="3/2">3/2</option>
                                        <option value="3/3">3/3</option>
                                        <option value="3/+">3/+</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <h3>3.2 Zonas Afetadas</h3>
                            <div className="zones-grid">
                                <div className="zone-column">
                                    <h4>Direita</h4>
                                    <label>
                                        <input type="checkbox" {...register('anormalidades.parenquima.pequenasOpacidades.zonas.direita')} value="superior" />
                                        Superior
                                    </label>
                                    <label>
                                        <input type="checkbox" {...register('anormalidades.parenquima.pequenasOpacidades.zonas.direita')} value="media" />
                                        Média
                                    </label>
                                    <label>
                                        <input type="checkbox" {...register('anormalidades.parenquima.pequenasOpacidades.zonas.direita')} value="inferior" />
                                        Inferior
                                    </label>
                                </div>
                                <div className="zone-column">
                                    <h4>Esquerda</h4>
                                    <label>
                                        <input type="checkbox" {...register('anormalidades.parenquima.pequenasOpacidades.zonas.esquerda')} value="superior" />
                                        Superior
                                    </label>
                                    <label>
                                        <input type="checkbox" {...register('anormalidades.parenquima.pequenasOpacidades.zonas.esquerda')} value="media" />
                                        Média
                                    </label>
                                    <label>
                                        <input type="checkbox" {...register('anormalidades.parenquima.pequenasOpacidades.zonas.esquerda')} value="inferior" />
                                        Inferior
                                    </label>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>

            {/* Seção 4: Alterações Pleurais */}
            <section className="form-section">
                <h2>4. Alterações Pleurais</h2>
                <div className="form-group">
                    <label>
                        <input 
                            type="checkbox" 
                            {...register('anormalidades.pleural.presente')} 
                        /> 
                        Presentes
                    </label>
                </div>

                {formValues.anormalidades.pleural.presente && (
                    <>
                        <div className="form-group">
                            <h3>4.1 Placas Pleurais</h3>
                            <div className="form-row">
                                <div className="form-group">
                                    <label>Calcificação</label>
                                    <div className="checkbox-group">
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                {...register('anormalidades.pleural.placasPleurais.calcificacao')} 
                                                value="direita" 
                                            /> 
                                            Direita
                                        </label>
                                        <label>
                                            <input 
                                                type="checkbox" 
                                                {...register('anormalidades.pleural.placasPleurais.calcificacao')} 
                                                value="esquerda" 
                                            /> 
                                            Esquerda
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </section>

            {/* Seção 5: Símbolos */}
            <section className="form-section">
                <h2>5. Símbolos</h2>
                <div className="symbols-grid">
                    {['ax', 'bu', 'ca', 'cg', 'cn', 'co', 'cp', 'cv', 'di', 'ef', 'em', 'es', 'fr', 'hi', 'ho', 'id', 'ih', 'kl', 'me', 'pa', 'pb', 'pi', 'px', 'ra', 'rp', 'tb'].map(symbol => (
                        <label key={symbol} className="symbol-checkbox">
                            <input 
                                type="checkbox" 
                                {...register('simbolos')} 
                                value={symbol} 
                            /> 
                            {symbol.toUpperCase()}
                        </label>
                    ))}
                </div>
            </section>

            {/* Seção 6: Comentários */}
            <section className="form-section">
                <h2>6. Comentários</h2>
                <div className="form-group">
                    <textarea 
                        {...register('comentarios')} 
                        className="form-control" 
                        rows="4"
                    />
                </div>
            </section>

            <div className="form-actions">
                <button type="submit" className="btn-submit">
                    Salvar Formulário
                </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
                <pre className="form-debug">
                    {JSON.stringify(formValues, null, 2)}
                </pre>
            )}
        </form>
    );
};

export default RadiologicalForm;