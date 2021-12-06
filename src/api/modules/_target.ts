import { defHttp } from '/@/utils/http/axios';

enum Api {
  targetTypeDefine = '/target_type',
  targetRelationDefine = '/target_relation_type',
  targets = '/targets',
  targetRelations = '/target_relations',
}
const request: any = {};

// 目标分类定义列表查询
request.targetList = (data) => {
  return defHttp.post({ url: `${Api.targetTypeDefine}/page`, data });
};
// 目标分类定义新增
request.createTargetType = (data) => {
  return defHttp.post({ url: Api.targetTypeDefine, data });
};
// 目标分类定义修改
request.updateTargetType = (data) => {
  return defHttp.put({ url: Api.targetTypeDefine, data });
};
// 目标分类定义删除
request.deleteTargetType = (targetTypeCode) => {
  return defHttp.delete({ url: `${Api.targetTypeDefine}/${targetTypeCode}` });
};

// 目标关系定义列表查询
request.targetRelationList = (data) => {
  return defHttp.post({ url: `${Api.targetRelationDefine}/page`, data });
};
// 目标关系定义列表新增
request.createTargetRelation = (data) => {
  return defHttp.post({ url: Api.targetRelationDefine, data });
};
// 目标关系定义列表编辑
request.updateTargetRelation = (data) => {
  return defHttp.put({ url: Api.targetRelationDefine, data });
};
// 目标关系定义列表删除
request.deleteTargetRelation = (relationTypeCode) => {
  return defHttp.delete({ url: `${Api.targetRelationDefine}/${relationTypeCode}` });
};

// 目标列表查询
request.targetsList = (data) => {
  return defHttp.post({ url: `${Api.targets}/page`, data });
};
// 目标关系列表查询
request.targetRelationsList = (data) => {
  return defHttp.post({ url: `${Api.targetRelations}/page`, data });
};

export default request;
