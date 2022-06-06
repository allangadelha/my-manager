import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Project.module.css';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';

import ProjectForm from '../project/ProjectForm';

function Project() {

    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [message, setMessage] = useState();
    const [typeMessage, setTypeMessage] = useState();


    useEffect(() => {

        setTimeout(() => {
            fetch(`http://localhost:5000/projects/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }

            })
                .then((resp) => resp.json())
                .then((data) => setProject(data))
                .catch((err) => console.log(`Algo de errado aconteceu ${err}`))
        }, 300);

    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function editPost(project) {
        if (project.valueProject < project.manager) {
            setMessage("O orçamento não pdoe ser menor que o custo do projeto")
            setTypeMessage("error")
            return false
        }

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
            .then((resp) => resp.json())
            .then((data) => {
                setProject(data)
                setShowProjectForm(false)
                setMessage("Projeto alterado com sucesso!")
                setTypeMessage("success")
            })
            .catch(err => console.log(err))
    }


    return (

        <>
            {project.name ? (
                <div className={styles.project_details}>
                    <Container customClass="column">
                        {message && <Message type={typeMessage} msg={message} />}
                        <div className={styles.details_container}>
                            <h1>Projeto: {project.name}</h1>
                            <button className={styles.btn} onClick={toggleProjectForm}>
                                {!showProjectForm ? 'Editar projeto' : 'Fechar'}
                            </button>
                            {!showProjectForm ? (
                                <div className={styles.project_info}>
                                    <p>
                                        <span>Categoria:</span> {project.category.name}
                                    </p>
                                    <p>
                                        <span>Total do Orçamento:</span> R$ {project.valueProject}
                                    </p>
                                    <p>
                                        <span>Total utilizado:</span> R$ {project.manager}
                                    </p>
                                </div>
                            ) : (
                                <div className={styles.project_info}>
                                    <ProjectForm
                                        btnText="Concluir edição"
                                        handleSubmit={editPost}
                                        projectData={project}
                                    />
                                </div>
                            )}
                        </div>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>

    )
}

export default Project;