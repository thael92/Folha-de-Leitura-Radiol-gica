import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { DeviceDetector } from '../../utils/deviceDetector';
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
            radiografiaNormal: false,
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
                    grandesOpacidades: {
                        presente: false,
                        categoria: ''
                    }
                },
                pleural: {
                    presente: false,
                    placasPleurais: {
                        presente: false,
                        localizacao: {
                            direita: [],
                            esquerda: []
                        },
                        calcificacao: [],
                        extensao: {
                            direita: '',
                            esquerda: ''
                        }
                    }
                }
            },
            simbolos: [],
            comentarios: ''
        }
    });

    useEffect(() => {
        const adjustFormSize = () => {
            const form = document.querySelector('.form-container');
            if (form) {
                const zoom = DeviceDetector.adjustZoom();
                form.style.transform = `scale(${zoom})`;
                form.style.transformOrigin = 'top left';
            }
        };

        adjustFormSize();
        window.addEventListener('resize', adjustFormSize);
        return () => window.removeEventListener('resize', adjustFormSize);
    }, []);

    const handlePrint = () => {
        window.print();
    };

    const onSubmit = (data) => {
        console.log('Dados do formulário:', data);
        // Aqui você pode enviar os dados para a API
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Informações Pessoais */}
                <section className="form-section">
                    <h2>Informações Pessoais</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nome</label>
                            <input 
                                {...register('personalInfo.nome')}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Data RX</label>
                            <input 
                                type="date"
                                {...register('personalInfo.dataRx')}
                                className="form-control"
                            />
                        </div>
                        <div className="form-group">
                            <label>Número RX</label>
                            <input 
                                {...register('personalInfo.numeroRx')}
                                className="form-control"
                            />
                        </div>
                    </div>
                </section>

                {/* Qualidade Técnica */}
                <section className="form-section">
                    <h2>Qualidade Técnica</h2>
                    <div className="form-row">
                        <div className="form-group">
                            <label>Nível</label>
                            <select 
                                {...register('qualidadeTecnica.nivel')}
                                className="form-control"
                            >
                                <option value="">Selecione...</option>
                                <option value="1">1 - Boa</option>
                                <option value="2">2 - Regular</option>
                                <option value="3">3 - Ruim</option>
                                <option value="4">4 - Inaceitável</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Comentário</label>
                            <textarea 
                                {...register('qualidadeTecnica.comentario')}
                                className="form-control"
                            />
                        </div>
                    </div>
                </section>

                {/* Radiografia Normal */}
                <section className="form-section">
                    <h2>Radiografia Normal</h2>
                    <div className="form-group">
                        <label>
                            <input 
                                type="checkbox"
                                {...register('radiografiaNormal')}
                            />
                            Radiografia Normal
                        </label>
                    </div>
                </section>

                {/* Anormalidades */}
                <section className="form-section">
                    <h2>Anormalidades</h2>
                    {/* Parênquima */}
                    <div className="form-subsection">
                        <h3>Parênquima</h3>
                        <div className="form-group">
                            <label>
                                <input 
                                    type="checkbox"
                                    {...register('anormalidades.parenquima.presente')}
                                />
                                Presente
                            </label>
                        </div>
                        {/* Adicione mais campos conforme necessário */}
                    </div>
                </section>

                {/* Símbolos */}
                <section className="form-section">
                    <h2>Símbolos</h2>
                    <div className="symbols-grid">
                        {/* Adicione os símbolos aqui */}
                    </div>
                </section>

                {/* Comentários */}
                <section className="form-section">
                    <h2>Comentários</h2>
                    <div className="form-group">
                        <textarea 
                            {...register('comentarios')}
                            className="form-control"
                            rows="4"
                        />
                    </div>
                </section>

                <div className="form-actions">
                    <button type="submit" className="btn btn-primary">
                        Salvar
                    </button>
                    <button 
                        type="button" 
                        onClick={handlePrint} 
                        className="btn btn-secondary no-print"
                    >
                        Imprimir
                    </button>
                </div>
            </form>
        </div>
    );
};

export default RadiologicalForm;