<template>
  <n-layout style="height: 100%;">
    <n-layout-header style="height: 64px; padding: 24px;" bordered >颐和园路</n-layout-header>
    <n-layout position="absolute" style="top: 64px; bottom: 64px;" has-sider>
      <n-layout-sider
        collapse-mode="transform"
        :collapsed-width="0"
          :show-collapsed-content="false"
          show-trigger="arrow-circle"
        :native-scrollbar="false"
        bordered
      >
      {{this.store.queryImages}}
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
        <n-h2>海淀桥</n-h2>
      </n-layout-sider>
      <n-layout-content>
          <router-view class="contents"/>
        </n-layout-content>
    </n-layout>
    <n-layout-footer
      position="absolute"
      style="height: 64px; padding: 24px;"
      bordered
    >
      城府路
    </n-layout-footer>
  </n-layout>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from '@/store/image';
// import { key } from './store';

@Options({
  components: {
  },
})
export default class Search extends Vue {
  public store = useStore();
  created() {
    this.store.FETCH_CATALOG();
    console.log();
  }
}
</script>
