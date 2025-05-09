import * as React from 'react';
import { Application } from '../../types/application';
interface ApplicationSetListProps {
    applications: Application[];
    isLoading: boolean;
    error: string | null;
}
declare const ApplicationSetList: React.FC<ApplicationSetListProps>;
export default ApplicationSetList;
