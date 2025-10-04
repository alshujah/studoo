'use client';

import { Bar, BarChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartConfig,
} from '@/components/ui/chart';
import { Skeleton } from './ui/skeleton';

type MoodChartProps = {
    data: any[];
    loading: boolean;
};

const chartConfig = {
  mood: {
    label: 'Mood',
    color: 'hsl(var(--primary))',
  },
} satisfies ChartConfig;

export function MoodChart({ data, loading }: MoodChartProps) {
    if (loading) {
        return <Skeleton className="h-[150px] w-full" />
    }

  return (
    <ChartContainer config={chartConfig} className="h-[150px] w-full">
      <BarChart
        accessibilityLayer
        data={data}
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
            if (value > 0 && value <= labels.length) {
                return labels[value - 1];
            }
            return '';
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
