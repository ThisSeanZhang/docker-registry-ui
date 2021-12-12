<template>
<div>
  tag
  {{name}}
</div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class Tag extends Vue {
  get name():string {
    return this.$route.name ? this.$route.params.name.toString() : 'none';
  }
}
</script>
<style scoped lang="scss">
</style>
