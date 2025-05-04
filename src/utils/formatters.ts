/**
 * Formate une date ISO en format lisible
 */
export const formatDate = (isoDate: string): string => {
  if (!isoDate) return '';
  
  try {
    const date = new Date(isoDate);
    return date.toLocaleString();
  } catch (e) {
    console.error('Error formatting date:', e);
    return isoDate;
  }
};

/**
 * Tronque une chaîne si elle dépasse une certaine longueur
 */
export const truncateString = (str: string, maxLength: number = 50): string => {
  if (!str) return '';
  if (str.length <= maxLength) return str;
  
  return `${str.substring(0, maxLength)}...`;
};

/**
 * Formate une durée en millisecondes en format lisible
 */
export const formatDuration = (milliseconds: number): string => {
  if (!milliseconds || isNaN(milliseconds)) return '';
  
  const seconds = Math.floor(milliseconds / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (days > 0) {
    return `${days}j ${hours % 24}h`;
  } else if (hours > 0) {
    return `${hours}h ${minutes % 60}m`;
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`;
  } else {
    return `${seconds}s`;
  }
};

/**
 * Calcule la durée entre deux dates
 */
export const getDuration = (startDate: string, endDate?: string): number => {
  if (!startDate) return 0;
  
  const start = new Date(startDate).getTime();
  const end = endDate ? new Date(endDate).getTime() : Date.now();
  
  return end - start;
};

/**
 * Formate un statut de santé pour l'affichage
 */
export const formatHealthStatus = (status?: string): string => {
  if (!status) return 'Unknown';
  
  // Première lettre en majuscule, reste en minuscule
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};