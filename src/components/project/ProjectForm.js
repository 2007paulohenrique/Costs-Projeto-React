import {useState, useEffect} from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitBtn from '../form/SubmitBtn';
import styles from './ProjectForm.module.css';

function ProjectForm({handleSubmit, btnText, projectData}) {
    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});

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

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
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
    );
}

export default ProjectForm;