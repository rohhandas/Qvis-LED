import React, { useState } from 'react';
import { 
  Plus, 
  Lightbulb, 
  Play, 
  Settings2, 
  Trash2, 
  ChevronDown, 
  ChevronUp,
  Globe,
  Zap
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { scenes, zones } from '../data/mockData';
import { cn } from '../lib/utils';

export function Scenes() {
  const [expandedZones, setExpandedZones] = useState<string[]>([]);

  const toggleZone = (id: string) => {
    setExpandedZones(prev => 
      prev.includes(id) ? prev.filter(zid => zid !== id) : [...prev, id]
    );
  };

  const siteScenes = scenes.filter(s => !s.zoneId);
  const zoneScenes = scenes.filter(s => s.zoneId);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Scenes Management</h1>
          <p className="text-sm text-muted-foreground">Create and activate lighting presets for the entire site or specific zones.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Create New Scene
        </Button>
      </div>

      {/* Global Scenes Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-primary font-bold uppercase tracking-widest text-xs">
          <Globe className="w-4 h-4" /> Global Scenes
        </div>
        <Card className="bg-primary/5 border-primary/20">
          <CardContent className="p-6 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center text-primary">
                <Globe className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-bold">Multi-Site Emergency</h3>
                <p className="text-xs text-muted-foreground">Activates full brightness across all connected sites in the region.</p>
              </div>
            </div>
            <Button variant="primary" size="sm" className="gap-2">
              <Play className="w-3 h-3 fill-current" /> Activate
            </Button>
          </CardContent>
        </Card>
      </section>

      {/* Entire Site Scenes */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase tracking-widest text-xs">
          <Zap className="w-4 h-4" /> Entire Site Scenes
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {siteScenes.map((scene) => (
            <SceneCard key={scene.id} scene={scene} />
          ))}
        </div>
      </section>

      {/* Zone Scenes */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase tracking-widest text-xs">
          <Lightbulb className="w-4 h-4" /> Zone Specific Scenes
        </div>
        <div className="space-y-3">
          {zones.map((zone) => {
            const zScenes = zoneScenes.filter(s => s.zoneId === zone.id);
            const isExpanded = expandedZones.includes(zone.id);

            return (
              <div key={zone.id} className="border border-border rounded-xl overflow-hidden bg-card">
                <button 
                  onClick={() => toggleZone(zone.id)}
                  className="w-full px-6 py-4 flex items-center justify-between hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center">
                      <Lightbulb className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="text-left">
                      <h4 className="font-bold text-sm">{zone.name}</h4>
                      <p className="text-[10px] text-muted-foreground uppercase tracking-wider">{zone.floor}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xs text-muted-foreground">{zScenes.length} Scenes</span>
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </div>
                </button>
                
                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-border grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-in slide-in-from-top-2">
                    {zScenes.length > 0 ? (
                      zScenes.map(scene => <SceneCard key={scene.id} scene={scene} isZone />)
                    ) : (
                      <div className="col-span-full py-8 text-center border-2 border-dashed border-border rounded-xl">
                        <p className="text-sm text-muted-foreground italic">No scenes created for this zone yet.</p>
                        <Button variant="ghost" size="sm" className="mt-2 text-primary">Add First Scene</Button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}

function SceneCard({ scene, isZone }: { scene: any, isZone?: boolean, key?: any }) {
  return (
    <Card className="card-hover group">
      <CardContent className="p-4 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
              <Lightbulb className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-bold text-sm">{scene.name}</h4>
              <p className="text-[10px] text-muted-foreground">Level: {scene.lightLevel}%</p>
            </div>
          </div>
          <Badge variant="secondary" className="text-[8px] uppercase">Last: {scene.lastApplied.split(' ')[0]}</Badge>
        </div>

        <div className="flex items-center gap-2 pt-2 border-t border-border">
          <Button variant="primary" size="sm" className="flex-1 gap-2">
            <Play className="w-3 h-3 fill-current" /> Activate
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8">
            <Settings2 className="w-3.5 h-3.5" />
          </Button>
          <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10">
            <Trash2 className="w-3.5 h-3.5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
