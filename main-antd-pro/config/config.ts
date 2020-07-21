// https://umijs.org/config/
import { defineConfig } from 'umi';
import pageRoutes from './router.config';
import defaultSettings from './defaultSettings';
import proxy from './proxy';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    name: 'Ant Design Pro',
    locale: true,
    siderWidth: 208,
  },
  locale: {
    // default zh-CN
    default: 'zh-CN',
    // default true, when it is true, will use `navigator.language` overwrite default
    antd: true,
    baseNavigator: true,
  },
  dynamicImport: {
    loading: '@/components/PageLoading/index',
  },
  targets: {
    ie: 11,
  },
  // umi routes: https://umijs.org/docs/routing
  routes: pageRoutes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    // ...darkTheme,
    'primary-color': defaultSettings.primaryColor,
  },
  // @ts-ignore
  title: false,
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  // 配置 qiankuan
  qiankun: {
    master: {
      // 注册子应用信息
      apps: [
        {
          name: 'app-esl', // 唯一 id
          entry: '//test.sifei.info/app-esl/', // html entry
        },
        {
          name: 'app-angular', // 唯一 id
          entry: '//localhost:7103/', // html entry
          activeRule: '/angular9',
        },
      ],
    },
  },
});
