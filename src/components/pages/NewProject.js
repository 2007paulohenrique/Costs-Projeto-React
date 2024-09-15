
import {useNavigate} from 'react-router-dom';
import ProjectForm from '../project/ProjectForm';
import styles from './NewProject.module.css';

function NewProject() {
    const navigate = useNavigate();

    function createPost(project) {
        project.cost = parseFloat(0).toFixed(2);
        project.services = [];

        const goToProjects = () => {
            navigate('/projects', {
                state: {message: `Projeto ${project.name || ""} criado com sucesso.`, type: "success"}
            });
        } 

        fetch('http://localhost:5000/projects', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                goToProjects();
            })
            .catch((err) => console.log(err));
    }

    return (
        <main className={styles.new_project}>
            <h1>Novo Projeto</h1>
            <p className={styles.description}>Preencha os campos para criar um novo projeto.</p>
            <ProjectForm handleSubmit={createPost} btnText="Criar Projeto" />
        </main>
    );
}
export default NewProject;