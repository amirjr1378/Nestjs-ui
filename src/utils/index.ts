import { API_URL } from '@/env';

export const getMediaUrl = (url?: string, fallback?: string) => (url ? API_URL + url : fallback);
