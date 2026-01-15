import { savedAccounts as initialSaved, transactions as initialTx, dashboardStats as initialStats, transferTemplates } from "../dummyData.js";

let savedAccountsStore = [...initialSaved];
let transactionsStore = [...initialTx];

export const api = {
  getSavedAccounts: async () => {
    await new Promise(r => setTimeout(r, 600));
    return savedAccountsStore;
  },
  getDashboardStats: async () => {
    await new Promise(r => setTimeout(r, 600));
    return initialStats;
  },
  getTransactions: async (filters = {}) => {
    await new Promise(r => setTimeout(r, 700));
    let data = [...transactionsStore];
    if (filters.dateStart || filters.dateEnd) {
      const s = filters.dateStart || "0000-01-01";
      const e = filters.dateEnd || "9999-12-31";
      data = data.filter(t => t.tanggal >= s && t.tanggal <= e);
    }
    if (filters.min || filters.max) {
      const min = filters.min ?? 0;
      const max = filters.max ?? Number.MAX_SAFE_INTEGER;
      data = data.filter(t => t.nominal >= min && t.nominal <= max);
    }
    if (filters.status && filters.status.length) {
      data = data.filter(t => filters.status.includes(t.status));
    }
    if (filters.recipient) {
      data = data.filter(t => t.tujuan.toLowerCase().includes(filters.recipient.toLowerCase()));
    }
    return data;
  },
  getTransferTemplates: async () => {
    await new Promise(r => setTimeout(r, 400));
    return transferTemplates;
  },
  createSavedAccount: async (payload) => {
    await new Promise(r => setTimeout(r, 500));
    const id = `ACC${String(savedAccountsStore.length + 1)}`;
    const item = { id, addedAt: new Date().toISOString(), ...payload };
    savedAccountsStore = [item, ...savedAccountsStore];
    return item;
  },
  updateSavedAccount: async (id, payload) => {
    await new Promise(r => setTimeout(r, 500));
    savedAccountsStore = savedAccountsStore.map(a => a.id === id ? { ...a, ...payload } : a);
    return savedAccountsStore.find(a => a.id === id);
  },
  deleteSavedAccounts: async (ids) => {
    await new Promise(r => setTimeout(r, 500));
    savedAccountsStore = savedAccountsStore.filter(a => !ids.includes(a.id));
    return { deleted: ids };
  },
};

