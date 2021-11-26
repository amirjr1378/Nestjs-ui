import type { UserType } from './types';

/**
 * @see https://umijs.org/zh-CN/plugins/plugin-access
 * */
export default function access(initialState: { currentUser?: UserType | undefined }) {
  const { currentUser } = initialState || {};
  return {
    canAdmin: currentUser?.role?.type === 'admin',
  };
}
