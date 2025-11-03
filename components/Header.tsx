
import React from 'react';

interface HeaderProps {
    onExport: () => void;
    onAddTransactionClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onExport, onAddTransactionClick }) => {
    return (
        <header className="bg-slate-800/50 backdrop-blur-sm shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 md:px-6 py-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold text-cyan-400 tracking-wider">
                    Expense Tracker
                </h1>
                <div className="flex items-center gap-4">
                    <button 
                        onClick={onAddTransactionClick}
                        className="flex items-center gap-2 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                        </svg>
                        <span className="hidden md:inline">Add Transaction</span>
                    </button>
                    <button 
                        onClick={onExport}
                        className="flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-300 shadow-md hover:shadow-lg"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM6.293 6.707a1 1 0 010-1.414l3-3a1 1 0 011.414 0l3 3a1 1 0 01-1.414 1.414L11 5.414V13a1 1 0 11-2 0V5.414L6.707 6.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                        <span>Export</span>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
