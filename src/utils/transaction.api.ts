import axios from "axios";
import type { TTransaction } from "../types/transaction.types";

const API = axios.create({
  baseURL: "http://localhost:8000/api", // change for production
});

export const getTransactions = (params?: {
  type?: string;
  category?: string;
  month?: string;
}) =>
  API.get<{data:TTransaction[]}>("/transactions", {
    params,
  });

export const createTransaction = (data: TTransaction) =>
  API.post("/transactions", data);

export const updateTransaction = (id: string, data: Partial<TTransaction>) =>
  API.put(`/transactions/${id}`, data);

export const deleteTransaction = (id: string) =>
  API.delete(`/transactions/${id}`);
