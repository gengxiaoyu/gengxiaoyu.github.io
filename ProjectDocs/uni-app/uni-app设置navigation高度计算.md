

## 四、uni-app/小程序自定义navigation高度计算

### pages.js 配置 

````json
"pages": [
    {
        "path": "pages/index/index",
        "style": {
            "navigationBarTitleText": "首页",
            "navigationStyle":"custom"
        }
    },
]
````

### app.vue页面设置
````html
<script>
	export default {
		globalData: {
			statusBarHeight: 0, // 状态导航栏高度
			navHeight: 0, // 总体高度
			navigationBarHeight: 0, // 导航栏高度(标题栏高度)
		},
		onLaunch(options) {
			console.log('App onLaunch');
			init(options);
			// 状态栏高度	  
			this.globalData.statusBarHeight=
			uni.getSystemInfoSync().statusBarHeight;
			// #ifdef MP-WEIXIN
			// 获取微信胶囊的位置信息 width,height,top,right,left,bottom
			const custom = wx.getMenuButtonBoundingClientRect();
			// 导航栏高度(标题栏高度) = 胶囊高度 + (顶部距离 - 状态栏高度) * 2
			this.globalData.navigationBarHeight = custom.height + (custom.top - this.globalData.statusBarHeight) * 2;
			// console.log("导航栏高			度："+this.globalData.navigationBarHeight)
			// 总体高度 = 状态栏高度 + 导航栏高度
			this.globalData.navHeight = this.globalData.navigationBarHeight + this.globalData.statusBarHeight;
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	};
};
</script>
````

### 绘制方法获取高度方法
````js
//mixins 方法utils/systemInfo.js 绘制方法获取高度
export const systemInfo = {
  data: () => ({
    statusBarHeight: 0,
    navigationBarHeight: 0,
    navHeight: 0,
    windowHeight: 0, // 可使用窗口高度
  }),
  methods: {
    // 获取设备信息
    getSystemInfo() {
      this.statusBarHeight = getApp().globalData.statusBarHeight
      this.navigationBarHeight = getApp().globalData.navigationBarHeight
      this.windowHeight = uni.getSystemInfoSync().windowHeight
      this.navHeight = getApp().globalData.navHeight
    },
  },
}
````

### xxx.vue页面
````html
// 页面使用、高度赋值
1、<view class="status_bar" :style="{height:statusBarHeight +'px'}"></view>
<script>
	// 方法引用
    2、import { systemInfo } from '@/nxTemp/utils/systemInfo.js';
    // mixins
    3、mixins:[systemInfo],
    // 页面调用
    4、onLoad(options) {
        this.getSystemInfo();
      }
</script>
````