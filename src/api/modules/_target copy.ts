import { defHttp } from '/@/utils/http/axios';

enum Api {
  targetList = '/getTargetList',
}
const ApiObj: any = {};

ApiObj.demoListApi = () => {
  return defHttp.get({ url: Api.targetList });
};

export default ApiObj;
