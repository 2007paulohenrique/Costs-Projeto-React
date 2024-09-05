import instagram from '../../img/instagram.png';
import github from '../../img/discord.png';
import discord from '../../img/github.png';
import styles from './Footer.module.css';

function Footer() {
    return (
        <footer className={styles.footer} >
            <h2 className={styles.mid_title}>Mídias do Desenvolvedor:</h2>
            <ul className={styles.social_list} >
                <li><img className={styles.img} src={instagram} alt="Instagram" /></li>
                <div className={styles.vert_line}></div>
                <li><img className={styles.img} src={discord} alt="Discord" /></li>
                <div className={styles.vert_line}></div>
                <li><img className={styles.img} src={github} alt="GitHub" /></li>
            </ul>
            <p className={styles.copyright}><span>Costs</span> &copy; 2024</p>
        </footer>
    );
}

export default Footer