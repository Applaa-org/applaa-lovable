import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Code2, Play, Save, FileCode } from 'lucide-react';
import { type AppFile } from '@/lib/api';

interface CodeEditorProps {
  files: AppFile[];
  onUpdateFile?: (id: number, content: string) => Promise<void>;
}

export default function CodeEditor({ files, onUpdateFile }: CodeEditorProps) {
  const [selectedFile, setSelectedFile] = useState<AppFile | null>(files[0] || null);
  const [content, setContent] = useState(selectedFile?.content || '');
  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    if (!selectedFile || !onUpdateFile) return;
    
    try {
      setSaving(true);
      await onUpdateFile(selectedFile.id, content);
    } catch (err) {
      console.error('Failed to save file:', err);
    } finally {
      setSaving(false);
    }
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-gray-50">
        <FileCode className="text-gray-400 mb-4" size={48} />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No Files Yet
        </h3>
        <p className="text-gray-600 max-w-md">
          Start chatting with the AI to generate your first files.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-white">
      <div className="border-b border-gray-200 bg-gray-50 p-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Code2 className="text-violet-600" size={20} />
          <span className="font-semibold text-gray-900">Code Editor</span>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="text-green-600 hover:text-green-700">
            <Play size={16} className="mr-1" />
            Run
          </Button>
          <Button 
            onClick={handleSave}
            disabled={saving}
            size="sm"
            className="bg-violet-600 hover:bg-violet-700"
          >
            <Save size={16} className="mr-1" />
            {saving ? 'Saving...' : 'Save'}
          </Button>
        </div>
      </div>

      <Tabs value={selectedFile?.id.toString()} className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start rounded-none border-b bg-gray-50">
          {files.map((file) => (
            <TabsTrigger 
              key={file.id} 
              value={file.id.toString()}
              onClick={() => {
                setSelectedFile(file);
                setContent(file.content);
              }}
              className="data-[state=active]:bg-white data-[state=active]:border-b-2 data-[state=active]:border-violet-600"
            >
              {file.path.split('/').pop()}
            </TabsTrigger>
          ))}
        </TabsList>

        {files.map((file) => (
          <TabsContent 
            key={file.id} 
            value={file.id.toString()} 
            className="flex-1 m-0"
          >
            <ScrollArea className="h-full">
              <textarea
                value={selectedFile?.id === file.id ? content : file.content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full h-full min-h-[500px] p-4 font-mono text-sm bg-gray-900 text-gray-100 resize-none focus:outline-none"
                spellCheck={false}
              />
            </ScrollArea>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}