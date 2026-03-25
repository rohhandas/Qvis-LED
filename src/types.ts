export type SiteStatus = 'Online' | 'Offline' | 'Warning' | 'Critical';
export type Urgency = 'Low' | 'Medium' | 'High' | 'Critical';
export type DeviceStatus = 'Connected' | 'Disconnected';

export interface Site {
  id: string;
  name: string;
  location: string;
  status: SiteStatus;
  criticalErrors: number;
  disconnectedDevices: number;
  energyConsumed: number; // kWh
  wattsPerM2: number;
  occupancy: number; // %
  utilisation: number; // %
  lat: number;
  lng: number;
}

export interface Zone {
  id: string;
  name: string;
  lightLevel: number; // %
  deviceType: string;
  lastSeen: string;
  status: DeviceStatus;
  floor: string;
}

export interface Scene {
  id: string;
  name: string;
  lightLevel: number; // %
  lastApplied: string;
  zoneId?: string; // If it's a zone scene
}

export interface Schedule {
  id: string;
  name: string;
  type: 'Zone' | 'Scene';
  performedBy: 'Gateway' | 'In-Node';
  trigger: 'Time' | 'Sunrise' | 'Sunset';
  days: boolean[]; // Mon-Sun
  startTime: string;
  dimming: number; // %
  sceneRecalled?: string;
  fadeTime: number; // seconds
}

export interface Asset {
  id: string;
  type: string;
  metaTags: string[]; // Color hex codes or tag names
  status: DeviceStatus;
  lastSeen: string;
  lightLevel: number;
  burnHours: number;
  power: number; // W
  occupancy: boolean;
  luxLevel: number;
  zoneId: string;
}

export interface Notification {
  id: string;
  urgency: Urgency;
  message: string;
  status: 'Read' | 'Unread';
  type: string;
  zone: string;
  date: string;
  isArchived: boolean;
}

export interface User {
  id: string;
  username: string;
  email: string;
  role: 'Owner' | 'Manager' | 'Installer' | 'User';
  sitesCount: number;
}

export interface APIToken {
  id: string;
  name: string;
  token: string;
  expiry: string;
  status: 'Active' | 'Expired';
}
