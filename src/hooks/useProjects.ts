import { useState, useEffect } from 'react';
import { getProjects, createProject, updateProject, deleteProject, type Project } from '../lib/api';

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      setLoading(true);
      setError(null);
      const data = await getProjects();
      setProjects(data);
    } catch (err: any) {
      console.error('Failed to load projects:', err);
      setError(err.message || 'Failed to load projects');
    } finally {
      setLoading(false);
    }
  }

  async function addProject(name: string, description: string, template: string = 'react') {
    try {
      const newProject = await createProject(name, description, template);
      setProjects([newProject, ...projects]);
      return newProject;
    } catch (err: any) {
      console.error('Failed to create project:', err);
      throw err;
    }
  }

  async function modifyProject(id: number, updates: Partial<Project>) {
    try {
      const updated = await updateProject(id, updates);
      setProjects(projects.map(p => p.id === id ? updated : p));
      return updated;
    } catch (err: any) {
      console.error('Failed to update project:', err);
      throw err;
    }
  }

  async function removeProject(id: number) {
    try {
      await deleteProject(id);
      setProjects(projects.filter(p => p.id !== id));
    } catch (err: any) {
      console.error('Failed to delete project:', err);
      throw err;
    }
  }

  return { projects, loading, error, addProject, modifyProject, removeProject, refresh: loadProjects };
}