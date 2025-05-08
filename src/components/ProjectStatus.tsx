
import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CircleCheck, Clock, Loader2 } from "lucide-react";
import { Button } from "./ui/button";

interface ProjectStatusProps {
  projectId: string;
  onRefresh: () => void;
  status: {
    status: string;
    message?: string;
    plan?: string;
  };
  loading?: boolean;
}

export function ProjectStatus({ projectId, status, onRefresh, loading = false }: ProjectStatusProps) {
  const [timeElapsed, setTimeElapsed] = useState(0);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);
    
    return () => clearInterval(timer);
  }, [projectId]);
  
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case "PLANNING":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "COMPLETED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "FAILED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300";
    }
  };
  
  const getStatusIcon = (status: string) => {
    switch (status) {
      case "COMPLETED":
        return <CircleCheck className="h-4 w-4" />;
      case "PLANNING":
        return <Clock className="h-4 w-4" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Project Status</CardTitle>
          <Badge className={getStatusColor(status.status)}>
            <span className="flex items-center gap-1">
              {getStatusIcon(status.status)}
              {status.status}
            </span>
          </Badge>
        </div>
        <CardDescription>
          Project ID: <code>{projectId}</code>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">Time elapsed:</span>
            <span className="font-mono">{formatTime(timeElapsed)}</span>
          </div>
          
          {status.message && (
            <div className="text-sm">
              <span className="font-medium">Message: </span>
              <span>{status.message}</span>
            </div>
          )}
          
          {status.plan && (
            <div className="mt-4">
              <h4 className="text-sm font-medium mb-2">Initial Plan:</h4>
              <div className="bg-muted p-3 rounded-md text-sm whitespace-pre-wrap">
                {status.plan}
              </div>
            </div>
          )}
          
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full" 
            onClick={onRefresh}
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Refreshing...
              </>
            ) : (
              "Refresh Status"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
