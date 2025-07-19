import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight } from "lucide-react";

interface User {
  name: string;
  role: string;
  level: "Senior" | "Middle";
  avatar: string;
}

const users: User[] = [
  {
    name: "Randy Gouse",
    role: "Cybersecurity specialist",
    level: "Senior",
    avatar: "RG",
  },
  {
    name: "Giana Schleifer",
    role: "UX/UI Designer",
    level: "Middle",
    avatar: "GS",
  },
];

export default function LetsConnect() {
  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
            Let's Connect
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm">
            <span className="hidden sm:inline">See all</span>
            <span className="sm:hidden">All</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-4 sm:px-6 pb-4 sm:pb-6 space-y-3 sm:space-y-4">
        {users.map((user, idx) => (
          <div
            key={idx}
            className="flex items-center justify-between p-2 sm:p-3 border border-gray-100 rounded-lg hover:shadow-sm transition-shadow bg-gray-50/50"
          >
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <Avatar className="w-8 h-8 sm:w-10 sm:h-10 flex-shrink-0">
                <AvatarFallback className="bg-gray-200 text-gray-700 font-medium text-xs sm:text-sm">
                  {user.avatar}
                </AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <p className="font-medium text-xs sm:text-sm text-gray-800 truncate">{user.name}</p>
                <p className="text-xs text-gray-500 truncate">{user.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              <Badge 
                variant="outline" 
                className={`text-xs ${
                  user.level === "Senior" 
                    ? "border-orange-200 text-orange-700 bg-orange-50" 
                    : "border-blue-200 text-blue-700 bg-blue-50"
                }`}
              >
                {user.level}
              </Badge>
              <Button size="sm" variant="ghost" className="w-6 h-6 sm:w-8 sm:h-8 p-0">
                <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
              </Button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
