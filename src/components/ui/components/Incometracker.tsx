import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, ChevronDown } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { useState } from "react";

const data = [
  { day: "S", amount: 1200 },
  { day: "M", amount: 1800 },
  { day: "T", amount: 2567 },
  { day: "W", amount: 2100 },
  { day: "T", amount: 2300 },
  { day: "F", amount: 1900 },
  { day: "S", amount: 1500 },
];

const maxAmount = Math.max(...data.map((d) => d.amount));

export default function IncomeTracker() {
  const [selectedDay, setSelectedDay] = useState<number | null>(2); // Default to Tuesday (index 2)

  const handleBarClick = (index: number) => {
    setSelectedDay(selectedDay === index ? null : index);
  };

  return (
    <Card className="rounded-2xl bg-[#f7f8f9] p-3 sm:p-4 w-full h-100">
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-2 gap-1 sm:gap-0">
        <div className="w-full sm:w-auto">
          <CardTitle className="text-lg sm:text-xl flex items-center gap-2">
            <CalendarIcon className="w-4 h-4 sm:w-5 sm:h-5 text-gray-500" />
            Income Tracker
          </CardTitle>
          <p className="text-xs sm:text-sm text-muted-foreground mt-1">
            Track changes in income over time and access detailed data on each project and payments received
          </p>
        </div>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="rounded-full px-3 sm:px-4 py-1 text-xs sm:text-sm w-full sm:w-auto"
            >
              Week
              <ChevronDown className="ml-1 sm:ml-2 h-3 w-3 sm:h-4 sm:w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-32 sm:w-40 p-2">
            <p className="text-xs sm:text-sm text-muted-foreground">Week Selector</p>
            {/* You can add Calendar component here */}
          </PopoverContent>
        </Popover>
      </CardHeader>

      <CardContent className="mt-6 sm:mt-6">
        {/* Left Stat for mobile only */}
        <div className="block sm:hidden mb-2 text-center">
          <p className="text-base font-semibold">+20%</p>
          <p className="text-xs text-muted-foreground">This week’s income is higher than last week’s</p>
        </div>
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-2 sm:gap-4 h-48 sm:h-62 w-full">
          {/* Left Stat for desktop only */}
          <div className="hidden sm:block text-center md:text-left mb-2 sm:mb-0">
            <p className="text-2xl lg:text-3xl font-semibold">+20%</p>
            <p className="text-sm text-muted-foreground">This week’s income is higher than last week’s</p>
          </div>

          {/* Vertical Bar Chart */}
          <TooltipProvider>
            <div className="flex justify-between items-end w-full max-w-xl mx-auto gap-1 sm:gap-2 lg:gap-3 overflow-hidden px-1 sm:px-0">
              {data.map((d, i) => {
                // Enhanced height calculation with more dramatic range
                const normalizedValue = (d.amount - Math.min(...data.map(item => item.amount))) / (Math.max(...data.map(item => item.amount)) - Math.min(...data.map(item => item.amount)));
                const height = 30 + (normalizedValue * 170); // 30px minimum, 200px maximum
                const isSelected = selectedDay === i;

                return (
                  <Tooltip key={i}>
                    <TooltipTrigger asChild>
                      <div 
                        className="flex flex-col items-center gap-1 cursor-pointer"
                        onClick={() => handleBarClick(i)}
                      >
                        {isSelected && (
                          <div className="text-xs font-medium bg-black text-white rounded-full px-2 py-0.5 mb-1">
                            ${d.amount.toLocaleString()}
                          </div>
                        )}
                        <div
                          className={cn(
                            "w-1.5 sm:w-2 rounded-full bg-gradient-to-b from-[#d4d8db] to-[#f0f1f2] hover:opacity-80 transition-opacity",
                            isSelected && "bg-black ring-2 ring-blue-500"
                          )}
                          style={{ height: `${height}px`, minHeight: "30px", maxHeight: "200px" }}
                        />
                        <div
                          className={cn(
                            "text-xs sm:text-sm text-muted-foreground w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#d7d8da] flex items-center justify-center mt-1",
                            isSelected && "bg-black text-white"
                          )}
                        >
                          {d.day}
                        </div>
                      </div>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p className="font-medium">${d.amount.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Click to select {d.day}day's data</p>
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>
          </TooltipProvider>
        </div>
      </CardContent>
    </Card>
  );
}
