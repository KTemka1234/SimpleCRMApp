import { CrmStore } from './crm-store';
import { UiStore } from './ui-store';

export class AppStore {
  crmStroe = new CrmStore();
  uiStore = new UiStore();
}

export const appStore = new AppStore();
export const crmStore = appStore.crmStroe;
export const uiStore = appStore.uiStore;
