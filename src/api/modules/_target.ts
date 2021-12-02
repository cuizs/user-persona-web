import { defHttp } from '/@/utils/http/axios';

enum Api {
  targetList = '/target_type/page',
  targetRelationList = '/target_relations/page',
  createTargetType = '/target_type',
  createTargetRelation = '/target_relation_type',
}
const request: any = {};

request.targetList = (data) => {
  return defHttp.post({ url: Api.targetList, data });
};
request.createTargetType = (data) => {
  return defHttp.post({ url: Api.createTargetType, data });
};
request.targetRelationList = (data) => {
  return defHttp.post({ url: Api.targetRelationList, data });
};

request.createTargetRelation = (data) => {
  return defHttp.post({ url: Api.createTargetRelation, data });
};

export default request;
