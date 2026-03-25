import React, { useState } from 'react';
import { 
  BarChart3, 
  Map as MapIcon, 
  Calendar, 
  ChevronDown, 
  Filter, 
  Download,
  Maximize2,
  Layers
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { cn } from '../lib/utils';

const analyticsData = [
  { time: '00:00', value: 120, compare: 110 },
  { time: '04:00', value: 80, compare: 95 },
  { time: '08:00', value: 450, compare: 420 },
  { time: '12:00', value: 600, compare: 580 },
  { time: '16:00', value: 520, compare: 550 },
  { time: '20:00', value: 300, compare: 280 },
  { time: '23:59', value: 150, compare: 140 },
];

const metrics = [
  'Lux Level', 'Burning Hours', 'ON/OFF', 'Light Level', 'Energy', 'CO2', 'Cost', 'Occupancy', 'Utilisation'
];

export function Analytics() {
  const [view, setView] = useState<'graph' | 'map'>('graph');
  const [selectedMetric, setSelectedMetric] = useState('Energy');
  const [timeRange, setTimeRange] = useState('Last 7 Days');
  const [showComparison, setShowComparison] = useState(true);

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Analytics & Insights</h1>
          <p className="text-sm text-muted-foreground">Deep dive into your lighting performance and space usage data.</p>
        </div>
        
        <div className="flex items-center gap-2 bg-muted p-1 rounded-lg">
          <button 
            onClick={() => setView('graph')}
            className={cn('flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all', view === 'graph' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground')}
          >
            <BarChart3 className="w-4 h-4" /> Graph View
          </button>
          <button 
            onClick={() => setView('map')}
            className={cn('flex items-center gap-2 px-4 py-1.5 text-sm font-medium rounded-md transition-all', view === 'map' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground')}
          >
            <MapIcon className="w-4 h-4" /> Map View
          </button>
        </div>
      </div>

      {/* Controls Bar */}
      <Card className="bg-card/50 backdrop-blur-sm">
        <CardContent className="p-4 flex flex-wrap items-center gap-4">
          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Metric</span>
            <div className="relative">
              <select 
                value={selectedMetric}
                onChange={(e) => setSelectedMetric(e.target.value)}
                className="bg-muted border border-border rounded-lg py-2 pl-3 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer min-w-[150px]"
              >
                {metrics.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Time Range</span>
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <select 
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="bg-muted border border-border rounded-lg py-2 pl-10 pr-10 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer min-w-[180px]"
              >
                <option>Last 24 Hours</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Custom Range</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <span className="text-[10px] uppercase font-bold text-muted-foreground ml-1">Resolution</span>
            <div className="flex bg-muted rounded-lg p-1">
              {['5m', '1h', '1d', '1w'].map(r => (
                <button key={r} className={cn('px-3 py-1 text-[10px] font-bold rounded-md', r === '1h' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground')}>
                  {r.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Compare</span>
              <button 
                onClick={() => setShowComparison(!showComparison)}
                className={cn(
                  'w-8 h-4 rounded-full transition-colors relative',
                  showComparison ? 'bg-primary' : 'bg-muted'
                )}
              >
                <div className={cn(
                  'absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all',
                  showComparison ? 'left-4.5' : 'left-0.5'
                )} />
              </button>
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Filter className="w-4 h-4" /> Filters
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="w-4 h-4" /> Export
            </Button>
          </div>
        </CardContent>
      </Card>

      {view === 'graph' ? (
        <Card className="h-[500px]">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>{selectedMetric} Analysis</CardTitle>
              <p className="text-xs text-muted-foreground">Showing {selectedMetric.toLowerCase()} data for {timeRange.toLowerCase()}</p>
            </div>
            <div className="flex gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-primary" />
                <span className="text-[10px] text-muted-foreground uppercase font-bold">Origin Data</span>
              </div>
              {showComparison && (
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary/30" />
                  <span className="text-[10px] text-muted-foreground uppercase font-bold">Compared Data</span>
                </div>
              )}
            </div>
          </CardHeader>
          <CardContent className="h-full pb-20">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={analyticsData}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00A651" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#00A651" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                <XAxis dataKey="time" fontSize={10} stroke="#888" />
                <YAxis fontSize={10} stroke="#888" />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#141414', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#00A651' }}
                />
                {showComparison && (
                  <Area type="monotone" dataKey="compare" stroke="#00A651" strokeWidth={2} fill="transparent" strokeDasharray="5 5" opacity={0.5} />
                )}
                <Area type="monotone" dataKey="value" stroke="#00A651" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <Card className="lg:col-span-3 h-[600px] relative bg-muted/20 border-dashed border-2 flex items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888941295-1bc0a39968e2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10 grayscale" />
            
            {/* Heatmap Mock */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-[80%] h-[70%] border-2 border-primary/30 rounded-lg relative bg-card/40 backdrop-blur-sm">
                {/* Random Heatmap Dots */}
                {Array.from({ length: 40 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute rounded-full blur-xl animate-pulse"
                    style={{
                      top: `${Math.random() * 90}%`,
                      left: `${Math.random() * 90}%`,
                      width: `${20 + Math.random() * 60}px`,
                      height: `${20 + Math.random() * 60}px`,
                      backgroundColor: i % 3 === 0 ? '#00A651' : i % 2 === 0 ? '#fbbf24' : '#ef4444',
                      opacity: 0.4
                    }}
                  />
                ))}
                {/* Device Dots */}
                {Array.from({ length: 15 }).map((_, i) => (
                  <div 
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-white border border-primary z-10 shadow-[0_0_5px_rgba(255,255,255,0.8)]"
                    style={{
                      top: `${10 + Math.random() * 80}%`,
                      left: `${10 + Math.random() * 80}%`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <Button variant="secondary" size="icon" className="bg-card shadow-lg"><Maximize2 className="w-4 h-4" /></Button>
              <Button variant="secondary" size="icon" className="bg-card shadow-lg"><Layers className="w-4 h-4" /></Button>
            </div>

            <div className="absolute bottom-4 left-4 bg-card/80 backdrop-blur-md p-3 rounded-lg border border-border flex items-center gap-4">
              <span className="text-[10px] font-bold uppercase text-muted-foreground">Intensity</span>
              <div className="flex h-2 w-32 rounded-full bg-gradient-to-r from-blue-500 via-green-500 to-red-500" />
              <div className="flex gap-4 text-[10px] font-bold">
                <span>LOW</span>
                <span>HIGH</span>
              </div>
            </div>
          </Card>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Map Layers</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <LayerToggle label="Device Icons" defaultChecked />
                <LayerToggle label="Zone Outlines" />
                <LayerToggle label="Heatmap Overlay" defaultChecked />
                <LayerToggle label="Occupancy Dots" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Quick Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Hotspot Zone</span>
                  <span className="text-xs font-bold text-destructive uppercase">Reception</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Avg. Utilisation</span>
                  <span className="text-xs font-bold text-primary uppercase">42.5%</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-muted-foreground">Peak Hour</span>
                  <span className="text-xs font-bold uppercase">14:00 - 15:00</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

function LayerToggle({ label, defaultChecked = false }: { label: string, defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked);
  return (
    <div className="flex items-center justify-between">
      <span className="text-xs font-medium">{label}</span>
      <button 
        onClick={() => setChecked(!checked)}
        className={cn(
          'w-8 h-4 rounded-full transition-colors relative',
          checked ? 'bg-primary' : 'bg-muted'
        )}
      >
        <div className={cn(
          'absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all',
          checked ? 'left-4.5' : 'left-0.5'
        )} />
      </button>
    </div>
  );
}
