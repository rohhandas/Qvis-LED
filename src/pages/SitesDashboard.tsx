import React, { useState } from 'react';
import { 
  Building2, 
  AlertTriangle, 
  ZapOff, 
  Zap, 
  Maximize2, 
  Users, 
  Search,
  MapPin,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { sites } from '../data/mockData';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

export function SitesDashboard() {
  const { setSelectedSite, setActivePage } = useAppContext();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSites = sites.filter(site => 
    site.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    site.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { label: 'Total Sites', value: sites.length, icon: Building2, color: 'text-blue-500' },
    { label: 'Critical Errors', value: sites.reduce((acc, s) => acc + s.criticalErrors, 0), icon: AlertTriangle, color: 'text-destructive' },
    { label: 'Disconnected', value: sites.reduce((acc, s) => acc + s.disconnectedDevices, 0), icon: ZapOff, color: 'text-orange-500' },
    { label: 'Energy (kWh)', value: '4,646.8', icon: Zap, color: 'text-primary' },
    { label: 'Watts/m²', value: '5.4', icon: Maximize2, color: 'text-purple-500' },
    { label: 'Occupancy', value: '54%', icon: Users, color: 'text-cyan-500' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      {/* KPI Bar */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {stats.map((stat, i) => (
          <Card key={i} className="card-hover">
            <CardContent className="p-4 flex items-center gap-4">
              <div className={cn('p-2 rounded-lg bg-muted', stat.color)}>
                <stat.icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{stat.label}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 h-[calc(100vh-250px)]">
        {/* Sites List */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Filter sites..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-card border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
            />
          </div>
          
          <div className="flex-1 overflow-y-auto space-y-3 pr-2 custom-scrollbar">
            {filteredSites.map((site) => (
              <button
                key={site.id}
                onClick={() => {
                  setSelectedSite(site);
                  setActivePage('dashboard');
                }}
                className="w-full text-left group"
              >
                <Card className="card-hover border-l-4 border-l-transparent group-hover:border-l-primary transition-all">
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-10 h-10 rounded-lg flex items-center justify-center',
                        site.status === 'Online' ? 'bg-primary/10 text-primary' :
                        site.status === 'Warning' ? 'bg-orange-500/10 text-orange-500' :
                        'bg-destructive/10 text-destructive'
                      )}>
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{site.name}</h4>
                        <p className="text-xs text-muted-foreground flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {site.location}
                        </p>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-2">
                      <Badge variant={
                        site.status === 'Online' ? 'success' :
                        site.status === 'Warning' ? 'warning' :
                        'destructive'
                      }>
                        {site.status}
                      </Badge>
                      {site.criticalErrors > 0 && (
                        <span className="text-[10px] font-bold text-destructive flex items-center gap-1">
                          <AlertTriangle className="w-3 h-3" /> {site.criticalErrors} Errors
                        </span>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </button>
            ))}
          </div>
        </div>

        {/* Map Placeholder */}
        <Card className="lg:col-span-8 relative bg-muted/30 border-dashed border-2 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.google.com/maps/d/thumbnail?mid=1_Kk_6T_v_9_o_6_6_6_6_6_6_6_6')] bg-cover bg-center opacity-20 grayscale" />
          <div className="relative z-10 flex flex-col items-center gap-4 text-center p-8">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center animate-pulse">
              <MapPin className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold">Interactive Map View</h3>
              <p className="text-muted-foreground max-w-md">
                Visualise your global lighting infrastructure. Click on pins to view real-time site performance and health status.
              </p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2 text-xs font-medium">
                <div className="w-3 h-3 rounded-full bg-primary" /> Healthy
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <div className="w-3 h-3 rounded-full bg-orange-500" /> Warning
              </div>
              <div className="flex items-center gap-2 text-xs font-medium">
                <div className="w-3 h-3 rounded-full bg-destructive" /> Critical
              </div>
            </div>
          </div>

          {/* Mock Pins */}
          {sites.map((site, i) => (
            <div 
              key={site.id}
              className="absolute cursor-pointer group"
              style={{ 
                top: `${30 + i * 15}%`, 
                left: `${20 + i * 20}%` 
              }}
              onClick={() => {
                setSelectedSite(site);
                setActivePage('dashboard');
              }}
            >
              <div className={cn(
                'w-4 h-4 rounded-full border-2 border-white shadow-lg transition-transform group-hover:scale-150',
                site.status === 'Online' ? 'bg-primary' :
                site.status === 'Warning' ? 'bg-orange-500' :
                'bg-destructive'
              )} />
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-popover-foreground text-[10px] font-bold px-2 py-1 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border">
                {site.name}
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
