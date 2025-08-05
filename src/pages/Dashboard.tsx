import { useGoogleSheets } from '@/hooks/useGoogleSheets';
import { DashboardHeader } from '@/components/DashboardHeader';
import { MetricCard } from '@/components/MetricCard';
import { RevenueChart } from '@/components/RevenueChart';
import { StatusDistribution } from '@/components/StatusDistribution';
import { ProductsBarChart } from '@/components/ProductsBarChart';
import { ClientTable } from '@/components/ClientTable';
import { Users, Package, DollarSign, TrendingUp, Activity, Target } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from '@/components/ui/skeleton';

const GOOGLE_SHEETS_URL = "https://docs.google.com/spreadsheets/d/18abfzA-icdzsf5xrU0myk_SLzSCC-ff3voy6nFdwbnI/export?format=csv";

const Dashboard = () => {
  const { data, loading, error, refetch } = useGoogleSheets(GOOGLE_SHEETS_URL);
  const { toast } = useToast();

  const handleRefresh = () => {
    refetch();
    toast({
      title: "Data Refreshed",
      description: "Dashboard data has been updated with the latest information.",
    });
  };

  // Calculate metrics
  const totalClients = data.length;
  const totalProducts = data.reduce((sum, item) => sum + parseInt(item["No. of Products"] || '0'), 0);
  const totalRevenue = data.reduce((sum, item) => {
    const price = parseFloat(item.Price?.replace(/[^0-9.-]+/g, '') || '0');
    return sum + price;
  }, 0);
  
  const activeClients = data.filter(item => 
    item.Status?.toLowerCase().includes('active') || 
    item.Status?.toLowerCase().includes('completed')
  ).length;
  
  const avgProductsPerClient = totalClients > 0 ? (totalProducts / totalClients).toFixed(1) : '0';
  const conversionRate = totalClients > 0 ? ((activeClients / totalClients) * 100).toFixed(1) : '0';

  if (error) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-7xl mx-auto">
          <div className="glass-card p-8 text-center border-destructive/50">
            <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Dashboard</h1>
            <p className="text-muted-foreground mb-6">{error}</p>
            <button 
              onClick={handleRefresh}
              className="cyber-button px-6 py-2 rounded-lg"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <DashboardHeader onRefresh={handleRefresh} isLoading={loading} />
        
        {loading ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="glass-card p-6">
                  <Skeleton className="h-12 w-12 rounded-xl mb-4" />
                  <Skeleton className="h-4 w-20 mb-2" />
                  <Skeleton className="h-8 w-16" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Skeleton className="h-[400px] rounded-lg" />
              <Skeleton className="h-[400px] rounded-lg" />
            </div>
          </div>
        ) : (
          <>
            {/* Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
              <MetricCard
                title="Total Clients"
                value={totalClients}
                icon={<Users className="h-6 w-6 text-primary" />}
                trend={{ value: 12.5, isPositive: true }}
                className="animate-fade-up"
              />
              <MetricCard
                title="Total Products"
                value={totalProducts}
                icon={<Package className="h-6 w-6 text-neon-purple" />}
                trend={{ value: 8.2, isPositive: true }}
                className="animate-fade-up"
                style={{ animationDelay: '100ms' }}
              />
              <MetricCard
                title="Total Revenue"
                value={`₹${totalRevenue.toLocaleString()}`}
                icon={<DollarSign className="h-6 w-6 text-neon-green" />}
                trend={{ value: 15.3, isPositive: true }}
                className="animate-fade-up"
                style={{ animationDelay: '200ms' }}
              />
              <MetricCard
                title="Active Clients"
                value={activeClients}
                icon={<Activity className="h-6 w-6 text-neon-orange" />}
                trend={{ value: 3.1, isPositive: false }}
                className="animate-fade-up"
                style={{ animationDelay: '300ms' }}
              />
              <MetricCard
                title="Avg Products/Client"
                value={avgProductsPerClient}
                icon={<TrendingUp className="h-6 w-6 text-neon-cyan" />}
                trend={{ value: 5.7, isPositive: true }}
                className="animate-fade-up"
                style={{ animationDelay: '400ms' }}
              />
              <MetricCard
                title="Conversion Rate"
                value={`${conversionRate}%`}
                icon={<Target className="h-6 w-6 text-neon-pink" />}
                trend={{ value: 2.4, isPositive: true }}
                className="animate-fade-up"
                style={{ animationDelay: '500ms' }}
              />
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="animate-fade-up" style={{ animationDelay: '600ms' }}>
                <RevenueChart data={data} />
              </div>
              <div className="animate-fade-up" style={{ animationDelay: '700ms' }}>
                <StatusDistribution data={data} />
              </div>
            </div>

            <div className="animate-fade-up" style={{ animationDelay: '800ms' }}>
              <ProductsBarChart data={data} />
            </div>

            {/* Client Table */}
            <div className="animate-fade-up" style={{ animationDelay: '900ms' }}>
              <ClientTable data={data} />
            </div>
          </>
        )}
      </div>
      
      {/* Floating Stats */}
      <div className="fixed bottom-4 right-4 space-y-2">
        <div className="glass-card p-3 text-sm text-neon-green border-neon-green/30 animate-float">
          📊 Live Data Active
        </div>
        <div className="glass-card p-3 text-sm text-neon-cyan border-neon-cyan/30 animate-float" style={{ animationDelay: '1s' }}>
          🔄 Auto-refresh: ON
        </div>
      </div>
    </div>
  );
};

export default Dashboard;