
import { useState } from "react";
import ServiceCard from "./ServiceCard";
import ServiceFlow from "./ServiceFlow";
import { Button } from "./ui/button";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";

const services = [
  {
    id: "architect",
    title: "Architect Service",
    description: "Entry point and initial orchestrator that processes user prompts and initiates the planning process.",
    status: "active" as const,
    type: "architect" as const,
    endpoint: "/api/v1/projects",
    details: `- Receives the initial prompt
- Generates initial project plan
- Coordinates communication between services
- Uses local DeepSeek Coder LLM
- Implemented with FastAPI and Pydantic`
  },
  {
    id: "investigator",
    title: "Investigator Service",
    description: "Clarifies user requirements by generating questions and processing responses.",
    status: "conceptual" as const,
    type: "investigator" as const,
    endpoint: "/clarify",
    details: `- Receives project ID and initial prompt
- Generates clarification questions
- Processes user responses
- Creates detailed specifications
- Returns clarified requirements to Architect/Director`
  },
  {
    id: "director",
    title: "Director Service",
    description: "Creates strategic plans and delegates tasks to domain managers.",
    status: "conceptual" as const,
    type: "director" as const,
    endpoint: "/plan",
    details: `- Validates specifications
- Creates strategic action plan
- Assigns tasks to domain managers
- Monitors overall project progress`
  },
  {
    id: "domain_manager",
    title: "Domain Manager Service",
    description: "Specializes in specific project domains like programming, design, etc.",
    status: "conceptual" as const,
    type: "domain_manager" as const,
    endpoint: "/domain/tasks",
    details: `- Receives domain-specific tasks
- Breaks down into granular sub-tasks
- Assigns to workers or sub-managers
- Validates domain deliverables`
  },
  {
    id: "worker",
    title: "Worker Service",
    description: "Executes specific tasks like coding, testing, or content creation.",
    status: "conceptual" as const,
    type: "worker" as const,
    endpoint: "/execute",
    details: `- Receives specific task assignments
- Executes specialized work
- Generates concrete deliverables
- Returns results for validation`
  },
  {
    id: "compiler",
    title: "Compiler Service",
    description: "Aggregates all deliverables and creates the final packaged project.",
    status: "conceptual" as const,
    type: "compiler" as const,
    endpoint: "/compile",
    details: `- Collects all validated deliverables
- Integrates components
- Verifies global consistency
- Packages final project with documentation`
  }
];

const sampleFlows = [
  {
    name: "Project Initialization",
    flow: ["architect"],
    description: "Initial prompt processing by the Architect Service"
  },
  {
    name: "Requirements Gathering",
    flow: ["architect", "investigator", "architect"],
    description: "Architect delegates to Investigator which clarifies requirements"
  },
  {
    name: "Complete Workflow",
    flow: ["architect", "investigator", "director", "domain_manager", "worker", "compiler"],
    description: "Full project lifecycle from initial prompt to final compilation"
  }
];

export function ServiceArchitecture() {
  const [expandedFlow, setExpandedFlow] = useState(false);
  const [selectedFlow, setSelectedFlow] = useState(sampleFlows[0]);
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">System Architecture</h2>
        <div className="flex items-center gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="outline" size="icon">
                  <HelpCircle className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent className="max-w-xs">
                <p>The Architect System uses a hierarchical structure of AI agents that work together to build complex digital projects.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setExpandedFlow(!expandedFlow)}
          >
            {expandedFlow ? (
              <>
                <ChevronUp className="h-4 w-4 mr-2" />
                Hide Flow
              </>
            ) : (
              <>
                <ChevronDown className="h-4 w-4 mr-2" />
                Show Flow
              </>
            )}
          </Button>
        </div>
      </div>
      
      {expandedFlow && (
        <div className="border rounded-lg p-4">
          <div className="mb-4">
            <h3 className="text-sm font-medium mb-2">Select Flow</h3>
            <div className="flex flex-wrap gap-2">
              {sampleFlows.map((flow) => (
                <Button
                  key={flow.name}
                  variant={selectedFlow.name === flow.name ? "secondary" : "outline"}
                  size="sm"
                  onClick={() => setSelectedFlow(flow)}
                >
                  {flow.name}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="mb-2">
            <span className="text-sm text-muted-foreground">{selectedFlow.description}</span>
          </div>
          
          <div className="blueprint-grid bg-blueprint-light/10 border rounded-md p-4">
            <ServiceFlow 
              services={services} 
              activeFlow={selectedFlow.flow} 
            />
          </div>
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service) => (
          <ServiceCard
            key={service.id}
            title={service.title}
            description={service.description}
            status={service.status}
            type={service.type}
            endpoint={service.endpoint}
          >
            <div className="text-sm whitespace-pre-line">
              {service.details}
            </div>
          </ServiceCard>
        ))}
      </div>
    </div>
  );
}
