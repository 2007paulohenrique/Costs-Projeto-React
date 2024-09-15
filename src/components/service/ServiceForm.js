import styles from '../project/ProjectForm.module.css';

import Input from '../form/Input';
import SubmitBtn from '../form/SubmitBtn';
import { useEffect, useState } from 'react';
import Message from '../layout/Message';


function ServiceForm({projectId, handleSubmit, btnText, projectData}) {
    const [service, setService] = useState({});
    const [services, setServices] = useState([]);
    const [message, setMessage] = useState({});

    function setMessageWithReset(newMessage) {
        setMessage(null); 
        setTimeout(() => {
            setMessage(newMessage); 
        }, 1);
    }

    useEffect(() => {
        fetch(`http://localhost:5000/projects/${projectId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then((resp) => resp.json())
            .then((data) => {
                setServices(data.services);
            })
            .catch((err) => console.log(err))
    }, [projectId]);
    
    function emptyFieldValidation() {
        if (!(service.name && service.cost)) {
            setMessageWithReset({msg: "Preencha os campos de nome e custo para adicionar um serviço.", type:"error"});
            return false;
        }        

        return true;
    }

    function nameValidation() {
        if (service.name.length > 50) {
            setMessageWithReset({msg: "O nome de um serviço não pode exceder 50 caracteres.", type:"error"});
            return false;        
        }        

        return true;
    }

    function costValidation() {
        if (service.cost < 0) {
            setMessageWithReset({msg: "O valor do custo de um serviço deve ser positivo.", type:"error"});
            return false;
        }        

        return true;
    }

    function sameNameServiceValidation() {
        const formattedServiceName = (service.name.charAt(0).toUpperCase() + service.name.slice(1));
        const sameName = services.some((serv) => serv.name === formattedServiceName);

        if (sameName) {
            setMessageWithReset({msg: "O projeto já possui um serviço com o mesmo nome.", type:"error"});
            return false;    
        }

        return true;
    }

    
    function submit(e) {
        e.preventDefault();

        if ((emptyFieldValidation() && nameValidation() && costValidation() && sameNameServiceValidation())) {
            projectData.services.push(service);
            handleSubmit(projectData);
        }
    }

    function handleChange(e) {
        setService({...service, [e.target.name]: e.target.value});
    }

    return (
        <>
            {message && <Message msg={message.msg} type={message.type} />}
            <form onSubmit={submit} className={styles.form} >
                <Input
                    type="text"
                    text="Nome do Serviço"
                    name="name"
                    placeholder="Insira o nome do serviço"
                    handleOnChange={handleChange}
                />

                <Input
                    type="number"
                    text="Custo do Serviço"
                    name="cost"
                    placeholder="Insira o custo do serviço"
                    handleOnChange={handleChange}
                />

                <Input
                    type="text"
                    text="Descrição do Serviço"
                    name="description"
                    placeholder="Descreva o serviço"
                    handleOnChange={handleChange}
                />

                <SubmitBtn text={btnText} />
            </form>
        </>
    );
}

export default ServiceForm;