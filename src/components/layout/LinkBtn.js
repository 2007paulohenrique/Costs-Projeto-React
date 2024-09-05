import { Link } from 'react-router-dom';
import styles from './LinkBtn.module.css';

function LinkBtn({to, text}) {
    return <Link className={styles.button} to={to}><strong>{text}</strong></Link>
}

export default LinkBtn;