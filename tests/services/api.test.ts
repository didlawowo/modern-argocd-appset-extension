import { getApplicationsByApplicationSet, syncApplication, refreshApplication } from '../../src/services/api';

// Mock la fonction fetch globale
global.fetch = jest.fn();

describe('API Service', () => {
  beforeEach(() => {
    (global.fetch as jest.Mock).mockClear();
  });

  describe('getApplicationsByApplicationSet', () => {
    it('should fetch applications by ApplicationSet name successfully', async () => {
      const mockApplications = [
        { metadata: { name: 'app-1' } },
        { metadata: { name: 'app-2' } }
      ];

      // Mock la réponse de fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce({ items: mockApplications })
      });

      const result = await getApplicationsByApplicationSet('test-appset');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockApplications);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/v1/applications?selector=argocd.argoproj.io/application-set-name=test-appset'
      );
    });

    it('should handle error when fetching applications', async () => {
      // Mock une erreur de fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Not Found'
      });

      const result = await getApplicationsByApplicationSet('test-appset');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Erreur lors de la récupération des applications: Not Found');
    });

    it('should handle exception during fetch', async () => {
      // Mock une exception
      (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Erreur réseau'));

      const result = await getApplicationsByApplicationSet('test-appset');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Erreur réseau');
    });
  });

  describe('syncApplication', () => {
    it('should sync application successfully', async () => {
      const mockResponse = { operationState: { phase: 'Succeeded' } };

      // Mock la réponse de fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      });

      const result = await syncApplication('test-app');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/v1/applications/test-app/sync',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            dryRun: false,
            prune: true,
            strategy: { apply: { force: false } }
          })
        })
      );
    });

    it('should handle error when syncing application', async () => {
      // Mock une erreur de fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Bad Request'
      });

      const result = await syncApplication('test-app');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Erreur lors de la synchronisation de l\'application: Bad Request');
    });
  });

  describe('refreshApplication', () => {
    it('should refresh application successfully', async () => {
      const mockResponse = { message: 'Application rafraîchie' };

      // Mock la réponse de fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: jest.fn().mockResolvedValueOnce(mockResponse)
      });

      const result = await refreshApplication('test-app');

      expect(result.success).toBe(true);
      expect(result.data).toEqual(mockResponse);
      expect(global.fetch).toHaveBeenCalledWith(
        '/api/v1/applications/test-app/refresh',
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ hardRefresh: false })
        })
      );
    });

    it('should handle error when refreshing application', async () => {
      // Mock une erreur de fetch
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        statusText: 'Server Error'
      });

      const result = await refreshApplication('test-app');

      expect(result.success).toBe(false);
      expect(result.error).toBe('Erreur lors du rafraîchissement de l\'application: Server Error');
    });
  });
});
