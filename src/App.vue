<template>
<n-config-provider :theme="theme" style="height: 100%;">
  <n-notification-provider>
    <n-layout style="height: 100%;">
      <Search/>
    </n-layout>
  </n-notification-provider>
</n-config-provider>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component';
import { darkTheme } from 'naive-ui';
import axios from 'axios';
import Search from '@/views/Search.vue';
// import { invoke } from '@tauri-apps/api/tauri';

@Options({
  components: {
    Search,
  },
})
export default class App extends Vue {
  // public message = '';

  // created():void {
  //   invoke<string>('current_path')
  //     .then(value => {
  //       this.message = value;
  //     });
  // }
  public theme = darkTheme;

  created(): void {
    const isPro = Object.is(process.env.NODE_ENV, 'development');
    const baseUrl = isPro ? '/test' : '/';
    axios.defaults.baseURL = baseUrl;
  }
}
</script>
<style lang="scss">
html, body , #app {
  // background: inherit;
  // margin: 0px;
  // overflow: hidden;
  width: 100%;
  height: 100%;
  top: 0px;
  left: 0px;
  right: 0px;
  bottom: 0px;
  position: page;
  // display: flex;
  // flex-direction: column;
}
// .n-config-provider{
//   height: 100%;
// }
// .title {
//   height: 30px;
// }
// .app_contents {
//   flex: 1;
//   box-shadow: 0 0 1rem 0 rgba(0, 0, 0, .2);
//   background-color: rgba(255, 255, 255, .15);
//   backdrop-filter: blur(5px);
// }
/*控制整个滚动条*/
::-webkit-scrollbar {
    background-color: rgba(255, 255, 255, 0.2);
    width: 6px;
    height: 6px;
    background-clip: padding-box;
}
::-webkit-scrollbar:hover {
    width: 20px;
    height: 20px;
}
/*滚动条两端方向按钮*/
// ::-webkit-scrollbar-button {
//   background-color: pink;
// }
/*滚动条中间滑动部分*/
::-webkit-scrollbar-thumb {
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 3px;
}
/*滚动条右下角区域*/
// ::-webkit-scrollbar-corner {
//   background-color: red;
// }
</style>
