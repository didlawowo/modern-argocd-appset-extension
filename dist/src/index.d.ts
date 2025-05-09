import * as React from 'react';
import './extension.css';
import ApplicationSetDetail from './components/ApplicationSetDetail/ApplicationSetDetail';
declare global {
    interface Window {
        extensionsAPI?: {
            registerResourceExtension: (group: string, kind: string, version: string, options: {
                component: React.ComponentType<any>;
            }) => void;
        };
    }
}
export default ApplicationSetDetail;
