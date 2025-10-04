'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { day: 'Mon', mood: 3 },
  { day: 'Tue', mood: 4 },
  { day: 'Wed', mood: 2 },
  { day: 'Thu', mood: 5 },
  { day: 'Fri', mood: 4 },
  { day: 'Sat', mood: 3 },
  { day: 'Sun', mood: 5 },
];

const chartConfig = {
  mood: {
    label: 'Mood',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function MoodChart() {
  return (
    <ChartContainer config={chartConfig} className="h-[150px] w-full">
      <BarChart
        accessibilityLayer
        data={chartData}
        margin={{ top: 5, right: 5, left: -20, bottom: -10 }}
      >
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
        />
        <YAxis
          domain={[0, 5]}
          tickLine={false}
          axisLine={false}
          tickMargin={10}
          ticks={[1, 2, 3, 4, 5]}
          tickFormatter={(value) => {
            const labels = ['😟', '😢', '😐', '😌', '😊'];
            return labels[value - 1] || '';
          }}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dot" hideLabel />}
        />
        <Bar dataKey="mood" fill="var(--color-mood)" radius={8} />
      </BarChart>
    </ChartContainer>
  );
}
