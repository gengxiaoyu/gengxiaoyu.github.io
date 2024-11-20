```vue
<template>
  <div class="absolute top-1 right-1 w-60 p-2">
    <div class="mb-2 flex items-center justify-between">
      <a-select v-model:value="value" show-search placeholder="搜索" style="width: 200px"
        :default-active-first-option="false" :show-arrow="false" :filter-option="false" :not-found-content="null"
        :options="dataSource" @search="handleSearch" @change="handleChange" :field-names="{ label: 'name', value: 'id' }"
        allowClear></a-select>
      <MenuUnfoldOutlined class="text-white text-3xl" v-if="menuIs" @click="toggle" />
      <MenuFoldOutlined class="text-white text-3xl" v-else @click="toggle" />
    </div>
    <transition name="fade">
      <div class="border border-sky-600 p-2" v-show="menuIs">
        <div class="flex items-center" v-for="(item, index) in catalogList" :key="index">
          <a-checkbox v-model="item.status" @change="handleChangeCheckbox(item.id, item.status, item.img)">
          </a-checkbox>
          <div class="flex items-center">
            <img class="pl-1 h-[20px]" :src="item.img" alt="map点位图例" />
            <span class="pl-1 text-white">{{ item.name }} {{ `(${item.deviceCount})` }}</span>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons-vue';
import { useFetchData } from '@/composables/usePage'
import Api from "@/api/facilityManagementApi.js";
import GeneralApi from '@/api/generalApi.js'; // 导入API接口
const IMGPATH = import.meta.env.VITE_APP_IMGPATH;
const emit = defineEmits(['handleKey', 'handleSelectChange']);
const options = ref([]);
// 搜索事件数据接口
let opts = reactive({
  dataSourceApi: Api.queryDeviceInfoSimple,
  dataSourceKey: 'deviceInfoList',
  params: { name: null },
})
const { dataSource, fetchData } = useFetchData(opts);

// 设备类型的方法
let opts1 = reactive({
  dataSourceApi: Api.queryDeviceCatalogSimple,
  dataSourceKey: 'deviceCatalogList',
  params: {}
})
const { dataSource: catalogList, fetchData: fetchDataCatalog } = useFetchData(opts1);

// 图片地址查询方法
let opts2 = reactive({
  dataSourceApi: GeneralApi.queryFile,
  dataSourceKey: 'fileList',
  params: { idList: [] }
})
const { dataSource: fileList, fetchData: fetchDataFile } = useFetchData(opts2);

// 菜单是否显示
let menuIs = ref(true);
// 菜单显示隐藏事件
const toggle = () => {
  menuIs.value = !menuIs.value;
};

// 选中事件
const handleChange = async value => {
  // 隐藏菜单 清空菜单之后
  if (!value) {
    menuIs.value = true;
  }else{
    menuIs.value = false;
  }
  // 清空数据 
  catalogList.value = [];
  // 初始化 fetchDataCatalog 方法
  await fetchDataCatalogInfo();
  emit('handleSelectChange', value);
};

// 搜索事件
const handleSearch = val => {
  options.value = [];
  if (val) {
    opts.value.params.name = val;
    fetchData();
  }
};

// 选中事件
const value = ref(undefined);
// 复选框的值变化时触发的事件
const handleChangeCheckbox = (type, status, url) => {
  emit('handleKey', type, !status, url);
  catalogList.value.forEach(el => {
    if (type === el.id) {
      el.status = !el.status;
    }
  });
};

// 图片地址查询方法
const findImgUrl = async (pointIcon) => {
  let url = null;
  // let obj = array.find(item => item.id == id);
  opts2.value.params.idList = [pointIcon];
  // 查询图片地址方法
  await fetchDataFile();
  // 处理图片地址
  if (fileList.value && fileList.value.length > 0) {
    url = `${IMGPATH}/${fileList.value[0].filepath}`;
  }
  return url;
}

// 初始化 fetchDataCatalog 方法
const fetchDataCatalogInfo = async () => {
  await fetchDataCatalog();
  // 遍历 catalogList，为每个元素添加 img 属性、获取远程图片地址
  if (catalogList.value && catalogList.value.length > 0) {
    catalogList.value.forEach(async (item) => {
      const imgUrl = await findImgUrl(item.pointIcon, catalogList.value);
      item.img = imgUrl;
      item.status = false;
    });
  }
};
onMounted(async () => {
  await fetchDataCatalogInfo();
}); 
</script>

<style scoped></style>
```
