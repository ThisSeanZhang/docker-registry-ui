import { defineStore, createPinia } from 'pinia';
import axios, { AxiosBasicCredentials, AxiosError } from 'axios';
import query from '@/query';
import { CatLog, UserAuth } from '@/@types';

const auth = JSON.parse(localStorage.getItem('auth') || sessionStorage.getItem('auth') || '{}');

export const useStore = defineStore('auth', {
  state: () => ({
    auth: {
      username: auth.username,
      password: auth.password,
    } as AxiosBasicCredentials,
    keep: false,
  }),
  getters: {
    loadAuth(state): UserAuth {
      return {
        auth: state.auth,
        keep: state.keep,
      };
    },
  },
  actions: {
    async AUTH_PASS(info: {
      auth: AxiosBasicCredentials,
      keep: boolean,
    }):Promise<boolean> {
      console.log(info);
      this.auth = {
        username: info.auth.username,
        password: info.auth.password,
      };
      this.keep = info.keep;
      if (this.keep) {
        localStorage.setItem('auth', JSON.stringify(this.auth));
      } else {
        localStorage.removeItem('auth');
      }
      sessionStorage.setItem('auth', JSON.stringify(this.auth));
      try {
        const result = await query.query<CatLog>({
          url: '_catalog',
        });
        return true;
      } catch (err) {
        if (axios.isAxiosError(err) && err.response) {
          // Is this the correct way?
          console.log(err.response?.status);
        }
      }
      return false;
    },
  },
});
export default useStore;
