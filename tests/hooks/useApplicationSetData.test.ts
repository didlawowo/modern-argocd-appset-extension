import { renderHook, act } from '@testing-library/react';
import { useApplicationSetData } from '../../src/hooks/useApplicationSetData';

// Mock la fonction fetch globale
global.fetch = jest.fn();

describe('useApplicationSetData Hook', () => {
  beforeEach(() => {
    jest.useFakeTimers();
    jest.spyOn(global, 'fetch').mockClear();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('should fetch applications and calculate stats correctly', async () => {
    const mockApplications = [
      {
        metadata: { name: 'test-app-1' },
        status: {
          health: { status: 'Healthy' },
          sync: { status: 'Synced' }
        }
      },
      {
        metadata: { name: 'test-app-2' },
        status: {
          health: { status: 'Degraded' },
          sync: { status: 'OutOfSync' }
        }
      },
      {
        metadata: { name: 'test-app-3' },
        status: {
          health: { status: 'Progressing' },
          sync: { status: 'OutOfSync' }
        }
      }
    ];

    // Mock la réponse de fetch
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ items: mockApplications })
    });

    // Rendre le hook
    const { result, rerender } = renderHook(() => useApplicationSetData('test-appset'));

    // Initialement, isLoading devrait être true
    expect(result.current.isLoading).toBe(true);
    
    // Attendre que le fetch soit complété
    await act(async () => {
      await Promise.resolve();
    });
    
    // Vérifier que le hook a bien mis à jour son état
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe(null);
    expect(result.current.applications).toEqual(mockApplications);
    
    // Vérifier les statistiques calculées
    expect(result.current.stats).toEqual({
      total: 3,
      Healthy: 1,
      Degraded: 1,
      Progressing: 1,
      Suspended: 0,
      Missing: 0,
      Unknown: 0,
      Synced: 1,
      OutOfSync: 2
    });
    
    // Vérifier que fetch a été appelé avec le bon URL
    expect(global.fetch).toHaveBeenCalledWith(
      '/api/v1/applications?selector=argocd.argoproj.io/application-set-name=test-appset'
    );
    
    // Tester le polling automatique (30 secondes)
    (global.fetch as jest.Mock).mockClear();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: jest.fn().mockResolvedValueOnce({ items: [] })
    });
    
    // Avancer le temps de 30 secondes
    act(() => {
      jest.advanceTimersByTime(30000);
    });
    
    // Vérifier que fetch a été appelé à nouveau
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should handle error when fetching applications', async () => {
    // Mock une erreur de fetch
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erreur de connexion'));

    // Rendre le hook
    const { result } = renderHook(() => useApplicationSetData('test-appset'));

    // Attendre que le fetch soit complété
    await act(async () => {
      await Promise.resolve();
    });
    
    // Vérifier que le hook a bien géré l'erreur
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Erreur de connexion');
    expect(result.current.applications).toEqual([]);
    expect(result.current.stats.total).toBe(0);
  });
});
