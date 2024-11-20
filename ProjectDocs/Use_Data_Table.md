## 具体使用：
```js
import { ref } from 'vue';
import Api from "@/api/generalApi.js";

export function useDataTable(opts) {
  // 数据源和总数
  const dataSource = ref([]);
  const total = ref(0);
  const isLoading = ref(false);

  // 是否正在添加或编辑
  const isAddEditing = ref(false);

  // 备选数据列表
  const alternativeList = ref([]);

  // 获取数据
  async function fetchData() {
    isLoading.value = true;
    try {
      const res = await opts.dataSourceApi(opts.params);
      console.info('列表查询', res);
      dataSource.value = res[opts.dataSourceKey] || [];
      total.value = res.total || 0;
    } catch (error) {
      console.error('列表查询失败', error);
      // 可以在这里处理错误，例如显示错误信息
    }
    isLoading.value = false;
  }

  // 添加或编辑数据
  const addEditData = async () => {
    isAddEditing.value = true;
    try {
      await opts.addEditApi(opts.params);
    } catch (error) {
      console.error('新增编辑', error);
    }
    isAddEditing.value = false;
  };

  // 删除数据
  const deleteData = async () => {  
    try {  
      await opts.deleteApi({ idList: [opts.id] });
    } catch (error) {  
      console.error('删除:', error);  
    } 
  };

  // 重置数据
  const resetData = async () => {  
    try {  
      await opts.resetApi({ id: opts.id });
    } catch (error) {  
      console.error('重置:', error);  
    } 
  };

  // 获取并处理备选数据列表
  const alternativeData = async () => {
    try {
      await Api.queryDictionaryInfo(opts.params).then((res) => {
        console.info('备选项', res);
        if (res) {
          alternativeList.value = res.dictionaryInfoList || [];
        }
      });
    } catch (error) {
      console.error('备选项:', error);
      throw error;
    }
  };

  return {
    dataSource,
    total,
    isLoading,
    fetchData,
    isAddEditing,
    addEditData,
    deleteData,
    resetData,
    alternativeList,
    alternativeData
  };
}
```
## 使用示例：
```vue
<script setup>
import { useDataTable } from '@/composables/useDataTable.js';
import { reactive } from 'vue';

const opts = reactive({
  dataSourceApi: Api.getDataSource,
  params: { page: 1, pageSize: 10 },
  dataSourceKey: 'data',
  addEditApi: Api.addEditData,
  deleteApi: Api.deleteData,
  resetApi: Api.resetData,
  id: 1,
  params: { code: 'IOT_DEVICE_CATALOG_TYPE' }
});

const {
  dataSource,
  total,
  isLoading,
  fetchData,
  isAddEditing,
  addEditData,
  deleteData,
  resetData,
  alternativeList,
  alternativeData
} = useDataTable(opts);

// 调用获取数据的方法
fetchData(); // 将更新dataSource和total
alternativeData(); // 将更新alternativeList
</script>
```