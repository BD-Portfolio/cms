'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const usePost = () => {

    const [posts, setPosts] = useState([]);

    const [postSelected, setPostSelected] = useState<any>(null);

    const [activePlugins, setActivePlugins] = useState<string[]>([]);

    const router = useRouter();

    const fetchAllPosts = async () => {
        try {
            const url = `${window.location.origin}/api/posts`;
            const response = await axios.get(url);
            const data = response.data;
            if (data.data) {
                setPosts(data.data);
            }
        } catch (error) {
            console.log("Error fetching posts : ", error);
            setPosts([]);
        }
    }

    const updatePost = async (data: any): Promise<boolean> => {
        try {
            const url = `${window.location.origin}/api/posts/${postSelected.id}`;
            const response = await axios.put(url, data);
            if (response.data.httpStatus == 200) {
                await fetchAllPosts();
                router.push(`/posts/`);
            }
            return false;
        } catch (error) {
            console.log("Error updating post : ", error);
            return false;
        }
    }

    const deletePost = async (id: number) => {
        try {
            const url = `${window.location.origin}/api/posts/${id}`;
            const response = await axios.delete(url);
            if (response.data.httpStatus == 200) {
                await fetchAllPosts();
                router.push(`/posts/`);
            }
        } catch (error) {
            console.log("Error deleting post : ", error);
        }
    }

    const createPost = async (data: any): Promise<boolean> => {
        try {
            console.log("data : ", data)
            const url = `${window.location.origin}/api/posts`;
            const response = await axios.post(url, data);
            if (response.data.httpStatus == 201) {
                await fetchAllPosts();
                router.push(`/posts/`);
            }
            return false;
        } catch (error) {
            console.log("Error creating post : ", error);
            return false;
        }
    }

    useEffect(() => {
        fetchAllPosts();
    }, [])

    return { posts, postSelected, fetchAllPosts, updatePost, deletePost, setPostSelected, createPost, activePlugins, setActivePlugins };
}