import { useParams } from 'react-router-dom';
import styles from './Project.module.css';
import { useEffect, useState } from 'react';
import Loading from '../layout/Loading';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';

function Project() {
    const {id} = useParams();

    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false); 
    const [message, setMessage] = useState({});

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                console.log(project)
            })
            .catch((err) => console.log(err))
    }, [id]);

    function editPost(project) {
        setMessage({});

        if (project.budget < project.cost) {
            setMessage({msg: "O orçamento do projeto não pode ser menor que o seu custo!", type: "error"});
            return;
        }

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data);
                setShowProjectForm(false);
                setMessage({msg: "Projeto modificado com sucesso.", type: "success"});
            })
            .catch((err) => console.log(err));
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (
        <>
            {project.name ? (
                <div className={styles.project}>
                    {message && <Message type={message.type} msg={message.msg} /> }
                    <h1 className={styles.title} >{project.name}</h1>
                    {!showProjectForm ? (
                        <div className={styles.projectDetails} >
                            <h2>Detalhes do Projeto:</h2>
                            <hr/>
                            <div>
                                <p><span>Categoria:</span> {project.category.name}</p>
                                <p><span>Orçamento total:</span> R${project.budget}</p>
                                <p><span>Valor gasto:</span> R${project.cost}</p>
                                <p><span>Orçamento restante:</span> R${project.budget - project.cost}</p>
                            </div>
                        </div>
                    ) : (
                        <div>
                            <ProjectForm handleSubmit={editPost} btnText="Concluir Edição" projectData={project} />
                        </div>
                    )}
                    <button type="button" onClick={toggleProjectForm} className={styles.btn} >
                        {!showProjectForm ? "Editar" : "Voltar"}
                    </button>

                    <hr/>

                    <div className={styles.services}>
                        <h2>Serviços:</h2>

                        <button type="button" onClick={toggleServiceForm} className={styles.btn} >
                            {!showServiceForm ? "Adicionar serviço" : "Voltar"}
                        </button>
                    </div>
                </div>
            ) : <Loading />}
        </>
    );
}

export default Project;