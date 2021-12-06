import { FormProps } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
import { debounce } from 'lodash-es';
// 目标类别列表 table config
export function getTargetColumns(): BasicColumn[] {
  return [
    {
      title: '目标类别编码',
      dataIndex: 'targetTypeCode',
    },
    {
      title: '目标类别名称',
      dataIndex: 'targetTypeName',
    },
    {
      title: '目标数据来源',
      dataIndex: 'targetSource',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
    },
    {
      title: '最后更新时间',
      dataIndex: 'updated',
    },
  ];
}
// 目标类别搜索栏 Form config
export function getTargetSearchBarConfig(): Partial<FormProps> {
  return {
    layout: 'horizontal',
    showAdvancedButton: false,
    labelCol: {
      xl: 8,
      xxl: 8,
    },
    wrapperCol: {
      xl: 16,
      xxl: 16,
    },
    actionColOptions: {
      xl: 6,
      xxl: 6,
    },
    schemas: [
      {
        field: `targetTypeCode`,
        label: `编号`,
        component: 'Input',
        colProps: {
          xl: 6,
          xxl: 6,
        },
      },
      {
        field: `targetTypeName`,
        label: `目标名称`,
        component: 'Input',
        colProps: {
          xl: 6,
          xxl: 6,
        },
      },
      {
        field: `targetSource`,
        label: `目标来源`,
        component: 'Input',
        colProps: {
          xl: 6,
          xxl: 6,
        },
      },
    ],
  };
}

export function getTargetUpdateSchema(_this): any[] {
  return [
    {
      field: 'targetTypeCode',
      component: 'Input',
      label: '目标类别编码',
      rules: [
        {
          required: true,
          message: '目标类别编码不能为空',
        },
      ],
      componentProps: {
        placeholder: '请输入目标类别编码',
        disabled: false,
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'targetTypeName',
      rules: [
        {
          required: true,
          message: '目标类别名称不能为空',
        },
      ],
      component: 'Input',
      label: '目标类别名称',
      componentProps: {
        placeholder: '请填写目标类别名称',
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },

    {
      field: 'targetSource',
      rules: [
        {
          required: true,
          message: '目标来源不能为空',
        },
      ],
      component: 'Select',
      label: '目标数据来源',
      componentProps: {
        placeholder: '请选择目标来源',
        options: [
          { label: '来源1', value: '1' },
          { label: '来源2', value: '2' },
        ],
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'targetTypeDesc',
      component: 'Textarea',
      label: '目标类别描述',
      componentProps: {
        placeholder: '请填写目标类别描述',
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
  ];
}

// 目标关系列表 table config
export function getRelationColumns(): BasicColumn[] {
  return [
    {
      title: '目标关系编码',
      dataIndex: 'relationTypeCode',
    },
    {
      title: '目标关系名称',
      dataIndex: 'relationTypeName',
    },
    {
      title: '父目标类别',
      dataIndex: 'parentTypeCode',
      customRender: ({ record }) => `${record.parentTypeName}（${record.parentTypeCode}）`,
    },
    {
      title: '子目标类别',
      dataIndex: 'childTypeCode',
      customRender: ({ record }) => `${record.childTypeName}（${record.childTypeCode}）`,
    },
    {
      title: '关系数据来源',
      dataIndex: 'relationSource',
    },

    {
      title: '目标关系描述',
      dataIndex: 'targetRelationDesc',
    },
    {
      title: '创建时间',
      dataIndex: 'created',
    },
    {
      title: '最后更新时间',
      dataIndex: 'updated',
    },
  ];
}

// 目标关系搜索栏 Form config
export function getTargetRelationSearchBarConfig(): Partial<FormProps> {
  return {
    layout: 'horizontal',
    showAdvancedButton: false,
    labelCol: {
      xl: 8,
      xxl: 8,
    },
    wrapperCol: {
      xl: 16,
      xxl: 16,
    },
    schemas: [
      {
        field: `name`,
        label: `编号`,
        component: 'Input',
        colProps: {
          xl: 8,
          xxl: 4,
        },
      },
      {
        field: `name`,
        label: `目标名称`,
        component: 'Input',
        colProps: {
          xl: 8,
          xxl: 4,
        },
      },
      {
        field: `name`,
        label: `目标类型`,
        component: 'Input',
        colProps: {
          xl: 8,
          xxl: 4,
        },
      },
      {
        field: `name`,
        label: `目标来源`,
        component: 'Input',
        colProps: {
          xl: 8,
          xxl: 4,
        },
      },
    ],
  };
}

// /{
//   "channelId": "string",
//   "childTypeCode": "string",
//   "created": "2021-12-01T06:17:32.121Z",
//   "dataFlag": "string",
//   "deleted": false,
//   "id": "string",

//   "parentTypeCode": "string",
//   "relationSource": "string",
//   "relationTypeCode": "string",
//   "relationTypeName": "string",
//   "targetRelationDesc": "string",
//   "updated": "2021-12-01T06:17:32.121Z"
// }
export function getRelationUpdateSchema(_this): any[] {
  return [
    {
      field: 'relationTypeCode',
      component: 'Input',
      label: '目标关系编码',
      rules: [
        {
          required: true,
          message: '目标类别编码不能为空',
        },
      ],
      componentProps: {
        placeholder: '请输入目标关系编码',
        disabled: false,
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'relationTypeName',
      rules: [
        {
          required: true,
          message: '目标类别名称不能为空',
        },
      ],
      component: 'Input',
      label: '目标关系名称',
      componentProps: {
        placeholder: '请填写目标关系名称',
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'parentTypeCode',
      rules: [
        {
          required: true,
          message: '目标来源不能为空',
        },
      ],
      component: 'Select',
      label: '父目标类别',
      componentProps: {
        disabled: false,
        placeholder: '请选择目标关系数据来源',
        options: [],
        loading: false,
        onSearch: debounce((e: any) => {
          _this.onParentChange.call(_this, e, 'parentTypeCode');
        }, 300),
        ['show-search']: true,
        ['filter-option']: false,
      },
    },
    {
      field: 'childTypeCode',
      rules: [
        {
          required: true,
          message: '目标来源不能为空',
        },
      ],
      component: 'Select',
      label: '子目标类别',
      componentProps: {
        disabled: false,
        placeholder: '请选择目标关系数据来源',
        options: [
          { label: '类别1', value: 'doctor' },
          { label: '类别2', value: '2' },
        ],
        loading: false,
        onSearch: debounce((e: any) => {
          _this.onParentChange.call(_this, e, 'childTypeCode');
        }, 300),
        ['show-search']: true,
        ['filter-option']: false,
      },
    },
    {
      field: 'relationSource',
      rules: [
        {
          required: true,
          message: '目标来源不能为空',
        },
      ],
      component: 'Select',
      label: '目标关系数据来源',
      componentProps: {
        placeholder: '请选择目标关系数据来源',
        options: [
          { label: '来源1', value: '1' },
          { label: '来源2', value: '2' },
        ],
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
    {
      field: 'targetRelationDesc',
      component: 'Textarea',
      label: '目标关系描述',
      componentProps: {
        placeholder: '请填写目标关系描述',
        onChange: (e: any) => {
          console.log(e);
        },
      },
    },
  ];
}
('');
