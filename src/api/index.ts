const modules = import.meta.globEager('./modules/*.ts');
console.log(modules);
let apiModuleLObj: any = {};
Object.keys(modules).forEach((key) => {
  const mod = modules[key].default || {};
  console.log(mod);
  const modList = Array.isArray(mod) ? [...mod] : [mod];
  console.log(modList);
  // apiModuleLObj.push(...modList);
  modList.forEach((apiObj) => {
    apiModuleLObj = { ...apiModuleLObj, ...apiObj };
  });
});
console.log(apiModuleLObj);
// export const apiList = apiModuleLObj;
export default apiModuleLObj;
