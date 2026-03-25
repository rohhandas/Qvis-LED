import React, { createContext, useContext, useState } from 'react';
import { Site } from '../types';
import { sites } from '../data/mockData';

interface AppContextType {
  activePage: string;
  setActivePage: (page: string) => void;
  selectedSite: Site | null;
  setSelectedSite: (site: Site | null) => void;
  isSidebarCollapsed: boolean;
  setIsSidebarCollapsed: (collapsed: boolean) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [activePage, setActivePage] = useState('sites');
  const [selectedSite, setSelectedSite] = useState<Site | null>(null);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <AppContext.Provider
      value={{
        activePage,
        setActivePage,
        selectedSite,
        setSelectedSite,
        isSidebarCollapsed,
        setIsSidebarCollapsed,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
}
