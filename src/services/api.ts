import { Application } from '../types/application';
import { ApiResponse } from './types';

/**
 * Base URL de l'API ArgoCD
 */
const API_BASE_URL = '/api/v1';

/**
 * Récupère les applications générées par un ApplicationSet
 */
export const getApplicationsByApplicationSet = async (
  applicationSetName: string
): Promise<ApiResponse<Application[]>> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/applications?selector=argocd.argoproj.io/application-set-name=${applicationSetName}`
    );

    if (!response.ok) {
      throw new Error(`Erreur lors de la récupération des applications: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data: data.items || [],
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
    };
  }
};

/**
 * Synchronise une application
 */
export const syncApplication = async (
  applicationName: string,
  options = { prune: true, dryRun: false }
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationName}/sync`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        dryRun: options.dryRun,
        prune: options.prune,
        strategy: {
          apply: {
            force: false
          }
        }
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors de la synchronisation de l'application: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
    };
  }
};

/**
 * Rafraîchit une application
 */
export const refreshApplication = async (
  applicationName: string,
  hardRefresh = false
): Promise<ApiResponse<any>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/applications/${applicationName}/refresh`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        hardRefresh
      }),
    });

    if (!response.ok) {
      throw new Error(`Erreur lors du rafraîchissement de l'application: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      success: true,
      data,
    };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Une erreur inconnue est survenue',
    };
  }
};