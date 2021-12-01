import type { AppRouteModule } from '/@/router/types';

import { LAYOUT } from '/@/router/constant';
import { t } from '/@/hooks/web/useI18n';

const dashboard: AppRouteModule = {
  path: '/target',
  name: 'Target',
  component: LAYOUT,
  redirect: '/target/index',
  meta: {
    // hideChildrenInMenu: true,
    component: LAYOUT,
    icon: 'foundation:target-two',
    title: t('routes.target.target'),
    orderNo: 100000,
  },
  children: [
    {
      path: 'index',
      name: 'TargetPage',
      component: () => import('../../../views/Target/TargetList.vue'),
      meta: {
        title: t('routes.target.targetList'),
        // icon: 'foundation:target-two',
      },
    },
    {
      path: 'relation',
      name: 'TargetRelation',
      component: () => import('/@/views/Target/TargetRelation.vue'),
      meta: {
        title: t('routes.target.targetRelation'),
        // icon: 'foundation:target-two',
      },
    },
  ],
};

export default dashboard;
