import Input from '../form/Input';
import Select from '../form/Select';
import SubmitBtn from '../form/SubmitBtn';
import styles from './ProjectForm.module.css';

function ProjectForm() {
    return (
        <form className={styles.form} >
            <Input type="text" name="nome" placeholder="Insira o nome do projeto" text="Nome do Projeto:" />
            <Input type="number" name="orcamento" placeholder="Insira o orçamento total do projeto" text="Orçamento Total:" />
            <Select name="categoria" text="Categoria:" />
            <SubmitBtn text="Criar Projeto"/>
        </form>
    );
}

export default ProjectForm;