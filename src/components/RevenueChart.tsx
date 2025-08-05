import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import { SheetData } from '@/hooks/useGoogleSheets';

interface RevenueChartProps {
  data: SheetData[];
}

export const RevenueChart = ({ data }: RevenueChartProps) => {
  // Process data for revenue trends
  const chartData = data.map((item, index) => ({
    name: `Client ${index + 1}`,
    revenue: parseFloat(item.Price?.replace(/[^0-9.-]+/g, '') || '0'),
    products: parseInt(item["No. of Products"] || '0')
  })).sort((a, b) => a.revenue - b.revenue);

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border-glass-border">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-neon-cyan">
            Revenue: ₹{payload[0].value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard title="Revenue Trends">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="name" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="revenue" 
            stroke="hsl(var(--neon-cyan))"
            strokeWidth={3}
            dot={{ fill: 'hsl(var(--neon-cyan))', strokeWidth: 2, r: 6 }}
            activeDot={{ r: 8, stroke: 'hsl(var(--neon-cyan))', strokeWidth: 2, fill: 'hsl(var(--background))' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};