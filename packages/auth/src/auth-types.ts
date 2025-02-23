import type { AuthClient } from './client';

export type Session = AuthClient['$Infer']['Session'];
export type ActiveOrganization = AuthClient['$Infer']['ActiveOrganization'];
export type Invitation = AuthClient['$Infer']['Invitation'];
