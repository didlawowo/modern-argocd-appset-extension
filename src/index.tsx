import * as React from 'react';
import './extension.css';

// Import des composants
import ApplicationSetDetail from './components/ApplicationSetDetail/ApplicationSetDetail';

// Déclaration des types pour l'API d'extensions
declare global {
  interface Window {
    extensionsAPI?: {
      registerResourceExtension: (
        group: string,
        kind: string,
        version: string,
        options: {
          component: React.ComponentType<any>;
        }
      ) => void;
    };
  }
}

// Enregistrement de l'extension pour le type de ressource ApplicationSet
if (window.extensionsAPI) {
  window.extensionsAPI.registerResourceExtension(
    'argoproj.io',
    'ApplicationSet',
    'v1alpha1',
    {
      component: ApplicationSetDetail,
    }
  );
  
  console.log('ApplicationSet extension registered successfully');
} else {
  console.error('Failed to register ApplicationSet extension: extensionsAPI not available');
}

export default ApplicationSetDetail;
