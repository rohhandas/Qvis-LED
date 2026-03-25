import React, { useState } from 'react';
import { 
  Clock, 
  Activity, 
  Lightbulb, 
  Zap, 
  Users, 
  AlertCircle,
  TrendingUp,
  Leaf,
  Euro,
  Maximize2
} from 'lucide-react';
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

const burnHoursData = [
  { name: 'Open Office A', hours: 1240 },
  { name: 'Meeting Room 1', hours: 850 },
  { name: 'Reception', hours: 2100 },
  { name: 'Kitchen', hours: 450 },
  { name: 'Storage', hours: 120 },
];

const luxLevelData = [
  { time: '08:00', level: 350 },
  { time: '10:00', level: 450 },
  { time: '12:00', level: 500 },
  { time: '14:00', level: 480 },
  { time: '16:00', level: 420 },
  { time: '18:00', level: 300 },
];

const energyData = [
  { day: 'Mon', usage: 45 },
  { day: 'Tue', usage: 52 },
  { day: 'Wed', usage: 48 },
  { day: 'Thu', usage: 61 },
  { day: 'Fri', usage: 55 },
  { day: 'Sat', usage: 20 },
  { day: 'Sun', usage: 15 },
];

const utilisationData = [
  { name: 'Used', value: 46, color: '#00A651' },
  { name: 'Unused', value: 54, color: '#1e293b' },
];

export function SiteDashboard() {
  const { selectedSite } = useAppContext();
  const [period, setPeriod] = useState('Today');

  if (!selectedSite) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center gap-4">
        <Activity className="w-12 h-12 text-muted-foreground animate-pulse" />
        <h2 className="text-xl font-bold">No Site Selected</h2>
        <p className="text-muted-foreground">Please select a site from the top navigation or Sites list to view its dashboard.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{selectedSite.name} Overview</h1>
          <p className="text-sm text-muted-foreground">{selectedSite.location}</p>
        </div>
        <div className="flex bg-muted p-1 rounded-lg">
          {['Today', '7 Days', '30 Days'].map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={cn(
                'px-4 py-1.5 text-sm font-medium rounded-md transition-all',
                period === p ? 'bg-card text-foreground shadow-sm' : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Status Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <StatusWidget label="Lighting Devices" value="110" icon={Lightbulb} />
        <StatusWidget label="Other Devices" value="2" icon={Activity} />
        <StatusWidget label="Notifications" value="13" subValue="9 High, 4 Critical" icon={AlertCircle} color="text-destructive" />
        <StatusWidget label="Gateway Time" value="15:52" subValue="Local Time" icon={Clock} />
        <Card className="flex flex-col items-center justify-center p-4 text-center border-t-4 border-t-primary">
          <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest mb-2">System Health</p>
          <div className="w-4 h-4 rounded-full bg-primary shadow-[0_0_15px_rgba(0,166,81,0.5)] animate-pulse" />
          <p className="text-sm font-bold mt-2 text-primary">Healthy</p>
        </Card>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lighting Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-primary" /> Average Burn Hours
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={burnHoursData} layout="vertical">
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#333" />
                    <XAxis type="number" hide />
                    <YAxis dataKey="name" type="category" width={100} fontSize={10} stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#141414', border: '1px solid #333' }}
                      itemStyle={{ color: '#00A651' }}
                    />
                    <Bar dataKey="hours" fill="#00A651" radius={[0, 4, 4, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-sm font-medium flex items-center gap-2">
                  <Activity className="w-4 h-4 text-primary" /> Lux Level (Average)
                </CardTitle>
              </CardHeader>
              <CardContent className="h-[250px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={luxLevelData}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                    <XAxis dataKey="time" fontSize={10} stroke="#888" />
                    <YAxis fontSize={10} stroke="#888" />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#141414', border: '1px solid #333' }}
                      itemStyle={{ color: '#00A651' }}
                    />
                    <Line type="monotone" dataKey="level" stroke="#00A651" strokeWidth={2} dot={{ r: 4, fill: '#00A651' }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Energy Section */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Zap className="w-4 h-4 text-primary" /> Energy Consumption (kWh)
              </CardTitle>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-[10px] text-muted-foreground uppercase">Current</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-muted" />
                  <span className="text-[10px] text-muted-foreground uppercase">Previous</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" />
                  <XAxis dataKey="day" fontSize={10} stroke="#888" />
                  <YAxis fontSize={10} stroke="#888" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#141414', border: '1px solid #333' }}
                    itemStyle={{ color: '#00A651' }}
                  />
                  <Line type="monotone" dataKey="usage" stroke="#00A651" strokeWidth={3} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Widgets */}
        <div className="space-y-6">
          {/* Energy Stats */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Energy Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <EnergyStatItem icon={Zap} label="Energy Used" value="8.15 kWh" subValue="5.94 kWh saved" color="text-primary" />
              <EnergyStatItem icon={Euro} label="Energy Cost" value="€1.63" subValue="42% saved" color="text-blue-500" />
              <EnergyStatItem icon={Leaf} label="CO2 Emitted" value="3.26 kg" subValue="2.37 kg saved" color="text-green-600" />
            </CardContent>
          </Card>

          {/* Space Utilisation */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Space Utilisation</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-[200px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={utilisationData}
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {utilisationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="text-center -mt-28 mb-16">
                <p className="text-3xl font-bold">46%</p>
                <p className="text-xs text-muted-foreground">Area Used</p>
              </div>
              <div className="w-full space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Efficiency</span>
                  <span className="font-bold">1.79 W/m²</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-muted-foreground">Zones Under 5%</span>
                  <span className="font-bold text-destructive">4 / 35</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Occupancy Density */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm font-medium">Occupancy Density Profile</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-12 gap-1">
                {Array.from({ length: 72 }).map((_, i) => (
                  <div 
                    key={i} 
                    className={cn(
                      'aspect-square rounded-sm transition-all hover:scale-125 cursor-help',
                      i % 7 === 0 ? 'bg-primary' : 
                      i % 5 === 0 ? 'bg-primary/60' : 
                      i % 3 === 0 ? 'bg-primary/30' : 'bg-muted'
                    )}
                    title={`Day ${Math.floor(i/12) + 1}, Hour ${i % 12 + 8}:00`}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-2 text-[10px] text-muted-foreground uppercase font-bold">
                <span>Mon</span>
                <span>Sun</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

function StatusWidget({ label, value, subValue, icon: Icon, color = 'text-primary' }: any) {
  return (
    <Card className="card-hover">
      <CardContent className="p-4 flex flex-col items-center justify-center text-center gap-1">
        <div className={cn('p-2 rounded-full bg-muted mb-1', color)}>
          <Icon className="w-4 h-4" />
        </div>
        <p className="text-[10px] text-muted-foreground uppercase font-bold tracking-widest">{label}</p>
        <p className="text-xl font-bold">{value}</p>
        {subValue && <p className="text-[10px] text-muted-foreground">{subValue}</p>}
      </CardContent>
    </Card>
  );
}

function EnergyStatItem({ icon: Icon, label, value, subValue, color }: any) {
  return (
    <div className="flex items-center gap-4">
      <div className={cn('p-2 rounded-lg bg-muted', color)}>
        <Icon className="w-4 h-4" />
      </div>
      <div className="flex-1">
        <p className="text-xs text-muted-foreground font-medium">{label}</p>
        <p className="text-sm font-bold">{value}</p>
      </div>
      <div className="text-right">
        <p className="text-[10px] font-bold text-primary">{subValue}</p>
      </div>
    </div>
  );
}
