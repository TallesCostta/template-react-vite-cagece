import React, { useState, useEffect, useRef, FC, ChangeEvent } from 'react';
import { Dropdown } from 'primereact/dropdown';

interface SearchableDropdownProps {
    name: string;
    options: string[];
    value: string;
    onChange: (e: { target: { name: string; value: string } }) => void;
    placeholder: string;
}

/**
 * Componente de dropdown com funcionalidade de busca, para seleção em listas longas.
 */
const SearchableDropdown: FC<SearchableDropdownProps> = ({ name, options, value, onChange, placeholder }) => {

    return (
        <Dropdown 
            value={value}
            options={options}
            onChange={(e) => onChange({ target: { name, value: e.value } })}
            placeholder={placeholder}
            className="w-full"
            filter
            showClear
        />
    );
};

export default SearchableDropdown;