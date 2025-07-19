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
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-8 px-2 pt-6">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold text-gray-800">
            Proposal Progress
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-800">
            <Calendar className="w-4 h-4 mr-2" />
            April 11, 2024
            <ChevronDown className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="px-6 pb-6">
        <div className="grid grid-cols-3 gap-0">
          {metrics.map((metric, idx) => (
            <div key={idx} className="relative">
              {/* Vertical separator line */}
              {idx > 0 && (
                <div 
                  className={`absolute left-0 top-0 bottom-0 w-0.5 ${
                    idx === 1 ? 'bg-red-400' : 'bg-gray-800'
                  }`}
                />
              )}
              
              <div className="px-4 text-center space-y-3">
                {/* Label */}
                <div className="text-sm text-gray-500 font-medium">
                  {metric.label}
                </div>
                
                {/* Value */}
                <div className={`text-2xl font-bold ${metric.color}`}>
                  {metric.value}
                </div>
                
                {/* Vertical bars */}
                <div className="flex items-end justify-center gap-1 h-8">
                  {Array.from({ length: 15 }, (_, i) => (
                    <div
                      key={i}
                      className={`w-1 rounded-full ${metric.barColor} ${
                        i < Math.floor(metric.value / 4.3) ? 'opacity-100' : 'opacity-20'
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
        </div>
      </CardContent>
    </Card>
  );
}
