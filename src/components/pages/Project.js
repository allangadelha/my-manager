import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Project.module.css';

function Project() {

    const { id } = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => {

        fetch(`http://localhost:5000/projects/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }

        })
        .then((resp) => resp.json())
        .then((data) => setProject(data))
        .catch((err) => console.log('Algo de errado aconteceu'))

    }, [id])

    
    return (

        <div>
            <p>{project.name}</p>
        </div>

    )
}

export default Project;