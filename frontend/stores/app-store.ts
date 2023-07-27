import { CrmStore } from './crm-store';

export class AppStore {
  crmStroe = new CrmStore();
}

export const appStore = new AppStore();
export const crmStore = appStore.crmStroe;
