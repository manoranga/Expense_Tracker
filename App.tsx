
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Transaction, Category, TransactionType } from './types';
import { getTransactions, saveTransactions, getCategories, saveCategories } from './services/storageService';
import { exportToExcel } from './services/exportService';
import { DEFAULT_CATEGORIES } from './constants';
import Header from './components/Header';
import Summary from './components/Summary';
import ExpenseChart from './components/charts/ExpenseChart';
import TransactionManager from './components/TransactionManager';
import MonthNavigator from './components/MonthNavigator';
import TransactionModal from './components/modals/TransactionModal';

const App: React.FC = () => {
    const [transactions, setTransactions] = useState<Transaction[]>(getTransactions());
    const [categories, setCategories] = useState<Category[]>(getCategories(DEFAULT_CATEGORIES));
    const [selectedMonth, setSelectedMonth] = useState(new Date());
    const [isTransactionModalOpen, setTransactionModalOpen] = useState(false);
    const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
    const [chartDisplayType, setChartDisplayType] = useState<TransactionType>(TransactionType.EXPENSE);


    useEffect(() => {
        saveTransactions(transactions);
    }, [transactions]);

    useEffect(() => {
        saveCategories(categories);
    }, [categories]);

    const handlePreviousMonth = useCallback(() => {
        setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    }, []);
    
    const handleNextMonth = useCallback(() => {
        setSelectedMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
    }, []);

    const filteredTransactions = useMemo(() => {
        return transactions.filter(t => {
            const transactionDate = new Date(t.date);
            // Adjust for timezone differences to prevent day-off errors
            const adjustedTransactionDate = new Date(transactionDate.valueOf() + transactionDate.getTimezoneOffset() * 60 * 1000);
            return adjustedTransactionDate.getFullYear() === selectedMonth.getFullYear() &&
                   adjustedTransactionDate.getMonth() === selectedMonth.getMonth();
        });
    }, [transactions, selectedMonth]);

    const handleAddTransaction = useCallback((transaction: Omit<Transaction, 'id'>) => {
        setTransactions(prev => [...prev, { ...transaction, id: Date.now() }]);
        setTransactionModalOpen(false); // Close modal on success
    }, []);

    const handleUpdateTransaction = useCallback((updatedTransaction: Transaction) => {
        setTransactions(prev => prev.map(t => t.id === updatedTransaction.id ? updatedTransaction : t));
        setTransactionModalOpen(false);
        setEditingTransaction(null);
    }, []);

    const handleAddCategory = useCallback((category: Omit<Category, 'id'>) => {
        if (!categories.find(c => c.name.toLowerCase() === category.name.toLowerCase() && c.type === category.type)) {
            setCategories(prev => [...prev, { ...category, id: Date.now() }]);
            return true;
        }
        return false;
    }, [categories]);

    const handleDeleteTransaction = useCallback((id: number) => {
        setTransactions(prev => prev.filter(t => t.id !== id));
    }, []);

    const handleExport = useCallback(() => {
        exportToExcel(transactions, 'Expense-Tracker-Data');
    }, [transactions]);

    const handleOpenAddModal = () => {
        setEditingTransaction(null);
        setTransactionModalOpen(true);
    };

    const handleOpenEditModal = (transaction: Transaction) => {
        setEditingTransaction(transaction);
        setTransactionModalOpen(true);
    };

    const handleCloseModal = () => {
        setTransactionModalOpen(false);
        setEditingTransaction(null);
    };

    const { totalIncome, totalExpense, balance } = useMemo(() => {
        const income = filteredTransactions
            .filter(t => t.type === TransactionType.INCOME)
            .reduce((sum, t) => sum + t.amount, 0);
        const expense = filteredTransactions
            .filter(t => t.type === TransactionType.EXPENSE)
            .reduce((sum, t) => sum + t.amount, 0);
        return { totalIncome: income, totalExpense: expense, balance: income - expense };
    }, [filteredTransactions]);

    return (
        <div className="min-h-screen bg-slate-900 font-sans text-slate-300">
            <Header onExport={handleExport} onAddTransactionClick={handleOpenAddModal} />
            <main className="container mx-auto p-4 md:p-6">
                <MonthNavigator
                    selectedMonth={selectedMonth}
                    onPreviousMonth={handlePreviousMonth}
                    onNextMonth={handleNextMonth}
                />
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                         <Summary totalIncome={totalIncome} totalExpense={totalExpense} balance={balance} />
                         <div>
                            <div className="flex items-center gap-2 mb-4 p-1 rounded-lg justify-center bg-slate-800 w-fit mx-auto md:ml-0">
                                <button
                                    onClick={() => setChartDisplayType(TransactionType.EXPENSE)}
                                    className={`px-4 py-1 text-sm rounded-md transition ${chartDisplayType === TransactionType.EXPENSE ? 'bg-red-500 text-white' : 'hover:bg-slate-600/50'}`}
                                >
                                    Expenses
                                </button>
                                <button
                                    onClick={() => setChartDisplayType(TransactionType.INCOME)}
                                    className={`px-4 py-1 text-sm rounded-md transition ${chartDisplayType === TransactionType.INCOME ? 'bg-green-500 text-white' : 'hover:bg-slate-600/50'}`}
                                >
                                    Income
                                </button>
                            </div>
                            <ExpenseChart transactions={filteredTransactions} type={chartDisplayType} />
                         </div>
                    </div>
                    <div className="lg:col-span-1 space-y-6">
                        <TransactionManager 
                            categories={categories}
                            transactions={transactions}
                            onAddCategory={handleAddCategory}
                            onDeleteTransaction={handleDeleteTransaction}
                            onEditTransaction={handleOpenEditModal}
                        />
                    </div>
                </div>
            </main>
            <TransactionModal 
                isOpen={isTransactionModalOpen}
                onClose={handleCloseModal}
                categories={categories}
                onAddTransaction={handleAddTransaction}
                onUpdateTransaction={handleUpdateTransaction}
                transactionToEdit={editingTransaction}
            />
        </div>
    );
};

export default App;
