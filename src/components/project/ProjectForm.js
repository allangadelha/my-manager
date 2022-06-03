import { useState, useEffect } from 'react';

import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({btnText}) {

    const [categories, setCategories] = useState([]);
    
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

    return (

        <div>
            <form className={styles.form}>
                <Input
                    type="text"
                    name="name"
                    text="Nome do projeto"
                    placeholder="Nome do projeto"
                />
                <Input
                    type="number"
                    name="valueProject"
                    text="Valor estimado do projeto"
                    placeholder="Valor estimado do projeto"
                />
                <Select
                    name="category_id"
                    text="Selecione uma categoria"
                    options={categories}
                />
                <SubmitButton
                    text={btnText}
                />
            </form>
        </div>

    )

}

export default ProjectForm;