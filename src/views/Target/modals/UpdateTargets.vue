<template>
  <BasicDrawer
    showFooter
    :maskClosable="false"
    v-bind="$attrs"
    :title="`${mode === 'edit' ? '编辑' : '新建'}目标类别`"
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
          <template :key="opt.value" v-for="opt in schema.componentProps?.options || []">
            <Options :value="opt.value">{{ opt.label }}</Options>
          </template>
        </component>
      </FormItem>
    </Form>
    <template #appendFooter>
      <div
        :style="{
          position: 'absolute',
          right: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
          zIndex: 1,
        }"
      >
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
  } from 'vue';
  import { getTargetUpdateSchema } from '../_config';
  import { BasicDrawer } from '/@/components/Drawer';
  import { BasicForm, FormActionType } from '/@/components/Form/index';
  import { CollapseContainer } from '/@/components/Container/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { Modal, Form, FormItem, Input, Select } from 'ant-design-vue';
  import { ExclamationCircleOutlined } from '@ant-design/icons-vue';
  import { ValidateErrorEntity } from 'ant-design-vue/lib/form/interface';
  import Api from '/@/api';
  export default defineComponent({
    props: {
      mode: {
        type: String,
        default: 'new',
      },
      dataSource: {
        type: Object,
        default: {},
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
    },
    setup(props, { emit }) {
      const { proxy } = getCurrentInstance();
      const schemas = ref(getTargetUpdateSchema(proxy));

      const formRef = ref<Nullable<FormActionType>>(null);
      const submiting = ref(false);
      const formData = {};
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

      watch(
        () => props.dataSource,
        (val) => {
          if (!val) {
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
          const editDisableItems = ['targetTypeCode'];
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
                res = await Api.createTargetType({ ...unref(stateFormData.value) });
              } else {
                res = await Api.updateTargetType({
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
        submiting,
      };
    },
  });
</script>
