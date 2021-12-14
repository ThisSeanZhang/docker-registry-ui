<template>
<div id="show-tags-content" class="board">
<n-spin :show="spin">
<n-empty v-if="items.length === 0" description="Empty">
  <!-- <template #extra>
    <n-button size="small">看看别的</n-button>
  </template> -->
</n-empty>
<n-collapse display-directive="if"
v-else>
  <n-collapse-item v-for="label in items" :key="label"
    :title="`${imageName}:${label}`" :name="label"
  >
    <template #header-extra>
      <n-space>
        <n-button @click.stop="copyText(`${imageName}:${label}`)" secondary  type="info">
          <template #icon>
            <n-icon><Copy /></n-icon>
          </template>
        </n-button>
      </n-space>
    </template>
    <Manifest :imageName="imageName" :reference="label" />
  </n-collapse-item>
</n-collapse>
</n-spin>
</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { Copy } from '@vicons/fa';
import { toClipboard } from '@soerenmartius/vue3-clipboard';
import { useNotification } from 'naive-ui';
import { useStore } from '@/store/image';
import Manifest from '@/components/image/Manifest.vue';

@Options({
  components: {
    Manifest,
    Copy,
  },
  watch: {
    imageName: function watchName() {
      this.refreshTags();
    },
  },
})
export default class Tag extends Vue {
  public store = useStore();
  public spin = false;
  public notification = useNotification();
  // public expandedKey: (string | number)[] = [];
  public items = [
    // 'a',
    // 'b',
    // 'c',
    // 'd',
    // 'e',
    // 'f',
    // 'g',
    // 'h',
    // 'i',
    // 'j',
    // 'k',
    // 'l',
    // 'm',
    // 'n',
    // 'o',
    // 'p',
  ] as string[];

  get imageName():string {
    return this.$route.name ? this.$route.params.name.toString() : 'none';
  }

  refreshTags() {
    this.spin = true;
    this.store.FETCH_TAGS(this.imageName).then(tags => {
      this.items = tags;
      // this.expandedKey = [];
      this.spin = false;
    });
  }

  // changeCollapse(data: { name: string | number, expanded: boolean, event: MouseEvent }) {
  //   this.expandedKey = [data.name];
  // }

  copyText(text: string) {
    toClipboard(`${window.location.host}/${text}`)
      .then(() => {
        this.notification.success({
          content: 'Copy Success',
          meta: 'Enjoy',
          duration: 500,
        });
      }).catch(() => {
        this.notification.error({
          content: 'Copy Error',
          meta: 'Please Try Again',
          duration: 500,
        });
      });
  }

  created() {
    this.refreshTags();
  }
}
</script>
<style scoped lang="scss">
.board{
  padding: 15px;
}
</style>
