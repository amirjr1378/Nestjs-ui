/**
 * request 网络请求工具
 * 更详细的 api 文档: https://github.com/umijs/umi-request
 */
import type { ResponseError } from 'umi-request';
import { extend } from 'umi-request';
import { message, notification } from 'antd';
import { API_URL } from '@/env';
import { history } from 'umi';

const codeMessage = {
  200: 'عملیات با موفقیت انجام شد',
  201: 'با موفقیت ساخته شد',
  400: 'اطلاعات وارد شده اشتباه است',
  401: 'لطفا دوباره لاگین کنید',
  403: 'دسترسی ندارید',
  404: 'پیدا نشد',
};

const errorHandler = (error: ResponseError): Response => {
  const { response, data } = error;

  if (response?.status === 401) {
    // should dispatch logout fun localStorage.clear();
    localStorage.clear();
    // setAuthority(['guest']);
    // reloadAuthorized();
    history.push('/user/login');
  } else if (data && data.message) {
    notification.error({
      message: `مشکل در ارتباط با سرور!`,
      description: data.message,
    });
  } else if (response && response.status) {
    const { status, url, statusText } = response;
    const errorText = codeMessage[status] || statusText;

    notification.error({
      message: `مشکل ${status}: ${url}`,
      description: errorText,
    });
  }
  throw error;
};

const request = extend({
  errorHandler, //
  prefix: API_URL,
});

const messages: any = []; // array of url and hide funcs for messages
request.interceptors.request.use((url, options) => {
  if (
    options.method?.toLocaleLowerCase() === 'post' ||
    options.method?.toLocaleLowerCase() === 'put'
  ) {
    const hideFunciton = message.loading('لطفا شکیبا باشید', 0);
    messages.push({
      hide: hideFunciton,
      url,
    });
  }
  return {
    url,
    options,
  };
});

request.interceptors.response.use((response) => {
  if (messages && messages.length) {
    messages.forEach(({ url, hide }: any, index: number) => {
      if (url === response.url) {
        messages.splice(index, 1);
        hide();
        if (response.status >= 200 && response.status < 300)
          message.success('عملیات با موفقیت انجام شد');
      }
    });
  }
  return response;
});

export const addTokenInterceptor = (token: string | null) => {
  // we can do some token validation here
  request.interceptors.request.use((url, options) => {
    const newOptions: any = { ...options };
    delete newOptions.headers.Authorization;
    if (token) newOptions.headers.Authorization = `Bearer ${token}`;

    return {
      url,
      options: newOptions,
    };
  });
};

export default request;
