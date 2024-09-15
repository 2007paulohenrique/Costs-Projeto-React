import {useState, useEffect} from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitBtn from '../form/SubmitBtn';
import styles from './ProjectForm.module.css';
import Message from '../layout/Message';

function ProjectForm({handleSubmit, btnText, projectData}) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    const [message, setMessage] = useState({});
    const [projects, setProjects] = useState([]);

    function setMessageWithReset(newMessage) {
        setMessage(null); 
        setTimeout(() => {
            setMessage(newMessage); 
        }, 1);
    }

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err));
    }, []);

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
            })
            .catch((err) => console.log(err));
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data);
            })
            .catch((err) => console.log(err));
    }, []);

    function emptyFieldValidation() {
        if (!(project.name && project.budget && project.category)) {
            setMessageWithReset({msg: "Preencha todos os campos para criar um projeto.", type:"error"});
            return false;
        }        

        return true;
    }

    function nameValidation() {
        const formattedProjectName = (project.name.charAt(0).toUpperCase() + project.name.slice(1));
        const sameName = projects.some((proj) => formattedProjectName === proj.name);

        if ((projectData && (formattedProjectName !== projectData.name)) || !projectData) {
            if (sameName) {
                setMessageWithReset({msg: "Um projeto com o mesmo nome já está cadastrado.", type:"error"});
                return false;    
            }
        }

        if (project.name.length > 50) {
            setMessageWithReset({msg: "O nome de um projeto não pode exceder 50 caracteres.", type:"error"});
            return false;        
        }        

        return true;
    }

    function budgetValidation() {
        if (project.budget < 0) {
            setMessageWithReset({msg: "O valor do orçamento de um projeto deve ser positivo.", type:"error"});
            return false;
        }        

        if (parseFloat(project.budget) < parseFloat(project.cost)) {
            console.log(project.budget, project.cost, project.budget < project.cost);
            setMessageWithReset({msg: "O orçamento do projeto não pode ser menor que o seu custo!", type: "error"});
            return;
        }

        return true;
    }

    function formatProject(project) {
        let name = project.name.trim();
        name = name.charAt(0).toUpperCase() + name.slice(1);
        const budget = parseFloat(project.budget).toFixed(2);
        const category = project.category;

        return {name, budget, category};
    }

    const submit = (e) => {
        e.preventDefault();

        
        if (emptyFieldValidation() && nameValidation() && budgetValidation()) {
            const formattedProject = formatProject(project);
            handleSubmit(formattedProject);
        }
        
    }

    function handleChange (e) {
        setProject({ ...project, [e.target.name]: e.target.value});
    }
    
    function handleCategory (e) {
        setProject({
            ...project,
            category: {
                id: e.target.value,
                name: e.target.options[e.target.selectedIndex].text
            }
        });
    }

    return (
        <>
            {message && <Message msg={message.msg} type={message.type} />}
            <form className={styles.form} onSubmit={submit}>
                <Input 
                    handleOnChange={handleChange} 
                    type="text" 
                    name="name" 
                    placeholder="Insira o nome do projeto" 
                    text="Nome do Projeto:" 
                    value={project.name} 
                />
                <Input 
                    handleOnChange={handleChange} 
                    type="number" 
                    name="budget" 
                    placeholder="Insira o orçamento total do projeto" 
                    text="Orçamento Total:" 
                    value={project.budget} 
                />
                <Select 
                    name="category" 
                    text="Categoria:" 
                    options={categories} 
                    handleOnChange={handleCategory} 
                    value={project.category ? project.category.id : ""} 
                />
                <SubmitBtn text={btnText} />
            </form>
        </>
    );
}

export default ProjectForm;