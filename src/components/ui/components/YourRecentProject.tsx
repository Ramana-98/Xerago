import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Settings, FileText, Moon, Code, Palette, Database } from "lucide-react";

interface Project {
  title: string;
  status: "Paid" | "Not Paid";
  rate: string;
  description?: string;
  tags?: string[];
  country?: string;
  time?: string;
  icon: "settings" | "file" | "moon" | "code" | "palette" | "database";
}

const initialProjects: Project[] = [
  {
    title: "Web Development Project",
    status: "Paid",
    rate: "$10/hour",
    description: "This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs.",
    tags: ["Remote", "Part-time"],
    country: "Germany",
    time: "2h ago",
    icon: "settings",
  },
  {
    title: "Copyright Project",
    status: "Not Paid",
    rate: "$10/hour",
    icon: "file",
  },
  {
    title: "Web Design Project",
    status: "Paid",
    rate: "$10/hour",
    icon: "moon",
  },
  
];

const additionalProjects: Project[] = [
  
  {
    title: "UI/UX Design Project",
    status: "Not Paid",
    rate: "$12/hour",
    description: "Creating comprehensive user interface designs and user experience flows for a fintech application.",
    tags: ["Remote", "Part-time"],
    country: "Canada",
    time: "3h ago",
    icon: "palette",
  },
  {
    title: "Database Optimization",
    status: "Paid",
    rate: "$18/hour",
    description: "Optimizing database performance and implementing efficient query structures for large-scale applications.",
    tags: ["Remote", "Contract"],
    country: "UK",
    time: "4h ago",
    icon: "database",
  },
  {
    title: "API Integration Project",
    status: "Not Paid",
    rate: "$14/hour",
    icon: "settings",
  },
  {
    title: "E-commerce Platform",
    status: "Paid",
    rate: "$16/hour",
    icon: "code",
  },
];

const getIcon = (icon: string) => {
  switch (icon) {
    case "settings":
      return <Settings className="w-3 h-3 text-gray-600" />;
    case "file":
      return <FileText className="w-3 h-3 text-gray-600" />;
    case "moon":
      return <Moon className="w-3 h-3 text-gray-600" />;
    case "code":
      return <Code className="w-3 h-3 text-gray-600" />;
    case "palette":
      return <Palette className="w-3 h-3 text-gray-600" />;
    case "database":
      return <Database className="w-3 h-3 text-gray-600" />;
    default:
      return <Settings className="w-3 h-3" />;
  }
};

export default function YourRecentProjects() {
  const [expandedProjects, setExpandedProjects] = useState<Set<number>>(new Set([0])); // First project expanded by default
  const [showAllProjects, setShowAllProjects] = useState(false);

  const toggleProject = (index: number) => {
    const newExpanded = new Set(expandedProjects);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedProjects(newExpanded);
  };

  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);
  };

  const allProjects = showAllProjects ? [...initialProjects, ...additionalProjects] : initialProjects;

  return (
    <Card className="bg-gray-100 shadow-sm h-[400px] flex flex-col hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <CardHeader className="pb-2 px-3 sm:px-4 pt-3 sm:pt-4 flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm sm:text-base font-semibold text-gray-800">
            Your Recent Projects
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-blue-600 hover:text-blue-700 text-xs"
            onClick={toggleShowAllProjects}
          >
            <span className="hidden sm:inline">{showAllProjects ? "Show Less" : "See all Project"}</span>
            <span className="sm:hidden">{showAllProjects ? "Less" : "All"}</span>
            <ArrowUp className={`w-3 h-3 ml-1 transition-transform ${showAllProjects ? 'rotate-180' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:px-3 pb-4 flex-1 overflow-y-auto scrollbar-hide">
        <div className="space-y-2 sm:space-y-3">
          {allProjects.map((proj, idx) => (
            <div
              key={idx}
              className="border border-gray-100 rounded-lg p-2 sm:p-3 space-y-2 hover:shadow-lg hover:-translate-y-1 transition-all duration-200 bg-gray-50/30"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-2">
                  <div className="w-5 h-5 sm:w-6 sm:h-6 bg-gray-100 rounded-lg flex items-center justify-center mt-1">
                    {getIcon(proj.icon)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 sm:gap-2 mb-1">
                      <p className="font-medium text-xs text-gray-800 truncate">{proj.title}</p>
                      <span className="text-xs text-gray-500 flex-shrink-0">{proj.rate}</span>
                    </div>
                    <Badge
                      variant={proj.status === "Paid" ? "default" : "outline"}
                      className={`text-xs ${
                        proj.status === "Paid" 
                          ? "bg-gray-800 text-white" 
                          : "border-gray-300 text-gray-600 bg-gray-50"
                      }`}
                    >
                      {proj.status}
                    </Badge>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  variant="ghost" 
                  className="w-5 h-5 p-0"
                  onClick={() => toggleProject(idx)}
                >
                  {expandedProjects.has(idx) ? (
                    <ArrowUp className="w-3 h-3 text-gray-600" />
                  ) : (
                    <ArrowDown className="w-3 h-3 text-gray-600" />
                  )}
                </Button>
              </div>
              
              {/* Expandable content */}
              {expandedProjects.has(idx) && proj.description && (
                <p className="text-xs text-gray-500 ml-11">
                  {proj.description}
                </p>
              )}
              
              {expandedProjects.has(idx) && proj.tags && (
                <div className="flex flex-wrap gap-2 ml-11">
                  {proj.tags.map((tag, i) => (
                    <Badge 
                      key={i} 
                      variant="outline" 
                      className={`text-xs ${
                        tag === "Remote" 
                          ? "border-red-200 text-red-700 bg-red-50" 
                          : tag === "Part-time"
                          ? "border-blue-200 text-blue-700 bg-blue-50"
                          : "border-gray-200 text-gray-600 bg-gray-50"
                      }`}
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
              
              {expandedProjects.has(idx) && proj.country && (
                <p className="text-xs text-gray-500 ml-11">
                  {proj.country} • {proj.time}
                </p>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
