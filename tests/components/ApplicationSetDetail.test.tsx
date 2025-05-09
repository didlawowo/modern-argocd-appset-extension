import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ApplicationSetDetail from '../../src/components/ApplicationSetDetail/ApplicationSetDetail';

// Mock le hook useApplicationSetData
jest.mock('../../src/hooks/useApplicationSetData', () => ({
  useApplicationSetData: jest.fn(() => ({
    applications: [
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
          resources: []
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
      }
    ],
    stats: {
      total: 2,
      Healthy: 1,
      Degraded: 1,
      Progressing: 0,
      Unknown: 0,
      Synced: 1,
      OutOfSync: 1
    },
    isLoading: false,
    error: null
  }))
}));

describe('ApplicationSetDetail Component', () => {
  const mockResource = {
    apiVersion: 'argoproj.io/v1alpha1',
    kind: 'ApplicationSet',
    metadata: { 
      name: 'test-appset',
      namespace: 'argocd',
      resourceVersion: '123456',
      uid: 'abc-123',
      creationTimestamp: '2023-01-01T00:00:00Z',
      generation: 1
    },
    spec: { 
      generators: [],
      template: {
        metadata: { name: 'test-app' },
        spec: {
          project: 'default',
          source: {
            repoURL: 'https://github.com/test/repo',
            targetRevision: 'main',
            path: '.'
          },
          destination: {
            server: 'https://kubernetes.default.svc',
            namespace: 'default'
          }
        }
      }
    }
  };

  it('should render the component with application list', () => {
    render(<ApplicationSetDetail resource={mockResource} tree={{}} />);
    
    // Vérifier que le titre est affiché
    expect(screen.getByText(/Applications générées par test-appset/i)).toBeInTheDocument();
    
    // Vérifier que les statistiques sont affichées
    expect(screen.getByText('Total')).toBeInTheDocument();
    expect(screen.getByText('2')).toBeInTheDocument();
    expect(screen.getByText('Healthy')).toBeInTheDocument();
    expect(screen.getByText('1')).toBeInTheDocument();
    
    // Vérifier que la liste des applications est affichée
    expect(screen.getByText('test-app-1')).toBeInTheDocument();
    expect(screen.getByText('test-app-2')).toBeInTheDocument();
  });
});
