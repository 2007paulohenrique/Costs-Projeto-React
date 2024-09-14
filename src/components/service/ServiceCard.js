import styles from '../project/ProjectCard.module.css';
import Remove_icon from '../../img/remove_icon.svg';

function ServiceCard({id, name, cost, description, handleRemove}) {
    const remove = (e) => {

    }

    return (
        <div className={styles.projectCard}>
            <h3 className={styles.title} >{name}</h3>

            <p><span className={styles.budget}>Custo:</span> R${cost}</p>
            <span>Descrição:</span>
            <br/>
            <p className={styles.description}>{description}</p>

            <div className={styles.actions} >
                <button type="button" className={styles.remove} onClick={remove} >
                    <img src={Remove_icon} alt="Remover" />
                    Remover                    
                </button>
            </div>
        </div>
    );
}

export default ServiceCard;