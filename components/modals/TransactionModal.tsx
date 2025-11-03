
import React, { useState, useMemo, useEffect } from 'react';
import { Category, Transaction, TransactionType } from '../../types';

interface TransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    onAddTransaction: (transaction: Omit<Transaction, 'id'>) => void;
}

const TransactionModal: React.FC<TransactionModalProps> = ({ isOpen, onClose, categories, onAddTransaction }) => {
    const [amount, setAmount] = useState('');
    const [description, setDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);

    const filteredCategories = useMemo(() => {
        return categories.filter(c => c.type === type);
    }, [categories, type]);

    useEffect(() => {
        setCategoryId('');
    }, [type]);

    useEffect(() => {
        if (isOpen) {
            // Reset form when modal opens
            setType(TransactionType.EXPENSE);
            setAmount('');
            setDescription('');
            setCategoryId('');
            setDate(new Date().toISOString().split('T')[0]);
        }
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const numAmount = parseFloat(amount);
        const selectedCategory = categories.find(c => c.id === parseInt(categoryId));

        if (!numAmount || !selectedCategory) return;
        
        onAddTransaction({
            amount: numAmount,
            description,
            category: selectedCategory.name,
            date,
            type,
        });
    };

    return (
        <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={onClose}
        >
            <div 
                className="bg-slate-800 rounded-2xl shadow-xl p-6 w-full max-w-lg border-t-4 border-cyan-500 animate-fade-in"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold text-white">Add Transaction</h3>
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
                
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-2 gap-2 bg-slate-700 p-1 rounded-lg">
                        <button type="button" onClick={() => setType(TransactionType.EXPENSE)} className={`p-2 rounded-md transition ${type === TransactionType.EXPENSE ? 'bg-red-500 text-white' : 'hover:bg-slate-600'}`}>Expense</button>
                        <button type="button" onClick={() => setType(TransactionType.INCOME)} className={`p-2 rounded-md transition ${type === TransactionType.INCOME ? 'bg-green-500 text-white' : 'hover:bg-slate-600'}`}>Income</button>
                    </div>

                    <div>
                        <label htmlFor="modal-amount" className="block text-sm font-medium text-slate-400 mb-1">Amount</label>
                        <input type="number" id="modal-amount" value={amount} onChange={e => setAmount(e.target.value)} placeholder="0.00" required className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                    </div>
                    <div>
                        <label htmlFor="modal-category" className="block text-sm font-medium text-slate-400 mb-1">Category</label>
                        <select id="modal-category" value={categoryId} onChange={e => setCategoryId(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500">
                            <option value="" disabled>Select a category</option>
                            {filteredCategories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                    </div>
                    <div>
                        <label htmlFor="modal-description" className="block text-sm font-medium text-slate-400 mb-1">Description (Optional)</label>
                        <input type="text" id="modal-description" value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g., Groceries" className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                    </div>
                    <div>
                        <label htmlFor="modal-date" className="block text-sm font-medium text-slate-400 mb-1">Date</label>
                        <input type="date" id="modal-date" value={date} onChange={e => setDate(e.target.value)} required className="w-full bg-slate-700 border border-slate-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"/>
                    </div>
                    
                    <button type="submit" className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-300">Add Transaction</button>
                </form>
            </div>
             <style>{`
                .animate-fade-in {
                    animation: fadeIn 0.3s ease-out;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: scale(0.95); }
                    to { opacity: 1; transform: scale(1); }
                }
            `}</style>
        </div>
    );
};

export default TransactionModal;
