<template>
  <div class="welcome-card">
    <n-card title="Welcome" hoverable>
      <n-form :model="info.auth" ref="formRef">
        <n-form-item path="name">
          <n-input placeholder="Username"
            v-model:value="info.auth.username"
            @keydown.enter.prevent
          />
        </n-form-item>
        <n-form-item path="passwd" >
          <n-input
            placeholder="Password"
            show-password-on="mousedown"
            v-model:value="info.auth.password"
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
                @update:checked="value => info.keep = value" label="Keep Me" />
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
import { useNotification } from 'naive-ui';
import { useStore } from '@/store/auth';
import { UserAuth } from '@/@types';

@Options({
  components: {
  },
})
export default class Home extends Vue {
  public store = useStore();
  public notification = useNotification()
  public info: UserAuth = {
    auth: {
      username: '',
      password: '',
    },
    keep: false,
  };
  created() {
    const {
      auth: {
        username,
        password,
      },
      keep,
    } = this.store.loadAuth;
    this.info = {
      auth: {
        username,
        password,
      },
      keep,
    };
  }

  handleValidateButtonClick() {
    this.store.AUTH_PASS(this.info).then(result => {
      this.notification[result ? 'success' : 'error']({
        content: result ? 'Auth Success' : 'Auth Error',
        meta: result ? 'Enjoy' : 'Please Try Again',
        duration: 5000,
      });
    });
  }

  get notDone() {
    // return this.auth.name === '' || this.auth.passwd === '';
    return false;
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
