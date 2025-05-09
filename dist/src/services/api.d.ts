import { Application } from '../types/application';
import { ApiResponse } from './types';
/**
 * Récupère les applications générées par un ApplicationSet
 */
export declare const getApplicationsByApplicationSet: (applicationSetName: string) => Promise<ApiResponse<Application[]>>;
/**
 * Synchronise une application
 */
export declare const syncApplication: (applicationName: string, options?: {
    prune: boolean;
    dryRun: boolean;
}) => Promise<ApiResponse<any>>;
/**
 * Rafraîchit une application
 */
export declare const refreshApplication: (applicationName: string, hardRefresh?: boolean) => Promise<ApiResponse<any>>;
