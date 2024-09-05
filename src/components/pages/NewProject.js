import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
    return (
        <div className={styles.new_project}>
            <h1>Novo Projeto</h1>
            <p className={styles.description}>Preencha os campos para criar um novo projeto.</p>
            <ProjectForm />
        </div>
    );
}
export default NewProject;