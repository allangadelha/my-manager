import { useState } from 'react';

import Input from '../form/Input';
import SubmitButton from '../form/SubmitButton';
import styles from './ServiceForm.module.css';

function ServiceForm({ handleSubmit, btnText, projectData }) {

    const [service, setService] = useState([]);

    const submit = (e) => {
        e.preventDefault();
        projectData.services.push(service)
        handleSubmit(projectData)
    };

    function handleChange(e) {
        setService({ ...service, [e.target.name]: e.target.value });
    }

    return (

        <div>
            <form onSubmit={submit} className={styles.form}>
                <Input
                    type="text"
                    name="name"
                    text="Nome do serviço"
                    placeholder="Nome do serviço"
                    handleOnChange={handleChange}
                    // value={project.name  ? project.name : ''}
                />
                <Input
                    type="number"
                    name="valueService"
                    text="Custo do serviço"
                    placeholder="Custo do serviço"
                    handleOnChange={handleChange}
                    // value={project.valueService ? project.valueService : ''}
                />
                <Input
                    type="text"
                    name="description"
                    text="Descrição do serviço"
                    placeholder="Descrição do serviço"
                    handleOnChange={handleChange}
                    // value={project.name  ? project.name : ''}
                />
                <SubmitButton
                    text={btnText}
                />
            </form>
        </div>

    )

}

export default ServiceForm;