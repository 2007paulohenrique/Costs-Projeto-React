import styles from './ProjectCard.module.css';
import Edit_icon from '../../img/edit_icon.svg';
import Remove_icon from '../../img/remove_icon.svg';

function ProjectCard({id, name, budget, category, handleRemove}) {
    const remove = (e) => {
        e.preventDefault();
        handleRemove(id);
    }

    return (
        <div className={styles.projectCard}>
            <h3 className={styles.title} >{name}</h3>
            <p><span className={styles.budget}>Orçamento:</span> R${budget}</p>
            <p><span>Categoria:</span> {category}</p>
            <div className={styles.actions} >
                <button type="button" className={styles.edit} >
                    <img src={Edit_icon} alt="Editar" />
                    Editar                    
                </button>
                <button type="button" className={styles.remove} onClick={remove} >
                    <img src={Remove_icon} alt="Remover" />
                    Remover                    
                </button>
            </div>
        </div>
    );
}

export default ProjectCard;