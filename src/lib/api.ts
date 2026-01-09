const API_URL = 'https://haix.ai/api';

// Generate unique table name to avoid conflicts
const randomString = Math.random().toString(36).substring(2, 10);
const PROJECTS_TABLE = `projects_${randomString}`;
const MESSAGES_TABLE = `messages_${randomString}`;
const FILES_TABLE = `files_${randomString}`;

export interface Project {
  id: number;
  name: string;
  description: string;
  template: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  id: number;
  project_id: number;
  role: 'user' | 'assistant' | 'system';
  content: string;
  created_at: string;
}

export interface AppFile {
  id: number;
  project_id: number;
  path: string;
  content: string;
  language: string;
  created_at: string;
  updated_at: string;
}

// Projects API
export async function getProjects(): Promise<Project[]> {
  const response = await fetch(`${API_URL}/${PROJECTS_TABLE}`);
  if (!response.ok) throw new Error('Failed to fetch projects');
  return response.json();
}

export async function createProject(name: string, description: string, template: string = 'react'): Promise<Project> {
  const response = await fetch(`${API_URL}/${PROJECTS_TABLE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, description, template }),
  });
  if (!response.ok) throw new Error('Failed to create project');
  return response.json();
}

export async function updateProject(id: number, updates: Partial<Project>): Promise<Project> {
  const response = await fetch(`${API_URL}/${PROJECTS_TABLE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates),
  });
  if (!response.ok) throw new Error('Failed to update project');
  return response.json();
}

export async function deleteProject(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${PROJECTS_TABLE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete project');
}

// Messages API
export async function getMessages(projectId: number): Promise<Message[]> {
  const response = await fetch(`${API_URL}/${MESSAGES_TABLE}?project_id=${projectId}`);
  if (!response.ok) throw new Error('Failed to fetch messages');
  return response.json();
}

export async function createMessage(projectId: number, role: string, content: string): Promise<Message> {
  const response = await fetch(`${API_URL}/${MESSAGES_TABLE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ project_id: projectId, role, content }),
  });
  if (!response.ok) throw new Error('Failed to create message');
  return response.json();
}

// Files API
export async function getFiles(projectId: number): Promise<AppFile[]> {
  const response = await fetch(`${API_URL}/${FILES_TABLE}?project_id=${projectId}`);
  if (!response.ok) throw new Error('Failed to fetch files');
  return response.json();
}

export async function createFile(projectId: number, path: string, content: string, language: string): Promise<AppFile> {
  const response = await fetch(`${API_URL}/${FILES_TABLE}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ project_id: projectId, path, content, language }),
  });
  if (!response.ok) throw new Error('Failed to create file');
  return response.json();
}

export async function updateFile(id: number, content: string): Promise<AppFile> {
  const response = await fetch(`${API_URL}/${FILES_TABLE}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ content }),
  });
  if (!response.ok) throw new Error('Failed to update file');
  return response.json();
}

export async function deleteFile(id: number): Promise<void> {
  const response = await fetch(`${API_URL}/${FILES_TABLE}/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete file');
}