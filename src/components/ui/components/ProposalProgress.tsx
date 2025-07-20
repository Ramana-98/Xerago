import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";

interface Metric {
  label: string;
  value: number;
  color: string;
  barColor: string;
}

function getRandomMetricsForDate(date: Date): Metric[] {
  // Use the date as a seed for consistent random values per date
  const seed = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate();
  function seededRandom(min: number, max: number, salt: number) {
    // Simple deterministic pseudo-random based on date and salt
    const x = Math.sin(seed + salt) * 10000;
    return Math.floor((x - Math.floor(x)) * (max - min + 1) + min);
  }
  return [
    {
      label: "Proposals sent",
      value: seededRandom(40, 100, 1),
      color: "text-gray-800",
      barColor: "bg-gray-400",
    },
    {
      label: "Interviews",
      value: seededRandom(5, 25, 2),
      color: "text-gray-800",
      barColor: "bg-red-400",
    },
    {
      label: "Hires",
      value: seededRandom(5, 20, 3),
      color: "text-gray-800",
      barColor: "bg-gray-800",
    },
  ];
}

export default function ProposalProgress() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date(2024, 3, 11)); // April 11, 2024
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const formatDate = (date: Date) => {
    return format(date, "MMM dd, yyyy");
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (date) {
      setSelectedDate(date);
      setIsCalendarOpen(false);
    }
  };

  const currentMetrics = getRandomMetricsForDate(selectedDate);

  return (
    <Card className="bg-white shadow-sm rounded-2xl flex flex-col h-80 hover:shadow-lg hover:bg-amber-200 hover:-translate-y-1 transition-all duration-200">
      <CardHeader className="pb-2 sm:pb-8 px-6 pt-4 sm:pt-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base sm:text-lg font-semibold text-gray-900">
            Proposal Progress
          </CardTitle>
          <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
            <PopoverTrigger asChild>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-gray-600 hover:text-gray-800 text-xs sm:text-sm"
              >
                <CalendarIcon className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">{formatDate(selectedDate)}</span>
                <span className="sm:hidden">{format(selectedDate, "MMM dd")}</span>
                <ChevronDown className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                initialFocus
                className="rounded-md border"
              />
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>
      <CardContent className="flex-1 min-h-0 px-4 sm:px-6 pb-4 sm:pb-6 flex flex-col">
        <div className="grid grid-cols-3 gap-0 relative flex-1 items-center">
          {currentMetrics.map((metric, idx) => (
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
