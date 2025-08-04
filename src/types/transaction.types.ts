export type TTransaction = {
  _id?: string;
  type: "income" | "expense";
  category: string;
  amount: number;
  note?: string;
  date: string; // ISO string
};
