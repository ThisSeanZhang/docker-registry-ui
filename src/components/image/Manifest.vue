<template>
<div >
<n-spin :show="spin">
<n-card v-if="spin" style="height: 500px;"></n-card>
<n-card v-else>
  <n-empty v-if="manifest === null" description="Empty">
    <!-- <template #extra>
      <n-button size="small">看看别的</n-button>
    </template> -->
  </n-empty>
  <ManifestV1 :mf="manifest" v-else-if="manifest.schemaVersion === 1" />
  <ManifestV2 :mf="manifest" v-else />
</n-card>
</n-spin>
</div>
</template>
<script lang="ts">
import { ref } from 'vue';
import { useStore } from '@/store/image';
import ManifestV1 from '@/components/image/ManifestV1.vue';
import ManifestV2 from '@/components/image/ManifestV2.vue';
import { Manifest } from '@/@types';

export default {
  name: 'Manifest',
  components: {
    ManifestV1,
    ManifestV2,
  },
  props: {
    imageName: {
      type: String,
      require: true,
      default: '',
    },
    reference: {
      type: String,
      require: true,
      default: '',
    },
  },
  setup(props: any) {
    const spin = ref(true);
    const manifest = ref(null as Manifest|null);
    const store = useStore();

    store.FETCH_MANIFESTS(props.imageName, props.reference).then(mf => {
      manifest.value = mf;
      spin.value = false;
    });

    return {
      spin,
      manifest,
    };
  },
};
</script>
<style scoped lang="scss">
</style>
