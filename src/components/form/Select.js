import styles from './Select.module.css';

function Select({name, text, value, options, handleOnChange}) {
    return (
        <div className={styles.form_control}>
            <label htmlFor={name} ><h2>{text}</h2></label>
            <select id={name} name={name} onChange={handleOnChange} value={value || ""}>
                <option disabled>Selecione uma opção</option>
                {options.map((option) => (
                    <option value={option.id} key={option.id}>{option.name}</option>
                ))}
            </select>
        </div>
    );
}

export default Select;