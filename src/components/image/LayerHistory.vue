<template>
<n-drawer
  to="#show-tags-content"
  :show="active"
  @update:show="emitShow"
  width="50%"
  placement="left"
>
  <n-drawer-content title="Layer Info" :native-scrollbar="false">
    <pre>
    {{JSON.stringify(history, null, " ")}}
    </pre>
    <!-- <n-descriptions label-placement="top" title="描述">
      <n-descriptions-item>
        <template #label>早餐</template>
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="早午餐">苹果</n-descriptions-item>
      <n-descriptions-item label="午餐">苹果</n-descriptions-item>
      <n-descriptions-item label="晚餐" :span="2">
        两个<br />
        苹果
      </n-descriptions-item>
      <n-descriptions-item label="夜宵">苹果</n-descriptions-item>
    </n-descriptions> -->
  </n-drawer-content>
</n-drawer>
</template>
<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
} from 'vue';

export default defineComponent({
  name: 'LayerHistory',
  emits: ['update:show'],
  props: {
    info: {
      type: String,
      require: true,
    },
    show: {
      type: Boolean,
      require: true,
    },
  },
  setup(props: any, context) {
    const history = computed(() => {
      try {
        return JSON.parse(props.info);
      } catch (_) {
        return '';
      }
    });
    const active = computed(() => props.show);
    function emitShow(s: boolean) {
      context.emit('update:show', s);
    }
    watch(history, (newValue, oldValue) => {
      context.emit('update:show', newValue !== '');
    });
    return {
      active,
      history,
      emitShow,
    };
  },
});
</script>
<style scoped lang="scss">
.n-card {
  width: 114px;
  text-align:center;
}
</style>
