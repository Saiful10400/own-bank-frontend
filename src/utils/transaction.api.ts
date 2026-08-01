import axios from "axios";
import type { TTransaction } from "../types/transaction.types";
import type { TInvestmentForm } from "../page/AddInvestment";

const API = axios.create({
  // baseURL: "https://mybank-pi.vercel.app/api", 
  baseURL: "http://localhost:5000/api", 
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


// investment api.
export const createInvestment = (data: TInvestmentForm) =>
  API.post("/investments", data);
