import * as React from 'react';
import { Application } from '../types/application';

interface ApplicationStats {
  total: number;
  Healthy: number;
  Progressing: number;
  Degraded: number;
  Suspended: number;
  Missing: number;
  Unknown: number;
  Synced: number;
  OutOfSync: number;
}

export const useApplicationSetData = (applicationSetName: string) => {
  const [applications, setApplications] = React.useState<Application[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string | null>(null);
  
  const stats = React.useMemo<ApplicationStats>(() => {
    return applications.reduce((acc, app) => {
      // Traiter les statuts de santé
      const healthStatus = app.status?.health?.status || 'Unknown';
      acc[healthStatus as keyof ApplicationStats] = 
        ((acc[healthStatus as keyof ApplicationStats] as number) || 0) + 1;
      
      // Traiter les statuts de synchronisation
      const syncStatus = app.status?.sync?.status || 'Unknown';
      if (syncStatus === 'Synced') {
        acc.Synced = (acc.Synced || 0) + 1;
      } else if (syncStatus === 'OutOfSync') {
        acc.OutOfSync = (acc.OutOfSync || 0) + 1;
      }
      
      acc.total += 1;
      return acc;
    }, { 
      total: 0, 
      Healthy: 0, 
      Progressing: 0, 
      Degraded: 0, 
      Suspended: 0, 
      Missing: 0, 
      Unknown: 0,
      Synced: 0,
      OutOfSync: 0
    });
  }, [applications]);
  
  React.useEffect(() => {
    const fetchApplications = async () => {
      try {
        setIsLoading(true);
        setError(null);
        
        // Utiliser l'API ArgoCD pour récupérer les applications liées à cet ApplicationSet
        const response = await fetch(`/api/v1/applications?selector=argocd.argoproj.io/application-set-name=${applicationSetName}`);
        
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
    
    fetchApplications();
    
    // Configurer un intervalle pour rafraîchir les données toutes les 30 secondes
    const intervalId = setInterval(fetchApplications, 30000);
    
    return () => clearInterval(intervalId);
  }, [applicationSetName]);
  
  return { applications, stats, isLoading, error };
};