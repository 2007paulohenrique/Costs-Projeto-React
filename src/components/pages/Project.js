import { useParams } from 'react-router-dom';
import styles from './Project.module.css';
import { useEffect, useState } from 'react';
import Loading from '../layout/Loading';
import ProjectForm from '../project/ProjectForm';
import Message from '../layout/Message';
import ServiceForm from '../service/ServiceForm';
import {v4 as uuidv4} from 'uuid';
import ServiceCard from '../service/ServiceCard';
import Container from '../layout/Container';

function Project() {
    const {id} = useParams();

    const [project, setProject] = useState([]);
    // const [service, setService] = useState({});
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false); 
    const [message, setMessage] = useState({});

    function setMessageWithReset(newMessage) {
        setMessage(null); 
        setTimeout(() => {
            setMessage(newMessage); 
        }, 1);
    }

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
                setServices(data.services);
            })
            .catch((err) => console.log(err))
    }, [id]);

    function editPost(project) {
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
                setMessageWithReset({msg: "Projeto modificado com sucesso.", type: "success"});
            })
            .catch((err) => console.log(err));
    }

    function formatService(service) {
        console.log(service);
        let name = service.name.trim();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const cost = parseFloat(service.cost).toFixed(2);
        let description = (service.description ? service.description.trim() : "");

        if (description) {
            description = description.charAt(0).toUpperCase() + description.slice(1);
        }

        return {name, cost, description};
    }

    function createService(project) {
        const lastService = project.services[project.services.length - 1];
        const formattedService = formatService(lastService);

        formattedService.id = uuidv4();
        
        const newCost = parseFloat(lastService.cost) + parseFloat(project.cost);

        if (newCost > parseFloat(project.budget)) {
            setMessageWithReset({msg: "Orçamento ultrapassado.", type: "error"});
            services.pop();
            return;
        }

        project.cost = parseFloat(newCost).toFixed(2);
        project.services[project.services.length - 1] = formattedService;
        
        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setShowServiceForm(false);
                setMessageWithReset({msg: `O serviço ${formattedService.name} foi adicionado com sucesso.`, type: "success"});
            })
            .catch((err) => console.log(err))
    }

    function removeService(id, cost) {
        const servicesUpdate = project.services.filter((service) => service.id !== id);
        const projectUpdate = project;
        const newCost = parseFloat(projectUpdate.cost) - parseFloat(cost)
        projectUpdate.services = servicesUpdate;
        projectUpdate.cost = parseFloat(newCost).toFixed(2);
        
        fetch(`http://localhost:5000/projects/${projectUpdate.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(projectUpdate)
        })
            .then((resp) => resp.json())
            .then((data) => {
                const deletedService = services.find((service) => service.id === id);
                setProject(projectUpdate);
                setServices(servicesUpdate);
                setMessageWithReset({msg: `O serviço ${deletedService.name} foi removido com sucesso.`, type: "success"});
            })
            .catch((err) => console.log(err))
    }

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm);
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm);
    }

    return (
        <div className={styles.projectArea}>
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
                                <p><span>Orçamento restante:</span> R${parseFloat(project.budget - project.cost).toFixed(2)}</p>
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
                        {services.length === 0 && <p>Não há serviços cadastrados</p>}

                        <Container customClass="start" >
                            {services.length > 0 && (
                                services.map((service) => <ServiceCard
                                    id={service.id}
                                    name={service.name}
                                    cost={service.cost}
                                    description={service.description}
                                    key={service.id}
                                    handleRemove={removeService}
                                />)
                            )}
                        </Container>

                        <hr/>

                        <button type="button" onClick={toggleServiceForm} className={styles.btn} >
                            {!showServiceForm ? "Adicionar Serviço" : "Voltar"}
                        </button>

                        {showServiceForm && (<ServiceForm
                            projectId={id}
                            btnText="Adicionar"
                            handleSubmit={createService}
                            projectData={project}
                        />)}
                    </div>
                </div>
            ) : <Loading />}
        </div>
    );
}

export default Project;