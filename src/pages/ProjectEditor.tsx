import { useState, useEffect } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Header from '@/components/Header';
import ChatPanel from '@/components/ChatPanel';
import CodeEditor from '@/components/CodeEditor';
import PreviewPanel from '@/components/PreviewPanel';
import FileTree from '@/components/FileTree';
import { useMessages } from '@/hooks/useMessages';
import { useFiles } from '@/hooks/useFiles';
import { type Project, type AppFile } from '@/lib/api';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import { ArrowLeft, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ProjectEditorProps {
  project: Project;
}

export default function ProjectEditor({ project }: ProjectEditorProps) {
  const navigate = useNavigate();
  const { messages, addMessage } = useMessages(project.id);
  const { files, modifyFile } = useFiles(project.id);
  const [selectedFile, setSelectedFile] = useState<AppFile | null>(null);

  useEffect(() => {
    if (files.length > 0 && !selectedFile) {
      setSelectedFile(files[0]);
    }
  }, [files, selectedFile]);

  const handleSendMessage = async (content: string) => {
    await addMessage('user', content);
    
    // Simulate AI response
    setTimeout(async () => {
      await addMessage('assistant', 'I understand you want to build that. Let me generate the code for you...');
    }, 1000);
  };

  const handleUpdateFile = async (id: number, content: string): Promise<void> => {
    await modifyFile(id, content);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header />
      
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => navigate({ to: '/' })}
              >
                <ArrowLeft size={18} />
              </Button>
              <div className="flex items-center gap-2">
                <Code2 className="text-violet-600" size={20} />
                <h1 className="text-xl font-bold text-gray-900">{project.name}</h1>
              </div>
            </div>
            <span className="text-sm text-gray-500">{project.template}</span>
          </div>

          <ResizablePanelGroup direction="horizontal" className="flex-1">
            {/* Chat Panel */}
            <ResizablePanel defaultSize={25} minSize={20}>
              <ChatPanel 
                messages={messages}
                onSendMessage={handleSendMessage}
              />
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Code Editor Section */}
            <ResizablePanel defaultSize={50} minSize={30}>
              <ResizablePanelGroup direction="vertical">
                {/* File Tree */}
                <ResizablePanel defaultSize={20} minSize={15}>
                  <div className="h-full bg-white border-r border-gray-200">
                    <div className="border-b border-gray-200 bg-gray-50 p-3">
                      <span className="font-semibold text-gray-900 text-sm">Files</span>
                    </div>
                    <FileTree 
                      files={files}
                      selectedFile={selectedFile}
                      onSelectFile={setSelectedFile}
                    />
                  </div>
                </ResizablePanel>

                <ResizableHandle />

                {/* Code Editor */}
                <ResizablePanel defaultSize={80} minSize={50}>
                  <CodeEditor 
                    files={files}
                    onUpdateFile={handleUpdateFile}
                  />
                </ResizablePanel>
              </ResizablePanelGroup>
            </ResizablePanel>

            <ResizableHandle withHandle />

            {/* Preview Panel */}
            <ResizablePanel defaultSize={25} minSize={20}>
              <PreviewPanel projectId={project.id} />
            </ResizablePanel>
          </ResizablePanelGroup>
        </div>
      </div>
    </div>
  );
}