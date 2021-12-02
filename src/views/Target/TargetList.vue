<template>
  <PageWrapper title="目标管理">
    <template #extra>
      <Button type="primary" preIcon="carbon:add" @click="handleOpenUpdateDrawer(null)">
        添加目标
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
    <UpdateTarget
      v-model:visible="updateDrawerVisible"
      :mode="updateMode"
      :dataSource="updateDataSource"
      @reloadTable="handleReloadTable"
    />
  </PageWrapper>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getTargetColumns, getTargetSearchBarConfig } from './_config';
  import { Alert, Button } from 'ant-design-vue';
  import UpdateTarget from './modals/UpdateTargets.vue';
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
      UpdateTarget,
      JsonPreview,
    },
    setup() {
      const { createMessage } = useMessage();
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { getForm, ...rest }] = useTable({
        clickToRowSelect: true,
        bordered: true,
        striped: true,
        api: Api.targetList,
        columns: getTargetColumns(),
        useSearchForm: true,
        formConfig: getTargetSearchBarConfig(),
        showIndexColumn: false,
        rowKey: 'id',
        pagination: { pageSize: 10 },
        fetchSetting: {
          listField: 'content',
          // pageField: 'number',
          // sizeField: 'size',
        },
        actionColumn: {
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        beforeFetch: (params) => {
          console.log('params', params);
          const { page, pageSize, ...filter } = params;
          return { page, pageSize, filter };
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

      function handleReloadTable(reload = false) {
        console.log(rest);
        rest.reload();
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
        handleReloadTable,
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
