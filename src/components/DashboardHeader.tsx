import { Button } from '@/components/ui/button';
import { RefreshCw, Settings, Bell } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardHeaderProps {
  onRefresh: () => void;
  isLoading?: boolean;
}

export const DashboardHeader = ({ onRefresh, isLoading }: DashboardHeaderProps) => {
  return (
    <div className="glass-card p-6 mb-8 border-glass-border">
      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold gradient-text animate-fade-up">
            Analytics Command Center
          </h1>
          <p className="text-muted-foreground animate-fade-up" style={{ animationDelay: '200ms' }}>
            Real-time business intelligence dashboard
          </p>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            className="cyber-button"
            onClick={onRefresh}
            disabled={isLoading}
          >
            <RefreshCw className={cn("h-4 w-4", isLoading && "animate-spin")} />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="cyber-button"
          >
            <Bell className="h-4 w-4" />
          </Button>
          
          <Button
            variant="outline"
            size="icon"
            className="cyber-button"
          >
            <Settings className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      {/* Live Status Indicator */}
      <div className="flex items-center mt-4 space-x-2">
        <div className="w-3 h-3 rounded-full bg-neon-green animate-pulse" />
        <span className="text-sm text-neon-green font-medium">Live Data Feed Active</span>
      </div>
    </div>
  );
};