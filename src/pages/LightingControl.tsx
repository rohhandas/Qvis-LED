import React, { useState } from 'react';
import { 
  Zap, 
  Power, 
  RotateCcw, 
  Filter, 
  Search,
  LayoutGrid,
  List as ListIcon,
  AlertTriangle,
  ChevronDown
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { Button } from '../components/ui/Button';
import { zones } from '../data/mockData';
import { cn } from '../lib/utils';

export function LightingControl() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFloor, setSelectedFloor] = useState('All Floors');
  const [entireSiteControl, setEntireSiteControl] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const floors = ['All Floors', ...new Set(zones.map(z => z.floor))];

  const filteredZones = zones.filter(zone => 
    (selectedFloor === 'All Floors' || zone.floor === selectedFloor) &&
    zone.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Lighting Control</h1>
          <p className="text-sm text-muted-foreground">Manage and control lighting zones across the site.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex bg-muted p-1 rounded-lg">
            <button 
              onClick={() => setViewMode('list')}
              className={cn('p-1.5 rounded-md transition-all', viewMode === 'list' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground')}
            >
              <ListIcon className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('grid')}
              className={cn('p-1.5 rounded-md transition-all', viewMode === 'grid' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground')}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
          </div>
          
          <div className="h-8 w-px bg-border mx-1" />
          
          <div className="flex items-center gap-2 bg-destructive/10 border border-destructive/20 px-3 py-1.5 rounded-lg">
            <AlertTriangle className="w-4 h-4 text-destructive" />
            <span className="text-xs font-bold text-destructive uppercase tracking-wider">Entire Site Control</span>
            <button 
              onClick={() => setEntireSiteControl(!entireSiteControl)}
              className={cn(
                'w-10 h-5 rounded-full transition-colors relative',
                entireSiteControl ? 'bg-destructive' : 'bg-muted'
              )}
            >
              <div className={cn(
                'absolute top-1 w-3 h-3 rounded-full bg-white transition-all',
                entireSiteControl ? 'left-6' : 'left-1'
              )} />
            </button>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search zones..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="relative">
          <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <select 
            value={selectedFloor}
            onChange={(e) => setSelectedFloor(e.target.value)}
            className="bg-card border border-border rounded-lg py-2 pl-10 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-primary appearance-none cursor-pointer"
          >
            {floors.map(f => <option key={f} value={f}>{f}</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      {entireSiteControl && (
        <Card className="bg-destructive/5 border-destructive/20 animate-in slide-in-from-top-2">
          <CardContent className="p-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full bg-destructive/10 text-destructive">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold text-destructive">Global Site Control Active</h3>
                <p className="text-xs text-muted-foreground">Changes made here will affect ALL zones in the building. Use with caution.</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] uppercase font-bold text-muted-foreground">Global Level</span>
                <input type="range" className="w-32 accent-destructive" />
              </div>
              <Button variant="destructive" size="sm">Turn All Off</Button>
              <Button variant="primary" size="sm">Turn All On</Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className={cn(
        'grid gap-4',
        viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1'
      )}>
        {filteredZones.map((zone) => (
          <ZoneCard key={zone.id} zone={zone} viewMode={viewMode} />
        ))}
      </div>
    </div>
  );
}

function ZoneCard({ zone, viewMode }: { zone: any, viewMode: 'grid' | 'list', key?: any }) {
  const [level, setLevel] = useState(zone.lightLevel);
  const [isOn, setIsOn] = useState(zone.lightLevel > 0);

  return (
    <Card className={cn('card-hover', viewMode === 'list' ? 'flex items-center' : '')}>
      <CardContent className={cn('p-4 w-full', viewMode === 'list' ? 'flex items-center justify-between gap-6' : 'space-y-4')}>
        <div className={cn('flex items-center gap-4', viewMode === 'list' ? 'w-1/4' : '')}>
          <div className={cn(
            'w-10 h-10 rounded-lg flex items-center justify-center shrink-0',
            isOn ? 'bg-primary/20 text-primary shadow-[0_0_10px_rgba(0,166,81,0.3)]' : 'bg-muted text-muted-foreground'
          )}>
            <Zap className={cn('w-5 h-5', isOn ? 'fill-primary' : '')} />
          </div>
          <div className="min-w-0">
            <h4 className="font-bold text-sm truncate">{zone.name}</h4>
            <div className="flex items-center gap-2">
              <Badge variant={zone.status === 'Connected' ? 'success' : 'destructive'} className="text-[8px] px-1 py-0 h-3">
                {zone.status}
              </Badge>
              <span className="text-[10px] text-muted-foreground truncate">{zone.floor}</span>
            </div>
          </div>
        </div>

        <div className={cn('flex flex-col gap-1', viewMode === 'list' ? 'flex-1' : '')}>
          <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground">
            <span>Light Level</span>
            <span className={isOn ? 'text-primary' : ''}>{isOn ? `${level}%` : 'OFF'}</span>
          </div>
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isOn ? level : 0}
            onChange={(e) => {
              const val = parseInt(e.target.value);
              setLevel(val);
              setIsOn(val > 0);
            }}
            className="w-full accent-primary h-1.5 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>

        <div className={cn('flex items-center gap-2', viewMode === 'list' ? 'w-1/4 justify-end' : 'justify-between pt-2 border-t border-border')}>
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsOn(!isOn)}
              className={cn(
                'p-2 rounded-lg transition-all',
                isOn ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-muted text-muted-foreground hover:bg-muted/80'
              )}
            >
              <Power className="w-4 h-4" />
            </button>
            <button className="p-2 rounded-lg bg-muted text-muted-foreground hover:bg-accent hover:text-primary transition-all group">
              <RotateCcw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
            </button>
          </div>
          {viewMode === 'grid' && (
             <div className="text-right">
                <p className="text-[10px] text-muted-foreground">Last seen</p>
                <p className="text-[10px] font-medium">{zone.lastSeen}</p>
             </div>
          )}
          {viewMode === 'list' && (
            <div className="hidden md:block text-right min-w-[80px]">
              <p className="text-[10px] text-muted-foreground uppercase font-bold">Last seen</p>
              <p className="text-xs font-medium">{zone.lastSeen}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
