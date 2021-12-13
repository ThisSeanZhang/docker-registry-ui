import { defineStore } from 'pinia';
import query from '@/query';
import { CataLog, ImageTag, Manifest } from '@/@types';
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
    async FETCH_TAGS(name: string): Promise<string[]> {
      const imageTag = await query.query<ImageTag>({
        url: `${name}/tags/list`,
      });
      return imageTag.tags;
    },
    async FETCH_MANIFESTS(name: string, reference: string): Promise<Manifest> {
      const manifest = await query.query<Manifest>({
        url: `${name}/manifests/${reference}`,
      });
      return manifest;
    },
  },
});
export default useStore;
