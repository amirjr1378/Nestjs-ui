import request from './request';

export function getEntities() {
  return request.get('/v1/nestjs-ui/entities');
}
