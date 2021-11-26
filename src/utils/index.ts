import { API_URL } from '@/env';
import { isEmpty } from 'lodash';

export const getMediaUrl = (url?: string, fallback?: string) => (url ? API_URL + url : fallback);

export const generateSortOptions = (options?: Record<string, any>) => {
  const sortOptions: { orderBy?: string; sort?: string } = {};
  if (!isEmpty(options) && options) {
    const sortKey = Object.keys(options)?.[0];
    if (sortKey) {
      sortOptions.orderBy = sortKey;
      if (options[sortKey]?.includes('asc')) sortOptions.sort = 'asc';
      if (options[sortKey]?.includes('desc')) sortOptions.sort = 'desc';
    }
  }
  return sortOptions;
};
