import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import styles from './Projects.module.css';
import Container from "../layout/Container";
import LinkBtn from "../layout/LinkBtn";
import { useEffect, useState } from "react";
import ProjectCard from "../project/ProjectCard";
import Loading from "../layout/Loading";


function Projects() {
    const [projects, setProjects] = useState([]);
    const [removedProject, setRemovedProject] = useState({});
    const [removeLoading, setRemoveLoading] = useState(false);
    const [alertMessage, setAlertMessage] = useState("");
    const [showAlert, setShowAlert] = useState(false);
    const [message, setMessage] = useState({});

    function setMessageWithReset(newMessage) {
        setMessage(null); 
        setTimeout(() => {
            setMessage(newMessage); 
        }, 1);
    }
    
    const location = useLocation();
   
    useEffect(() => {
        if (location.state) {
            const { message, type } = location.state;
            setMessageWithReset({ message, type });
        }
    }, [location.state]);
    
    function searchProject(id) {
        return projects.find((project) => project.id === id);
    }

    function removeProject(id) {
        setAlertMessage("Os dados do projeto e seus serviços serão permanentemente removidos. Deseja continuar?");
        setShowAlert(true);

        setRemovedProject(searchProject(id));
    };
    
    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProjects(data);
                setRemoveLoading(true);
            })
            .catch((err) => console.log(err));
    }, [])

    function confirmRemoveProject() {
        setShowAlert(false);
        fetch(`http://localhost:5000/projects/${removedProject.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            }
        }) 
            .then((resp) => resp.json())
            .then((data) => {
                const removeMessage = `O projeto ${removedProject.name || ""} foi removido com sucesso.`;
                setProjects(projects.filter((proj) => proj.id !== removedProject.id));
                setMessageWithReset({message: removeMessage, type: "success"});
            })
            .catch((err) => console.log(err))
    }

    function cancel() {
        setShowAlert(false);
    }

    return (
        <main className={styles.projects}> 
            <h1>Meus Projetos</h1>
            {message && <Message msg={message.message} type={message.type} />}
            {showAlert && (
                <Message
                    type="alert"
                    msg={alertMessage}
                    handleConfirm={confirmRemoveProject}
                    handleCancel={cancel}
                />
            )}
            <Container customClass="start" >
                {projects.length > 0 && 
                    projects.map((project) => <ProjectCard 
                        id={project.id} 
                        name={project.name} 
                        budget={project.budget}
                        category={project.category ? project.category.name : ""} 
                        key={project.id} 
                        handleRemove={removeProject} />
                    )                 
                }
                {!removeLoading && <Loading />}
                {removeLoading && projects.length === 0 && (
                    <p>Você ainda não possui nenhum projeto!</p>
                )}
            </Container>
            <LinkBtn to="/newproject" text="Novo Projeto" />
        </main>
    );
}

export default Projects;