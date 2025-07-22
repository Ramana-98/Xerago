import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import React, { useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

interface Project {
  title: string
  rate: string
  status: "Paid" | "Not Paid"
  type: string
  mode: string
  country: string
  timeAgo: string
  description?: string; // Added for new accordion
}

const projects: Project[] = [
  {
    title: "Web Development Project",
    rate: "$10/hour",
    status: "Paid",
    type: "Remote",
    mode: "Part-time",
    country: "Germany",
    timeAgo: "2h ago",
    description: "Developing a new website for a client in Germany.",
  },
  {
    title: "Copyright Project",
    rate: "$10/hour",
    status: "Not Paid",
    type: "Remote",
    mode: "Contract",
    country: "India",
    timeAgo: "5h ago",
    description: "Creating a comprehensive copyright protection strategy for a startup in India.",
  },
  {
    title: "Web Design Project",
    rate: "$10/hour",
    status: "Paid",
    type: "Remote",
    mode: "Freelance",
    country: "UK",
    timeAgo: "1d ago",
    description: "Designing a modern and user-friendly website for a UK-based e-commerce company.",
  },
  {
    title: "UI/UX Design Project",
    rate: "$12/hour",
    status: "Not Paid",
    type: "Remote",
    mode: "Part-time",
    country: "Canada",
    timeAgo: "3h ago",
    description: "Conducting user research and designing wireframes for a Canadian fintech startup.",
  },
  {
    title: "Database Optimization",
    rate: "$18/hour",
    status: "Paid",
    type: "Remote",
    mode: "Contract",
    country: "UK",
    timeAgo: "4h ago",
    description: "Optimizing the database structure and performance for a UK-based SaaS company.",
  },
  {
    title: "API Integration Project",
    rate: "$14/hour",
    status: "Not Paid",
    type: "Remote",
    mode: "Freelance",
    country: "UK",
    timeAgo: "4h ago",
    description: "Integrating multiple APIs for a UK-based logistics platform.",
  },
  {
    title: "E-commerce Platform",
    rate: "$16/hour",
    status: "Paid",
    type: "Remote",
    mode: "Freelance",
    country: "UK",
    timeAgo: "4h ago",
    description: "Building a robust e-commerce platform for a UK-based fashion retailer.",
  }
]
  



interface ProjectsPageProps {
  onBack: () => void;
}

export default function ProjectsPage({ onBack }: ProjectsPageProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [projectStatus, setProjectStatus] = useState(
    projects.map((p) => p.status === "Paid")
  );
  const [projectNote, setProjectNote] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 3;
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  const paginatedProjects = projects.slice(
    (currentPage - 1) * projectsPerPage,
    currentPage * projectsPerPage
  );
  return (
    <div className="px-4 md:px-8 py-6 space-y-4 ">
      <div className="flex items-center gap-4 mb-4">
        <button
          onClick={onBack}
          className="px-3 py-1 bg-gray-300 rounded hover:bg-gray-400 text-sm font-medium"
        >
          ← Back
        </button>
        <h1 className="text-2xl font-bold m-0">Your Projects</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {paginatedProjects.map((project, i) => (
          <Card key={i} className="rounded-2xl shadow-sm hover:shadow-md transition">
            <CardHeader>
              <CardTitle className="flex justify-between items-start">
                <span>{project.title}</span>
                <Badge
                  variant={projectStatus[i] ? "default" : "secondary"}
                  className={projectStatus[i] ? "bg-green-500" : "bg-gray-300 text-black"}
                >
                  {projectStatus[i] ? "Paid" : "Not Paid"}
                </Badge>
              </CardTitle>
              <div className="flex items-center gap-2 mt-2">
                <Switch
                  checked={projectStatus[i]}
                  onCheckedChange={(checked) => {
                    setProjectStatus((prev) =>
                      prev.map((val, idx) => (idx === i ? checked : val))
                    );
                  }}
                  id={`switch-${i}`}
                />
                <label htmlFor={`switch-${i}`} className="text-xs text-gray-600">
                  {projectStatus[i] ? "Paid" : "Not Paid"}
                </label>
              </div>
              <p className="text-sm text-muted-foreground">{project.rate}</p>
            </CardHeader>
            <CardContent className="text-sm text-muted-foreground space-y-2">
              <div className="flex flex-wrap gap-2">
                {(() => {
                  let typeClass = "border-gray-200 text-gray-600 bg-gray-50";
                  if (project.type === "Remote") typeClass = "border-red-200 text-red-700 bg-red-50";
                  else if (project.type === "Contract") typeClass = "border-teal-200 text-teal-700 bg-teal-50";
                  return (
                    <Badge variant="outline" className={typeClass}>
                      {project.type}
                    </Badge>
                  );
                })()}
                {(() => {
                  let modeClass = "border-gray-200 text-gray-600 bg-gray-50";
                  if (project.mode === "Part-time") modeClass = "border-blue-200 text-blue-700 bg-blue-50";
                  else if (project.mode === "Freelance") modeClass = "border-yellow-200 text-yellow-700 bg-yellow-50";
                  else if (project.mode === "Contract") modeClass = "border-teal-200 text-teal-700 bg-teal-50";
                  return (
                    <Badge variant="outline" className={modeClass}>
                      {project.mode}
                    </Badge>
                  );
                })()}
              </div>
              <p className="text-xs text-gray-500">
                {project.country} · {project.timeAgo}
              </p>
              <Button
                variant="ghost"
                className="mt-2 p-0 text-sm text-blue-600 hover:underline flex items-center gap-1"
                onClick={() => setSelectedProject(project)}
              >
                View Details <ArrowUpRight className="w-4 h-4" />
              </Button>
              {/* Accordion for more details */}
              <Accordion type="single" collapsible className="mt-2">
                <AccordionItem value="item-1">
                  <AccordionTrigger>More Details</AccordionTrigger>
                  <AccordionContent>
                    <div className="overflow-y-auto max-h-[120px] pr-2">
                      <div>
                        <div className="mb-2">
                          <b>Description:</b> {project.description || "No description provided."}
                        </div>
                        <div className="mb-2">
                          <b>Milestones:</b> <span className="text-gray-500">(Coming soon)</span>
                        </div>
                        <div>
                          <b>Comments:</b> <span className="text-gray-500">(Coming soon)</span>
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
      {/* Pagination Controls */}
      <div className="flex justify-center items-center gap-2 mt-6">
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        {Array.from({ length: totalPages }, (_, idx) => (
          <Button
            key={idx + 1}
            variant={currentPage === idx + 1 ? "default" : "outline"}
            size="sm"
            onClick={() => setCurrentPage(idx + 1)}
          >
            {idx + 1}
          </Button>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => setSelectedProject(null)}
            >
              ×
            </button>
            <h2 className="text-xl font-bold mb-2">{selectedProject.title}</h2>
            <p className="mb-2"><b>Rate:</b> {selectedProject.rate}</p>
            <p className="mb-2"><b>Status:</b> {selectedProject.status}</p>
            <p className="mb-2"><b>Type:</b> {selectedProject.type}</p>
            <p className="mb-2"><b>Mode:</b> {selectedProject.mode}</p>
            <p className="mb-2"><b>Country:</b> {selectedProject.country}</p>
            <p className="mb-2"><b>Posted:</b> {selectedProject.timeAgo}</p>
            {/* Feedback/Notes Textarea */}
            <div className="mt-4">
              <label htmlFor="project-note" className="block text-sm font-medium text-gray-700 mb-1">Notes / Feedback</label>
              <Textarea
                id="project-note"
                placeholder="Add notes, feedback, or comments about this project..."
                value={projectNote}
                onChange={e => setProjectNote(e.target.value)}
                className="w-full min-h-[80px]"
              />
              <Button
                className="mt-3 w-full bg-blue-600 hover:bg-blue-700"
                onClick={() => {
                  toast("Note saved!");
                  setProjectNote("");
                }}
                disabled={!projectNote.trim()}
              >
                Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
