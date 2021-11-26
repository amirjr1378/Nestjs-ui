import { generateSortOptions } from '@/utils';
import request from './request';

export type ProTableRequestFunctionType = (
  params: Record<string, any> & {
    pageSize?: number | undefined;
    current?: number | undefined;
    keyword?: string | undefined;
  },
  sort?: Record<string, SortOrder>,
  filter?: Record<string, any>,
) => Promise<any> | undefined | any;

export const createRequestForProTable = (
  url: string,
  getRestOptions?:
    | Record<string, any>
    | ((args: {
        pageSize?: number | undefined;
        current?: number | undefined;
        keyword?: string | undefined;
        [key: string]: any;
      }) => Promise<any>),
  responseFormatter?: (arg?: any) => any,
) => {
  const requestThatProTableUse: ProTableRequestFunctionType = async (params, sort) => {
    const sortOptions = generateSortOptions(sort);
    const { current, pageSize, ...restParams } = params;
    const queryParams = {
      page: current,
      limit: pageSize,
      ...restParams,
    };
    if (getRestOptions) {
      if (typeof getRestOptions === 'function')
        Object.assign(queryParams, await getRestOptions(params));
      else {
        Object.assign(queryParams, getRestOptions);
      }
    }
    return request(url, {
      method: 'GET',
      params: {
        ...queryParams,
        ...(sortOptions || {}),
      },
    }).then(responseFormatter);
  };

  return requestThatProTableUse;
};
