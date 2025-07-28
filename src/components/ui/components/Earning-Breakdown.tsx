import React, { useState, forwardRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const earningsData = {
  week: {
    total: 3200,
    paid: 2400,
    pending: 800,
    colors: ["#2B4586", "#E5E7EB"]
  },
  month: {
    total: 12000,
    paid: 9000,
    pending: 3000,
    colors: ["#059669", "#FEF3C7"]
  },
};

interface EarningBreakdownProps {
  highlight?: boolean;
}

const EarningBreakdown = forwardRef<HTMLDivElement, EarningBreakdownProps>(
  ({ highlight = false }, ref) => {
    const [tab, setTab] = useState("week");
    const data = tab === "week" ? earningsData.week : earningsData.month;

    const pieData = {
      labels: ["Paid", "Pending"],
      datasets: [
        {
          data: [data.paid, data.pending],
          backgroundColor: data.colors,
          borderWidth: 0,
        },
      ],
    };

    return (
      <Card
        ref={ref}
        className={`rounded-2xl shadow w-full max-w-md mx-auto p-5 transition-all duration-200 hover:bg-gray-300 hover:-translate-y-2 ${
          highlight ? "ring-2 ring-blue-500 bg-yellow-50" : ""
        } ${
          tab === "week"
            ? "bg-gradient-to-br from-[#e9f1fe] to-[#d8e7fd]"
            : "bg-gradient-to-br from-[#f0fdf4] to-[#dcfce7]"
        }`}
      >
        <CardHeader className="pb-1">
          <CardTitle className="text-2xl font-bold">Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent >
          <Tabs value={tab} onValueChange={setTab} className="mb-2">
            <TabsList className="bg-gray-100 rounded-lg p-1 inline-flex mb-7 flex justify-center w-full">
              <TabsTrigger
                value="week"
                className={
                  tab === "week"
                    ? "bg-white shadow text-black font-semibold px-4 py-1 rounded-lg"
                    : "text-gray-500 px-4 py-1 "
                }
              >
                This week
              </TabsTrigger>
              <TabsTrigger
                value="month"
                className={
                  tab === "month"
                    ? "bg-white shadow text-black font-semibold px-4 py-1 rounded-lg"
                    : "text-gray-500 px-4 py-1"
                }
              >
                Last month
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex-1 flex flex-col items-start">
              <div className="text-3xl font-extrabold mb-1">${data.total.toLocaleString()}</div>
              <div className="text-gray-500 text-base mb-4">Total Earnings</div>
              <div className="flex flex-col gap-2 mt-2">
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: data.colors[0] }}
                  ></div>
                  <span className="font-bold">Paid</span>
                  <span className="ml-4 text-base">${data.paid.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div 
                    className="w-3 h-3 rounded-full" 
                    style={{ backgroundColor: data.colors[1] }}
                  ></div>
                  <span className="font-bold">Pending</span>
                  <span className="ml-4 text-base">${data.pending.toLocaleString()}</span>
                </div>
              </div>
            </div>
            <div className="flex-1 flex justify-center items-center">
              <div className="w-32 h-32">
                <Doughnut
                  data={pieData}
                  options={{
                    plugins: {
                      legend: { display: false },
                      tooltip: { 
                        enabled: true,
                        callbacks: {
                          label: function(context) {
                            const label = context.label || '';
                            const value = context.parsed;
                            const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
                            const percentage = ((value / total) * 100).toFixed(1);
                            return `${label}: $${value.toLocaleString()} (${percentage}%)`;
                          }
                        }
                      }
                    },
                    cutout: "70%",
                    responsive: true,
                    maintainAspectRatio: false,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
);

EarningBreakdown.displayName = "EarningBreakdown";

export default EarningBreakdown;
