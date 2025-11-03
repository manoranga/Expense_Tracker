import React, { useMemo } from 'react';
import { Transaction, TransactionType } from '../../types';

interface CategoryDetailModalProps {
    categoryName: string;
    transactions: Transaction[];
    onClose: () => void;
    type: TransactionType;
}

const CategoryDetailModal: React.FC<CategoryDetailModalProps> = ({ categoryName, transactions, onClose, type }) => {
    
    const totalAmount = useMemo(() => {
        return transactions.reduce((sum, t) => sum + t.amount, 0);
    }, [transactions]);
    
    const colorClass = type === TransactionType.INCOME ? 'text-green-400' : 'text-red-400';
    const borderClass = type === TransactionType.INCOME ? 'border-green-500' : 'border-red-500';

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className={`bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-lg border-t-4 ${borderClass} animate-fade-in`}
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl font-bold text-white">{categoryName} Details</h3>
                    <button 
                        onClick={onClose} 
                        className="text-slate-400 hover:text-white transition-colors"
                        aria-label="Close modal"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>
                
                <div className="max-h-[60vh] overflow-y-auto pr-2 custom-scrollbar">
                    <ul className="space-y-3">
                        {transactions.length > 0 ? transactions.map(t => (
                            <li key={t.id} className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg">
                                <div>
                                    <p className="font-semibold text-slate-200">{t.description || 'No description'}</p>
                                    <p className="text-sm text-slate-400">{new Date(t.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}</p>
                                </div>
                                <span className={`font-bold text-lg ${colorClass}`}>
                                    ${t.amount.toFixed(2)}
                                </span>
                            </li>
                        )) : (
                            <p className="text-slate-500 text-center py-4">No transactions found for this category.</p>
                        )}
                    </ul>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
                    <p className="text-lg font-semibold text-slate-300">Total:</p>
                    <p className={`text-2xl font-bold ${colorClass}`}>
                        ${totalAmount.toFixed(2)}
                    </p>
                </div>
            </div>
             <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
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

export default CategoryDetailModal;