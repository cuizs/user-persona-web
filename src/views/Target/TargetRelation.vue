<template>
  <PageWrapper title="目标关系定义">
    <template #extra>
      <Button type="primary" preIcon="carbon:add" @click="handleOpenUpdateDrawer(null)">
        新增关联关系
      </Button>
    </template>
    <BasicTable @register="registerTable" class="enter-y">
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              icon: 'akar-icons:edit',
              onClick: handleOpenUpdateDrawer.bind(null, record),
            },
            {
              label: '删除',
              icon: 'carbon:delete',
              color: 'error',
              popConfirm: {
                title: '此操作不能撤回，请再次确定删除？',
                confirm: handleDelete.bind(null),
                placement: 'leftTop',
              },
            },
          ]"
        />
      </template>
      <!-- <template #content-right>
        <div class="json-display-area">
          <JsonPreview :data="JSONData"></JsonPreview>
        </div>
      </template> -->
    </BasicTable>
    <UpdateTargetRelation
      v-model:visible="updateDrawerVisible"
      :mode="updateMode"
      :dataSource="updateDataSource"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getRelationColumns, getTargetRelationSearchBarConfig } from './_config';
  import { Alert, Button } from 'ant-design-vue';
  import UpdateTargetRelation from './modals/UpdateTargetRelation.vue';
  import { JsonPreview } from '/@/components/CodeEditor';
  import Api from '/@/api';
  import { useMessage } from '/@/hooks/web/useMessage';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      AAlert: Alert,
      Button,
      TableAction,
      UpdateTargetRelation,
      JsonPreview,
    },
    setup() {
      const { createMessage } = useMessage();

      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { getForm, ...rest }] = useTable({
        clickToRowSelect: true,
        bordered: true,
        striped: true,
        api: Api.targetRelationList,
        columns: getRelationColumns(),
        useSearchForm: true,
        formConfig: getTargetRelationSearchBarConfig(),
        showIndexColumn: false,
        rowKey: 'relationTypeCode',
        actionColumn: {
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
      });
      const updateDrawerVisible = ref(false);
      const updateMode = ref('new');
      const updateDataSource = ref(null);
      function getFormValues() {
        console.log(getForm().getFieldsValue());
      }

      function toggleDrawerVisible(visible = false) {
        updateDrawerVisible.value = visible;
      }

      function handleDelete() {
        createMessage.success('确定删除');
      }
      function handleOpenUpdateDrawer(record = null) {
        updateMode.value = !!record ? 'edit' : 'new';
        updateDataSource.value = record;
        toggleDrawerVisible(true);
      }

      const JSONData = ref(null);
      function onSelectChange(key, record) {
        JSONData.value = record[0];
      }
      return {
        registerTable,
        getFormValues,
        checkedKeys,
        handleDelete,
        handleOpenUpdateDrawer,
        updateDrawerVisible,
        updateMode,
        updateDataSource,
        JSONData,
        onSelectChange,
      };
    },
  });
</script>

<style lang="less" scoped>
  .json-display-area {
    width: 400px;
    margin-left: 20px;
  }
  .table-rows {
    background: pink;
  }
</style>
