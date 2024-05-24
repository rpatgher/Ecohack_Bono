import { useState, Fragment } from 'react';

// ***************** Styles *****************
import styles from '../styles/FormSuelo.module.css';


const FormSuelo = () => {
    const [request, setRequest] = useState({
        FS_N_F_ON_CONDITIONS: [],
        F_CR: "",
        F_SOM: "",
        EF_1: "",
        N2O_N_OS_CONDITIONS: [],
        N2O_N_PRP_CONDITIONS: [],
    });

    const [fs_n_f_on_conditions, setFsNFOnConditions] = useState([]);
    const [n2o_n_os_conditions, setN2oNOsConditions] = useState([]);
    const [n2o_n_prp_conditions, setN2oNPrpConditions] = useState([]);

    const [conditions, setConditions] = useState([
        { title: 'Tierra forestal, drenada (Nutrientes pobres); Clima Boreal', factor: 0.22, key: 'trop' },
        { title: 'Tierra forestal, drenada (Nutrientes ricos); Clima Boreal', factor: 3.2, key: 'trop-rich' },
        { title: 'Tierra forestal, drenada; Clima Templado', factor: 2.8, key: 'trop' },
        { title: 'Tierra forestales y tierras forestales despejadas, drenadas; Clima Tropical / Subtropical', factor: 2.4, key: 'f-land-clear' },
        { title: 'Plantación: palma aceitera; Clima Tropical / Subtropical', factor: 1.2, key: 'oil-palm' },
        { title: 'Platanción: palma de sagú; Clima Tropical / Subtropical', factor: 3.3, key: 'sago-palm' },
        { title: 'Tierra de cultivo, drenada; Clima Boreal y templado', factor: 13, key: 'cropland' },
        { title: 'Tierra de cultivo excepto arroz; Clima Tropical / Subtropical', factor: 5, key: 'without-rice' },
        { title: 'Arroz; Clima Tropical / Subtropical', factor: 0.4, key: 'rice' },
        { title: 'Pastizales drenados; Clima Boreal', factor: 9.5, key: 'drained-grassland' },
        { title: 'Pastizales drenados (Nutrientes pobres); Clima Templado', factor: 4.3, key: 'drained-grassland' },
        { title: 'Pastizales profundamente drenados (Nutrientes ricos); Clima Templado', factor: 8.2, key: 'deep-drained-grassland' },
        { title: 'Pastizales superficial drenados (Nutrientes ricos); Clima Templado', factor: 1.6, key: 'shallow-drained-grassland' },
        { title: 'Pastizales; Clima Tropical / Subtropical', factor: 5, key: 'grassland' },
        { title: 'Áreas para extracción de turba; Clima Boreal y Templado', factor: 0.3, key: 'peatland' },
        { title: 'Áreas para extracción de turba; Clima Tropical / Subtropical', factor: 3.6, key: 'peatland-tropical' },
    ]);

    const [amount, setAmount] = useState(1);

    const handleChange = (e) => {
        const { value, name } = e.target;
        setRequest((prev) => ({
            ...prev,
            [name]: value,
        }));
    }

    const handleAmountChange = (e, i) => {
        const { value, name } = e.target;
        setRequest((prev) => ({
            ...prev,
            FS_N_F_ON_CONDITIONS: [
                ...prev.FS_N_F_ON_CONDITIONS.slice(0, i),
                {
                    ...prev.FS_N_F_ON_CONDITIONS[i],
                    [name]: value,
                },
                ...prev.FS_N_F_ON_CONDITIONS.slice(i + 1),
            ],
        }));  
    };

    const handleCheckboxChange = (e, condition) => {
        const { checked } = e.target;
        setConditions((prev) => {
            const index = prev.findIndex((c) => c.key === condition.key);
            return [
                ...prev.slice(0, index),
                {
                    ...prev[index],
                    checked,
                },
                ...prev.slice(index + 1),
            ];
        });
        setRequest((prev) => ({
            ...prev,
            N2O_N_OS_CONDITIONS: [
                ...prev.N2O_N_OS_CONDITIONS,
                {
                    EF_2: e.target.dataset.factor,
                    type: condition.key
                },
            ],
        }));
    };

    const handleTextCheckboxChange = (e, i) => {
        const { value, dataset } = e.target;
        const currentCondition = request.N2O_N_OS_CONDITIONS.find((condition) => condition.type === dataset.type);
        setRequest((prev) => ({
            ...prev,
            N2O_N_OS_CONDITIONS: [
                ...prev.N2O_N_OS_CONDITIONS.slice(0, i),
                {
                    ...currentCondition,
                    F_OS: value,
                },
                ...prev.N2O_N_OS_CONDITIONS.slice(i + 1),
            ],
        }));
    }

    const handleCheckboxChange2 = (e) => {
        const { value, name } = e.target;
        setRequest((prev) => ({
            ...prev,
            N2O_N_PRP_CONDITIONS: [
                ...prev.N2O_N_PRP_CONDITIONS,
                {
                    EF_2: value,
                    type: name
                },
            ],
        }));
    }

    return (
        <form className={styles.form}>
            <div className={styles["multi-input"]}>
                <div className={styles.more}>
                    <button 
                        type="button"
                        onClick={() => setAmount(amount + 1)}
                    >+</button>
                    {amount > 1 && (
                        <button 
                            type="button"
                            onClick={() => setAmount(amount - 1)}
                        >-</button>
                    )}
                </div>
                <div className={styles["multi-input-fields"]}>
                    {amount > 0 && Array.from({ length: amount }).map((_, i) => (
                        <div 
                            key={i}
                            className={styles["multi-input-field"]}
                        >
                            <div className={styles.field}>
                                <label htmlFor="F_SN">Cantidad Anual Sintético:</label>
                                <input
                                    id="F_SN"
                                    name="F_SN"
                                    type="text"
                                    placeholder='Ej. 100'
                                    value={request.FS_N_F_ON_CONDITIONS[i]?.F_SN || ''}
                                    onChange={(e) => handleAmountChange(e, i)}
                                />
                                <p>Cantidad anual de fertilizante sintético aplicado a suelos</p>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="F_ON">Cantidad Anual Orgánico:</label>
                                <input
                                    id="F_ON"
                                    name="F_ON"
                                    type="text"
                                    placeholder='Ej. 500'
                                    value={request.FS_N_F_ON_CONDITIONS[i]?.F_ON || ''}
                                    onChange={(e) => handleAmountChange(e, i)}
                                />
                                <p>Cantidad anual de estiércol animal, composta, lodos de aguas residuales y otras adiciones orgánicas aplicadas a los suelos</p>
                            </div>
                            <div className={styles.field}>
                                <label htmlFor="EF_1i">Cantidad Anual Orgánico:</label>
                                <input
                                    id="EF_1i"
                                    name="EF_1i"
                                    type="text"
                                />
                                <p>Cantidad anual de fertilizante sintético aplicado a suelos</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.field}>
                <label htmlFor="F_CR">Cantidad Anual Residuos:</label>
                <input
                    id="F_CR"
                    name="F_CR"
                    type="text"
                    placeholder='Ej. 700'
                    value={request.F_CR || ''}
                    onChange={handleChange}
                />
                <p>Cantidad anual en residuos de cultivos (por encima del suelo y por debajo del suelo), incluidos los cultivos de fijación, y de la renovación de forraje/pastos, devueltos a los suelos</p>
            </div>
            <div className={styles.field}>
                <label htmlFor="F_SOM">Cantidad Anual Minerales:</label>
                <input
                    id="F_SOM"
                    name="F_SOM"
                    type="text"
                    placeholder='Ej. 700'
                    value={request.F_SOM || ''}
                    onChange={handleChange}
                />
                <p>Cantidad anual en suelos minerales que está mineralizado, en asociación con la pérdida de suelo C de la materia orgánica del suelo como resultado de cambios en el uso o la gestión de la tierra</p>
            </div>
            <div className={styles.field}>
                <label htmlFor="EF_1">Factor de emisión:</label>
                <div className={styles["disabled-field"]}>
                    0.02
                </div>
                <p>Factor de emisión de las emisiones de N2O de los insumos</p>
            </div>
            <div className={styles.field}>
                <label htmlFor="F_SOM">Emisiones directas anuales de N<sub>2</sub>O-N de suelos orgánicos gestionados:</label>
                <div className={styles.checkboxes}>
                    {conditions.map((condition, i) => (
                        <div 
                            className={styles.checkbox}
                            key={i}
                        >
                            <input 
                                type="checkbox"
                                id={condition.key}
                                name={condition.key}
                                data-factor={condition.factor}
                                onChange={(e) => handleCheckboxChange(e, condition)}
                            />
                            <label htmlFor={condition.key}>{condition.title}</label>
                            {condition?.checked && (
                                <input 
                                    type="text"
                                    className={styles["input-text-checkbox"]}
                                    data-factor={condition.factor}
                                    data-type={condition.key}
                                    placeholder='Ej. 700'
                                    onChange={(e) => handleTextCheckboxChange(e, i)}
                                />
                            )}
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.field}>
                <label htmlFor="F_SOM">Emisiones anuales directas de N<sub>2</sub>O-N de la orina y los insumos de estiércol a los suelos de pastoreo</label>
                <div className={styles.checkboxes}>
                    <div className={styles.checkbox}>
                        <input 
                            type="checkbox"
                            id="trop"
                            name="trop"
                        />
                        <label htmlFor="trop">Trop</label>
                        <input 
                            type="text"
                            className={styles["input-text-checkbox"]}
                            placeholder='Ej. 700'
                        />
                    </div>
                </div>
            </div>
        </form>
    )
}

export default FormSuelo
