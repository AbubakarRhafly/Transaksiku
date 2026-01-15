import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "./dataService.js";

export const useSavedAccountsQuery = () => {
  return useQuery({ queryKey: ["savedAccounts"], queryFn: api.getSavedAccounts });
};

export const useDashboardStatsQuery = () => {
  return useQuery({ queryKey: ["dashboardStats"], queryFn: api.getDashboardStats });
};

export const useTransactionsQuery = (filters) => {
  return useQuery({ queryKey: ["transactions", filters], queryFn: () => api.getTransactions(filters) });
};

export const useTransferTemplatesQuery = () => {
  return useQuery({ queryKey: ["transferTemplates"], queryFn: api.getTransferTemplates });
};

export const useCreateAccountMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: api.createSavedAccount,
    onMutate: async (payload) => {
      await qc.cancelQueries({ queryKey: ["savedAccounts"] });
      const prev = qc.getQueryData(["savedAccounts"]);
      const optimistic = { id: `TEMP_${Date.now()}`, addedAt: new Date().toISOString(), ...payload };
      qc.setQueryData(["savedAccounts"], (old = []) => [optimistic, ...old]);
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["savedAccounts"], ctx.prev);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["savedAccounts"] });
    },
  });
};

export const useUpdateAccountMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }) => api.updateSavedAccount(id, payload),
    onMutate: async ({ id, payload }) => {
      await qc.cancelQueries({ queryKey: ["savedAccounts"] });
      const prev = qc.getQueryData(["savedAccounts"]);
      qc.setQueryData(["savedAccounts"], (old = []) =>
        old.map(a => a.id === id ? { ...a, ...payload } : a)
      );
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["savedAccounts"], ctx.prev);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["savedAccounts"] });
    },
  });
};

export const useDeleteAccountsMutation = () => {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (ids) => api.deleteSavedAccounts(ids),
    onMutate: async (ids) => {
      await qc.cancelQueries({ queryKey: ["savedAccounts"] });
      const prev = qc.getQueryData(["savedAccounts"]);
      qc.setQueryData(["savedAccounts"], (old = []) => old.filter(a => !ids.includes(a.id)));
      return { prev };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.prev) qc.setQueryData(["savedAccounts"], ctx.prev);
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["savedAccounts"] });
    },
  });
};

