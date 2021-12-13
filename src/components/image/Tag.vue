<template>
<div class="board">
<n-spin :show="spin">
<n-empty v-if="items.length === 0" description="Empty">
  <!-- <template #extra>
    <n-button size="small">看看别的</n-button>
  </template> -->
</n-empty>
<n-collapse display-directive="if" v-else>
  <n-collapse-item v-for="label in items" :key="label"
    :title="`${imageName}:${label}`" :name="label"
  >
    <template #header-extra>本周工作日工作时长：58 小时</template>
    <Manifest :imageName="imageName" :reference="label" />
  </n-collapse-item>
</n-collapse>
</n-spin>
</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStore } from '@/store/image';
import Manifest from '@/components/image/Manifest.vue';

@Options({
  components: {
    Manifest,
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
      this.spin = false;
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
