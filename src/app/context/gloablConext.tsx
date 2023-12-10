'use client'
import React, { useState } from 'react';
import { Dispatch, SetStateAction, createContext, useContext, ReactNode } from "react";

interface GlobalContextProviderProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
}

export const GlobalContext = createContext<GlobalContextProviderProps | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState<string>("");

    return (
        <GlobalContext.Provider value={{ search, setSearch }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error("context error.")
    }
    return context;
};
