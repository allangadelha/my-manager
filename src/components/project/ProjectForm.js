import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({ handleSubmit, btnText, projectData }) {

    const [categories, setCategories] = useState([]);
    const [project, setProject] = useState(projectData || {});
    
    useEffect(() => {
        fetch('http://localhost:5000/categories', {
            method: "GET",
            headers: {
                'Content-Type': 'application/json',
            },
        })
            .then((resp) => resp.json())
            .then((data) => {
                setCategories(data)
            })
            .catch((err) => console.log(`Error: ${err}`))
    }, []);

    const submit = (e) => {
        e.preventDefault();
        handleSubmit(project);
    };

    function handleChange(e) {
        setProject({ ...project, [e.target.name]: e.target.value });
    }

    function handleCategory(e) {
        setProject({ ...project, category: {
            id: e.target.value,
            name: e.target.options[e.target.selectedIndex].text,
        }});
    }

    return (

        <div>
            <form onSubmit={submit} className={styles.form}>
                <Input
                    type="text"
                    name="name"
                    text="Nome do projeto"
                    placeholder="Nome do projeto"
                    handleOnChange={handleChange}
                    value={project.name  ? project.name : ''}
                />
                <Input
                    type="number"
                    name="valueProject"
                    text="Valor estimado do projeto"
                    placeholder="Valor estimado do projeto"
                    handleOnChange={handleChange}
                    value={project.valueProject ? project.valueProject : ''}
                />
                <Select
                    name="category_id"
                    text="Selecione uma categoria"
                    options={categories}
                    handleOnChange={handleCategory}
                    value={project.category ? project.category.id : ''}
                />
                <SubmitButton
                    text={btnText}
                />
            </form>
        </div>

    )

}

export default ProjectForm;