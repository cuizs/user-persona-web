<template>
  <BasicDrawer
    showFooter
    :maskClosable="false"
    v-bind="$attrs"
    :title="`${mode === 'edit' ? '编辑' : '新建'}目标关系`"
    width="30%"
  >
    <Form :model="stateFormData" ref="formRef">
      <FormItem
        :key="schema.field"
        v-for="schema in schemas"
        :label="schema.label"
        :name="schema.field"
        :rules="schema.rules"
        :required="schema.required"
        labelAlign="left"
      >
        <component
          :is="schema.component"
          size="large"
          v-bind="schema.componentProps"
          v-model:value="stateFormData[schema.field]"
        >
          <template v-if="fetching" #notFoundContent>
            <div class="text-center">
              <Spin size="small" />
              数据查询中...
            </div>
          </template>
        </component>
      </FormItem>
    </Form>
    <template #footer>
      <div>
        <a-button :style="{ marginRight: '8px' }" @click="onReset"> 重置 </a-button>
        <a-button type="primary" @click="onSubmit" :loading="submiting"> 提交 </a-button>
      </div>
    </template>
  </BasicDrawer>
</template>
<script lang="ts">
  import {
    createVNode,
    defineComponent,
    ref,
    watch,
    unref,
    nextTick,
    getCurrentInstance,
    ComponentInternalInstance,
  } from 'vue';
  import { getRelationUpdateSchema } from '../_config';
  import { BasicDrawer } from '/@/components/Drawer';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Modal, Form, FormItem, Input, Select, Spin } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface';
  import Api from '/@/api';
  import { useDesign } from '/@/hooks/web/useDesign';

  export default defineComponent({
    props: {
      mode: {
        type: String,
        default: 'new',
      },
      dataSource: {
        type: Object,
        default: () => ({}),
      },
    },
    components: {
      BasicDrawer,
      BasicForm,
      CollapseContainer,
      Form,
      FormItem,
      Input,
      Textarea: Input.TextArea,
      Select,
      Options: Select.Option,
      Spin,
    },
    emits: ['update:visible', 'reloadTable'],
    setup(props, { emit }) {
      const { prefixCls } = useDesign('dark-switch');

      const { proxy } = getCurrentInstance() as ComponentInternalInstance;
      const schemas = ref(getRelationUpdateSchema(proxy));
      const formRef = ref<Nullable<FormActionType>>(null);
      const formData = {};
      const fetching = ref(false);
      const submiting = ref(false);
      (schemas.value.map((s) => s.field) || []).forEach((s) => {
        formData[`${s}`] = null;
      });
      const stateFormData = ref({ ...formData });
      const { createMessage } = useMessage();

      async function getForm() {
        const form = unref(formRef);
        if (!form) {
          console.error('获取form实例失败');
        }
        await nextTick();
        return form as FormActionType;
      }

      async function fetchTargetListByName(name) {
        const res = await Api.targetList({
          pageSize: 1000,
          pageNo: 1,
          filter: { targetTypeName: name },
        });
        return res?.content || [];
      }

      const onParentChange = async (e, type) => {
        fetching.value = true;
        const index = schemas.value.findIndex((val) => val.field === type);
        schemas.value[index].componentProps.options = [];
        const res = await fetchTargetListByName(e);
        schemas.value[index].componentProps.options = res.map((val) => ({
          label: `${val.targetTypeName}(${val.targetTypeCode})`,
          value: val.targetTypeCode,
        }));
        fetching.value = false;
      };

      watch(
        () => props.dataSource,
        (val) => {
          if (!val || Object.keys(val).length === 0) {
            stateFormData.value = { ...formData };
            return;
          }
          const obj = {};
          Object.keys(stateFormData.value).forEach((key) => {
            obj[key] = val[key];
          });
          stateFormData.value = obj;
        },
        {
          deep: true,
          immediate: false,
        },
      );

      watch(
        () => props.mode,
        (val) => {
          const editDisableItems = ['relationTypeCode', 'parentTypeCode', 'childTypeCode'];
          editDisableItems.forEach((item) => {
            const index = schemas.value.findIndex((schema) => schema.field === item);
            schemas.value[index].componentProps.disabled = val === 'edit';
          });
        },
      );

      const onSubmit = async () => {
        const form = await getForm();
        form
          .validate()
          .then(async () => {
            createMessage.success('click search,values:' + JSON.stringify(stateFormData.value));
            submiting.value = true;
            try {
              let res;
              if (props.mode === 'new') {
                res = await Api.createTargetRelation({ ...unref(stateFormData.value) });
              } else {
                res = await Api.updateTargetRelation({
                  ...unref(stateFormData.value),
                  id: props.dataSource.id,
                });
              }
              if (!!res) {
                createMessage.success('操作成功！');
                emit('update:visible', false);
                emit('reloadTable');
              }
            } catch (e) {
              console.error(e);
            } finally {
              submiting.value = false;
            }
          })
          .catch((error: ValidateErrorEntity<any>) => {
            console.log('error', error);
          });
      };

      const onReset = async () => {
        const form = await getForm();
        const showMsg = Object.keys(stateFormData.value).some((val) => !!stateFormData.value[val]);
        if (!showMsg) return;
        Modal.confirm({
          content: '有尚未保存的数据，确定重置表单？',
          icon: createVNode(ExclamationCircleOutlined),
          onOk() {
            form.resetFields();
            stateFormData.value = formData;
          },
          onCancel() {
            Modal.destroyAll();
          },
        });
      };

      return {
        formRef,
        schemas,
        onSubmit,
        onReset,
        stateFormData,
        onParentChange,
        fetching,
        submiting,
        prefixCls,
      };
    },
  });
</script>
