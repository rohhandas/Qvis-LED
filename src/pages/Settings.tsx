import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  Clock, 
  BarChart3, 
  Users, 
  ShieldCheck, 
  Key, 
  UserCircle, 
  Router,
  Plus,
  Trash2,
  Edit2,
  Mail,
  Copy,
  Check
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { users, apiTokens } from '../data/mockData';
import { cn } from '../lib/utils';

const tabs = [
  { id: 'site', label: 'Site Settings', icon: SettingsIcon },
  { id: 'hours', label: 'Opening Hours', icon: Clock },
  { id: 'analytics', label: 'Analytics Settings', icon: BarChart3 },
  { id: 'users', label: 'User Management', icon: Users },
  { id: 'permissions', label: 'Site Permissions', icon: ShieldCheck },
  { id: 'tokens', label: 'API Tokens', icon: Key },
  { id: 'account', label: 'My Account', icon: UserCircle },
  { id: 'gateway', label: 'Gateway', icon: Router },
];

export function Settings() {
  const [activeTab, setActiveTab] = useState('users');

  return (
    <div className="flex flex-col h-full gap-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold">Settings</h1>
        <p className="text-sm text-muted-foreground">Configure your platform, manage users, and set system preferences.</p>
      </div>

      <div className="flex flex-1 gap-8 overflow-hidden">
        {/* Settings Sidebar */}
        <div className="w-64 shrink-0 flex flex-col gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                'flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all',
                activeTab === tab.id 
                  ? 'bg-primary text-white shadow-md shadow-primary/20' 
                  : 'text-muted-foreground hover:bg-accent hover:text-foreground'
              )}
            >
              <tab.icon className="w-4 h-4" />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto custom-scrollbar pr-2">
          {activeTab === 'users' && <UserManagement />}
          {activeTab === 'tokens' && <APITokens />}
          {activeTab === 'hours' && <OpeningHours />}
          {activeTab === 'analytics' && <AnalyticsSettings />}
          {['site', 'permissions', 'account', 'gateway'].includes(activeTab) && (
            <div className="py-20 text-center flex flex-col items-center gap-4 border-2 border-dashed border-border rounded-xl">
              <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                <SettingsIcon className="w-8 h-8" />
              </div>
              <div>
                <h3 className="font-bold uppercase tracking-widest text-xs">Module Under Maintenance</h3>
                <p className="text-sm text-muted-foreground max-w-xs mx-auto mt-2">
                  The {tabs.find(t => t.id === activeTab)?.label} module is currently being updated to provide a better experience.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function UserManagement() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">User Management</h2>
        <Button className="gap-2" size="sm">
          <Plus className="w-4 h-4" /> Invite User
        </Button>
      </div>

      <div className="grid gap-4">
        {users.map((user) => (
          <Card key={user.id} className="card-hover">
            <CardContent className="p-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                  <UserCircle className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="font-bold text-sm">{user.username}</h4>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Mail className="w-3 h-3" /> {user.email}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Role</p>
                  <Badge variant={user.role === 'Owner' ? 'default' : 'secondary'} className="text-[10px]">
                    {user.role}
                  </Badge>
                </div>
                <div className="text-center">
                  <p className="text-[10px] text-muted-foreground uppercase font-bold">Sites</p>
                  <p className="text-sm font-bold">{user.sitesCount}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-8 w-8"><Edit2 className="w-3.5 h-3.5" /></Button>
                  <Button variant="outline" size="icon" className="h-8 w-8 text-destructive hover:bg-destructive/10"><Trash2 className="w-3.5 h-3.5" /></Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function APITokens() {
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">API Tokens</h2>
        <Button className="gap-2" size="sm">
          <Plus className="w-4 h-4" /> Create Token
        </Button>
      </div>

      <div className="grid gap-4">
        {apiTokens.map((token) => (
          <Card key={token.id}>
            <CardContent className="p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <Key className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-sm">{token.name}</h4>
                    <p className="text-[10px] text-muted-foreground uppercase font-bold">Expires: {token.expiry}</p>
                  </div>
                </div>
                <Badge variant={token.status === 'Active' ? 'success' : 'destructive'}>{token.status}</Badge>
              </div>

              <div className="flex items-center gap-2 bg-muted p-2 rounded-lg border border-border">
                <code className="text-xs font-mono flex-1 truncate">{token.token}</code>
                <button 
                  onClick={() => copyToClipboard(token.token, token.id)}
                  className="p-1.5 rounded hover:bg-accent text-muted-foreground transition-colors"
                >
                  {copiedId === token.id ? <Check className="w-4 h-4 text-primary" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

function OpeningHours() {
  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Opening Hours</h2>
        <Button variant="outline" size="sm">Copy to Next Day</Button>
      </div>

      <Card>
        <CardContent className="p-6 space-y-4">
          {days.map((day) => (
            <div key={day} className="flex items-center justify-between py-2 border-b border-border last:border-0">
              <div className="flex items-center gap-4 w-32">
                <input type="checkbox" defaultChecked={!['Saturday', 'Sunday'].includes(day)} className="rounded border-border text-primary focus:ring-primary" />
                <span className="text-sm font-medium">{day}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <input type="time" defaultValue="08:00" className="bg-muted border border-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
                  <span className="text-xs text-muted-foreground">to</span>
                  <input type="time" defaultValue="18:00" className="bg-muted border border-border rounded px-2 py-1 text-xs focus:outline-none focus:ring-1 focus:ring-primary" />
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Trash2 className="w-3.5 h-3.5 text-muted-foreground" /></Button>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
      
      <div className="flex justify-end">
        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

function AnalyticsSettings() {
  return (
    <div className="space-y-6">
      <h2 className="text-lg font-bold">Analytics Baselines</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Usage Baselines</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase">Target Burn Hours / Year</label>
              <input type="number" defaultValue="4500" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase">Target Dim Level (%)</label>
              <input type="number" defaultValue="80" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase">Target Lux Level</label>
              <input type="number" defaultValue="500" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-sm">Conversion Factors</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase">Energy Price (€/kWh)</label>
              <input type="number" step="0.01" defaultValue="0.24" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase">CO2 Factor (kg/kWh)</label>
              <input type="number" step="0.01" defaultValue="0.33" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-muted-foreground uppercase">Expected Lifetime (Hours)</label>
              <input type="number" defaultValue="50000" className="w-full bg-muted border border-border rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button>Update Baselines</Button>
      </div>
    </div>
  );
}
