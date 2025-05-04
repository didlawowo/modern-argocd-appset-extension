/**
 * État de santé d'une ressource
 */
export type HealthStatus = 'Healthy' | 'Progressing' | 'Degraded' | 'Suspended' | 'Missing' | 'Unknown';

/**
 * État de synchronisation d'une ressource
 */
export type SyncStatus = 'Synced' | 'OutOfSync' | 'Unknown';

/**
 * Type de filtre pour les applications
 */
export type FilterType = 'healthy' | 'progressing' | 'degraded' | 'outOfSync' | null;
