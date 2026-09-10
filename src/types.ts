export interface NodeItem {
  id: string;
  name: string;
  facility: string;
  tier: string;
  protocol: string;
  polling: string;
  heartbeatLag: string;
  failoverMode: string;
  category: 'power' | 'beverage' | 'pharma';
}

export interface ScopingFormData {
  fullName: string;
  corpEmail: string;
  facilityType: string;
  controllerBus: string;
  scopeBrief: string;
}
