## 视频播放方法兼容(m3u8/flv/mp4)格式

```javascript
// videoPlayer.js
import flvjs from 'flv.js';
import hlsjs from 'hls.js';
// "flv.js": "^1.6.2",
// "hls.js": "^1.2.4",

// 管理播放器实例的数组
const players = [];

// 播放视频的函数
export const playVideo = (url, domId) => {
    // 获取对应的视频 DOM 元素
    const videoElement = document.getElementById(domId);
    if (videoElement) {
        // 检查视频 URL 是否以 .m3u8 结尾
        const isM3u8 = url.includes('.m3u8');
        // 检查视频 URL 是否以 .flv 结尾
        const isFlv = url.includes('.flv');

        // 根据视频格式，调用相应的播放函数
        if (isM3u8) {
            playHls(url, videoElement);
        } else if (isFlv) {
            playFlv(url, videoElement);
        } else {
            playMp4(url, videoElement);
        }
    } else {
        // 如果找不到对应的 DOM 元素，则输出警告
        console.warn(`No video element found with id: ${domId}`);
    }
};

// 播放 MP4 格式的视频
const playMp4 = (url, video) => {
    // 设置视频源并加载元数据
    video.src = url;
    video.addEventListener('loadedmetadata', () => {
        // 元数据加载完成后尝试播放视频
        video.play().catch(error => {
            console.error('Error playing MP4 video:', error);
        });
    });
};

// 播放 M3U8 格式的视频
const playHls = (url, video) => {
    // 创建 HLS 播放器实例
    const hls = new hlsjs();
    // 加载视频源
    hls.loadSource(url);
    // 将播放器绑定到视频 DOM 元素
    hls.attachMedia(video);
    // 监听 HLS 播放器的 MANIFEST_PARSED 事件，触发视频播放
    hls.on(hlsjs.Events.MANIFEST_PARSED, () => video.play());
    // 监听 HLS 播放器的错误事件
    hls.on(hlsjs.Events.ERROR, (event, data) => {
        if (data.fatal) {
            // 输出错误信息并销毁播放器实例
            console.error(`HLS error occurred: ${data.type}`);
            hls.destroy();
        }
    });
    // 将播放器实例保存到数组中
    players.push(hls);
};

// 播放 FLV 格式的视频
const playFlv = (url, video) => {
    // 创建 FLV 播放器实例
    const flvPlayer = flvjs.createPlayer({
        type: 'flv',
        url: url
    });
    // 将播放器绑定到视频 DOM 元素
    flvPlayer.attachMediaElement(video);
    // 加载视频
    flvPlayer.load();
    // 尝试播放视频
    flvPlayer.play();
    // 监听 FLV 播放器的错误事件
    flvPlayer.on(flvjs.Events.ERROR, error => {
        console.error('FLV error occurred:', error);
    });
    // 将播放器实例保存到数组中
    players.push(flvPlayer);
};

// 清除所有播放器实例
export const clearPlayers = () => {
    // 遍历播放器实例数组，销毁每个播放器实例
    players.forEach(player => {
        if (player instanceof hlsjs.Hls) {
            player.destroy();
        } else if (player instanceof flvjs.Player) {
            player.unload();
            player.detachMediaElement();
            player.destroy();
        }
    });
    // 清空数组，释放播放器实例
    players = [];
};
```

在这个代码中，我们添加了注释来解释每个函数的作用，以及它们是如何工作的。我们还添加了注释来解释播放器实例是如何被管理的，以及如何在不需要时清理它们以避免内存泄漏。