import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Card } from '@/components/ui/card';
import { StatusIndicator } from './StatusIndicator';
import { SheetData } from '@/hooks/useGoogleSheets';
import { Mail, Package, DollarSign } from 'lucide-react';

interface ClientTableProps {
  data: SheetData[];
}

export const ClientTable = ({ data }: ClientTableProps) => {
  return (
    <Card className="glass-card border-glass-border overflow-hidden">
      <div className="p-6 border-b border-glass-border">
        <h3 className="text-lg font-semibold gradient-text">Client Overview</h3>
        <p className="text-sm text-muted-foreground mt-1">
          Comprehensive client data and metrics
        </p>
      </div>
      
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="border-glass-border hover:bg-muted/5">
              <TableHead className="text-neon-cyan font-semibold">Client</TableHead>
              <TableHead className="text-neon-cyan font-semibold">Products</TableHead>
              <TableHead className="text-neon-cyan font-semibold">Revenue</TableHead>
              <TableHead className="text-neon-cyan font-semibold">Status</TableHead>
              <TableHead className="text-neon-cyan font-semibold">Contact</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((item, index) => (
              <TableRow 
                key={index} 
                className="border-glass-border hover:bg-muted/10 transition-colors duration-300 group"
              >
                <TableCell className="font-medium">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">
                      {(item.Clients || `C${index + 1}`).charAt(0)}
                    </div>
                    <span>{item.Clients || `Client ${index + 1}`}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Package className="h-4 w-4 text-neon-purple" />
                    <span className="text-neon-purple font-medium">
                      {item["No. of Products"] || '0'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <DollarSign className="h-4 w-4 text-neon-green" />
                    <span className="text-neon-green font-medium">
                      {item.Price || '$0'}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusIndicator status={item.Status || 'Unknown'} />
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground truncate max-w-[200px]">
                      {item.Email || 'No email'}
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};