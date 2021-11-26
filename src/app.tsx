import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import { setLocale } from 'umi';
import { history, Link } from 'umi';
import RightContent from '@/components/RightContent';
import { getMyInfo } from './services/user';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import { getTokenFromLocalStorage, removeTokenFromLocalStorage } from './services/user';
import { addTokenInterceptor } from './services/request';
import type { UserType } from './types';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

setLocale('fa-IR');

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: UserType;
  fetchUserInfo?: () => Promise<UserType | undefined>;
}> {
  const token = getTokenFromLocalStorage();
  if (token) addTokenInterceptor(token);

  const fetchUserInfo = async () => {
    try {
      if (!token) throw new Error('token is not provided');
      const currentUser = await getMyInfo().catch(() => {
        removeTokenFromLocalStorage();
        addTokenInterceptor(null);
      });
      return currentUser;
    } catch (error) {
      history.push('/user/login');
    }
    return undefined;
  };
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    return {
      fetchUserInfo,
      currentUser,
      settings: {},
    };
  }
  return {
    fetchUserInfo,
    settings: {},
  };
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState }) => {
  return {
    rightContentRender: () => <RightContent />,
    disableContentMargin: false,
    waterMarkProps: {
      content: initialState?.currentUser?.name,
    },
    onPageChange: () => {
      const { location } = history;
      const token = getTokenFromLocalStorage();
      if (!token && location.pathname !== loginPath) {
        history.push('/user/login');
      }
    },
    links: isDev
      ? [
          <Link to="/umi/plugin/openapi" target="_blank">
            <LinkOutlined />
            <span>OpenAPI 文档</span>
          </Link>,
          <Link to="/~docs">
            <BookOutlined />
            <span>业务组件文档</span>
          </Link>,
        ]
      : [],
    menuHeaderRender: undefined,
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    // childrenRender: (children) => {
    //   if (initialState.loading) return <PageLoading />;
    //   return children;
    // },
    ...initialState?.settings,
  };
};
