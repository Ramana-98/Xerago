"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon, ChevronDown } from "lucide-react"
import { useState } from "react"
import { format } from "date-fns"

// Sample data for the visual indicators
const proposalData = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  height: Math.random() * 40 + 10,
}))

const interviewData = Array.from({ length: 15 }, (_, i) => ({
  id: i,
  height: Math.random() * 35 + 15,
}))

const hireData = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  height: Math.random() * 30 + 20,
}))

export default function ProposalProgress() {
  const [date, setDate] = useState<Date>(new Date(2024, 3, 11))
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)

  return (
    <Card className="bg-white h-full flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 flex-shrink-0">
        <CardTitle className="text-lg font-semibold text-gray-800">Proposal Progress</CardTitle>
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2 text-xs font-normal bg-transparent h-8">
              <CalendarIcon className="h-3 w-3" />
              {format(date, "MMMM dd, yyyy")}
              <ChevronDown className="h-3 w-3" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="end">
            <Calendar
              mode="single"
              selected={date}
              onSelect={(newDate) => {
                if (newDate) {
                  setDate(newDate)
                  setIsCalendarOpen(false)
                }
              }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col justify-center pt-0">
        <div className="grid grid-cols-3 gap-4">
          {/* Proposals sent */}
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-xs text-gray-600">Proposals sent</p>
              <p className="text-2xl font-bold text-gray-800">64</p>
            </div>
            <div className="flex items-end gap-0.5 h-8">
              {proposalData.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-400 rounded-sm flex-1 min-w-[1px]"
                  style={{ height: `${item.height * 0.6}px` }}
                />
              ))}
            </div>
          </div>

          {/* Interviews */}
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-xs text-gray-600">Interviews</p>
              <p className="text-2xl font-bold text-gray-800">12</p>
            </div>
            <div className="flex items-end gap-0.5 h-8">
              {interviewData.map((item) => (
                <div
                  key={item.id}
                  className="bg-red-400 rounded-sm flex-1 min-w-[1px]"
                  style={{ height: `${item.height * 0.6}px` }}
                />
              ))}
            </div>
          </div>

          {/* Hires */}
          <div className="space-y-2">
            <div className="space-y-1">
              <p className="text-xs text-gray-600">Hires</p>
              <p className="text-2xl font-bold text-gray-800">10</p>
            </div>
            <div className="flex items-end gap-0.5 h-8">
              {hireData.map((item) => (
                <div
                  key={item.id}
                  className="bg-gray-800 rounded-sm flex-1 min-w-[1px]"
                  style={{ height: `${item.height * 0.6}px` }}
                />
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
