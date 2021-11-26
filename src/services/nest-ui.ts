import { createRequestForProTable } from './common';
import request from './request';

export function fetchEntities() {
  return request.get('/v1/nestjs-ui/entities');
}

export const fetchEntityRecords = (entityName: string) =>
  createRequestForProTable(`/v1/nestjs-ui/records?entity=${entityName}`, undefined, (res) => ({
    ...res,
    total: res.total,
  }));

export const fetchOneEntityRecord = ({
  entityName,
  entityID,
}: {
  entityName: string;
  entityID: number;
}) => request.get(`/v1/nestjs-ui/records/${entityID}?entity=${entityName}`);

export const fetchOneEntityRecordProperties = (entityName: string) =>
  request.get(`/v1/nestjs-ui/entity-properties/${entityName}`);
