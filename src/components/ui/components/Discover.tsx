import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Heart } from "lucide-react";
import { Carousel, CarouselItem, CarouselContent, CarouselPrevious, CarouselNext } from "@/components/ui/carousel";

type DiscoverProps = {
  onBack?: () => void;
};

// Example data
const categories = ["All", "Web Dev", "Design", "Writing", "Marketing"];
const projects = [
  {
    id: 1,
    title: "Frontend Dashboard for SaaS App",
    budget: "$800 - $1200",
    type: "Remote",
    skills: ["React", "Tailwind", "API"],
    client: { name: "Acme Corp", location: "USA", rating: 4.8 },
    posted: "3 hours ago",
    featured: true,
    category: "Web Dev",
  },
  {
    id: 2,
    title: "Mobile App UI Redesign",
    budget: "$500 - $900",
    type: "Remote",
    skills: ["Figma", "UI/UX", "Mobile"],
    client: { name: "Designify", location: "UK", rating: 4.6 },
    posted: "1 hour ago",
    featured: true,
    category: "Design",
  },
  {
    id: 3,
    title: "Content Writing for Blog",
    budget: "$100 - $200",
    type: "Part-time",
    skills: ["Writing", "SEO", "Blogging"],
    client: { name: "BlogPro", location: "Canada", rating: 4.9 },
    posted: "30 minutes ago",
    featured: false,
    category: "Writing",
  },
  {
    id: 4,
    title: "Backend API Integration",
    budget: "$600 - $1000",
    type: "Remote",
    skills: ["Node.js", "Express", "MongoDB"],
    client: { name: "API Masters", location: "Germany", rating: 4.7 },
    posted: "2 hours ago",
    featured: false,
    category: "Web Dev",
  },
  {
    id: 5,
    title: "Logo Design for Startup",
    budget: "$50 - $150",
    type: "Remote",
    skills: ["Logo", "Branding", "Illustrator"],
    client: { name: "Startify", location: "India", rating: 4.5 },
    posted: "10 minutes ago",
    featured: true,
    category: "Design",
  },
  {
    id: 6,
    title: "Marketing Campaign Manager",
    budget: "$1200 - $2000",
    type: "Full-time",
    skills: ["Marketing", "Campaigns", "Analytics"],
    client: { name: "MarketGenius", location: "Australia", rating: 4.4 },
    posted: "4 hours ago",
    featured: false,
    category: "Marketing",
  },
  {
    id: 7,
    title: "WordPress Site Migration",
    budget: "$300 - $500",
    type: "Remote",
    skills: ["WordPress", "Migration", "Hosting"],
    client: { name: "WP Experts", location: "USA", rating: 4.8 },
    posted: "5 hours ago",
    featured: false,
    category: "Web Dev",
  },
  {
    id: 8,
    title: "Social Media Content Creator",
    budget: "$400 - $700",
    type: "Part-time",
    skills: ["Social Media", "Content", "Photoshop"],
    client: { name: "Socially", location: "France", rating: 4.6 },
    posted: "1 day ago",
    featured: false,
    category: "Marketing",
  },
];

const carouselItems = [
  {
    title: "Trending: Frontend Dashboard for SaaS App",
    description: "High demand for React/Tailwind developers!",
  },
  {
    title: "Recommended: Design Projects",
    description: "UI/UX and branding projects are hot right now.",
  },
  {
    title: "Spotlight: Jane Smith",
    description: "Top-rated freelancer in Web Development.",
  },
];

export default function Discover({ onBack }: DiscoverProps) {
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  // Filter logic here...
  const filteredProjects = projects.filter(p =>
    p.title.toLowerCase().includes(search.toLowerCase())
    && (activeCategory === "All" || p.category === activeCategory)
  );

  const featuredProjects = filteredProjects.filter(p => p.featured);
  const regularProjects = filteredProjects.filter(p => !p.featured);

  return (
    <div className="p-2 sm:p-4 md:p-6 bg-gray-100 min-h-screen">
      <Carousel className="w-full max-w-2xl mx-auto mb-6 relative">
        {/* Add extra horizontal padding to make space for arrows */}
        <div className="relative px-8">
          <CarouselContent>
            {carouselItems.map((item, idx) => (
              <CarouselItem key={idx} className="p-2">
                <div className="bg-blue-50 rounded-lg shadow flex flex-col items-start p-4 min-h-[80px]">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-gray-700">{item.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 z-10" />
          <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 z-10" />
        </div>
      </Carousel>
      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-4 mb-6">
        <div className="flex items-center gap-2">
          <button
            className="back-btn"
            onClick={onBack}
            aria-label="Back to Dashboard"
            style={{
              background: "#1a202c",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "8px 12px",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              marginRight: "8px"
            }}
          >
            ←
          </button>
          <div className="relative flex-1 min-w-[120px]">
            <Input
              placeholder="Search projects..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </div>
        <div className="flex gap-2 flex-wrap justify-start sm:justify-end">
          {categories.map(cat => (
            <Button
              key={cat}
              variant={activeCategory === cat ? "default" : "outline"}
              onClick={() => setActiveCategory(cat)}
              className="text-xs"
            >
              {cat}
            </Button>
          ))}
        </div>
      </div>

      {/* Featured Projects */}
      <div className="mb-8">
        <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
          <span role="img" aria-label="star">⭐</span> Featured Projects
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {featuredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </div>

      {/* Project Listings */}
      <h2 className="text-lg font-bold mb-3 flex items-center gap-2">
        <span role="img" aria-label="clipboard">📋</span> Project Listings
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {regularProjects.map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}

type Project = {
  id: string | number;
  title: string;
  featured?: boolean;
  skills: string[];
  type: string;
  budget: string;
  client: {
    name: string;
    location: string;
    rating: number | string;
  };
  posted: string;
  category: string;
};

function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 border hover:shadow-lg transition">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-base">{project.title}</h3>
        {project.featured && <Badge className="bg-yellow-400 text-black">Featured</Badge>}
      </div>
      <div className="flex gap-2 flex-wrap">
        {project.skills.map(skill => (
          <Badge key={skill} className="bg-blue-100 text-blue-700">{skill}</Badge>
        ))}
      </div>
      <div className="text-sm text-gray-600">{project.type} • {project.budget}</div>
      <div className="flex items-center gap-2 text-xs text-gray-500">
        <span>{project.client.name} ({project.client.location})</span>
        <span className="flex items-center gap-1">
          <Star className="w-3 h-3 text-yellow-400" />
          {project.client.rating}
        </span>
        <span>• {project.posted}</span>
      </div>
      <div className="flex gap-2 mt-2">
        <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">📝 Apply Now</Button>
        <Button size="sm" variant="outline"><Heart className="w-4 h-4" /> Save</Button>
      </div>
    </div>
  );
}
