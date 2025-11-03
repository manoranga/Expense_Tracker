// FIX: Implemented the ExpenseChart component to resolve module not found and other related errors.
import React, { useMemo, useState } from 'react';
import { Transaction, TransactionType } from '../../types';
import CategoryDetailModal from './CategoryDetailModal';

interface ExpenseChartProps {
    transactions: Transaction[];
    type: TransactionType;
}

const ExpenseChart: React.FC<ExpenseChartProps> = ({ transactions, type }) => {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

    const chartData = useMemo(() => {
        const filtered = transactions.filter(t => t.type === type);
        const grouped: { [key: string]: number } = filtered.reduce((acc, transaction) => {
            acc[transaction.category] = (acc[transaction.category] || 0) + transaction.amount;
            return acc;
        }, {} as { [key: string]: number });

        const data = Object.entries(grouped)
            .map(([name, amount]) => ({ name, amount }))
            .sort((a, b) => b.amount - a.amount);

        const total = data.reduce((sum, item) => sum + item.amount, 0);

        return {
            items: data.map(item => ({ ...item, percentage: total > 0 ? (item.amount / total) * 100 : 0 })),
            total
        };
    }, [transactions, type]);

    const handleCategoryClick = (categoryName: string) => {
        setSelectedCategory(categoryName);
    };

    const handleCloseModal = () => {
        setSelectedCategory(null);
    };

    const selectedCategoryTransactions = useMemo(() => {
        if (!selectedCategory) return [];
        return transactions.filter(t => t.type === type && t.category === selectedCategory);
    }, [transactions, type, selectedCategory]);

    const barColor = type === TransactionType.INCOME ? 'bg-green-500' : 'bg-red-500';
    const hoverBarColor = type === TransactionType.INCOME ? 'hover:bg-green-400' : 'hover:bg-red-400';
    const textColor = type === TransactionType.INCOME ? 'text-green-400' : 'text-red-400';

    return (
        <div className="bg-slate-800 p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold text-white mb-4 capitalize">{type} Breakdown</h3>
            <div className="space-y-4">
                {chartData.items.length > 0 ? chartData.items.map(item => (
                    <div key={item.name} className="group cursor-pointer" onClick={() => handleCategoryClick(item.name)}>
                        <div className="flex justify-between items-center mb-1">
                            <span className="text-slate-300">{item.name}</span>
                            <span className={`font-semibold ${textColor}`}>
                                ${item.amount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                        </div>
                        <div className="w-full bg-slate-700 rounded-full h-4">
                            <div
                                className={`h-4 rounded-full transition-all duration-300 ${barColor} ${hoverBarColor}`}
                                style={{ width: `${item.percentage}%` }}
                            ></div>
                        </div>
                    </div>
                )) : (
                    <p className="text-slate-500 text-center py-8">No {type} data for this month.</p>
                )}
            </div>

            {selectedCategory && (
                <CategoryDetailModal
                    categoryName={selectedCategory}
                    transactions={selectedCategoryTransactions}
                    onClose={handleCloseModal}
                    type={type}
                />
            )}
        </div>
    );
};

export default ExpenseChart;
