import { parse, v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import styles from './Project.module.css';

import Loading from '../layout/Loading';
import Container from '../layout/Container';
import Message from '../layout/Message';

import ProjectForm from '../project/ProjectForm';
import ServiceForm from '../service/ServiceForm';
import ServiceCard from '../service/ServiceCard';

function Project() {

    const { id } = useParams();

    const [project, setProject] = useState([]);
    const [services, setServices] = useState([]);
    const [showProjectForm, setShowProjectForm] = useState(false);
    const [showServiceForm, setShowServiceForm] = useState(false);
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
                .then((data) => {
                    setProject(data)
                    setServices(data.services)
                })
                .catch((err) => console.log(`Algo de errado aconteceu ${err}`))
        }, 300);

    }, [id])

    function toggleProjectForm() {
        setShowProjectForm(!showProjectForm)
    }

    function toggleServiceForm() {
        setShowServiceForm(!showServiceForm)
    }

    function editPost(project) {

        setMessage('')

        if (project.valueProject < project.valueService) {
            setMessage("O orçamento não pode ser menor que o custo do projeto")
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

    function createService(project) {

        setMessage('');

        const lastService = project.services[project.services.length - 1];

        lastService.id = uuidv4();

        const lastServiceValueService = lastService.valueService;

        const newValueService = parseFloat(project.valueService) + parseFloat(lastServiceValueService);
        
        if (newValueService > parseFloat(project.valueProject)) {
            setMessage('Valor superior ao do orçamento! Verifique o valor do serviço.');
            setTypeMessage('error')
            project.services.pop()
            return false
        }

        project.valueService = newValueService;

        fetch(`http://localhost:5000/projects/${project.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(project)
        })
        .then((resp) => resp.json())
        .then((data) => {
            setShowServiceForm(false)
        })
        .catch(err => console.log(err))

    }

    function removeService(service) {

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
                                        <span>Total utilizado:</span> R$ {project.valueService}
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
                        <div className={styles.service_form_container}>
                            <h2>Adicionar serviço:</h2>
                            <button className={styles.btn} onClick={toggleServiceForm}>
                                {!showServiceForm ? 'Adicionar serviço' : 'Fechar'}
                            </button>
                            <div className={styles.project_info}>
                                {showServiceForm && (
                                    <ServiceForm
                                        handleSubmit={createService}
                                        btnText="Adicionar serviço"
                                        projectData={project}
                                    />
                            )}
                            </div>
                        </div>
                        <h2>Serviços</h2>
                        <Container customClass="start">
                            {services.length > 0 &&
                                services.map((service) => (
                                    <ServiceCard
                                        key={service.id}
                                        id={service.id}
                                        name={service.name}
                                        valueService={service.valueService}
                                        description={service.description}
                                        handleRemove={removeService}
                                    />
                                ))

                            }
                            {services.length === 0 &&
                                <p>Não há serviços cadastrados.</p>
                            }
                        </Container>
                    </Container>
                </div>
            ) : (
                <Loading />
            )}
        </>

    )
}

export default Project;