import { Application } from '../types/application';
import { FilterType } from '../types/common';
/**
 * Filtre les applications selon leur statut de santé
 */
export declare const filterApplicationsByHealthStatus: (applications: Application[], status: string) => Application[];
/**
 * Filtre les applications selon leur statut de synchronisation
 */
export declare const filterApplicationsBySyncStatus: (applications: Application[], status: string) => Application[];
/**
 * Filtre les applications selon un filtre générique
 */
export declare const filterApplications: (applications: Application[], filter: FilterType) => Application[];
/**
 * Recherche des applications par nom
 */
export declare const searchApplicationsByName: (applications: Application[], searchTerm: string) => Application[];
