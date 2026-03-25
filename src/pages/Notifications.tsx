import React, { useState } from 'react';
import { 
  Bell, 
  Archive, 
  Trash2, 
  CheckCircle2, 
  Filter, 
  Download, 
  Settings, 
  Search,
  AlertTriangle,
  Info,
  AlertCircle,
  MoreVertical
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { notifications } from '../data/mockData';
import { cn } from '../lib/utils';

export function Notifications() {
  const [activeTab, setActiveTab] = useState<'inbox' | 'archive'>('inbox');
  const [searchQuery, setSearchQuery] = useState('');
  const [showOnlyUnread, setShowOnlyUnread] = useState(false);

  const filteredNotifications = notifications.filter(n => 
    (activeTab === 'inbox' ? !n.isArchived : n.isArchived) &&
    (showOnlyUnread ? n.status === 'Unread' : true) &&
    n.message.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Notifications</h1>
          <p className="text-sm text-muted-foreground">Stay updated with system alerts, maintenance requirements, and environmental changes.</p>
        </div>
        
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" className="gap-2">
            <Settings className="w-4 h-4" /> Configure Rules
          </Button>
          <Button variant="primary" size="sm" className="gap-2">
            <Download className="w-4 h-4" /> Export CSV
          </Button>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center">
        <div className="flex bg-muted p-1 rounded-lg w-full md:w-auto">
          <button 
            onClick={() => setActiveTab('inbox')}
            className={cn('flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-1.5 text-sm font-medium rounded-md transition-all', activeTab === 'inbox' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground')}
          >
            <Bell className="w-4 h-4" /> Inbox
            <Badge variant="destructive" className="ml-1 h-4 px-1 min-w-[16px] flex items-center justify-center text-[10px]">
              {notifications.filter(n => !n.isArchived && n.status === 'Unread').length}
            </Badge>
          </button>
          <button 
            onClick={() => setActiveTab('archive')}
            className={cn('flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-1.5 text-sm font-medium rounded-md transition-all', activeTab === 'archive' ? 'bg-card text-primary shadow-sm' : 'text-muted-foreground')}
          >
            <Archive className="w-4 h-4" /> Archive
          </button>
        </div>

        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input 
            type="text" 
            placeholder="Search notifications..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-card border border-border rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-muted-foreground">Unread Only</span>
          <button 
            onClick={() => setShowOnlyUnread(!showOnlyUnread)}
            className={cn(
              'w-8 h-4 rounded-full transition-colors relative',
              showOnlyUnread ? 'bg-primary' : 'bg-muted'
            )}
          >
            <div className={cn(
              'absolute top-0.5 w-3 h-3 rounded-full bg-white transition-all',
              showOnlyUnread ? 'left-4.5' : 'left-0.5'
            )} />
          </button>
        </div>
      </div>

      <div className="flex items-center justify-between px-2">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
            <span className="text-xs font-medium text-muted-foreground">Select All</span>
          </div>
          <div className="h-4 w-px bg-border" />
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-primary">
              <CheckCircle2 className="w-3.5 h-3.5" /> Mark as Read
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-primary">
              <Archive className="w-3.5 h-3.5" /> Archive
            </Button>
            <Button variant="ghost" size="sm" className="h-8 text-xs gap-1.5 text-muted-foreground hover:text-destructive">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </Button>
          </div>
        </div>
        <p className="text-xs text-muted-foreground">Showing {filteredNotifications.length} notifications</p>
      </div>

      <div className="space-y-3">
        {filteredNotifications.length > 0 ? (
          filteredNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))
        ) : (
          <div className="py-20 text-center flex flex-col items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
              <Bell className="w-8 h-8" />
            </div>
            <div>
              <h3 className="font-bold">No notifications found</h3>
              <p className="text-sm text-muted-foreground">You're all caught up! No new alerts at this time.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function NotificationItem({ notification }: { notification: any, key?: any }) {
  const urgencyStyles = {
    Critical: 'bg-destructive/10 text-destructive border-destructive/20',
    High: 'bg-orange-500/10 text-orange-500 border-orange-500/20',
    Medium: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
    Low: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
  };

  const UrgencyIcon = {
    Critical: AlertCircle,
    High: AlertTriangle,
    Medium: Info,
    Low: Info,
  }[notification.urgency as keyof typeof urgencyStyles];

  return (
    <Card className={cn(
      'transition-all hover:border-primary/30',
      notification.status === 'Unread' ? 'bg-primary/5 border-l-4 border-l-primary' : 'bg-card'
    )}>
      <CardContent className="p-4 flex items-start gap-4">
        <div className="pt-1">
          <input type="checkbox" className="rounded border-border text-primary focus:ring-primary" />
        </div>
        
        <div className={cn(
          'w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border',
          urgencyStyles[notification.urgency as keyof typeof urgencyStyles]
        )}>
          <UrgencyIcon className="w-5 h-5" />
        </div>

        <div className="flex-1 min-w-0 space-y-1">
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className={cn('text-[8px] uppercase font-bold', urgencyStyles[notification.urgency as keyof typeof urgencyStyles])}>
                {notification.urgency}
              </Badge>
              <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">{notification.type}</span>
            </div>
            <span className="text-[10px] text-muted-foreground font-medium">{notification.date}</span>
          </div>
          <p className={cn('text-sm leading-tight', notification.status === 'Unread' ? 'font-bold' : 'font-medium text-muted-foreground')}>
            {notification.message}
          </p>
          <div className="flex items-center gap-2">
            <span className="text-[10px] text-muted-foreground uppercase font-bold">Zone:</span>
            <span className="text-[10px] font-bold text-primary uppercase">{notification.zone}</span>
          </div>
        </div>

        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <button className="p-1.5 rounded-md hover:bg-accent text-muted-foreground transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>
      </CardContent>
    </Card>
  );
}
