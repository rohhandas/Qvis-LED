import { Site, Zone, Scene, Schedule, Asset, Notification, User, APIToken } from '../types';

export const sites: Site[] = [
  {
    id: '1',
    name: 'London HQ',
    location: 'London, UK',
    status: 'Online',
    criticalErrors: 0,
    disconnectedDevices: 2,
    energyConsumed: 1245.5,
    wattsPerM2: 4.2,
    occupancy: 65,
    utilisation: 42,
    lat: 51.5074,
    lng: -0.1278,
  },
  {
    id: '2',
    name: 'Manchester Office',
    location: 'Manchester, UK',
    status: 'Warning',
    criticalErrors: 3,
    disconnectedDevices: 5,
    energyConsumed: 850.2,
    wattsPerM2: 5.8,
    occupancy: 45,
    utilisation: 30,
    lat: 53.4808,
    lng: -2.2426,
  },
  {
    id: '3',
    name: 'Birmingham Hub',
    location: 'Birmingham, UK',
    status: 'Critical',
    criticalErrors: 12,
    disconnectedDevices: 15,
    energyConsumed: 2100.8,
    wattsPerM2: 8.5,
    occupancy: 80,
    utilisation: 75,
    lat: 52.4862,
    lng: -1.8904,
  },
  {
    id: '4',
    name: 'Glasgow Branch',
    location: 'Glasgow, UK',
    status: 'Online',
    criticalErrors: 0,
    disconnectedDevices: 0,
    energyConsumed: 450.3,
    wattsPerM2: 3.1,
    occupancy: 25,
    utilisation: 15,
    lat: 55.8642,
    lng: -4.2518,
  },
];

export const zones: Zone[] = [
  { id: 'z1', name: 'Open Office A', lightLevel: 75, deviceType: 'Mesh', lastSeen: '2026-03-25 03:45', status: 'Connected', floor: 'Floor 1' },
  { id: 'z2', name: 'Meeting Room 1', lightLevel: 100, deviceType: 'Mesh', lastSeen: '2026-03-25 03:40', status: 'Connected', floor: 'Floor 1' },
  { id: 'z3', name: 'Kitchen', lightLevel: 0, deviceType: 'Mesh', lastSeen: '2026-03-25 03:30', status: 'Disconnected', floor: 'Floor 1' },
  { id: 'z4', name: 'Reception', lightLevel: 85, deviceType: 'Mesh', lastSeen: '2026-03-25 03:50', status: 'Connected', floor: 'Ground Floor' },
  { id: 'z5', name: 'Storage', lightLevel: 10, deviceType: 'Mesh', lastSeen: '2026-03-25 03:00', status: 'Connected', floor: 'Basement' },
];

export const scenes: Scene[] = [
  { id: 's1', name: 'Working Hours', lightLevel: 80, lastApplied: '2026-03-25 08:00' },
  { id: 's2', name: 'Energy Saving', lightLevel: 30, lastApplied: '2026-03-24 18:00' },
  { id: 's3', name: 'All Off', lightLevel: 0, lastApplied: '2026-03-24 22:00' },
  { id: 's4', name: 'Presentation', lightLevel: 50, lastApplied: '2026-03-23 14:00', zoneId: 'z2' },
];

export const schedules: Schedule[] = [
  {
    id: 'sch1',
    name: 'Morning Startup',
    type: 'Scene',
    performedBy: 'Gateway',
    trigger: 'Time',
    days: [true, true, true, true, true, false, false],
    startTime: '08:00',
    dimming: 80,
    sceneRecalled: 'Working Hours',
    fadeTime: 60,
  },
  {
    id: 'sch2',
    name: 'Evening Shutdown',
    type: 'Scene',
    performedBy: 'Gateway',
    trigger: 'Sunset',
    days: [true, true, true, true, true, true, true],
    startTime: '18:30',
    dimming: 0,
    sceneRecalled: 'All Off',
    fadeTime: 300,
  },
];

export const assets: Asset[] = [
  { id: 'D001', type: 'Luminaire', metaTags: ['#00A651', '#FF0000'], status: 'Connected', lastSeen: '2026-03-25 03:50', lightLevel: 75, burnHours: 1240, power: 32, occupancy: true, luxLevel: 450, zoneId: 'z1' },
  { id: 'D002', type: 'Sensor', metaTags: ['#00A651'], status: 'Connected', lastSeen: '2026-03-25 03:48', lightLevel: 0, burnHours: 5000, power: 2, occupancy: false, luxLevel: 420, zoneId: 'z1' },
  { id: 'D003', type: 'Luminaire', metaTags: ['#FF0000'], status: 'Disconnected', lastSeen: '2026-03-24 22:15', lightLevel: 0, burnHours: 850, power: 32, occupancy: false, luxLevel: 0, zoneId: 'z3' },
];

export const notifications: Notification[] = [
  { id: 'n1', urgency: 'Critical', message: 'Gateway Offline: Birmingham Hub', status: 'Unread', type: 'System', zone: 'Entire Site', date: '2026-03-25 02:15', isArchived: false },
  { id: 'n2', urgency: 'High', message: 'Device Disconnected: Luminaire D003', status: 'Unread', type: 'Device', zone: 'Kitchen', date: '2026-03-25 01:30', isArchived: false },
  { id: 'n3', urgency: 'Medium', message: 'Lux Level Low in Open Office A', status: 'Read', type: 'Environment', zone: 'Open Office A', date: '2026-03-24 15:45', isArchived: false },
  { id: 'n4', urgency: 'Low', message: 'Maintenance Required: Sensor D002', status: 'Read', type: 'Maintenance', zone: 'Open Office A', date: '2026-03-24 10:00', isArchived: true },
];

export const users: User[] = [
  { id: 'u1', username: 'admin_rohan', email: 'rohannnndas@gmail.com', role: 'Owner', sitesCount: 4 },
  { id: 'u2', username: 'manager_jane', email: 'jane@example.com', role: 'Manager', sitesCount: 2 },
];

export const apiTokens: APIToken[] = [
  { id: 't1', name: 'BMS Integration', token: 'qv_live_8k2j...9s2l', expiry: '2027-03-25', status: 'Active' },
];
