import { useLocation } from "react-router-dom";
import Message from "../layout/Message";
import styles from './Projects.module.css';

function Projects() {
    const location = useLocation();
    let msg = "";
    let type = "";
    
    if (location.state) {
        msg = location.state.message;
        type = location.state.type;
    }

    return (
        <main className={styles.projects}> 
            <h1>Meus Projetos</h1>
            <Message msg={msg} type={type} />
        </main>
    );
}

export default Projects;