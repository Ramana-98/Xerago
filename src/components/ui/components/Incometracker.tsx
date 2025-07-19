import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { ChevronDown, TrendingUp } from "lucide-react";

export default function IncomeTracker() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const data = [1200, 1800, 2567, 1900, 1600, 1300, 900];
  const max = Math.max(...data);
  const min = Math.min(...data);
  const [selectedDay, setSelectedDay] = useState(2); // Tuesday (index 2) - default selected

  const handleDayClick = (index: number) => {
    setSelectedDay(index);
  };

  // Calculate normalized position based on actual data range
  const getNormalizedHeight = (value: number) => {
    const range = max - min;
    return range === 0 ? 50 : ((value - min) / range) * 100;
  };

  return (
    <TooltipProvider>
      <Card className="bg-white shadow-sm">
        <CardHeader className="pb-6 px-6 pt-6">
          <div className="flex items-start justify-between">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                <TrendingUp className="w-4 h-4 text-gray-700" />
              </div>
              <div className="space-y-2">
                <CardTitle className="text-xl font-bold text-gray-800 leading-tight text-left ">
                  Income Tracker
                </CardTitle>
                <p className="text-sm text-gray-500 leading-relaxed max-w-md text-left">
                  Track changes in income over time and access detailed data on each project and payments received
                </p>
              </div>
            </div>
            <Button variant="outline" size="sm" className="text-gray-600 h-8 px-3 text-sm">
              Week
              <ChevronDown className="w-3 h-3 ml-1" />
            </Button>
          </div>
        </CardHeader>
        
        <CardContent className="px-6 pb-6">
          {/* Chart Section */}
          <div className="flex justify-between items-end h-48 relative mb-8">
            {/* Connecting line between data points */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
              <polyline
                fill="none"
                stroke="#3B82F6"
                strokeWidth="3"
                points={data.map((value, idx) => {
                  const x = (idx / (data.length - 1)) * 100;
                  const normalizedHeight = getNormalizedHeight(value);
                  const y = 100 - normalizedHeight;
                  return `${x}%,${y}%`;
                }).join(' ')}
              />
            </svg>

            {data.map((value, idx) => {
              const normalizedHeight = getNormalizedHeight(value);
              const isSelected = idx === selectedDay;
              
              return (
                <div key={idx} className="flex flex-col items-center relative w-10">
                  {/* Vertical line for each day - based on actual data range */}
                  <div 
                    className={`absolute bottom-8 w-0.5 transition-all duration-200 ${
                      isSelected ? 'bg-gray-800' : 'bg-gray-300'
                    }`} 
                    style={{ 
                      height: `${normalizedHeight}%`,
                      bottom: '32px' // Align with day labels
                    }}
                  ></div>
                  
                  {/* Data point dot with tooltip - positioned based on actual data */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <div
                        className={`absolute bottom-8 w-3 h-3 rounded-full cursor-pointer transition-all duration-200 ${
                          isSelected ? 'bg-blue-500 shadow-lg' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        style={{ bottom: `${normalizedHeight}%` }}
                        onClick={() => handleDayClick(idx)}
                      />
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white border-gray-700">
                      <p className="font-medium">${value.toLocaleString()}</p>
                      <p className="text-xs text-gray-300">{days[idx]} - {value >= 2000 ? 'High' : value >= 1500 ? 'Medium' : 'Low'} Income</p>
                    </TooltipContent>
                  </Tooltip>
                  
                  {/* Day label with tooltip */}
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        onClick={() => handleDayClick(idx)}
                        className={`text-xs mt-3 w-7 h-7 rounded-full flex items-center justify-center font-medium transition-all duration-200 cursor-pointer ${
                          isSelected 
                            ? 'bg-gray-800 text-white shadow-md' 
                            : 'text-gray-600 bg-gray-100 hover:bg-gray-200'
                        }`}
                      >
                        {days[idx]}
                      </button>
                    </TooltipTrigger>
                    <TooltipContent className="bg-gray-800 text-white border-gray-700">
                      <p className="font-medium">{days[idx]} - ${value.toLocaleString()}</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
              );
            })}
          </div>

          {/* Summary Section */}
          <div className="flex items-start">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-gray-800">+20%</div>
              <p className="text-sm text-gray-500 leading-relaxed max-w-xs">
                This week's income is higher than last week's
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </TooltipProvider>
  );
}
