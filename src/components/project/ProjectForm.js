import Input from '../form/Input';
import Select from '../form/Select';
import SubmitButton from '../form/SubmitButton';
import styles from './ProjectForm.module.css';

function ProjectForm({btnText}) {

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
                />
                <SubmitButton
                    text={btnText}
                />
            </form>
        </div>

    )

}

export default ProjectForm;