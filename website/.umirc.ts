import { defineConfig } from 'umi';

export default defineConfig({
  outputPath: 'static',
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
    { path: '/invite', component: '@/pages/Invite' },
    { path: '/myNum', component: '@/pages/MyNum' },
  ],
  fastRefresh: {},
  history: {
    type: 'hash',
  },
  title: '酷应用getting started'
});
