import styles from './Home.module.css';
import savings from '../../img/savings.svg';
import LinkBtn from '../layout/LinkBtn';

function Home() {
    return (
        <section className={styles.home} >
            <h1 className={styles.title} >Bem-vindo ao <span>Costs</span></h1>
            <p className={styles.description}>Comece a gerenciar seus projetos de forma rápida e eficiente!</p>
            <LinkBtn to="/newproject" text="Novo Projeto" />
            <img className={styles.img} src={savings} alt="Costs" ></img>
        </section>
    );
}

export default Home;