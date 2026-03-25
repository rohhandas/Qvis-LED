import React from 'react';
import { 
  LayoutDashboard, 
  Lightbulb, 
  BarChart3, 
  Package, 
  Settings, 
  Info, 
  ChevronLeft, 
  ChevronRight,
  Map,
  Zap,
  Calendar,
  Bell
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { cn } from '../lib/utils';

const navItems = [
  { id: 'sites', label: 'Sites', icon: Map },
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'lighting', label: 'Lighting Control', icon: Zap },
  { id: 'scenes', label: 'Scenes', icon: Lightbulb },
  { id: 'schedules', label: 'Schedules', icon: Calendar },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'assets', label: 'Assets', icon: Package },
  { id: 'notifications', label: 'Notifications', icon: Bell },
  { id: 'settings', label: 'Settings', icon: Settings },
  { id: 'about', label: 'About', icon: Info },
];

export function Sidebar() {
  const { activePage, setActivePage, isSidebarCollapsed, setIsSidebarCollapsed } = useAppContext();

  return (
    <aside
      className={cn(
        'bg-card border-r border-border transition-all duration-300 flex flex-col h-screen sticky top-0',
        isSidebarCollapsed ? 'w-20' : 'w-64'
      )}
    >
      <div className="p-6 flex items-center justify-between">
        {!isSidebarCollapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Zap className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-xl tracking-tight">Qvis LED</span>
          </div>
        )}
        {isSidebarCollapsed && (
          <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center mx-auto">
            <Zap className="text-white w-5 h-5" />
          </div>
        )}
      </div>

      <nav className="flex-1 px-4 space-y-2 overflow-y-auto py-4">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActivePage(item.id)}
            className={cn(
              'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors group relative',
              activePage === item.id
                ? 'bg-primary text-white'
                : 'text-muted-foreground hover:bg-accent hover:text-accent-foreground'
            )}
          >
            <item.icon className={cn('w-5 h-5 shrink-0', activePage === item.id ? 'text-white' : 'group-hover:text-primary')} />
            {!isSidebarCollapsed && <span className="font-medium">{item.label}</span>}
            {isSidebarCollapsed && (
              <div className="absolute left-full ml-2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity whitespace-nowrap z-50 border border-border">
                {item.label}
              </div>
            )}
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-border">
        <button
          onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
          className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
        >
          {isSidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
        </button>
      </div>
    </aside>
  );
}
