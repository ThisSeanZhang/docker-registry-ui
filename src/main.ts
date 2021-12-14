import { createApp } from 'vue';
import {
  // create naive ui
  create,
  // component
  NButton,
  NConfigProvider,
  NSpace,
  NLayout,
  NLayoutHeader,
  NLayoutContent,
  NLayoutFooter,
  NLayoutSider,
  NIcon,
  NCard,
  NInput,
  NInputNumber,
  NH2,
  NForm,
  NFormItem,
  NFormItemGi,
  NGrid,
  NGi,
  NPopconfirm,
  NCheckbox,
  NCol,
  NRow,
  NNotificationProvider,
  NMenu,
  NInputGroup,
  NCollapse,
  NCollapseItem,
  NText,
  NSpin,
  NEmpty,
  NDescriptions,
  NDescriptionsItem,
  NPopover,
  NList,
  NListItem,
  NThing,
  NDrawer,
  NDrawerContent,
  NDivider,
} from 'naive-ui';
import { VueClipboard } from '@soerenmartius/vue3-clipboard';
import App from './App.vue';
import router from './router';
import store from './store';
// 通用字体
import 'vfonts/Lato.css';
// 等宽字体
import 'vfonts/FiraCode.css';

const naive = create({
  components: [
    NButton,
    NConfigProvider,
    NSpace,
    NLayout,
    NLayoutHeader,
    NLayoutContent,
    NLayoutFooter,
    NLayoutSider,
    NIcon,
    NCard,
    NInput,
    NInputNumber,
    NH2,
    NForm,
    NFormItem,
    NFormItemGi,
    NGrid,
    NGi,
    NPopconfirm,
    NCheckbox,
    NCol,
    NRow,
    NNotificationProvider,
    NMenu,
    NInputGroup,
    NCollapse,
    NCollapseItem,
    NText,
    NSpin,
    NEmpty,
    NDescriptions,
    NDescriptionsItem,
    NPopover,
    NList,
    NListItem,
    NThing,
    NDrawer,
    NDrawerContent,
    NDivider,
  ],
});

createApp(App)
  .use(naive)
  .use(store)
  .use(VueClipboard)
  .use(router)
  .mount('#app');
