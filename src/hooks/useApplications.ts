import * as React from 'react';
import { Application } from '../types/application';

/**
 * Hook pour récupérer les applications en fonction d'un sélecteur
 */
export const useApplications = (selector: string) => {
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  
  React.useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        const response = await fetch(`/api/v1/applications?${selector}`);
        
        if (!response.ok) {
          throw new Error(`Erreur lors de la récupération des applications: ${response.statusText}`);
        }
        
        const data = await response.json();
        setApplications(data.items || []);
      } catch (err) {
        console.error('Error fetching applications:', err);
        setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      } finally {
        setIsLoading(false);
      }
    };
    
    if (selector) {
      fetchApplications();
    }
  }, [selector]);
  
  return { applications, isLoading, error };
};