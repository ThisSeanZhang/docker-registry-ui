<template>
<div>
<n-descriptions  label-placement="left" :column="2">
  <n-descriptions-item label="schemaVersion">{{manifest.schemaVersion}}</n-descriptions-item>
  <n-descriptions-item label="architecture">{{manifest.architecture}}</n-descriptions-item>
</n-descriptions>
<n-list>
  <n-list-item>
    <template #prefix>
      <n-card>fsLayers</n-card>
    </template>
    <template #suffix>
      <n-button>Suffix</n-button>
    </template>
    <n-thing title="Thing" title-extra="extra" description="description">
      Biu<br />
      Biu<br />
      Biu<br />
    </n-thing>
  </n-list-item>
  <n-list-item>
    <template #prefix>
      <n-card>history</n-card>
    </template>
    <n-thing title="Thing" title-extra="extra" description="description">
      Biu<br />
      Biu<br />
      Biu<br />
    </n-thing>
    <template #suffix>
      <n-button>Suffix</n-button>
    </template>
  </n-list-item>
  <n-list-item>
    <template #prefix>
      <n-card>signatures</n-card>
    </template>
    <n-thing title="Thing" title-extra="extra" description="description">
      Biu<br />
      Biu<br />
      Biu<br />
    </n-thing>
    <template #suffix>
      <n-button>Suffix</n-button>
    </template>
  </n-list-item>
</n-list>
</div>
</template>
<script lang="ts">
import { ref, PropType } from 'vue';
import { useStore } from '@/store/image';
import { Manifest } from '@/@types';

export default {
  name: 'ManifestV1',
  props: {
    mf: {
      type: Object as PropType<Manifest>,
      require: true,
      default: undefined,
    },
  },
  setup(props: any) {
    const manifest = ref(props.mf);
    console.log(manifest.value);
    return {
      manifest,
    };
  },
};
</script>
<style scoped lang="scss">
.n-card {
  width: 114px;
  text-align:center;
}
</style>
