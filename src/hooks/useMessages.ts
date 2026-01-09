import { useState, useEffect } from 'react';
import { getMessages, createMessage, type Message } from '../lib/api';

export function useMessages(projectId: number | null) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (projectId) {
      loadMessages();
    }
  }, [projectId]);

  async function loadMessages() {
    if (!projectId) return;
    
    try {
      setLoading(true);
      setError(null);
      const data = await getMessages(projectId);
      setMessages(data);
    } catch (err: any) {
      console.error('Failed to load messages:', err);
      setError(err.message || 'Failed to load messages');
    } finally {
      setLoading(false);
    }
  }

  async function addMessage(role: 'user' | 'assistant' | 'system', content: string) {
    if (!projectId) return;
    
    try {
      const newMessage = await createMessage(projectId, role, content);
      setMessages([...messages, newMessage]);
      return newMessage;
    } catch (err: any) {
      console.error('Failed to create message:', err);
      throw err;
    }
  }

  return { messages, loading, error, addMessage, refresh: loadMessages };
}