### 方法：
```js
import { ref, reactive } from 'vue';
import TileLayer from '@arcgis/core/layers/TileLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import PictureMarkerSymbol from '@arcgis/core/symbols/PictureMarkerSymbol';
import pointMarkImg from '@/assets/arcGisImg/mark.png';

/**
 * 使用ArcGIS API for JavaScript创建和管理地图图层的函数
 * @param {Object} mapView - ArcGIS地图视图对象
 * @returns {Object} 包含地图操作的方法和属性的对象
 */
export function useArcgisLayers(mapView) {
  // 定义存储基础图层和水系图层的对象
  let baseLayer = {}; 
  let waterSystemLayer = {}; 
  // 定义用于保存点位的数组
  let pointsArray = []; 
  // 定义响应式变量，用于跟踪当前正在动画的点位和当前的动画帧ID
  let currentAnimatingGraphic = null;
  let currentAnimationFrameId = null;

  /**
   * 设置基础图层
   */
  async function setBaseLayer() {
    // 创建基础图层并设置其属性
    baseLayer.KJL = new TileLayer({
      url: "/arcgis/rest/services/BaseMap/SCVector_KJL_CGCS2000/MapServer",
      id: 'KJL', 
      visible: true,
    });
  }

  /**
   * 设置水系图层
   */
  async function setWaterSystemLayer() {
    // 创建水系图层并设置其属性
    waterSystemLayer.SXYZT = new MapImageLayer({
      url: "/arcgis/rest/services/BaseMap/SXYZT_CGCS2000/MapServer",
      id: 'SXYZT', 
      visible: true,
    });
    // 河湖划界图层（被注释掉）
  }

  /**
   * 获取新津区域的图层
   * @param {string} type - 区域类型
   * @returns {FeatureLayer} 配置好的区域图层
   */
  async function setDistrict(type) {
    // 创建区域图层并设置其属性
    const district = new FeatureLayer({
      visible: true,
      url: '/arcgis/rest/services/BaseMap/qjsyt/MapServer',
      id: 'xinjing',
      opacity: 1,
      renderer: {
        type: "unique-value",
        field: "COUTRICT",
        uniqueValueInfos: [{
          value: type,
          symbol: {
            type: "simple-fill",
            color: "rgba(255,222,173,0.1)",
            outline: {
              color: "rgba(255,222,173,0.8)",
              width: 2
            }
          }
        }]
      }
    });
    return district;
  }

  /**
   * 跳转到指定的地理位置
   * @param {number} x - 目标位置的经度
   * @param {number} y - 目标位置的纬度
   * @param {number} [zoomLevel=15] - 目标位置的缩放级别，默认为15
   */
  function goToLocation(x, y, zoomLevel = 15) {
    // 地图视图跳转到指定位置
    mapView.goTo({
      center: [x, y],
      zoom: zoomLevel
    }).catch(error => {
      if (error.name !== 'AbortError') {
        console.error(error);
      }
    });
  }

  /**
   * 根据类型创建点位数组，并使用图片图标
   * @param {Array} pointsData - 点位数据数组
   * @param {string} url - 图片URL
   * @param {boolean} [isUrl=false] - 是否使用数据中的URL，默认为false
   * @returns {Array} 点位图形数组
   */
  function createPointArrayByType(pointsData, url, isUrl = false) {
    // 根据点位数据创建图形并添加到数组
    return pointsData.map(item => {
      const point = new Point({
        longitude: item.lng,
        latitude: item.lat,
      });
      let imageUrl = isUrl ? item.ItemUrl ?? pointMarkImg : url ?? pointMarkImg;
      const markerSymbol = new PictureMarkerSymbol({
        url: imageUrl,
        width: '24px',
        height: '24px'
      });
      const graphic = new Graphic({
        geometry: point,
        symbol: markerSymbol,
        attributes: item,
      });
      pointsArray.push(graphic);
      return graphic;
    });
  }

  /**
   * 渲染所有点位
   */
  function renderPoints() {
    // 将点位数组添加到地图视图的图形集合中
    mapView.graphics.addMany(pointsArray);
  }

  /**
   * 清除所有点位
   */
  function clearPoints() {
    // 从地图视图中移除所有图形，并重置点位数组
    mapView.graphics.removeAll();
    pointsArray = [];
  }

  /**
   * 开始点位的动画
   * @param {Graphic} graphic - 需要动画的点位图形
   */
  function startAnimation(graphic) {
    // 开始点位动画
    if (currentAnimatingGraphic) {
      cancelAnimationFrame(currentAnimationFrameId);
      currentAnimatingGraphic.geometry = {
        type: 'point',
        x: currentAnimatingGraphic.attributes.originalX,
        y: currentAnimatingGraphic.attributes.originalY
      };
    }
    currentAnimatingGraphic = graphic;
    animateGraphic(graphic, mapView);
  }

  /**
   * 停止点位的动画
   */
  function stopAnimation() {
    // 停止点位动画
    if (currentAnimatingGraphic) {
      cancelAnimationFrame(currentAnimationFrameId);
      currentAnimatingGraphic.geometry = {
        type: 'point',
        x: currentAnimatingGraphic.attributes.originalX,
        y: currentAnimatingGraphic.attributes.originalY
      };
      currentAnimatingGraphic = null;
      currentAnimationFrameId = null;
    }
  }

  /**
   * 动画函数：实现点位上下跳动
   * @param {Graphic} graphic - 点位图形
   * @param {MapView} mapView - 地图视图
   */
  function animateGraphic(graphic, mapView) {
    // 实现点位动画的逻辑
    const scaleInit = 9027.977410759811;
    const amplitudeInit = 0.0002;
    const originalY = graphic.geometry.y;
    let amplitude = 0.0000001 * mapView.scale;
    const frequency = 10;
    let counter = 0;

    function step() {
      if (!currentAnimatingGraphic) return;
      const multiple = scaleInit / mapView.scale;
      amplitude = amplitudeInit / multiple;

      const newY = originalY + Math.sin(counter / frequency) * amplitude;
      graphic.geometry = {
        type: 'point',
        x: graphic.geometry.x,
        y: newY
      };
      counter++;

      if (counter < 10000) {
        currentAnimationFrameId = requestAnimationFrame(step);
      } else {
        graphic.geometry = {
          type: 'point',
          x: graphic.geometry.x,
          y: originalY
        };
        currentAnimatingGraphic = null;
        currentAnimationFrameId = null;
      }
    }

    step();
  }

  return {
    baseLayer,
    waterSystemLayer,
    setBaseLayer,
    setWaterSystemLayer,
    setDistrict,
    goToLocation,
    createPointArrayByType,
    renderPoints,
    clearPoints,
    startAnimation,
    stopAnimation
  };
}
```
### 示例：
```vue
<template>
  <div class="relative h-full">
    <!-- 地图容器 -->
    <div id="viewDiv"></div>
    <!-- 面板组件，用于触发点位的显示和隐藏 -->
    <ArcgisPanel @handleKey="handleKey" @handleSelectChange="handleSelectChange" />
    <!-- 自定义弹窗组件 -->
    <ArcGisPopup v-if="showPopup" :isVisible="showPopup" :attributes="popupAttributes" :event="popupEvent" @close="hidePopup" />
  </div>
</template>

<script setup>
import { onMounted, ref, reactive } from 'vue';
import { useArcgisLayers } from '@/composables/useArcgisLayers';
import { useFetchData } from '@/composables/usePage';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import ArcgisPanel from './arcgisPanel.vue';
import Api from "@/api/facilityManagementApi.js";
import pointMarkImg from '@/assets/arcGisImg/point-mark.png';
import ArcGisPopup from '@/components/arcGisPopup.vue'; // 引入 Popup 组件

// 响应式状态和引用
const showPopup = ref(false);
const popupAttributes = ref({});
const popupEvent = ref(null);
let mapView = null; // 地图视图实例引用
let stopAnimationFun = null; // 停止动画函数引用

// 点位查询条件和数据方法
const optsMap = reactive({
  dataSourceApi: Api.queryDeviceInfo,
  dataSourceKey: 'deviceInfoList',
  params: { catalogId: null },
});
const { dataSource: dataSourceMap, fetchData: fetchDataMap } = useFetchData(optsMap);

// 处理面板组件触发的事件
const handleKey = async (key, status, url) => {
  optsMap.params.catalogId = key;
  const { createPointArrayByType, renderPoints, clearPoints } = useArcgisLayers(mapView);
  if (status) {
    await fetchDataMap();
    dataSourceMap.value.forEach(item => {
      item.ItemUrl = url;
    });
    pointsData = [...pointsData, ...dataSourceMap.value];
  } else {
    pointsData = pointsData.filter(item => item.catalogId !== key);
  }
  clearPoints();
  const pointArray = createPointArrayByType(pointsData, null, true);
  renderPoints(pointArray);
};

// 处理选中事件数据接口
const optsDetail = reactive({
  dataSourceApi: Api.findDeviceInfo,
  dataSourceKey: 'deviceInfo',
  params: { id: null },
});
const { dataSource: dataSourceDetail, fetchData: fetchDataDetail } = useFetchData(optsDetail);

// 处理选中事件
const handleSelectChange = async (value) => {
  const { createPointArrayByType, renderPoints, clearPoints } = useArcgisLayers(mapView);
  clearPoints();
  if (value) {
    optsDetail.params.id = value;
    await fetchDataDetail();
    const pointArray = createPointArrayByType([dataSourceDetail.value], pointMarkImg);
    renderPoints(pointArray);
  }
};

// 初始化地图和图层
const mapInit = async () => {
  const { baseLayer, waterSystemLayer, setBaseLayer, setWaterSystemLayer, setDistrict } = useArcgisLayers();
  await setBaseLayer();
  await setWaterSystemLayer();
  const district = await setDistrict('新津区');

  const map = new Map({
    layers: [baseLayer.KJL, waterSystemLayer.SXYZT, district],
  });
  mapView = new MapView({
    container: 'viewDiv',
    map: map,
    zoom: 12,
    center: [103.817815, 30.436055], // 经度, 纬度
    ui: {
      components: [],
    },
  });

  mapView.when(() => {
    const { startAnimation, stopAnimation } = useArcgisLayers(mapView);
    mapView.on("click", (event) => {
      mapView.hitTest(event).then((response) => {
        if (response.results.length) {
          const unassignedGraphics = response.results.filter(result => result.graphic && result.layer === null);
          if (unassignedGraphics.length > 0 && unassignedGraphics[0].mapPoint && unassignedGraphics[0].graphic) {
            const attributes = unassignedGraphics[0].graphic.attributes;
            popupAttributes.value = attributes;
            popupEvent.value = event;
            showPopup.value = true;
            startAnimation(unassignedGraphics[0].graphic);
            stopAnimationFun = stopAnimation;
          }
        }
      });
    });
  });
};

// 隐藏弹窗方法
const hidePopup = () => {
  stopAnimationFun();
  showPopup.value = false;
};

// 在组件挂载后初始化地图
onMounted(async () => {
  await mapInit();
});
</script>

<style>
/* 地图容器的样式 */
#viewDiv {
  height: 100%;
}

/* 自定义弹窗的CSS */
#custom-popup {
  position: absolute;
  padding: 1.04167vw 1.85185vh;
  background: linear-gradient(180deg, rgba(0,35,62,.6) 35%, rgba(0,93,168,.45));
  box-shadow: 0 0 0.15625vw 0.05208vw rgba(0,156,255,.8);
  border-radius: .26042vw;
  backdrop-filter: blur(14px);
  z-index: 11;
}
</style>
```
### 组件中使用
* 点位图层切换
  * [点位图层切换文档](/ProjectDocs/Arcgis_Panel.md)
* 点位自定义弹窗
  * [点位自定义弹窗文档](/ProjectDocs/ArcGis_Popup.md)
