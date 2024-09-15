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
            setMessage({msg: "Preencha todos os campos para criar um projeto.", type:"error"});
            return false;
        }        

        return true;
    }

    function nameValidation() {
        const sameName = projects.some((proj) => proj.name === project.name);

        if (sameName && !projectData) {
            setMessage({msg: "Um projeto com o mesmo nome já está cadastrado.", type:"error"});
            return false;    
        }

        if (project.name.length > 50) {
            setMessage({msg: "O nome de um projeto não pode exceder 50 caracteres.", type:"error"});
            return false;        
        }        

        return true;
    }

    function budgetValidation() {
        if (project.budget < 0) {
            setMessage({msg: "O valor do orçamento de um projeto deve ser positivo.", type:"error"});
            return false;
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

        const formattedProject = formatProject(project);

        if (emptyFieldValidation() && nameValidation() && budgetValidation()) {
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
            <Message msg={message.msg} type={message.type} />
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