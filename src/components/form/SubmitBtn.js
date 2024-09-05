import styles from './SubmitBtn.module.css';

function SubmitBtn({text}) {
    return <button className={styles.SubmitBtn} type="submit"><strong>{text}</strong></button>
}

export default SubmitBtn;