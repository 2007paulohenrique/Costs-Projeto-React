import styles from './Select.module.css';

function Select({name, text, value, options, handleOnChance}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name} ><h2>{text}</h2></label>
            <select id={name} name={name} >
                <option disabled>Selecione a categoria</option>
            </select>
        </div>
    );
}

export default Select;