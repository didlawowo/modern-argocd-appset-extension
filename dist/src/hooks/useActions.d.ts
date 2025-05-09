/**
 * Hook pour effectuer des actions sur les applications
 */
export declare const useActions: () => {
    isLoading: boolean;
    error: string | null;
    syncApplication: (name: string) => Promise<boolean>;
    refreshApplication: (name: string) => Promise<boolean>;
    syncAllApplications: (applications: string[]) => Promise<boolean>;
};
