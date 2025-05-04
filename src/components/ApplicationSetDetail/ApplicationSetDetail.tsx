import * as React from 'react';
import ApplicationSetList from '../ApplicationSetList/ApplicationSetList';
import StatusIndicator from '../StatusIndicator/StatusIndicator';
import { useApplicationSetData } from '../../hooks/useApplicationSetData';
import { ApplicationSet } from '../../types/applicationSet';

interface ApplicationSetDetailProps {
  resource: ApplicationSet;
  tree: any;
}

const ApplicationSetDetail: React.FC<ApplicationSetDetailProps> = ({ resource }) => {
  const { applications, stats, isLoading, error } = useApplicationSetData(resource.metadata.name);
  
  return (
    <div className="application-set-extension">
      <div className="white-box">
        <div className="white-box__details">
          <div className="application-set-extension__header">
            <h3 className="application-set-extension__title">
              Applications générées par {resource.metadata.name}
            </h3>
          </div>
          
          {!isLoading && !error && (
            <div className="application-set-extension__stats">
              <div className="application-set-extension__stat">
                <span className="application-set-extension__stat-label">Total</span>
                <span className="application-set-extension__stat-value">{stats.total}</span>
              </div>
              <div className="application-set-extension__stat">
                <span className="application-set-extension__stat-label">Healthy</span>
                <span className="application-set-extension__stat-value application-set-extension__stat-value--healthy">{stats.Healthy}</span>
              </div>
              <div className="application-set-extension__stat">
                <span className="application-set-extension__stat-label">Progressing</span>
                <span className="application-set-extension__stat-value application-set-extension__stat-value--progressing">{stats.Progressing}</span>
              </div>
              <div className="application-set-extension__stat">
                <span className="application-set-extension__stat-label">Degraded</span>
                <span className="application-set-extension__stat-value application-set-extension__stat-value--degraded">{stats.Degraded}</span>
              </div>
              <div className="application-set-extension__stat">
                <span className="application-set-extension__stat-label">Unknown</span>
                <span className="application-set-extension__stat-value application-set-extension__stat-value--unknown">{stats.Unknown}</span>
              </div>
              <div className="application-set-extension__stat">
                <span className="application-set-extension__stat-label">Synced</span>
                <span className="application-set-extension__stat-value application-set-extension__stat-value--healthy">{stats.Synced}</span>
              </div>
              <div className="application-set-extension__stat">
                <span className="application-set-extension__stat-label">Out of Sync</span>
                <span className="application-set-extension__stat-value application-set-extension__stat-value--degraded">{stats.OutOfSync}</span>
              </div>
            </div>
          )}
          
          <StatusIndicator 
            total={stats.total}
            healthy={stats.Healthy}
            degraded={stats.Degraded}
            progressing={stats.Progressing}
            unknown={stats.Unknown}
          />
          
          <ApplicationSetList 
            applications={applications}
            isLoading={isLoading}
            error={error}
          />
        </div>
      </div>
    </div>
  );
};

export default ApplicationSetDetail;