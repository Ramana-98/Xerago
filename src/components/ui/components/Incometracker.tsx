"use client"

import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronDown, TrendingUp } from "lucide-react";

export default function IncomeTracker() {
  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
  const data = [1200, 1800, 2567, 1900, 1600, 1300, 900];
  const max = Math.max(...data);
  const selectedDay = 2; // Tuesday (index 2)

  return (
    <Card className="bg-white shadow-sm">
      <CardHeader className="pb-6 px-6 pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
              <TrendingUp className="w-4 h-4 text-gray-600" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl font-bold text-gray-800 leading-tight">
                Income Tracker
              </CardTitle>
              <p className="text-sm text-gray-500 leading-relaxed max-w-md">
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
          {data.map((value, idx) => {
            const height = (value / max) * 100;
            const isSelected = idx === selectedDay;
            
            return (
              <div key={idx} className="flex flex-col items-center relative w-10">
                {/* Background bar for selected day */}
                {isSelected && (
                  <div 
                    className="absolute bottom-8 bg-gray-200 rounded-full w-8"
                    style={{ height: `${height}%` }}
                  ></div>
                )}
                
                {/* Data point dot */}
                <div
                  className={`absolute bottom-8 w-2 h-2 rounded-full ${
                    isSelected ? 'bg-blue-500' : 'bg-gray-300'
                  }`}
                  style={{ bottom: `${height}%` }}
                ></div>
                
                {/* Value label for selected day */}
                {isSelected && (
                  <span className="text-xs absolute -top-8 bg-gray-800 text-white px-2 py-1 rounded font-medium whitespace-nowrap">
                    ${value.toLocaleString()}
                  </span>
                )}
                
                {/* Day label */}
                <span 
                  className={`text-xs mt-3 w-7 h-7 rounded-full flex items-center justify-center font-medium ${
                    isSelected 
                      ? 'bg-gray-800 text-white' 
                      : 'text-gray-600 bg-gray-100'
                  }`}
                >
                  {days[idx]}
                </span>
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
  );
}
