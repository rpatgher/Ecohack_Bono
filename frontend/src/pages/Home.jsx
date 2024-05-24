import { useState } from 'react';

// ***************** Styles *****************
import styles from '../styles/Home.module.css';

// ***************** Components *****************
import Header from '../components/Header';
import FormFoliar from '../components/FormFoliar';
import FormSuelo from '../components/FormSuelo';


const Home = () => {
    const [type, setType] = useState('suelo');
    return (
        <>
            <Header 
                title={'Calculadora de Emisiones'}
            />
            <main className={styles.main}>
                <div className={styles["form-buttons"]}>
                    <button
                        type='button'
                        data-type='suelo'
                        onClick={() => setType('suelo')}
                        className={`${type === 'suelo' ? styles.active : ''}`}
                    >Suelo</button>
                    <button
                        type='button'
                        data-type='foliar'
                        onClick={() => setType('foliar')}
                        className={`${type === 'foliar' ? styles.active : ''}`}
                    >Foliar</button>
                </div>
            </main>
            <section className={styles.form}>
                {type === 'suelo' ? <FormSuelo /> : <FormFoliar />}
            </section>
        </>
    )
}

export default Home
