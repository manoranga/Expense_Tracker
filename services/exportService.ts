
import { Transaction } from '../types';

declare const XLSX: any; // From CDN

export const exportToExcel = (data: Transaction[], fileName: string): void => {
    if (typeof XLSX === 'undefined') {
        alert('Excel export library is not available.');
        return;
    }
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    XLSX.writeFile(workbook, `${fileName}.xlsx`);
};
