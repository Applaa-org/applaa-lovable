import { useState } from 'react';
import Header from '@/components/Header';
import ProjectCard from '@/components/ProjectCard';
import NewProjectDialog from '@/components/NewProjectDialog';
import { useProjects } from '@/hooks/useProjects';
import { useNavigate } from '@tanstack/react-router';
import { Loader2, Sparkles } from 'lucide-react';
import { MadeWithApplaa } from '@/components/made-with-applaa';

export default function Dashboard() {
  const navigate = useNavigate();
  const { projects, loading, addProject, removeProject } = useProjects();
  const [showNewProject, setShowNewProject] = useState(false);

  const handleCreateProject = async (name: string, description: string, template: string) => {
    const project = await addProject(name, description, template);
    // Navigate to editor would go here if we had the route
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 to-purple-50">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-violet-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your projects...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50">
      <Header onNewProject={() => setShowNewProject(true)} />
      
      <main className="flex-1 container mx-auto px-6 py-12">
        <div className="mb-12 text-center">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
            Your AI-Powered Projects
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build beautiful applications faster with AI assistance. Just describe what you want, and watch it come to life.
          </p>
        </div>

        {projects.length === 0 ? (
          <div className="max-w-2xl mx-auto text-center py-20">
            <div className="bg-white rounded-2xl shadow-xl p-12 border-2 border-violet-100">
              <Sparkles className="text-violet-600 mx-auto mb-6" size={64} />
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Start Your First Project
              </h2>
              <p className="text-gray-600 mb-8 text-lg">
                Create your first AI-powered application in seconds. No coding experience required!
              </p>
              <button
                onClick={() => setShowNewProject(true)}
                className="bg-gradient-to-r from-violet-600 to-purple-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                Create Your First Project
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onOpen={() => {
                  // Navigate to editor would go here
                  console.log('Open project:', project.id);
                }}
                onDelete={() => removeProject(project.id)}
              />
            ))}
          </div>
        )}
      </main>

      <MadeWithApplaa />

      <NewProjectDialog
        open={showNewProject}
        onOpenChange={setShowNewProject}
        onCreateProject={handleCreateProject}
      />
    </div>
  );
}