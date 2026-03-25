import React, { useState } from 'react';
import { 
  Calendar, 
  Plus, 
  Filter, 
  Search, 
  MoreHorizontal, 
  Clock, 
  Sunrise, 
  Sunset,
  Trash2,
  Edit2
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { schedules } from '../data/mockData';
import { cn } from '../lib/utils';

const daysOfWeek = ['M', 'T', 'W', 'T', 'F', 'S', 'S'];

export function Schedules() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Automation Schedules</h1>
          <p className="text-sm text-muted-foreground">Automate your lighting based on time, sunrise, or sunset triggers.</p>
        </div>
        <Button className="gap-2">
          <Plus className="w-4 h-4" /> Create New Schedule
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search schedules..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Trigger Type
          </Button>
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="w-4 h-4" /> Performed By
          </Button>
        </div>
      </div>

      <Card>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Name</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Type</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Performed By</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Trigger</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-center">Days</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Time</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">Action</th>
                <th className="px-6 py-4 text-xs font-bold uppercase tracking-wider text-muted-foreground text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {schedules.map((schedule) => (
                <tr key={schedule.id} className="hover:bg-accent/30 transition-colors group">
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="font-bold text-sm">{schedule.name}</span>
                      <span className="text-[10px] text-muted-foreground uppercase">ID: {schedule.id}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Badge variant="secondary" className="text-[10px]">{schedule.type}</Badge>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-medium">{schedule.performedBy}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      {schedule.trigger === 'Time' && <Clock className="w-3.5 h-3.5 text-blue-500" />}
                      {schedule.trigger === 'Sunrise' && <Sunrise className="w-3.5 h-3.5 text-orange-500" />}
                      {schedule.trigger === 'Sunset' && <Sunset className="w-3.5 h-3.5 text-purple-500" />}
                      <span className="text-xs">{schedule.trigger}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex justify-center gap-1">
                      {schedule.days.map((active, i) => (
                        <div 
                          key={i} 
                          className={cn(
                            'w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold border transition-all',
                            active ? 'bg-primary text-white border-primary' : 'bg-muted text-muted-foreground border-border'
                          )}
                        >
                          {daysOfWeek[i]}
                        </div>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm font-mono font-bold">{schedule.startTime}</span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-primary">{schedule.dimming}%</span>
                      <span className="text-[10px] text-muted-foreground">{schedule.sceneRecalled || 'Custom'}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors">
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-md hover:bg-destructive/10 text-destructive transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
