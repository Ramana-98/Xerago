import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown } from "lucide-react";

interface Metric {
  label: string;
  value: number;
  color: string;
  barColor: string;
}

const metrics: Metric[] = [
  { label: "Proposals sent", value: 64, color: "text-gray-800", barColor: "bg-gray-400" },
  { label: "Interviews", value: 12, color: "text-gray-800", barColor: "bg-red-400" },
  { label: "Hires", value: 10, color: "text-gray-800", barColor: "bg-gray-800" },
];

export default function ProposalProgress() {
  return (
    <Card className="bg-white shadow-sm rounded-2xl flex flex-col h-80 hover:shadow-lg hover:-translate-y-1 transition-all duration-200">
      <CardHeader className="pb-2 sm:pb-8 px-6 pt-4 sm:pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
            Proposal Progress
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            <span className="hidden sm:inline">April 11, 2024</span>
            <span className="sm:hidden">Apr 11</span>
            <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col">
        <div className="grid grid-cols-3 gap-0 relative flex-1 items-center">
          {metrics.map((metric, idx) => (
            <div key={idx} className="flex flex-col items-center justify-center">
              <div className="w-full text-center space-y-2 sm:space-y-2 px-2 sm:px-4">
                {/* Label */}
                <div className="text-xs sm:text-sm text-gray-500 font-semibold">
                  {metric.label}
                </div>
                
                {/* Value */}
                <div className={`text-xl sm:text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
                
                {/* Vertical bars */}
                <div className="flex items-end justify-center gap-0.5 sm:gap-1 h-6 sm:h-8">
                  {Array.from({ length: 12 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full ${metric.barColor} ${
                        i < Math.floor(metric.value / 8.3) ? 'opacity-100' : 'opacity-20'
                      }`}
                      style={{ 
                        height: `${Math.random() * 60 + 20}%`,
                        minHeight: '4px'
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          ))}
          
          {/* Vertical separator lines positioned absolutely */}
          <div className="absolute left-1/3 top-8 bottom-4 w-0.5 bg-red-400"></div>
          <div className="absolute left-2/3 top-8 bottom-4 w-0.5 bg-gray-800"></div>
        </div>
      </CardContent>
    </Card>
  );
}
