import * as React from 'react';

interface ActionButtonsProps {
  applicationName: string;
  onSync?: () => void;
  onRefresh?: () => void;
  onDelete?: () => void;
  disabled?: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  applicationName,
  onSync,
  onRefresh,
  onDelete,
  disabled = false
}) => {
  const handleSync = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onSync) {
      onSync();
    } else {
      window.open(`/applications/${applicationName}?operation=sync`, '_blank');
    }
  };

  const handleRefresh = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onRefresh) {
      onRefresh();
    } else {
      window.open(`/applications/${applicationName}?refresh=true`, '_blank');
    }
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onDelete) {
      onDelete();
    } else {
      if (confirm(`Êtes-vous sûr de vouloir supprimer l'application ${applicationName} ?`)) {
        window.open(`/applications/${applicationName}?operation=delete`, '_blank');
      }
    }
  };

  return (
    <div className="application-set-extension__actions">
      <button 
        className="application-set-extension__action-button"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          window.open(`/applications/${applicationName}?view=tree`, '_blank');
        }}
        disabled={disabled}
      >
        Voir
      </button>
      <button 
        className="application-set-extension__action-button"
        onClick={handleRefresh}
        disabled={disabled}
      >
        Refresh
      </button>
      <button 
        className="application-set-extension__action-button application-set-extension__action-button--primary"
        onClick={handleSync}
        disabled={disabled}
      >
        Sync
      </button>
    </div>
  );
};

export default ActionButtons;