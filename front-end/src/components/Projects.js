import React, { useState, useEffect } from 'react';
import api from '../services/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            const response = await api.get('/projects');
            setProjects(response.data);
        };

        fetchProjects();
    }, []);

    return (
        <div className="projects-container">
            <h2>Projects</h2>
            {projects.map((project) => (
                <div key={project._id} className="project-item">
                    <h3>{project.name}</h3>
                    <p>{project.description}</p>
                </div>
            ))}
        </div>
    );
};

export default Projects;
