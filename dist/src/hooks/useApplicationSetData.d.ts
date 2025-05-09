import { Application } from '../types/application';
interface ApplicationStats {
    total: number;
    Healthy: number;
    Progressing: number;
    Degraded: number;
    Suspended: number;
    Missing: number;
    Unknown: number;
    Synced: number;
    OutOfSync: number;
}
export declare const useApplicationSetData: (applicationSetName: string) => {
    applications: Application[];
    stats: ApplicationStats;
    isLoading: boolean;
    error: string | null;
};
export {};
