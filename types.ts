// FIX: Create content for types.ts to resolve module not found errors.
export enum TransactionType {
    INCOME = 'income',
    EXPENSE = 'expense',
}

export interface Transaction {
    id: number;
    date: string;
    amount: number;
    category: string;
    type: TransactionType;
    description?: string;
}

export interface Category {
    id: number;
    name: string;
    type: TransactionType;
}
