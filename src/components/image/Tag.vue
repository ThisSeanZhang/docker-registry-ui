<template>
<div id="show-tags-content" class="board">
<n-spin :show="spin">
<n-empty v-if="items.length === 0" description="Empty">
  <!-- <template #extra>
    <n-button size="small">看看别的</n-button>
  </template> -->
</n-empty>
<n-collapse display-directive="if" @item-header-click="updateName"
  :expanded-names="names"
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
import {
  defineComponent,
  ref,
  computed,
  watch,
} from 'vue';
import { Copy } from '@vicons/fa';
import { toClipboard } from '@soerenmartius/vue3-clipboard';
import { useRoute } from 'vue-router';
import { useNotification } from 'naive-ui';
import { useStore } from '@/store/image';
import Manifest from '@/components/image/Manifest.vue';

export default defineComponent({
  name: 'tag',
  components: {
    Manifest,
    Copy,
  },
  setup() {
    const route = useRoute();
    // const router = useRouter();
    const store = useStore();
    const spin = ref(false);
    const notification = useNotification();
    const items = ref([
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
    ] as string[]);
    const imageName = computed(() => (route.name ? route.params.name.toString() : 'none'));
    const names = ref([] as string[]);

    function refreshTags() {
      spin.value = true;
      store.FETCH_TAGS(imageName.value).then(tags => {
        items.value = tags;
        // this.expandedKey = [];
        spin.value = false;
      });
    }
    refreshTags();
    watch(imageName, () => {
      names.value = [];
      refreshTags();
    });

    function copyText(text: string) {
      toClipboard(`${window.location.host}/${text}`)
        .then(() => {
          notification.success({
            content: 'Copy Success',
            meta: 'Enjoy',
            duration: 500,
          });
        }).catch(() => {
          notification.error({
            content: 'Copy Error',
            meta: 'Please Try Again',
            duration: 500,
          });
        });
    }
    function updateName({ name, expanded }:{name: string, expanded: boolean}) {
      if (expanded) {
        names.value.push(name);
      } else {
        names.value = names.value.filter(n => n !== name);
      }
    }
    return {
      spin,
      names,
      items,
      imageName,
      copyText,
      updateName,
    };
  },
});
</script>
<style scoped lang="scss">
.board{
  padding: 15px;
}
</style>
