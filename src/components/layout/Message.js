import styles from './Message.module.css';
import ErrIcon from '../../img/err.svg';
import SuccessIcon from '../../img/success.svg';
import AlertIcon from '../../img/alert.svg'
import {useState, useEffect } from 'react';

function Message({type, msg, handleConfirm, handleCancel}) {
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        if (!msg) {
            setVisibility(false);
            return;
        }

        setVisibility(true);

        if (type !== "alert") {
            const timer = setTimeout(() => {
                setVisibility(false);
            }, 6000);
    
            return () => clearTimeout(timer);
        }
    }, [msg, type])

    const icon = type === "error" ? ErrIcon : type === "success" ? SuccessIcon : type === "alert" ? AlertIcon : null;

    return ( 
        <>
            {visibility && (type !== "alert" ? (
               <div className={`${styles.message} ${styles[type]}`}>
                    <img src={icon} alt={`${type} icon`} />
                    {msg}
                </div>
            ) : (
                <div className={`${styles.message} ${styles[type]}`}>
                    <img src={icon} alt={`${type} icon`} />
                    {msg}
                    <button type="button" onClick={handleConfirm} className={styles.button}>Continuar</button>
                    <button type="button" onClick={handleCancel} className={styles.button}>Cancelar</button>
                </div>
            ))}
        </>
    )
}

export default Message;