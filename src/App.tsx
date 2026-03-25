import React from 'react';
import { AppProvider, useAppContext } from './context/AppContext';
import { Layout } from './components/Layout';
import { SitesDashboard } from './pages/SitesDashboard';
import { SiteDashboard } from './pages/SiteDashboard';
import { LightingControl } from './pages/LightingControl';
import { Scenes } from './pages/Scenes';
import { Schedules } from './pages/Schedules';
import { Analytics } from './pages/Analytics';
import { Assets } from './pages/Assets';
import { Notifications } from './pages/Notifications';
import { Settings } from './pages/Settings';
import { About } from './pages/About';

function AppContent() {
  const { activePage } = useAppContext();

  const renderPage = () => {
    switch (activePage) {
      case 'sites':
        return <SitesDashboard />;
      case 'dashboard':
        return <SiteDashboard />;
      case 'lighting':
        return <LightingControl />;
      case 'scenes':
        return <Scenes />;
      case 'schedules':
        return <Schedules />;
      case 'analytics':
        return <Analytics />;
      case 'assets':
        return <Assets />;
      case 'notifications':
        return <Notifications />;
      case 'settings':
        return <Settings />;
      case 'about':
        return <About />;
      default:
        return <SitesDashboard />;
    }
  };

  return <Layout>{renderPage()}</Layout>;
}

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
