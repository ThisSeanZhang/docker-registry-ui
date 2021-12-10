<template>
  <div class="welcome-card">
    <n-card title="Welcome" hoverable>
      <n-form :model="auth" ref="formRef">
        <n-form-item path="name">
          <n-input placeholder="Username" v-model:value="auth.name" @keydown.enter.prevent />
        </n-form-item>
        <n-form-item path="passwd" >
          <n-input
            placeholder="Password"
            v-model:value="auth.passwd"
            type="password"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-row :gutter="[0, 24]">
          <n-col :span="24">
            <n-space justify="space-between">
              <n-checkbox
                checked-value=true
                unchecked-value=false
                @update:checked="value => this.keep = value" label="Keep Me" />
              <n-button
                @click="handleValidateButtonClick"
                :disabled="notDone"
                round
                type="primary"
              >Check</n-button>
            </n-space>
          </n-col>
        </n-row>
      </n-form>
    </n-card>
  </div>
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import BaseAuth from '@/lib/BaseAuth';

@Options({
  components: {
  },
})
export default class Home extends Vue {
  public auth: BaseAuth = new BaseAuth();
  public keep = false;
  handleValidateButtonClick() {
    console.log(this.keep);
    if (this.keep) {
      localStorage.setItem('auth', JSON.stringify(this.auth));
    }
    console.log('aaa');
  }

  get notDone() {
    return this.auth.name === '' || this.auth.passwd === '';
  }
}
</script>
<style scoped lang="scss">
.welcome-card {
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  display: flex;
}
.n-card {
  max-width: 300px;
}
</style>
