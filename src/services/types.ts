/**
 * Interface de base pour les réponses API
 */
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

/**
 * Interface pour les options de pagination
 */
export interface PaginationOptions {
  limit?: number;
  offset?: number;
}

/**
 * Interface pour les options de tri
 */
export interface SortOptions {
  field: string;
  order: 'asc' | 'desc';
}

/**
 * Interface pour les options de filtre
 */
export interface FilterOptions {
  field: string;
  value: string | number | boolean;
  operator?: 'eq' | 'ne' | 'gt' | 'lt' | 'gte' | 'lte' | 'in' | 'nin' | 'contains';
}

/**
 * Interface pour les options de requête
 */
export interface QueryOptions {
  pagination?: PaginationOptions;
  sort?: SortOptions[];
  filters?: FilterOptions[];
}