<template>
<div >
<n-spin :show="spin">
<n-empty v-if="items.length === 0" description="Empty">
  <!-- <template #extra>
    <n-button size="small">看看别的</n-button>
  </template> -->
</n-empty>
<n-card v-else>
</n-card>
</n-spin>
</div>
</template>
<script lang="ts">
import { ref, PropType } from 'vue';
import { useStore } from '@/store/image';
import { Manifest } from '@/@types';

export default {
  name: 'ManifestV2',
  props: {
    manifest: {
      type: Object as PropType<Manifest>,
      require: true,
      default: null,
    },
  },
  setup(props: any) {
    const spin = ref(true);
    const items = ref([]);
    const store = useStore();

    store.FETCH_MANIFESTS(props.imageName, props.reference).then(() => {
      spin.value = false;
    });

    console.log(props);
    return {
      spin,
      items,
    };
  },
};
</script>
<style scoped lang="scss">
</style>
