import { createRequestForProTable } from './common';
import request from './request';

export function getEntities() {
  return request.get('/v1/nestjs-ui/entities');
}

export const fetchEntityRecords = (entityName: string) =>
  createRequestForProTable(`/v1/nestjs-ui/records?entity=${entityName}`, undefined, (res) => ({
    ...res,
    total: res.total,
  }));
