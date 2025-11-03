// FIX: Create content for constants.ts to resolve module not found errors.
import { Category, TransactionType } from './types';

export const DEFAULT_CATEGORIES: Category[] = [
    // Expenses
    { id: 1, name: 'Food', type: TransactionType.EXPENSE },
    { id: 2, name: 'Housing', type: TransactionType.EXPENSE },
    { id: 3, name: 'Transport', type: TransactionType.EXPENSE },
    { id: 4, name: 'Utilities', type: TransactionType.EXPENSE },
    { id: 5, name: 'Entertainment', type: TransactionType.EXPENSE },
    { id: 6, name: 'Health', type: TransactionType.EXPENSE },
    { id: 7, name: 'Shopping', type: TransactionType.EXPENSE },
    { id: 8, name: 'Other', type: TransactionType.EXPENSE },
    // Incomes
    { id: 9, name: 'Salary', type: TransactionType.INCOME },
    { id: 10, name: 'Freelance', type: TransactionType.INCOME },
    { id: 11, name: 'Investment', type: TransactionType.INCOME },
    { id: 12, name: 'Other', type: TransactionType.INCOME },
];
