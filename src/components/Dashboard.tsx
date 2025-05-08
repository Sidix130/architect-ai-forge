
import { useState } from "react";
import { ProjectForm } from "./ProjectForm";
import { ProjectStatus } from "./ProjectStatus";
import { ServiceArchitecture } from "./ServiceArchitecture";
import { useToast } from "./ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

interface Project {
  projectId: string;
  status: {
    status: string;
    message?: string;
    plan?: string;
  };
}

export function Dashboard() {
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Mock API calls for demonstration
  const createProject = async ({ prompt, userId }: { prompt: string; userId?: string }) => {
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    try {
      // Normally this would be a real API call
      // const response = await fetch('http://localhost:8000/api/v1/projects', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ prompt, user_id: userId }),
      // });
      // const data = await response.json();
      
      // Mock response
      const projectId = `proj_${Math.random().toString(36).substring(2, 10)}`;
      
      // Generate a mock plan based on the prompt
      let plan = "## Project Plan\n\n";
      plan += "1. Initial analysis and setup\n";
      plan += "2. Define core components and architecture\n";
      plan += `3. Implement key functionality: ${prompt.split(" ").slice(0, 3).join(" ")}...\n`;
      plan += "4. Testing and validation\n";
      plan += "5. Documentation and delivery";
      
      const newProject: Project = {
        projectId,
        status: {
          status: "PLANNING",
          message: `Project created successfully. Initial planning in progress.`,
          plan
        }
      };
      
      setActiveProject(newProject);
      return { projectId };
    } catch (error) {
      console.error("Error creating project:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to create project. Please try again.",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const refreshProjectStatus = async () => {
    if (!activeProject) return;
    
    setIsLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    try {
      // Normally this would be a real API call
      // const response = await fetch(`http://localhost:8000/api/v1/projects/${activeProject.projectId}/status`);
      // const data = await response.json();
      
      // Mock status update - randomly change status for demo purposes
      const statuses = ["PLANNING", "COMPLETED"];
      const randomStatus = Math.random() > 0.7 ? statuses[1] : statuses[0];
      
      setActiveProject({
        ...activeProject,
        status: {
          ...activeProject.status,
          status: randomStatus,
          message: randomStatus === "COMPLETED" 
            ? "Project planning completed successfully!" 
            : "Project planning in progress..."
        }
      });
      
      if (randomStatus === "COMPLETED") {
        toast({
          title: "Status updated",
          description: "Project planning has been completed!",
        });
      } else {
        toast({
          title: "Status updated",
          description: "Project is still in planning phase.",
        });
      }
    } catch (error) {
      console.error("Error refreshing project status:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to refresh project status.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container py-8 space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-2xl font-bold mb-4">Create Project</h2>
          <ProjectForm onSubmit={createProject} />
        </div>
        
        <div>
          <h2 className="text-2xl font-bold mb-4">Current Project</h2>
          {activeProject ? (
            <ProjectStatus 
              projectId={activeProject.projectId} 
              status={activeProject.status}
              onRefresh={refreshProjectStatus}
              loading={isLoading}
            />
          ) : (
            <div className="border rounded-lg h-[200px] flex items-center justify-center text-muted-foreground">
              No active project. Create one to get started.
            </div>
          )}
        </div>
      </div>
      
      <ServiceArchitecture />
    </div>
  );
}
