import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Message from "../layout/Message";
import Container from "../layout/Container";
import LinkButtom from "../layout/LinkButton";

import styles from  './Projects.module.css';
import ProjectCard from "../project/ProjectCard";

function Projects() {

    const [projects, setProjects] = useState([]);

    const location = useLocation();
    let message = '';

    if(location.state) {
        message = location.state.message
    }

    useEffect(() => {
        fetch('http://localhost:5000/projects', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((resp) => resp.json())
        .then((data) => {
            console.log(data)
            setProjects(data)
        })
        .catch((err) => console.log(err));
    }, [])
    
    return (

        <div className={styles.project_container}>
            <div className={styles.title_container}>
                <h1>Meus Projetos</h1>
                <LinkButtom to="/newproject" text="Novo Projeto"/>
            </div>
            {message && <Message type="success" msg="Mensagem de teste" />}
            <Container customCassl="start">
                {projects.length > 0 && 
                    projects.map((project) => (
                        <ProjectCard
                            key={project.id}
                            id={project.id}
                            name={project.name}
                            valueProject={project.valueProject}
                            category={project.category.name}
                        />
                ))}
            </Container>
        </div>

    )
}

export default Projects;