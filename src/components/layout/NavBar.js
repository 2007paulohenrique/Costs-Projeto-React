import { Link } from 'react-router-dom';
import styles from './NavBar.module.css';
import logo from '../../img/costs_logo.png';

function NavBar() {
    return (
        <nav className={styles.navBar}>
            <Link to="/"><img src={logo} alt="Costs logo" className={styles.img} /></Link>
            <ul className={styles.links}>
                <li className={styles.item}><Link to="/">Home</Link></li>
                <li className={styles.item}><Link to="/projects">Projetos</Link></li>
                <li className={styles.item}><Link to="/newproject">Novo projeto</Link></li>
            </ul>
        </nav>
    );
}

export default NavBar;
