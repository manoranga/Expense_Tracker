
import React from 'react';

interface MonthNavigatorProps {
    selectedMonth: Date;
    onPreviousMonth: () => void;
    onNextMonth: () => void;
}

const MonthNavigator: React.FC<MonthNavigatorProps> = ({ selectedMonth, onPreviousMonth, onNextMonth }) => {
    const monthName = selectedMonth.toLocaleString('default', { month: 'long' });
    const year = selectedMonth.getFullYear();

    return (
        <div className="bg-slate-800 p-4 rounded-2xl shadow-lg flex justify-between items-center mb-6">
            <button 
                onClick={onPreviousMonth} 
                className="bg-slate-700 hover:bg-cyan-500 rounded-lg p-2 transition-colors"
                aria-label="Previous month"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
            </button>
            <h2 className="text-xl font-semibold text-white tracking-wide">{monthName} {year}</h2>
            <button 
                onClick={onNextMonth} 
                className="bg-slate-700 hover:bg-cyan-500 rounded-lg p-2 transition-colors"
                aria-label="Next month"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
            </button>
        </div>
    );
};

export default MonthNavigator;
