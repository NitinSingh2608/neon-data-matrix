import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ChartCard } from './ChartCard';
import { SheetData } from '@/hooks/useGoogleSheets';

interface ProductsBarChartProps {
  data: SheetData[];
}

export const ProductsBarChart = ({ data }: ProductsBarChartProps) => {
  // Process data for products by client
  const chartData = data.map((item, index) => ({
    client: `Client ${index + 1}`,
    products: parseInt(item["No. of Products"] || '0'),
    revenue: parseFloat(item.Price?.replace(/[^0-9.-]+/g, '') || '0')
  })).sort((a, b) => b.products - a.products).slice(0, 10); // Top 10

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="glass-card p-4 border-glass-border">
          <p className="text-foreground font-medium">{label}</p>
          <p className="text-neon-purple">
            Products: {payload[0].value}
          </p>
          <p className="text-neon-cyan">
            Revenue: ${payload[1]?.value?.toLocaleString()}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartCard title="Top Clients by Products">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.3} />
          <XAxis 
            dataKey="client" 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            angle={-45}
            textAnchor="end"
            height={60}
          />
          <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar 
            dataKey="products" 
            fill="hsl(var(--neon-purple))"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartCard>
  );
};