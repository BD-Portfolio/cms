'use client';

import React from 'react';
import { usePost } from '../hooks/usePost';

export type PostContextType = {
    posts: any[];
    postSelected: any;
    fetchAllPosts: () => void;
    updatePost: (data: any) => Promise<boolean>;
    deletePost: (id: number) => void;
    createPost: (data: any) => Promise<boolean>;
    setPostSelected: (data: any) => void;
    activePlugins: string[];
    setActivePlugins: (data: string[]) => void;
};

export const PostContext =
    React.createContext<PostContextType>({
        posts: [],
        postSelected: null,
        fetchAllPosts: () => { },
        updatePost: (data: any) => Promise.resolve(true),
        deletePost: (id: number) => { },
        createPost: (data: any) => Promise.resolve(true),
        setPostSelected: (data: any) => { },
        activePlugins: [],
        setActivePlugins: (data: string[]) => { }
    });

export const PostContextProvider = ({
    children,
}: {
    children?: any;
}) => {
    const {
        posts,
        postSelected,
        fetchAllPosts,
        updatePost,
        deletePost,
        setPostSelected,
        createPost,
        activePlugins,
        setActivePlugins
    } = usePost();

    return (
        <PostContext.Provider
            value={{
                posts,
                postSelected,
                fetchAllPosts,
                updatePost,
                deletePost,
                setPostSelected,
                createPost,
                activePlugins,
                setActivePlugins
            }}
        >
            {children}
        </PostContext.Provider>
    );
};
