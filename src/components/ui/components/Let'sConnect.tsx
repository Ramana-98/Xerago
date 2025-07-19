import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, ArrowRight, CheckIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useState } from "react";

interface User {
  name: string;
  role: string;
  level: "Senior" | "Middle";
  avatar: string;
}

const users: User[] = [
  { name: "Randy Gouse", role: "Cybersecurity specialist", level: "Senior", avatar: "RG" },
  { name: "Giana Schleifer", role: "UX/UI Designer", level: "Middle", avatar: "GS" },
  { name: "Alex Kim", role: "Frontend Developer", level: "Middle", avatar: "AK" },
  { name: "Priya Patel", role: "Project Manager", level: "Senior", avatar: "PP" },
  { name: "Liam Smith", role: "Backend Developer", level: "Middle", avatar: "LS" },
  { name: "Maria Garcia", role: "QA Engineer", level: "Senior", avatar: "MG" },
  { name: "Chen Wei", role: "DevOps Engineer", level: "Middle", avatar: "CW" },
];

export default function LetsConnect() {
  const [connected, setConnected] = useState<boolean[]>(users.map(() => false));
  const [popoverOpen, setPopoverOpen] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const handleConnect = (idx: number) => {
    setConnected((prev) => prev.map((val, i) => (i === idx ? true : val)));
    setPopoverOpen(idx);
    setTimeout(() => setPopoverOpen(null), 1500); // Auto-close after 1.5s
  };

  return (
    <Card className="bg-white shadow-sm flex flex-col h-80"> {/* h-80 = 20rem, adjust as needed */}
      <CardHeader className="pb-3 sm:pb-4 px-4 sm:px-6 pt-4 sm:pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-800">
            Let's Connect
          </CardTitle>
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm"
            onClick={() => setShowAll((prev) => !prev)}
          >
            <span className="hidden sm:inline">{showAll ? 'Show less' : 'See all'}</span>
            <span className="sm:hidden">{showAll ? 'Less' : 'All'}</span>
            <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col">
        <div className={
          showAll
            ? "flex-1 min-h-0 overflow-y-auto pr-1 space-y-3 sm:space-y-4 hide-scrollbar"
            : "space-y-3 sm:space-y-4"
        }>
          {(showAll ? users : users.slice(0, 2)).map((user, idx) => (
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
                <Popover open={popoverOpen === idx}>
                  <PopoverTrigger asChild>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="w-6 h-6 sm:w-8 sm:h-8 p-0"
                      onClick={() => !connected[idx] && handleConnect(idx)}
                      disabled={connected[idx]}
                    >
                      {connected[idx] ? (
                        <CheckIcon className="w-3 h-3 sm:w-4 sm:h-4 text-green-600" />
                      ) : (
                        <Plus className="w-3 h-3 sm:w-4 sm:h-4" />
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent side="top" align="center" className="text-green-700 text-xs font-medium">
                    Connect successfully
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
