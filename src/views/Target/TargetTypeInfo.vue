<template>
  <PageWrapper :title="t('routes.target.targetTypeInfo')">
    <BasicTable
      @register="registerTable"
      class="enter-y"
      :rowSelection="{
        type: 'radio',
        onChange: onSelectChange,
      }"
    >
      <template #content-right>
        <div class="json-display-area">
          <JsonPreview :data="JSONData"></JsonPreview>
        </div>
      </template>
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
  import { BasicTable, useTable } from '/@/components/Table';
  import { getTargetColumns, getTargetSearchBarConfig } from './_config';
  import UpdateTarget from './modals/UpdateTargets.vue';
  import { JsonPreview } from '/@/components/CodeEditor';
  import Api from '/@/api';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    components: {
      PageWrapper,
      BasicTable,
      UpdateTarget,
      JsonPreview,
    },
    setup() {
      const { createMessage } = useMessage();
      const { t } = useI18n();
      const checkedKeys = ref<Array<string | number>>([]);
      const [registerTable, { getForm, ...rest }] = useTable({
        clickToRowSelect: true,
        bordered: true,
        striped: true,
        api: Api.targetsList,
        columns: getTargetColumns(),
        useSearchForm: true,
        formConfig: getTargetSearchBarConfig(),
        showIndexColumn: false,
        rowKey: 'id',
        ellipsis: false,
        pagination: { pageSize: 10, current: 0 },
        fetchSetting: {
          listField: 'content',
          pageField: 'number',
          sizeField: 'size',
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
        updateMode.value = !!record ? 'edit' : 'new';
        updateDataSource.value = record;
        toggleDrawerVisible(true);
      }

      const JSONData = ref(undefined);
      function onSelectChange(_key, record) {
        JSONData.value = record[0];
      }

      function handleReloadTable(_reload = false) {
        console.log(rest);
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
