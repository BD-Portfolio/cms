'use client';

import React from 'react';
import { usePage } from '../hooks/usePage';

export type PageContextType = {
    pages: any[];
    pageSelected: any;
    fetchAllPages: () => void;
    updatePage: (data: any) => Promise<boolean>;
    deletePage: (id: number) => void;
    createPage: (data: any) => Promise<boolean>;
    setPageSelected: (data: any) => void;
};

export const PageContext =
    React.createContext<PageContextType>({
        pages: [],
        pageSelected: null,
        fetchAllPages: () => { },
        updatePage: (data: any) => Promise.resolve(true),
        deletePage: (id: number) => { },
        createPage: (data: any) => Promise.resolve(true),
        setPageSelected: (data: any) => { }
    });

export const PageContextProvider = ({
    children,
}: {
    children?: any;
}) => {
    const {
        pages,
        pageSelected,
        fetchAllPages,
        updatePage,
        deletePage,
        setPageSelected,
        createPage,
    } = usePage();

    return (
        <PageContext.Provider
            value={{
                pages,
                pageSelected,
                fetchAllPages,
                updatePage,
                deletePage,
                setPageSelected,
                createPage
            }}
        >
            {children}
        </PageContext.Provider>
    );
};
