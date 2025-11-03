import React from 'react';

interface SummaryProps {
    totalIncome: number;
    totalExpense: number;
    balance: number;
}

// FIX: Replaced JSX.Element with React.ReactNode to resolve namespace issue.
const SummaryCard: React.FC<{ title: string; amount: number; colorClass: string; icon: React.ReactNode }> = ({ title, amount, colorClass, icon }) => (
    <div className={`bg-slate-800 p-6 rounded-2xl shadow-lg flex items-center gap-4 border-l-4 ${colorClass}`}>
        <div className="text-3xl">{icon}</div>
        <div>
            <p className="text-sm text-slate-400 font-medium uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold text-white">
                ${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
            </p>
        </div>
    </div>
);

const Summary: React.FC<SummaryProps> = ({ totalIncome, totalExpense, balance }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <SummaryCard 
                title="Total Income" 
                amount={totalIncome} 
                colorClass="border-green-500"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01" /></svg>}
            />
            <SummaryCard 
                title="Total Expense" 
                amount={totalExpense} 
                colorClass="border-red-500"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0v-8m0 8l-8-8-4 4-6-6" /></svg>}
            />
            <SummaryCard 
                title="Balance" 
                amount={balance} 
                colorClass="border-cyan-500"
                icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 6d-3 6h18v-12H3z" /></svg>}
            />
        </div>
    );
};

export default Summary;