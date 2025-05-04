import { Application } from '../types/application';
import { FilterType } from '../types/common';

/**
 * Filtre les applications selon leur statut de santé
 */
export const filterApplicationsByHealthStatus = (
  applications: Application[],
  status: string
): Application[] => {
  if (!status) return applications;
  
  return applications.filter(app => app.status?.health?.status === status);
};

/**
 * Filtre les applications selon leur statut de synchronisation
 */
export const filterApplicationsBySyncStatus = (
  applications: Application[],
  status: string
): Application[] => {
  if (!status) return applications;
  
  return applications.filter(app => app.status?.sync?.status === status);
};

/**
 * Filtre les applications selon un filtre générique
 */
export const filterApplications = (
  applications: Application[],
  filter: FilterType
): Application[] => {
  if (!filter) return applications;
  
  switch (filter) {
    case 'healthy':
      return filterApplicationsByHealthStatus(applications, 'Healthy');
    case 'progressing':
      return filterApplicationsByHealthStatus(applications, 'Progressing');
    case 'degraded':
      return filterApplicationsByHealthStatus(applications, 'Degraded');
    case 'outOfSync':
      return filterApplicationsBySyncStatus(applications, 'OutOfSync');
    default:
      return applications;
  }
};

/**
 * Recherche des applications par nom
 */
export const searchApplicationsByName = (
  applications: Application[],
  searchTerm: string
): Application[] => {
  if (!searchTerm) return applications;
  
  const normalizedSearchTerm = searchTerm.toLowerCase();
  
  return applications.filter(app => 
    app.metadata.name.toLowerCase().includes(normalizedSearchTerm)
  );
};