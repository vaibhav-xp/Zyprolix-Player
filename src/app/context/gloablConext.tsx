'use client'
import React, { useEffect, useState } from 'react';
import { Dispatch, SetStateAction, createContext, useContext, ReactNode } from 'react';
import { videoDataType } from '../Data/videoHelper';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore'; // Import getDoc for retrieving data

export interface userInterface {
    id: string;
    name: string;
    img: string;
}

interface GlobalContextProviderProps {
    search: string;
    setSearch: Dispatch<SetStateAction<string>>;
    apiRequestCounter: number | undefined;
    setApiRequestCounter: Dispatch<SetStateAction<number | undefined>>;
    bookmark: videoDataType[];
    setBookmark: Dispatch<SetStateAction<videoDataType[]>>;
    history: videoDataType[];
    setHistory: Dispatch<SetStateAction<videoDataType[]>>;
    user: userInterface | undefined;
    setUser: Dispatch<SetStateAction<userInterface | undefined>>;
    addDataToFirebase: any
}

export const GlobalContext = createContext<GlobalContextProviderProps | undefined>(undefined);

export const GlobalContextProvider = ({ children }: { children: ReactNode }) => {
    const [search, setSearch] = useState<string>('');
    const [apiRequestCounter, setApiRequestCounter] = useState<number | undefined>(undefined);
    const [bookmark, setBookmark] = useState<videoDataType[]>([]);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [history, setHistory] = useState<videoDataType[]>([]);
    const [user, setUser] = useState<userInterface | undefined>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (userData) => {
            if (userData) {
                setUser({
                    id: userData.uid,
                    name: userData.displayName || '',
                    img: userData.photoURL || '',
                });
                setIsDataLoaded(true);
            }
        });

        return () => unsubscribe();
    }, [auth]);

    // API Request Counter
    useEffect(() => {
        const fetchData = async () => {
            try {
                const userDocRef = doc(db, 'users', user?.id);
                const userDocSnapshot = await getDoc(userDocRef);

                if (userDocSnapshot.exists()) {
                    const userData = userDocSnapshot.data();
                    setApiRequestCounter(userData.apiRequestCounter || 0);
                    setBookmark(userData.bookmark || []);
                    setHistory(userData.history || []);
                }
            } catch (error: any) {
                throw new Error(error.message)
            }
        };

        if (isDataLoaded && user) {
            fetchData();
        }
    }, [isDataLoaded, user]);

    // Adding Data to firebase 
    const addDataToFirebase = async ({
        apiCounter = apiRequestCounter,
        historyData = history,
        bookmarkData = bookmark,
    }: {
        apiCounter?: number;
        historyData?: videoDataType[];
        bookmarkData?: videoDataType[];
    }) => {
        try {
            const userRef = doc(db, 'users', user?.id);
            await setDoc(userRef, {
                _id: user?.id,
                apiRequestCounter: apiCounter,
                history: historyData,
                bookmark: bookmarkData,
            });
        } catch (error: any) {
            throw new Error(error.message);
        }
    };

    return (
        <GlobalContext.Provider
            value={{
                search,
                setSearch,
                apiRequestCounter,
                setApiRequestCounter,
                bookmark,
                setBookmark,
                history,
                setHistory,
                user,
                setUser,
                addDataToFirebase
            }}
        >
            {children}
        </GlobalContext.Provider>
    );
};

export const useSearchContext = () => {
    const context = useContext(GlobalContext);
    if (!context) {
        throw new Error('Context error.');
    }
    return context;
};
