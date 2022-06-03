import Input from '../form/Input';
import styles from './ProjectForm.module.css';

function ProjectForm() {

    return (

        <div>
            <form className={styles.form}>
                <Input
                    type="text"
                    name="name"
                    id="name"
                    text="Nome do projeto"
                    placeholder="Nome do projeto"
                    value=""
                />
                <Input
                    type="number"
                    name="valueProject"
                    id="valueProject"
                    text="Valor estimado do projeto"
                    placeholder="Valor estimado do projeto"
                    value=""
                />
                <div>
                    <input type="number" placeholder="Valor estimado do projeto" />
                </div>
                <div>
                    <select name="category_id">
                        <option desabled selected>Selecione a categoria</option>
                    </select>
                </div>
                <div>
                    <input type="submit" value="Criar projeto" />
                </div>
            </form>
        </div>

    )

}

export default ProjectForm;