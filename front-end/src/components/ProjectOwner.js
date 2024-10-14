// src/components/ProjectOwner.js
import React, { useEffect, useState } from 'react';
import api from '../services/api';

const ProjectOwner = () => {
    const [projects, setProjects] = useState([]);
    const [newProject, setNewProject] = useState({ name: '', description: '' });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await api.get('/projects/get-projects', {
                    headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
                });
                setProjects(response.data);
            } catch (err) {
                setError(err.response?.data?.message || 'Failed to fetch projects');
            }
        };
        fetchProjects();
    }, []);

    const handleCreateProject = async (e) => {
        e.preventDefault();
        try {
            await api.post('/projects', newProject, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            setNewProject({ name: '', description: '' });
            alert('Project created successfully');
            // Refresh the project list
            const response = await api.get('/projects/owner');
            setProjects(response.data);
        } catch (err) {
            setError(err.response?.data?.message || 'Failed to create project');
        }
    };

    const shortlistApplicant = async (projectId, applicantId) => {
        try {
            await api.post(`/projects/${projectId}/shortlist/${applicantId}`, {}, {
                headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
            });
            alert('Applicant shortlisted successfully');
        } catch (err) {
            alert('Failed to shortlist applicant');
        }
    };

    return (
        <div>
            <h2>My Projects</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleCreateProject}>
                <input
                    type="text"
                    placeholder="Project Name"
                    value={newProject.name}
                    onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                    required
                />
                <textarea
                    placeholder="Project Description"
                    value={newProject.description}
                    onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                    required
                />
                <button type="submit">Create Project</button>
            </form>
            <table>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Description</th>
                        <th>Applicants</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project) => (
                        <tr key={project.id}>
                            <td>{project.name}</td>
                            <td>{project.description}</td>
                            <td>
                                <ul>
                                    {project.applicants.map((applicant) => (
                                        <li key={applicant.id}>
                                            {applicant.name}
                                            <button onClick={() => shortlistApplicant(project.id, applicant.id)}>
                                                Shortlist
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProjectOwner;
