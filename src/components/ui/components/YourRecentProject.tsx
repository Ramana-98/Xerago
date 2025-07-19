import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown, Settings, FileText, Moon } from "lucide-react";

interface Project {
  title: string;
  status: "Paid" | "Not Paid";
  rate: string;
  description?: string;
  tags?: string[];
  country?: string;
  time?: string;
  icon: "settings" | "file" | "moon";
}

const projects: Project[] = [
  {
    title: "Web Development Project",
    status: "Paid",
    rate: "$10/hour",
    description:
      "This project involves implementing both frontend and backend functionalities, as well as integrating with third-party APIs.",
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

const getIcon = (icon: string) => {
  switch (icon) {
    case "settings":
      return <Settings className="w-4 h-4 text-red-500" />;
    case "file":
      return <FileText className="w-4 h-4 text-gray-600" />;
    case "moon":
      return <Moon className="w-4 h-4 text-blue-400" />;
    default:
      return <Settings className="w-4 h-4" />;
  }
};

export default function YourRecentProjects() {
  return (
    <Card className="bg-white">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Your Recent Projects
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
            See all Project
            <ArrowUp className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {projects.map((proj, idx) => (
          <div
            key={idx}
            className="border border-gray-100 rounded-lg p-4 space-y-3 hover:shadow-sm transition-shadow bg-gray-50/30"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center mt-1">
                  {getIcon(proj.icon)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-medium text-sm text-gray-800">{proj.title}</p>
                    <span className="text-xs text-gray-500">{proj.rate}</span>
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
              <Button size="sm" variant="ghost" className="w-6 h-6 p-0">
                {idx === 0 ? (
                  <ArrowUp className="w-4 h-4 text-gray-600" />
                ) : (
                  <ArrowDown className="w-4 h-4 text-gray-600" />
                )}
              </Button>
            </div>
            
            {proj.description && (
              <p className="text-xs text-gray-500 ml-11">
                {proj.description}
              </p>
            )}
            
            {proj.tags && (
              <div className="flex flex-wrap gap-2 ml-11">
                {proj.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="text-xs border-gray-200 text-gray-600 bg-gray-50">
                    {tag}
                  </Badge>
                ))}
              </div>
            )}
            
            {proj.country && (
              <p className="text-xs text-gray-500 ml-11">
                {proj.country} • {proj.time}
              </p>
            )}
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
