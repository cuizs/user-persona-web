import { defHttp } from '/@/utils/http/axios';

enum Api {
  targetList = '/target_type/page',
  targetRelationList = '/target_relations/page',
}
const request: any = {};

request.targetList = () => {
  return defHttp.post({ url: Api.targetList });
};

request.targetRelationList = () => {
  return defHttp.post({ url: Api.targetRelationList });
};

export default request;
