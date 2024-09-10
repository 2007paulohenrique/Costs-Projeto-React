import styles from './Message.module.css';
import ErrIcon from '../../img/err.svg';
import SuccessIcon from '../../img/success.svg';
import {useState, useEffect } from 'react';

function Message({type, msg}) {
    const [visibility, setVisibility] = useState(false);

    useEffect(() => {
        if (!msg) {
            setVisibility(false);
            return;
        }

        setVisibility(true);

        const timer = setTimeout(() => {
            setVisibility(false);
        }, 6000);

        return () => clearTimeout(timer);

    }, [msg])
   

    return ( 
        <>
            {visibility && (
                type === "error" ? (
                    <div className={`${styles.message} ${styles[type]}`}>
                        <img src={ErrIcon} alt="Error icon" />
                        {msg}
                    </div>
                ) : type === "success" ? (
                    <div className={`${styles.message} ${styles[type]}`}>
                        <img src={SuccessIcon} alt="Success icon" />
                        {msg}
                    </div>
                ) : null
            )}
        </>
    )
}

export default Message;