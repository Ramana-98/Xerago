import {
    Card,
    CardHeader,
    CardTitle,
    CardContent,
  } from "@/components/ui/card";
  import { Button } from "@/components/ui/button";
  import { ChevronDown } from "lucide-react";
  import {
    LineChart,
    Line,
    XAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
  } from "recharts";
  
  const data = [
    { name: "S", income: 1000 },
    { name: "M", income: 1800 },
    { name: "T", income: 2567 },
    { name: "W", income: 1900 },
    { name: "T", income: 2200 },
    { name: "F", income: 1700 },
    { name: "S", income: 1200 },
  ];
  
  const CustomDot = (props: any) => {
    const { cx, cy, value, index } = props;
    return (
      <>
        <circle cx={cx} cy={cy} r={5} fill="#60A5FA" stroke="white" strokeWidth={2} />
        <line x1={cx} y1={cy} x2={cx} y2={220} stroke="#E5E7EB" strokeWidth={1} />
      </>
    );
  };
  
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded-md">
          ${payload[0].value}
        </div>
      );
    }
    return null;
  };
  
  export default function IncomeTracker() {
    return (
      <Card className="h-[320px] bg-white shadow-sm">
        <CardHeader className="pb-0 px-6 pt-6">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-semibold text-gray-800">
              Income Tracker
            </CardTitle>
            <Button
              variant="outline"
              size="sm"
              className="text-sm text-gray-600 border-gray-200"
            >
              Week <ChevronDown className="w-4 h-4 ml-1" />
            </Button>
          </div>
          <p className="text-sm text-gray-500 mt-2">
            Track changes in income over time and access detailed data on each project and payments received
          </p>
        </CardHeader>
  
        <CardContent className="px-6 pt-2 pb-4">
          <div className="flex items-end justify-between mb-2">
            <div>
              <p className="text-2xl font-semibold text-gray-800">+20%</p>
              <p className="text-xs text-gray-500">
                This week's income is higher than last week's
              </p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={140}>
            <LineChart data={data}>
              <XAxis
                dataKey="name"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
              />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid vertical={false} strokeDasharray="3 3" />
              <Line
                type="monotone"
                dataKey="income"
                stroke="#60A5FA"
                strokeWidth={2}
                dot={<CustomDot />}
                activeDot={{
                  r: 8,
                  fill: "#1F2937",
                  stroke: "white",
                  strokeWidth: 2,
                }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    );
  }
  