<template>
<div>
<n-descriptions  label-placement="left" :column="2">
  <n-descriptions-item label="schemaVersion">{{manifest.schemaVersion}}</n-descriptions-item>
  <n-descriptions-item label="architecture">{{manifest.architecture}}</n-descriptions-item>
</n-descriptions>
<n-divider />
<n-list>
  <n-list-item>
    <template #prefix>
      <n-card :bordered="false">signatures</n-card>
    </template>
    <n-thing >
      <n-list>
        <n-descriptions v-for="item in manifest.signatures"
        :key="item"  label-placement="left" :column="3">
          <n-descriptions-item label="header.jwk.crv">
            {{item.header.jwk.crv}}
          </n-descriptions-item>
          <n-descriptions-item label="header.jwk.kty">{{item.header.jwk.kty}}
          </n-descriptions-item>
          <n-descriptions-item label="header.alg">{{item.header.alg}}
          </n-descriptions-item>
          <n-descriptions-item label="header.jwk.kid" :span="3">{{item.header.jwk.kid}}
          </n-descriptions-item>
          <n-descriptions-item label="header.jwk.x" :span="3">{{item.header.jwk.x}}
          </n-descriptions-item>
          <n-descriptions-item label="header.jwk.y" :span="3">{{item.header.jwk.y}}
          </n-descriptions-item>
          <n-descriptions-item label="signature" :span="3">{{item.signature}}
          </n-descriptions-item>
          <n-descriptions-item label="protected" :span="3">{{item.protected}}
          </n-descriptions-item>
        </n-descriptions>
      </n-list>
    </n-thing>
  </n-list-item>
  <n-list-item>
    <template #prefix>
      <n-card :bordered="false">fsLayers</n-card>
    </template>
    <n-thing >
      <n-list>
        <n-list-item v-for="(item, index) in manifest.fsLayers" :key="index">
          {{item.blobSum}}
          <template #suffix>
            <n-button @click="openHistory(index)" quaternary type="info">Info</n-button>
          </template>
        </n-list-item>
      </n-list>
    </n-thing>
  </n-list-item>
  <!-- <n-list-item>
    <template #prefix>
      <n-card :bordered="false">history</n-card>
    </template>
    <n-thing >
      <n-list>
        <n-list-item v-for="item in manifest.history" :key="item">{{item}}</n-list-item>
      </n-list>
    </n-thing>
  </n-list-item> -->
</n-list>
<LayerHistory :info="choiceHis" v-model:show="showInfo" />
</div>
</template>
<script lang="ts">
import { ref, PropType } from 'vue';
import { useStore } from '@/store/image';
import { Manifest } from '@/@types';
import LayerHistory from '@/components/image/LayerHistory.vue';

export default {
  name: 'ManifestV1',
  components: {
    LayerHistory,
  },
  props: {
    mf: {
      type: Object as PropType<Manifest>,
      require: true,
      default: undefined,
    },
  },
  setup(props: any) {
    const manifest = ref(props.mf);
    const store = useStore();
    const showInfo = ref(false);
    function fetchBlob(digest: string) {
      store.FETCH_BLOB(manifest.value.name, digest).then(blob => {
        console.log(blob);
      });
    }
    const choiceHis = ref('{}');
    function openHistory(index: number) {
      choiceHis.value = manifest.value.history[index].v1Compatibility;
      showInfo.value = true;
      console.log(showInfo.value);
    }
    return {
      manifest,
      fetchBlob,
      choiceHis,
      openHistory,
      showInfo,
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
