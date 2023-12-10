'use client'
import React, { useEffect, useState } from 'react';
import { Dispatch, SetStateAction, createContext, useContext, ReactNode } from 'react';
import { videoDataType } from '../Data/videoHelper';

interface GlobalContextProviderProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    apiRequestCounter: number;
    setApiRequestCounter: Dispatch<SetStateAction<number>>;
    bookmark: videoDataType[];
    setBookmark: Dispatch<SetStateAction<videoDataType[]>>;
}

export const GlobalContext = createContext<GlobalContextProviderProps | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState<string>('');
    const [apiRequestCounter, setApiRequestCounter] = useState<number>(0);
    const [bookmark, setBookmark] = useState<videoDataType[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && typeof window.localStorage !== 'undefined') {
            const storedApiRequestCounter = Number(localStorage.getItem('apiRequestCounter'))
            setApiRequestCounter(storedApiRequestCounter);

            const storedBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            setBookmark(storedBookmarks);
            setIsDataLoaded(true);
        }
    }, []);

    useEffect(() => {

        if (isDataLoaded) {
            if (apiRequestCounter > 20) {
                const storedTimestamp = parseInt(localStorage.getItem('apiRequestTimestamp') || '0', 10);

                const isTimestampValid = Date.now() - storedTimestamp < 24 * 60 * 60 * 1000;

                if (!isTimestampValid) {
                    setApiRequestCounter(0);
                    localStorage.setItem('apiRequestCounter', '0');
                    localStorage.setItem('apiRequestTimestamp', `${Date.now()}`);
                }
            } else {
                localStorage.setItem('apiRequestCounter', `${apiRequestCounter}`);
            }
        }
    }, [apiRequestCounter, isDataLoaded]);

    useEffect(() => {
        if (isDataLoaded) {
            localStorage.setItem("bookmarks", JSON.stringify(bookmark))
        }
    }, [isDataLoaded, bookmark])


    return (
        <GlobalContext.Provider value={{
            search,
            setSearch,
            apiRequestCounter,
            setApiRequestCounter,
            bookmark,
            setBookmark
        }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('context error.');
    }
    return context;
};
