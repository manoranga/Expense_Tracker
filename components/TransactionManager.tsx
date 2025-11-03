
import React, { useState, useMemo } from 'react';
import { Transaction, Category, TransactionType } from '../types';
import ConfirmationModal from './modals/ConfirmationModal';

interface TransactionManagerProps {
    categories: Category[];
    transactions: Transaction[];
    onAddCategory: (category: Omit<Category, 'id'>) => boolean;
    onDeleteTransaction: (id: number) => void;
    onEditTransaction: (transaction: Transaction) => void;
}

const TransactionManager: React.FC<TransactionManagerProps> = ({
    categories,
    transactions,
    onAddCategory,
    onDeleteTransaction,
    onEditTransaction,
}) => {
    // State for the category form
    const [newCategoryName, setNewCategoryName] = useState('');
    const [newCategoryType, setNewCategoryType] = useState<TransactionType>(TransactionType.EXPENSE);
    const [categoryError, setCategoryError] = useState('');
    const [confirmDeleteId, setConfirmDeleteId] = useState<number | null>(null);

    const recentTransactions = useMemo(() => {
        return transactions
            .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
            .slice(0, 10); // Show more recent transactions
    }, [transactions]);
    
    const handleAddCategorySubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newCategoryName.trim()) {
            setCategoryError("Category name cannot be empty.");
            return;
        }
        const success = onAddCategory({
            name: newCategoryName.trim(),
            type: newCategoryType,
        });
        if (success) {
            setNewCategoryName('');
            setCategoryError('');
        } else {
            setCategoryError(`Category "${newCategoryName.trim()}" already exists for this type.`);
        }
    };
    
    const handleConfirmDelete = () => {
        if (confirmDeleteId !== null) {
            onDeleteTransaction(confirmDeleteId);
            setConfirmDeleteId(null);
        }
    };

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg space-y-6">
            {/* Recent Transactions List */}
            <div className="space-y-4">
                <h3 className="text-xl font-semibold text-white">Recent Transactions</h3>
                <ul className="space-y-3 max-h-96 overflow-y-auto pr-2 custom-scrollbar">
                    {recentTransactions.length > 0 ? recentTransactions.map(t => (
                        <li key={t.id} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                            <div>
                                <p className="font-semibold text-slate-200">{t.category}</p>
                                <p className="text-sm text-slate-400">{new Date(t.date).toLocaleDateString(undefined, { timeZone: 'UTC' })}</p>
                            </div>
                            <div className="flex items-center gap-2">
                                <span className={`font-bold ${t.type === TransactionType.INCOME ? 'text-green-400' : 'text-red-400'}`}>
                                    {t.type === TransactionType.INCOME ? '+' : '-'}${t.amount.toFixed(2)}
                                </span>
                                <button onClick={() => onEditTransaction(t)} className="text-slate-500 hover:text-cyan-400 p-1" aria-label="Edit transaction">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                        <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                        <path fillRule="evenodd" d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" clipRule="evenodd" />
                                    </svg>
                                </button>
                                <button onClick={() => setConfirmDeleteId(t.id)} className="text-slate-500 hover:text-red-500 p-1" aria-label="Delete transaction">
                                     <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" /></svg>
                                </button>
                            </div>
                        </li>
                    )) : (
                         <p className="text-slate-500 text-center py-4">No transactions yet.</p>
                    )}
                </ul>
            </div>
            
            {/* Add Category Form */}
            <div className="space-y-4 pt-4 border-t border-slate-700">
                <h3 className="text-xl font-semibold text-white">Add New Category</h3>
                <form onSubmit={handleAddCategorySubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 bg-slate-700 p-1 rounded-lg">
                        <button type="button" onClick={() => setNewCategoryType(TransactionType.EXPENSE)} className={`p-2 rounded-md transition ${newCategoryType === TransactionType.EXPENSE ? 'bg-red-500 text-white' : 'hover:bg-slate-600'}`}>Expense</button>
                        <button type="button" onClick={() => setNewCategoryType(TransactionType.INCOME)} className={`p-2 rounded-md transition ${newCategoryType === TransactionType.INCOME ? 'bg-green-500 text-white' : 'hover:bg-slate-600'}`}>Income</button>
                    </div>
                     <div>
                        <label htmlFor="new-category-name" className="block text-sm font-medium text-slate-400 mb-1">Category Name</label>
                        <input type="text" id="new-category-name" value={newCategoryName} onChange={e => setNewCategoryName(e.target.value)} placeholder="e.g., Freelance" required className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                        {categoryError && <p className="text-red-500 text-sm mt-1">{categoryError}</p>}
                    </div>
                    <button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300">Add Category</button>
                </form>
            </div>
            
            <ConfirmationModal 
                isOpen={confirmDeleteId !== null}
                onClose={() => setConfirmDeleteId(null)}
                onConfirm={handleConfirmDelete}
                title="Confirm Deletion"
                message="Are you sure you want to delete this transaction? This action cannot be undone."
            />

            <style>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 8px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: #1e293b; /* slate-800 */
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #475569; /* slate-600 */
                    border-radius: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #64748b; /* slate-500 */
                }
            `}</style>
        </div>
    );
};

export default TransactionManager;
