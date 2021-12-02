import { defHttp } from '/@/utils/http/axios';

enum Api {
  targetType = '/target_type',
  targetRelation = '/target_relation_type',
}
const request: any = {};

request.targetList = (data) => {
  return defHttp.post({ url: `${Api.targetType}/page`, data });
};
request.createTargetType = (data) => {
  return defHttp.post({ url: Api.targetType, data });
};
request.updateTargetType = (data) => {
  return defHttp.put({ url: Api.targetType, data });
};
request.deleteTargetType = (targetTypeCode) => {
  return defHttp.delete({ url: `${Api.targetType}/${targetTypeCode}` });
};

request.targetRelationList = (data) => {
  return defHttp.post({ url: `${Api.targetRelation}/page`, data });
};
request.createTargetRelation = (data) => {
  return defHttp.post({ url: Api.targetRelation, data });
};
request.updateTargetRelation = (data) => {
  return defHttp.put({ url: Api.targetRelation, data });
};
request.deleteTargetRelation = (relationTypeCode) => {
  return defHttp.delete({ url: `${Api.targetRelation}/${relationTypeCode}` });
};

export default request;
