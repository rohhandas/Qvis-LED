import React, { useState } from 'react';
import { 
  Package, 
  Search, 
  Filter, 
  Download, 
  Tag, 
  ChevronDown, 
  ChevronRight,
  Maximize2,
  Map as MapIcon,
  List as ListIcon,
  MoreHorizontal
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { assets, zones } from '../data/mockData';
import { cn } from '../lib/utils';

export function Assets() {
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedZones, setExpandedZones] = useState<string[]>(['z1']);
  const [viewMode, setViewMode] = useState<'split' | 'list' | 'map'>('split');

  const toggleZone = (id: string) => {
    setExpandedZones(prev => 
      prev.includes(id) ? prev.filter(zid => zid !== id) : [...prev, id]
    );
  };

  return (
    <div className="h-[calc(100vh-120px)] flex flex-col gap-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 shrink-0">
        <div>
          <h1 className="text-2xl font-bold">Asset Management</h1>
          <p className="text-sm text-muted-foreground">Monitor and manage all hardware devices across your infrastructure.</p>
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
              onClick={() => setViewMode('split')}
              className={cn('p-1.5 rounded-md transition-all', viewMode === 'split' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground')}
            >
              <Maximize2 className="w-4 h-4" />
            </button>
            <button 
              onClick={() => setViewMode('map')}
              className={cn('p-1.5 rounded-md transition-all', viewMode === 'map' ? 'bg-card shadow-sm text-primary' : 'text-muted-foreground')}
            >
              <MapIcon className="w-4 h-4" />
            </button>
          </div>
          <Button variant="outline" size="sm" className="gap-2">
            <Tag className="w-4 h-4" /> Meta Tags
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Export HTML
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 shrink-0">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search by Device ID, Type, or Zone..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <Button variant="outline" className="gap-2">
          <Filter className="w-4 h-4" /> Advanced Filters
        </Button>
      </div>

      <div className="flex-1 flex gap-6 overflow-hidden">
        {/* Asset List */}
        <div className={cn(
          'flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2 transition-all duration-500',
          viewMode === 'list' ? 'w-full' : viewMode === 'map' ? 'w-0 opacity-0' : 'w-1/2'
        )}>
          {zones.map((zone) => {
            const zoneAssets = assets.filter(a => a.zoneId === zone.id);
            const isExpanded = expandedZones.includes(zone.id);

            return (
              <div key={zone.id} className="space-y-2">
                <button 
                  onClick={() => toggleZone(zone.id)}
                  className="w-full flex items-center justify-between p-2 hover:bg-muted/50 rounded-lg transition-colors group"
                >
                  <div className="flex items-center gap-2">
                    {isExpanded ? <ChevronDown className="w-4 h-4 text-primary" /> : <ChevronRight className="w-4 h-4 text-muted-foreground" />}
                    <span className="font-bold text-sm uppercase tracking-wider">{zone.name}</span>
                    <Badge variant="secondary" className="text-[10px]">{zoneAssets.length}</Badge>
                  </div>
                  <div className="h-px flex-1 bg-border mx-4" />
                  <span className="text-[10px] text-muted-foreground font-bold uppercase">{zone.floor}</span>
                </button>

                {isExpanded && (
                  <div className="space-y-2 animate-in slide-in-from-top-1">
                    {zoneAssets.map((asset) => (
                      <Card key={asset.id} className="card-hover">
                        <CardContent className="p-3 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3 min-w-0">
                            <div className={cn(
                              'w-8 h-8 rounded-lg flex items-center justify-center shrink-0',
                              asset.status === 'Connected' ? 'bg-primary/10 text-primary' : 'bg-destructive/10 text-destructive'
                            )}>
                              <Package className="w-4 h-4" />
                            </div>
                            <div className="min-w-0">
                              <p className="text-xs font-bold truncate">{asset.id}</p>
                              <p className="text-[10px] text-muted-foreground">{asset.type}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-1">
                            {asset.metaTags.map((tag, i) => (
                              <div key={i} className="w-2 h-2 rounded-full" style={{ backgroundColor: tag }} />
                            ))}
                          </div>

                          <div className="hidden xl:grid grid-cols-3 gap-4 flex-1 text-center">
                            <div>
                              <p className="text-[8px] text-muted-foreground uppercase font-bold">Level</p>
                              <p className="text-[10px] font-bold">{asset.lightLevel}%</p>
                            </div>
                            <div>
                              <p className="text-[8px] text-muted-foreground uppercase font-bold">Power</p>
                              <p className="text-[10px] font-bold">{asset.power}W</p>
                            </div>
                            <div>
                              <p className="text-[8px] text-muted-foreground uppercase font-bold">Burn Hrs</p>
                              <p className="text-[10px] font-bold">{asset.burnHours}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <Badge variant={asset.status === 'Connected' ? 'success' : 'destructive'} className="text-[8px] px-1 py-0 h-3">
                              {asset.status}
                            </Badge>
                            <button className="p-1 rounded hover:bg-muted text-muted-foreground">
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Floorplan Map */}
        <div className={cn(
          'relative bg-muted/20 border-2 border-dashed rounded-xl overflow-hidden transition-all duration-500',
          viewMode === 'map' ? 'w-full' : viewMode === 'list' ? 'w-0 opacity-0' : 'w-1/2'
        )}>
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1541888941295-1bc0a39968e2?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-20 grayscale" />
          
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="w-full h-full border-2 border-primary/30 rounded-lg bg-card/40 backdrop-blur-sm relative">
               {/* Asset Pins */}
               {assets.map((asset, i) => (
                 <div 
                   key={asset.id}
                   className="absolute cursor-pointer group"
                   style={{ 
                     top: `${20 + (i * 15) % 60}%`, 
                     left: `${20 + (i * 25) % 60}%` 
                   }}
                 >
                   <div className={cn(
                     'w-3 h-3 rounded-full border-2 border-white shadow-lg transition-all group-hover:scale-150',
                     asset.status === 'Connected' ? 'bg-primary' : 'bg-destructive'
                   )} />
                   <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 bg-popover text-popover-foreground text-[8px] font-bold px-1.5 py-0.5 rounded shadow-xl opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-border z-20">
                     {asset.id}
                   </div>
                 </div>
               ))}
            </div>
          </div>

          <div className="absolute top-4 right-4 flex flex-col gap-2">
            <Button variant="secondary" size="icon" className="bg-card shadow-lg"><Maximize2 className="w-4 h-4" /></Button>
          </div>
          
          <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-md p-2 rounded-lg border border-border flex flex-col gap-2">
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <div className="w-2 h-2 rounded-full bg-primary" /> Connected
            </div>
            <div className="flex items-center gap-2 text-[10px] font-bold">
              <div className="w-2 h-2 rounded-full bg-destructive" /> Disconnected
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
