

import styles from '../styles/Modal.module.css';

const Modal = ({ setOpen, text }) => {
    return (
        <div className={styles.modal}>
            <div className={styles["modal-content"]}>
                <span 
                    onClick={() => setOpen(false)}
                    className={styles.close}
                >&times;</span>
                <h2>Modal Title</h2>
                <p>{text}</p>

            </div>
        </div>
    )
}

export default Modal
