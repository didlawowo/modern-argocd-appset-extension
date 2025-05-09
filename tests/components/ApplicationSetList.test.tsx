import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplicationSetList from '../../src/components/ApplicationSetList/ApplicationSetList';

describe('ApplicationSetList Component', () => {
  const mockApplications = [
    {
      apiVersion: 'argoproj.io/v1alpha1',
      kind: 'Application',
      metadata: { 
        name: 'test-app-1',
        namespace: 'argocd',
        resourceVersion: '123456',
        uid: 'abc-123',
        creationTimestamp: '2023-01-01T00:00:00Z',
        generation: 1
      },
      spec: { 
        destination: { 
          namespace: 'test-namespace', 
          server: 'https://kubernetes.default.svc' 
        },
        project: 'default',
        source: {
          repoURL: 'https://github.com/test/test',
          targetRevision: 'main'
        }
      },
      status: {
        health: { status: 'Healthy' },
        sync: { status: 'Synced' },
        reconciledAt: '2023-01-01T00:00:00Z',
        sourceType: 'Helm',
        summary: {
          images: [],
          externalURLs: []
        },
        resources: [],
        operationState: {
          operation: {
            sync: {
              revision: 'abcdef',
              prune: true,
              dryRun: false,
              syncOptions: []
            },
            initiatedBy: {
              username: 'admin',
              automated: false
            }
          },
          phase: 'Succeeded',
          message: '',
          startedAt: '2023-01-01T00:00:00Z'
        }
      }
    },
    {
      apiVersion: 'argoproj.io/v1alpha1',
      kind: 'Application',
      metadata: { 
        name: 'test-app-2',
        namespace: 'argocd',
        resourceVersion: '123457',
        uid: 'abc-124',
        creationTimestamp: '2023-01-01T00:00:00Z',
        generation: 1
      },
      spec: { 
        destination: { 
          namespace: 'test-namespace', 
          name: 'in-cluster' 
        },
        project: 'default',
        source: {
          repoURL: 'https://github.com/test/test',
          targetRevision: 'main'
        }
      },
      status: {
        health: { status: 'Degraded' },
        sync: { status: 'OutOfSync' },
        reconciledAt: '2023-01-01T00:00:00Z',
        sourceType: 'Kustomize',
        summary: {
          images: [],
          externalURLs: []
        },
        resources: []
      }
    },
    {
      apiVersion: 'argoproj.io/v1alpha1',
      kind: 'Application',
      metadata: { 
        name: 'test-app-3',
        namespace: 'argocd',
        resourceVersion: '123458',
        uid: 'abc-125',
        creationTimestamp: '2023-01-01T00:00:00Z',
        generation: 1
      },
      spec: { 
        destination: { 
          namespace: 'test-namespace', 
          server: 'https://another-cluster.example.com' 
        },
        project: 'default',
        source: {
          repoURL: 'https://github.com/test/test',
          targetRevision: 'main'
        }
      },
      status: {
        health: { status: 'Progressing' },
        sync: { status: 'OutOfSync' },
        reconciledAt: '2023-01-01T00:00:00Z',
        sourceType: 'Directory',
        summary: {
          images: [],
          externalURLs: []
        },
        resources: []
      }
    }
  ];

  it('should render loading state', () => {
    render(<ApplicationSetList applications={[]} isLoading={true} error={null} />);
    expect(screen.getByText(/Chargement des applications.../i)).toBeInTheDocument();
  });

  it('should render error state', () => {
    render(<ApplicationSetList applications={[]} isLoading={false} error="Erreur de test" />);
    expect(screen.getByText(/Erreur lors du chargement des applications: Erreur de test/i)).toBeInTheDocument();
  });

  it('should render empty state', () => {
    render(<ApplicationSetList applications={[]} isLoading={false} error={null} />);
    expect(screen.getByText(/Aucune application trouvée pour cet ApplicationSet./i)).toBeInTheDocument();
  });

  it('should render applications table with filters', () => {
    render(<ApplicationSetList applications={mockApplications} isLoading={false} error={null} />);
    
    // Vérifier que les filtres sont affichés
    expect(screen.getByText('Tous')).toBeInTheDocument();
    expect(screen.getByText('Healthy')).toBeInTheDocument();
    expect(screen.getByText('Progressing')).toBeInTheDocument();
    expect(screen.getByText('Degraded')).toBeInTheDocument();
    expect(screen.getByText('Out of Sync')).toBeInTheDocument();
    
    // Vérifier que toutes les applications sont affichées initialement
    expect(screen.getByText('test-app-1')).toBeInTheDocument();
    expect(screen.getByText('test-app-2')).toBeInTheDocument();
    expect(screen.getByText('test-app-3')).toBeInTheDocument();
    
    // Tester le filtre Healthy
    fireEvent.click(screen.getByText('Healthy'));
    expect(screen.getByText('test-app-1')).toBeInTheDocument();
    expect(screen.queryByText('test-app-2')).not.toBeInTheDocument();
    expect(screen.queryByText('test-app-3')).not.toBeInTheDocument();
    
    // Tester le filtre Degraded
    fireEvent.click(screen.getByText('Degraded'));
    expect(screen.queryByText('test-app-1')).not.toBeInTheDocument();
    expect(screen.getByText('test-app-2')).toBeInTheDocument();
    expect(screen.queryByText('test-app-3')).not.toBeInTheDocument();
    
    // Revenir à tous
    fireEvent.click(screen.getByText('Tous'));
    expect(screen.getByText('test-app-1')).toBeInTheDocument();
    expect(screen.getByText('test-app-2')).toBeInTheDocument();
    expect(screen.getByText('test-app-3')).toBeInTheDocument();
  });
});
