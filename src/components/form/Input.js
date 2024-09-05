import styles from './Input.module.css';

function Input({type, name, text, placeholder, value, handleOnChance}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name} ><h2>{text}</h2></label>
            <input type={type} placeholder={placeholder} id={name} name={name} ></input>
        </div>
    );
}

export default Input;