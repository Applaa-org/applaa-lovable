import { useState, useEffect } from 'react';
import { getFiles, createFile, updateFile, deleteFile, type AppFile } from '../lib/api';

export function useFiles(projectId: number | null) {
  const [files, setFiles] = useState<AppFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      loadFiles();
    }
  }, [projectId]);

  async function loadFiles() {
    if (!projectId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getFiles(projectId);
      setFiles(data);
    } catch (err: any) {
      console.error('Failed to load files:', err);
      setError(err.message || 'Failed to load files');
    } finally {
      setLoading(false);
    }
  }

  async function addFile(path: string, content: string, language: string) {
    if (!projectId) return;
    
    try {
      const newFile = await createFile(projectId, path, content, language);
      setFiles([...files, newFile]);
      return newFile;
    } catch (err: any) {
      console.error('Failed to create file:', err);
      throw err;
    }
  }

  async function modifyFile(id: number, content: string) {
    try {
      const updated = await updateFile(id, content);
      setFiles(files.map(f => f.id === id ? updated : f));
      return updated;
    } catch (err: any) {
      console.error('Failed to update file:', err);
      throw err;
    }
  }

  async function removeFile(id: number) {
    try {
      await deleteFile(id);
      setFiles(files.filter(f => f.id !== id));
    } catch (err: any) {
      console.error('Failed to delete file:', err);
      throw err;
    }
  }

  return { files, loading, error, addFile, modifyFile, removeFile, refresh: loadFiles };
}