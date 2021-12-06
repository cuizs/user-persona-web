<template>
  <PageWrapper :title="t('routes.target.targetList')">
    <template #extra>
      <Button type="primary" preIcon="carbon:add" @click="handleOpenUpdateDrawer()">
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
                confirm: handleDelete.bind(null, record),
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
  import { Button } from 'ant-design-vue';
  import UpdateTarget from './modals/UpdateTargets.vue';
  import Api from '/@/api';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      Button,
      TableAction,
      UpdateTarget,
    },
    setup() {
      const { createMessage } = useMessage();
      const { t } = useI18n();

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
        pagination: { pageSize: 10, current: 0 },
        ellipsis: false,
        fetchSetting: {
          listField: 'content',
          pageField: 'number',
          sizeField: 'size',
        },
        actionColumn: {
          title: '操作',
          dataIndex: 'action',
          slots: { customRender: 'action' },
        },
        beforeFetch: (params) => {
          console.log('params', params);
          const { number, size, ...filter } = params;
          return { number: number, size, filter };
        },
      });
      const updateDrawerVisible = ref(false);
      const updateMode = ref('new');
      const updateDataSource = ref({});
      function getFormValues() {
        console.log(getForm().getFieldsValue());
      }

      function toggleDrawerVisible(visible = false) {
        updateDrawerVisible.value = visible;
      }

      async function handleDelete(record) {
        try {
          const res = await Api.deleteTargetType(record.targetTypeCode);
          if (!!res) {
            createMessage.success('删除成功！');
            handleReloadTable();
          }
        } catch (e) {
          console.error(e);
        }
      }
      function handleOpenUpdateDrawer(record = {}) {
        updateMode.value = Object.keys(record).length !== 0 ? 'edit' : 'new';
        updateDataSource.value = record;
        toggleDrawerVisible(true);
      }

      const JSONData = ref(null);
      function onSelectChange(_key, record) {
        JSONData.value = record[0];
      }

      function handleReloadTable(_reload = false) {
        rest.reload();
      }
      return {
        t,
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
  @import '/@/design/index.less';
  .json-display-area {
    width: 400px;
    margin-left: 20px;
  }
  .table-rows {
    background: pink;
  }
</style>
