function ProjectForm() {

    return (

        <div>
            <form>
                <div>
                    <input type="text" placeholder="Nome do projeto" />
                </div>
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