import { ReactNode } from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  action?: ReactNode;
}

export const ChartCard = ({ title, children, className, action }: ChartCardProps) => {
  return (
    <Card className={cn(
      "glass-card hover-lift p-6 border-glass-border relative overflow-hidden group",
      "transition-all duration-500 hover:shadow-neon-purple",
      className
    )}>
      {/* Background Glow Effect */}
      <div className="absolute inset-0 bg-gradient-secondary opacity-0 group-hover:opacity-5 transition-opacity duration-500" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold gradient-text">
            {title}
          </h3>
          {action}
        </div>
        
        <div className="h-[300px]">
          {children}
        </div>
      </div>
      
      {/* Animated Border */}
      <div className="absolute inset-0 rounded-lg bg-gradient-secondary opacity-0 group-hover:opacity-100 transition-opacity duration-500" 
           style={{ 
             background: 'linear-gradient(45deg, transparent, hsl(var(--neon-purple) / 0.3), transparent)',
             mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             maskComposite: 'xor',
             WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
             WebkitMaskComposite: 'xor',
             padding: '1px'
           }} />
    </Card>
  );
};