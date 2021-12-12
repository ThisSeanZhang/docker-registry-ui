import { defineStore } from 'pinia';
import query from '@/query';
import { CataLog } from '@/@types';
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
    async FETCH_CATALOG(): Promise<void> {
      try {
        const catalog = await query.query<CataLog>({
          url: '_catalog',
        });
        this.repositories = catalog.repositories;
      } catch (e) {
        console.log(e);
      }
    },
  },
});
export default useStore;
