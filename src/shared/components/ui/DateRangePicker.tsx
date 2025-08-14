import React, { FC, ChangeEvent } from 'react';

interface DateRangePickerProps {
    dataInicial: string;
    dataFinal: string;
    onDateChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const DateRangePicker: FC<DateRangePickerProps> = ({ dataInicial, dataFinal, onDateChange }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="dataInicial">
                    Data Inicial
                </label>
                <input 
                    type="date" 
                    id="dataInicial" 
                    name="dataInicial" 
                    value={dataInicial} 
                    onChange={onDateChange} 
                    className="w-full p-2 rounded-md bg-white/80 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-slate-800 dark:text-slate-100"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-600 dark:text-slate-300 mb-1" htmlFor="dataFinal">
                    Data Final
                </label>
                <input 
                    type="date" 
                    id="dataFinal" 
                    name="dataFinal" 
                    value={dataFinal} 
                    onChange={onDateChange} 
                    className="w-full p-2 rounded-md bg-white/80 dark:bg-slate-700/80 border border-slate-300 dark:border-slate-600 focus:ring-2 focus:ring-cyan-500 focus:outline-none text-slate-800 dark:text-slate-100"
                />
            </div>
        </div>
    );
};

export default DateRangePicker;