import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  style?: React.CSSProperties;
}

export const MetricCard = ({ title, value, icon, trend, className, style }: MetricCardProps) => {
  return (
    <Card 
      className={cn(
        "glass-card hover-lift p-6 border-glass-border relative overflow-hidden group",
        "transition-all duration-500 hover:shadow-neon-cyan",
        className
      )}
      style={style}
    >
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-10 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="p-3 rounded-xl bg-primary/10 border border-primary/20 neon-glow-cyan">
            {icon}
          </div>
          {trend && (
            <div className={cn(
              "flex items-center text-sm font-medium px-2 py-1 rounded-full",
              trend.isPositive ? "text-neon-green bg-neon-green/10" : "text-destructive bg-destructive/10"
            )}>
              <span className="mr-1">{trend.isPositive ? '↗' : '↘'}</span>
              {Math.abs(trend.value)}%
            </div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </h3>
          <p className="text-3xl font-bold gradient-text">
            {value}
          </p>
        </div>
      </div>
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
           style={{ 
             background: 'linear-gradient(45deg, transparent, hsl(var(--primary) / 0.3), transparent)',
             mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             maskComposite: 'xor',
             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             WebkitMaskComposite: 'xor',
             padding: '1px'
           }} />
    </Card>
  );
};