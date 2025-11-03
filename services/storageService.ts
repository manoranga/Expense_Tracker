
import { Transaction, Category } from '../types';

const TRANSACTIONS_KEY = 'expenseTrackerTransactions';
const CATEGORIES_KEY = 'expenseTrackerCategories';

export const getTransactions = (): Transaction[] => {
    try {
        const transactionsJson = localStorage.getItem(TRANSACTIONS_KEY);
        return transactionsJson ? JSON.parse(transactionsJson) : [];
    } catch (error) {
        console.error("Error reading transactions from localStorage", error);
        return [];
    }
};

export const saveTransactions = (transactions: Transaction[]): void => {
    try {
        localStorage.setItem(TRANSACTIONS_KEY, JSON.stringify(transactions));
    } catch (error) {
        console.error("Error saving transactions to localStorage", error);
    }
};

export const getCategories = (defaultCategories: Category[]): Category[] => {
    try {
        const categoriesJson = localStorage.getItem(CATEGORIES_KEY);
        return categoriesJson ? JSON.parse(categoriesJson) : defaultCategories;
    } catch (error) {
        console.error("Error reading categories from localStorage", error);
        return defaultCategories;
    }
};

export const saveCategories = (categories: Category[]): void => {
    try {
        localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    } catch (error) {
        console.error("Error saving categories to localStorage", error);
    }
};
