import React from 'react';
import { 
  Bell, 
  Sun, 
  Moon, 
  User, 
  ChevronDown, 
  Globe,
  Search,
  Building2
} from 'lucide-react';
import { useAppContext } from '../context/AppContext';
import { useTheme } from '../hooks/useTheme';
import { sites } from '../data/mockData';
import { cn } from '../lib/utils';

export function TopNav() {
  const { selectedSite, setSelectedSite } = useAppContext();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="h-16 border-b border-border bg-card/50 backdrop-blur-md sticky top-0 z-40 px-6 flex items-center justify-between">
      <div className="flex items-center gap-4 flex-1">
        <div className="relative w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search..." 
            className="w-full bg-muted/50 border border-border rounded-lg py-1.5 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="h-6 w-px bg-border mx-2" />

        <div className="flex items-center gap-2">
          <Building2 className="w-4 h-4 text-primary" />
          <select 
            className="bg-transparent text-sm font-medium focus:outline-none cursor-pointer"
            value={selectedSite?.id || ''}
            onChange={(e) => {
              const site = sites.find(s => s.id === e.target.value);
              setSelectedSite(site || null);
            }}
          >
            <option value="">Select Site</option>
            {sites.map(site => (
              <option key={site.id} value={site.id}>{site.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-card" />
        </button>

        <button 
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors"
        >
          {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
        </button>

        <button className="p-2 rounded-lg hover:bg-accent text-muted-foreground transition-colors">
          <Globe className="w-5 h-5" />
        </button>

        <div className="h-6 w-px bg-border mx-2" />

        <button className="flex items-center gap-3 p-1 pl-2 rounded-lg hover:bg-accent transition-colors">
          <div className="flex flex-col items-end">
            <span className="text-sm font-semibold">Rohan Das</span>
            <span className="text-[10px] text-muted-foreground uppercase tracking-wider">Owner</span>
          </div>
          <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
            <User className="w-4 h-4 text-primary" />
          </div>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </header>
  );
}
