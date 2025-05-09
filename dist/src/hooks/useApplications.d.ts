import { Application } from '../types/application';
/**
 * Hook pour récupérer les applications en fonction d'un sélecteur
 */
export declare const useApplications: (selector: string) => {
    applications: Application[];
    isLoading: boolean;
    error: string | null;
};
