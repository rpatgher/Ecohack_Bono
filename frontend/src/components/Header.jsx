import { Link, useLocation } from 'react-router-dom';

// ***************** Styles *****************
import styles from '../styles/Header.module.css';

const Header = ({ title }) => {
    const location = useLocation();
    return (
        <header className={styles.header}>
            <div className={styles.overlay}>
                <nav className={styles.nav}>
                    <h2>Eco<span>hack</span></h2>
                    <ul>
                        <li>
                            <Link 
                                to="/"
                                className={location.pathname === '/' ? styles.active : ''}
                            >Calculadora</Link>
                        </li>
                        <li>
                            <Link 
                                to="/data"
                                className={`${location.pathname === '/data' ? styles.active : ''}`}
                            >Datos Historícos</Link>
                        </li>
                    </ul>    
                </nav> 
                <div className={styles.content}>
                    <h1>{title}</h1>
                </div>
            </div>
        </header>
    )
}

export default Header
