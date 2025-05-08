
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, Code, Edit, Settings } from "lucide-react";

interface ServiceCardProps {
  title: string;
  description: string;
  status: "active" | "inactive" | "conceptual";
  type: "architect" | "investigator" | "director" | "domain_manager" | "worker" | "compiler";
  endpoint?: string;
  children?: React.ReactNode;
}

const ServiceIcon = ({ type }: { type: ServiceCardProps["type"] }) => {
  switch (type) {
    case "architect":
      return <Settings className="h-5 w-5" />;
    case "investigator":
      return <Edit className="h-5 w-5" />;
    case "director":
      return <Activity className="h-5 w-5" />;
    case "domain_manager":
    case "worker":
    case "compiler":
      return <Code className="h-5 w-5" />;
  }
};

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  description,
  status,
  type,
  endpoint,
  children,
}) => {
  const statusColors = {
    active: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300",
    inactive: "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300",
    conceptual: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300",
  };

  return (
    <Card className="service-node w-full flex flex-col">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <div className={`rounded-full p-1.5 ${
              status === "active" ? "bg-blueprint-primary text-white" : 
              status === "inactive" ? "bg-gray-400 text-white" : 
              "bg-blueprint-light text-blueprint-primary"
            }`}>
              <ServiceIcon type={type} />
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge className={statusColors[status]}>
            {status === "active" ? "Active" : status === "inactive" ? "Inactive" : "Conceptual"}
          </Badge>
        </div>
        <CardDescription className="text-sm mt-2">{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        {endpoint && (
          <div className="text-xs font-mono bg-muted p-2 rounded mb-3">
            <span className="text-blueprint-secondary">Endpoint: </span>
            <span>{endpoint}</span>
          </div>
        )}
        {children}
      </CardContent>
      <CardFooter className="border-t pt-3 text-xs text-muted-foreground">
        {type.replace("_", " ")} service
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
