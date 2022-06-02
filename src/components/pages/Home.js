import styles from './Home.module.css';
import saving from '../../img/savings.svg';
import LinkButton from '../layout/LinkButton';

function Home() {
    
    return (

        <section className={styles.home_container}>
            <h1>Bem-vindo ao <span>My Manager!</span></h1>
            <p>Melhor forma de gerenciamento de seus projetos</p>
            <LinkButton to="newproject" text="Novo Projeto"/>
            <img src={saving} alt="My Manager" />
        </section>

    )
}

export default Home;