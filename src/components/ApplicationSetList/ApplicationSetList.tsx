import * as React from 'react';
import { Application } from '../../types/application';

interface ApplicationSetListProps {
  applications: Application[];
  isLoading: boolean;
  error: string | null;
}

const ApplicationSetList: React.FC<ApplicationSetListProps> = ({ 
  applications, 
  isLoading, 
  error 
}) => {
  const [filter, setFilter] = React.useState<string | null>(null);
  
  const filteredApplications = React.useMemo(() => {
    if (!filter) return applications;
    
    if (filter === 'healthy') {
      return applications.filter(app => app.status?.health?.status === 'Healthy');
    } else if (filter === 'progressing') {
      return applications.filter(app => app.status?.health?.status === 'Progressing');
    } else if (filter === 'degraded') {
      return applications.filter(app => app.status?.health?.status === 'Degraded');
    } else if (filter === 'outOfSync') {
      return applications.filter(app => app.status?.sync?.status === 'OutOfSync');
    }
    
    return applications;
  }, [applications, filter]);
  
  if (isLoading) {
    return (
      <div className="application-set-extension__loading">
        Chargement des applications...
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="application-set-extension__error">
        Erreur lors du chargement des applications: {error}
      </div>
    );
  }
  
  if (applications.length === 0) {
    return (
      <div className="application-set-extension__empty">
        Aucune application trouvée pour cet ApplicationSet.
      </div>
    );
  }
  
  return (
    <div>
      <div className="application-set-extension__filters">
        <button 
          className={`application-set-extension__filter ${!filter ? 'application-set-extension__filter--active' : ''}`}
          onClick={() => setFilter(null)}
        >
          Tous
        </button>
        <button 
          className={`application-set-extension__filter ${filter === 'healthy' ? 'application-set-extension__filter--active' : ''}`}
          onClick={() => setFilter('healthy')}
        >
          Healthy
        </button>
        <button 
          className={`application-set-extension__filter ${filter === 'progressing' ? 'application-set-extension__filter--active' : ''}`}
          onClick={() => setFilter('progressing')}
        >
          Progressing
        </button>
        <button 
          className={`application-set-extension__filter ${filter === 'degraded' ? 'application-set-extension__filter--active' : ''}`}
          onClick={() => setFilter('degraded')}
        >
          Degraded
        </button>
        <button 
          className={`application-set-extension__filter ${filter === 'outOfSync' ? 'application-set-extension__filter--active' : ''}`}
          onClick={() => setFilter('outOfSync')}
        >
          Out of Sync
        </button>
      </div>
      
      <table className="application-set-extension__table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Namespace</th>
            <th>Cluster</th>
            <th>Sync Status</th>
            <th>Health Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredApplications.map(app => (
            <tr key={app.metadata.name}>
              <td>
                <a href={`/applications/${app.metadata.name}`} target="_blank" rel="noopener noreferrer">
                  {app.metadata.name}
                </a>
              </td>
              <td>{app.spec.destination.namespace}</td>
              <td>{app.spec.destination.name || app.spec.destination.server}</td>
              <td>
                <div className={`application-set-extension__sync application-set-extension__sync--${app.status?.sync?.status === 'Synced' ? 'synced' : app.status?.sync?.status === 'OutOfSync' ? 'out-of-sync' : 'unknown'}`}>
                  {app.status?.sync?.status || 'Unknown'}
                </div>
              </td>
              <td>
                <div className={`application-set-extension__health application-set-extension__health--${(app.status?.health?.status || 'unknown').toLowerCase()}`}>
                  {app.status?.health?.status || 'Unknown'}
                </div>
              </td>
              <td>
                <div className="application-set-extension__actions">
                  <button className="application-set-extension__action-button" onClick={() => window.open(`/applications/${app.metadata.name}?view=tree`, '_blank')}>
                    Voir
                  </button>
                  <button className="application-set-extension__action-button application-set-extension__action-button--primary" onClick={() => window.open(`/applications/${app.metadata.name}?operation=sync`, '_blank')}>
                    Sync
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ApplicationSetList;