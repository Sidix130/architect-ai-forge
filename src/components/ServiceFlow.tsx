
import React from "react";
import { motion } from "framer-motion";

interface ServiceNode {
  id: string;
  type: "architect" | "investigator" | "director" | "domain_manager" | "worker" | "compiler";
  status: "active" | "inactive" | "conceptual";
}

interface ServiceFlowProps {
  services: ServiceNode[];
  activeFlow?: string[];
}

const ServiceFlow: React.FC<ServiceFlowProps> = ({ services, activeFlow = [] }) => {
  // This is a simplified visualization - in a real implementation you'd 
  // calculate actual positions based on DOM elements
  
  const getNodeColor = (type: string, status: string) => {
    if (status === "active") return "#0466c8";
    if (status === "inactive") return "#6c757d";
    return "#90cdf4";
  };

  const isNodeActive = (id: string) => activeFlow.includes(id);
  
  return (
    <svg className="w-full h-32" viewBox="0 0 800 100" preserveAspectRatio="none">
      <defs>
        <marker
          id="arrowhead"
          markerWidth="10"
          markerHeight="7"
          refX="0"
          refY="3.5"
          orient="auto"
        >
          <polygon points="0 0, 10 3.5, 0 7" fill="#0466c8" />
        </marker>
      </defs>
      
      {/* Horizontal line connecting all services */}
      <line
        x1="10"
        y1="50"
        x2="790"
        y2="50"
        stroke="#0466c8"
        strokeWidth="2"
        strokeDasharray="5,5"
        className="flow-line"
      />
      
      {/* Draw nodes for each service */}
      {services.map((service, index) => {
        const x = 100 + (600 / (services.length - 1)) * index;
        return (
          <g key={service.id}>
            <motion.circle
              cx={x}
              cy="50"
              r="12"
              fill={getNodeColor(service.type, service.status)}
              strokeWidth={isNodeActive(service.id) ? 3 : 0}
              stroke="#2a9d8f"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ 
                scale: isNodeActive(service.id) ? 1.2 : 1, 
                opacity: 1 
              }}
              transition={{ duration: 0.3 }}
            />
            <text
              x={x}
              y="80"
              textAnchor="middle"
              fontSize="12"
              fontFamily="sans-serif"
              fill={isNodeActive(service.id) ? "#0466c8" : "#6c757d"}
            >
              {service.type.split("_")[0]}
            </text>
          </g>
        );
      })}
      
      {/* Draw arrows between active flow nodes */}
      {activeFlow.length > 1 && activeFlow.slice(0, -1).map((id, index) => {
        const fromIndex = services.findIndex(s => s.id === id);
        const toIndex = services.findIndex(s => s.id === activeFlow[index + 1]);
        
        if (fromIndex === -1 || toIndex === -1) return null;
        
        const fromX = 100 + (600 / (services.length - 1)) * fromIndex;
        const toX = 100 + (600 / (services.length - 1)) * toIndex;
        
        return (
          <motion.line
            key={`${id}-${activeFlow[index + 1]}`}
            x1={fromX + 15}
            y1="50"
            x2={toX - 15}
            y2="50"
            stroke="#2a9d8f"
            strokeWidth="3"
            markerEnd="url(#arrowhead)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          />
        );
      })}
    </svg>
  );
};

export default ServiceFlow;
