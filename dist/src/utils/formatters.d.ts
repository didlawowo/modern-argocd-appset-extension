/**
 * Formate une date ISO en format lisible
 */
export declare const formatDate: (isoDate: string) => string;
/**
 * Tronque une chaîne si elle dépasse une certaine longueur
 */
export declare const truncateString: (str: string, maxLength?: number) => string;
/**
 * Formate une durée en millisecondes en format lisible
 */
export declare const formatDuration: (milliseconds: number) => string;
/**
 * Calcule la durée entre deux dates
 */
export declare const getDuration: (startDate: string, endDate?: string) => number;
/**
 * Formate un statut de santé pour l'affichage
 */
export declare const formatHealthStatus: (status?: string) => string;
