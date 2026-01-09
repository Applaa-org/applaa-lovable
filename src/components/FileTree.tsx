import { useState } from 'react';
import { ChevronRight, ChevronDown, File, Folder } from 'lucide-react';
import { type AppFile } from '@/lib/api';
import { ScrollArea } from '@/components/ui/scroll-area';

interface FileTreeProps {
  files: AppFile[];
  selectedFile?: AppFile | null;
  onSelectFile: (file: AppFile) => void;
}

interface TreeNode {
  name: string;
  path: string;
  type: 'file' | 'folder';
  children?: TreeNode[];
  file?: AppFile;
}

export default function FileTree({ files, selectedFile, onSelectFile }: FileTreeProps) {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(new Set(['src']));

  const buildTree = (files: AppFile[]): TreeNode[] => {
    const root: TreeNode[] = [];
    
    files.forEach(file => {
      const parts = file.path.split('/');
      let currentLevel = root;
      
      parts.forEach((part, index) => {
        const isFile = index === parts.length - 1;
        const path = parts.slice(0, index + 1).join('/');
        
        let node = currentLevel.find(n => n.name === part);
        
        if (!node) {
          node = {
            name: part,
            path,
            type: isFile ? 'file' : 'folder',
            children: isFile ? undefined : [],
            file: isFile ? file : undefined,
          };
          currentLevel.push(node);
        }
        
        if (!isFile && node.children) {
          currentLevel = node.children;
        }
      });
    });
    
    return root;
  };

  const toggleFolder = (path: string) => {
    setExpandedFolders(prev => {
      const next = new Set(prev);
      if (next.has(path)) {
        next.delete(path);
      } else {
        next.add(path);
      }
      return next;
    });
  };

  const renderNode = (node: TreeNode, depth: number = 0) => {
    const isExpanded = expandedFolders.has(node.path);
    const isSelected = selectedFile?.id === node.file?.id;

    return (
      <div key={node.path}>
        <div
          className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer hover:bg-gray-100 rounded ${
            isSelected ? 'bg-violet-100 text-violet-700' : 'text-gray-700'
          }`}
          style={{ paddingLeft: `${depth * 16 + 8}px` }}
          onClick={() => {
            if (node.type === 'folder') {
              toggleFolder(node.path);
            } else if (node.file) {
              onSelectFile(node.file);
            }
          }}
        >
          {node.type === 'folder' ? (
            <>
              {isExpanded ? (
                <ChevronDown size={16} className="text-gray-500" />
              ) : (
                <ChevronRight size={16} className="text-gray-500" />
              )}
              <Folder size={16} className="text-blue-500" />
            </>
          ) : (
            <>
              <div className="w-4" />
              <File size={16} className="text-gray-500" />
            </>
          )}
          <span className="text-sm font-medium truncate">{node.name}</span>
        </div>
        
        {node.type === 'folder' && isExpanded && node.children && (
          <div>
            {node.children.map(child => renderNode(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  const tree = buildTree(files);

  if (files.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 text-sm">
        No files yet
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="p-2">
        {tree.map(node => renderNode(node))}
      </div>
    </ScrollArea>
  );
}