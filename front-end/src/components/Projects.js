// src/components/Projects.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const Projects = () => {
    const [projects, setProjects] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects');
                setProjects(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch projects');
            }
        };
        fetchProjects();
    }, []);

    const applyForProject = async (projectId) => {
        try {
            await api.post(`/projects/${projectId}/apply`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Applied successfully!');
        } catch (err) {
            alert('Failed to apply for the project');
        }
    };

    return (
        <div>
            <h2>Available Projects</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>
                                <button onClick={() => applyForProject(project.id)}>Apply</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Projects;
