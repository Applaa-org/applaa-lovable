import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Code2, Trash2, Calendar } from 'lucide-react';
import { type Project } from '@/lib/api';
import { format } from 'date-fns';

interface ProjectCardProps {
  project: Project;
  onOpen: () => void;
  onDelete: () => void;
}

export default function ProjectCard({ project, onOpen, onDelete }: ProjectCardProps) {
  return (
    <Card className="hover:shadow-xl transition-all duration-300 border-2 border-gray-100 hover:border-violet-200 group">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-lg flex items-center justify-center shadow-md group-hover:scale-110 transition-transform">
              <Code2 className="text-white" size={24} />
            </div>
            <div>
              <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-violet-600 transition-colors">
                {project.name}
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 mt-1">
                {project.template} project
              </CardDescription>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} />
            {format(new Date(project.created_at), 'MMM d, yyyy')}
          </div>
          <div className="flex gap-2">
            <Button 
              onClick={onDelete}
              variant="ghost" 
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
            >
              <Trash2 size={16} />
            </Button>
            <Button 
              onClick={onOpen}
              className="bg-violet-600 hover:bg-violet-700 text-white"
            >
              Open
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}