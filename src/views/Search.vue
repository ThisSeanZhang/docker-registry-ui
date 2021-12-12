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
      <!-- {{this.store.queryImages}} -->
      <!-- {{menuOptions}} -->
      <n-input-group>
        <n-input type="text"
          @update:value="updateQuery" v-bind:value="query"
          placeholder="filter"
        />
        <n-button type="primary" tertiary @click="fetchAndFlash" >
          <n-icon>
            <Retweet />
          </n-icon>
        </n-button>
      </n-input-group>
      <n-menu
        :options="menuOptions"
        @update:value="menuUpdate"
        accordion
      />
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
import {
  Retweet,
} from '@vicons/fa';
import { useStore } from '@/store/image';
import { groupBy } from '@/lib/ArrayUtil';
import { MenuItem } from '@/@types';
// import { key } from './store';

@Options({
  components: {
    Retweet,
  },
})
export default class Search extends Vue {
  public store = useStore();
  public query = '';
  public menuOptions = new Array<MenuItem>();

  updateQuery(key: string) {
    this.query = key;
    this.flashMenu();
  }

  fetchAndFlash() {
    this.store.FETCH_CATALOG().then(() => this.flashMenu());
  }

  flashMenu() {
    this.menuOptions.length = 0;
    groupBy(
      this.store.queryImages.filter(key => (this.query === '' ? true : key.includes(this.query))),
      imageName => (imageName.split('/', 1)[0]),
    )
      .forEach((child, key) => {
        this.menuOptions.push(this.buidlMenuItem(key, child));
      });
  }

  menuUpdate(key: string) {
    this.$router.push(`/images/${key}/tags`);
  }

  private buidlMenuItem(key: string, list: Array<string>): MenuItem {
    const base = { label: key, key } as MenuItem;
    if (list.length >= 1 && list[0] !== key) {
      base.children = list.map(str => this.buidlMenuItem(str, []));
    }
    return base;
  }

  created() {
    this.fetchAndFlash();
  }
}
</script>
