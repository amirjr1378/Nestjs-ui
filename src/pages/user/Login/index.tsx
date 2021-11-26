import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { message } from 'antd';
import React, { useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useIntl, Link, history, FormattedMessage, SelectLang, useModel } from 'umi';
import { getTokenFromLocalStorage, loginPost } from '@/services/user';
import { addTokenInterceptor } from '@/services/request';
import styles from './index.less';

/** 此方法会跳转到 redirect 参数所在的位置 */
const goto = () => {
  if (!history) return;
  setTimeout(() => {
    const { query } = history.location;
    const { redirect } = query as { redirect: string };
    history.push(redirect || '/');
  }, 10);
};

const Login: React.FC = () => {
  const [submitting, setSubmitting] = useState(false);
  const { setInitialState, initialState } = useModel('@@initialState');
  if (getTokenFromLocalStorage() && history) history.push('/');

  const intl = useIntl();

  const handleSubmit = async (values: API.LoginParams) => {
    setSubmitting(true);
    try {
      // 登录
      const jwt = await loginPost({ ...values });
      console.log(jwt);

      if (jwt) {
        addTokenInterceptor(jwt);
        const user = await initialState?.fetchUserInfo?.();
        setInitialState({ ...initialState, currentUser: user });
        goto();
        return;
      }
    } catch (error) {
      message.error('نام کاربری یا رمز عبور اشتباه است');
      setSubmitting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.lang}>{SelectLang && <SelectLang />}</div>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <Link to="/">
              <img alt="logo" className={styles.logo} src="/logo.svg" />
              <span className={styles.title}>Doctop</span>
            </Link>
          </div>
          <div className={styles.desc}>docop admin panel</div>
        </div>

        <div className={styles.main}>
          <ProForm
            initialValues={{}}
            submitter={{
              searchConfig: {
                submitText: intl.formatMessage({
                  id: 'pages.login.submit',
                  defaultMessage: '登录',
                }),
              },
              render: (_, dom) => dom.pop(),
              submitButtonProps: {
                loading: submitting,
                size: 'large',
                block: true,
              },
            }}
            onFinish={async (values) => {
              handleSubmit(values as API.LoginParams);
            }}
          >
            <>
              <ProFormText
                name="identifier"
                fieldProps={{
                  size: 'large',
                  prefix: <UserOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.username.placeholder',
                  defaultMessage: '用户名: admin or user',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.username.required"
                        defaultMessage="请输入用户名!"
                      />
                    ),
                  },
                ]}
              />
              <ProFormText.Password
                name="password"
                fieldProps={{
                  size: 'large',
                  prefix: <LockOutlined className={styles.prefixIcon} />,
                }}
                placeholder={intl.formatMessage({
                  id: 'pages.login.password.placeholder',
                  defaultMessage: '密码: ant.design',
                })}
                rules={[
                  {
                    required: true,
                    message: (
                      <FormattedMessage
                        id="pages.login.password.required"
                        defaultMessage="请输入密码！"
                      />
                    ),
                  },
                ]}
              />
            </>
          </ProForm>
        </div>
      </div>
    </div>
  );
};

export default Login;
