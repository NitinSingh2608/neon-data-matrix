import { cn } from '@/lib/utils';

interface StatusIndicatorProps {
  status: string;
  className?: string;
}

export const StatusIndicator = ({ status, className }: StatusIndicatorProps) => {
  const getStatusColor = (status: string) => {
    const lowerStatus = status.toLowerCase();
    if (lowerStatus.includes('active') || lowerStatus.includes('completed') || lowerStatus.includes('success')) {
      return 'text-neon-green bg-neon-green/10 border-neon-green/30';
    }
    if (lowerStatus.includes('pending') || lowerStatus.includes('in progress')) {
      return 'text-neon-orange bg-neon-orange/10 border-neon-orange/30';
    }
    if (lowerStatus.includes('failed') || lowerStatus.includes('error') || lowerStatus.includes('inactive')) {
      return 'text-destructive bg-destructive/10 border-destructive/30';
    }
    return 'text-neon-cyan bg-neon-cyan/10 border-neon-cyan/30';
  };

  return (
    <span className={cn(
      "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
      "transition-all duration-300 hover:shadow-lg",
      getStatusColor(status),
      className
    )}>
      <span className="w-2 h-2 rounded-full bg-current mr-2 animate-pulse" />
      {status}
    </span>
  );
};