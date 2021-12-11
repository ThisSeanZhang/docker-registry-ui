import { defineStore } from 'pinia';
import query from '@/query';
import { CatLog } from '@/@types';
// export enum ImageActions {
//   FETCH_IMAGES = 'FETCH_IMAGES',
// }
// useStore could be anything like useUser, useCart
// the first argument is a unique id of the store across your application
export const useStore = defineStore('image', {
  state: () => ({
    repositories: [] as string[],
  }),
  getters: {
    queryImages: state => state.repositories,
  },
  actions: {
    FETCH_IMAGES() {
      query.query<CatLog>({
        url: '_catalog',
      }).then(res => {
        this.repositories = res.data.repositories;
      });
    },
  },
});
export default useStore;
