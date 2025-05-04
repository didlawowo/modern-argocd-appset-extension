import * as React from 'react';

/**
 * Hook pour effectuer des actions sur les applications
 */
export const useActions = () => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string | null>(null);
  
  /**
   * Fonction pour synchroniser une application
   */
  const syncApplication = async (name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/v1/applications/${name}/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          dryRun: false,
          prune: true,
          strategy: {
            apply: {
              force: false
            }
          }
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur lors de la synchronisation de l'application: ${response.statusText}`);
      }
      
      return true;
    } catch (err) {
      console.error('Error syncing application:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Fonction pour rafraîchir une application
   */
  const refreshApplication = async (name: string) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch(`/api/v1/applications/${name}/refresh`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          hardRefresh: false
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Erreur lors du rafraîchissement de l'application: ${response.statusText}`);
      }
      
      return true;
    } catch (err) {
      console.error('Error refreshing application:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  /**
   * Fonction pour synchroniser toutes les applications
   */
  const syncAllApplications = async (applications: string[]) => {
    try {
      setIsLoading(true);
      setError(null);
      
      const results = await Promise.allSettled(
        applications.map(app => syncApplication(app))
      );
      
      const failed = results.filter(r => r.status === 'rejected').length;
      
      if (failed > 0) {
        setError(`${failed} applications n'ont pas pu être synchronisées`);
        return false;
      }
      
      return true;
    } catch (err) {
      console.error('Error syncing all applications:', err);
      setError(err instanceof Error ? err.message : 'Une erreur inconnue est survenue');
      return false;
    } finally {
      setIsLoading(false);
    }
  };
  
  return {
    isLoading,
    error,
    syncApplication,
    refreshApplication,
    syncAllApplications
  };
};