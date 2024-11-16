"use client";

import {
  Label,
  PolarGrid,
  PolarRadiusAxis,
  RadialBar,
  RadialBarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";
import { calculatePercentage, convertFileSize } from "@/lib/utils";

const chartConfig = {
  size: {
    label: "Size",
  },
  used: {
    label: "Used",
    color: "white",
  },
} satisfies ChartConfig;

export const Chart = ({ used = 0 }: { used: number }) => {
  // Map the storage value to a 0-100 scale for the chart
  const normalizedValue = (used / (2 * 1024 * 1024 * 1024)) * 100;
  const chartData = [{ 
    storage: normalizedValue,
    fill: "white" 
  }];

  return (
    <Card className="w-full rounded-3xl shadow-lg bg-[#ff8989] border-none overflow-hidden">
      <CardContent className="flex flex-col items-center p-6">
        <ChartContainer 
          config={chartConfig} 
          className="w-full max-w-[220px] aspect-square relative"
        >
          <RadialBarChart
            data={chartData}
            startAngle={180}
            endAngle={-180}
            innerRadius="80%"
            outerRadius="100%"
            barSize={10}
            className="w-full h-full -rotate-90"
          >
            <PolarGrid
              gridType="circle"
              radialLines={false}
              stroke="white"
              className="opacity-10"
            />
            <RadialBar 
              dataKey="storage" 
              background 
              cornerRadius={30}
              className="drop-shadow-md [&_.background-sector]:fill-white/20"
              fill="white"
            />
            <PolarRadiusAxis 
              tick={false} 
              tickLine={false} 
              axisLine={false}
              className="rotate-90"
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                        className="rotate-90"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="text-3xl font-medium text-white"
                        >
                          {normalizedValue.toFixed(2)}%
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="text-sm text-white/70"
                        >
                          Space used
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
          </RadialBarChart>
        </ChartContainer>
      </CardContent>

      <CardContent className="px-6 pb-6 pt-0">
        <div className="space-y-1.5">
          <CardTitle className="text-xl font-normal text-white">
            Available Storage
          </CardTitle>
          <div className="flex items-center justify-between">
            <span className="text-sm text-white/70">
              {used ? convertFileSize(used) : "39.6MB"} / 2GB
            </span>
            <span className="text-sm text-white/70">
              {used < 2 * 1024 * 1024 * 1024 ? 
                convertFileSize(2 * 1024 * 1024 * 1024 - used) + " remaining" : 
                "Storage full"
              }
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};