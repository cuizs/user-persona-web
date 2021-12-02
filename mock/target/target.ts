import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultPageSuccess, getRequestToken, requestParams } from '../_util';

const targetList = [
  {
    deleted: false,
    created: '2021-11-30 23:06:59',
    updated: '2021-11-30 23:06:59',
    targetTypeCode: 'doctor',
    targetTypeName: 'mocksaa',
    targetTypeDesc: 'mockfwfq',
    targetSource: 'hosp.doctor',
    id: 'doctor',
  },
  {
    deleted: false,
    created: '2021-11-30 22:42:39',
    updated: '2021-11-30 22:56:23',
    targetTypeCode: 'customer',
    targetTypeName: '互医用户',
    targetTypeDesc: '互医用户描述',
    targetSource: 'yiyun_hosp.customer',
    id: 'customer',
  },
];

const targetRelationList = [
  {
    deleted: false,
    created: '2021-11-30 23:17:22',
    updated: '2021-11-30 23:17:22',
    relationTypeCode: 'hosp_doc_customer_rel',
    relationTypeName: '互医医患绑定关系',
    targetRelationDesc: '互医医患绑定关系',
    relationSource: 'hosp.customer_doctor_relation',
    parentTypeCode: 'doctor',
    parentTypeName: '互医医师',
    childTypeCode: 'customer',
    childTypeName: '互医用户',
  },
];

export default [
  {
    url: '/basic-api/target_type/page',
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      return resultPageSuccess(1, 10, targetList);
    },
  },
  {
    url: '/basic-api/target_relations/page',
    method: 'post',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      return resultPageSuccess(1, 10, targetRelationList);
    },
  },
] as MockMethod[];
