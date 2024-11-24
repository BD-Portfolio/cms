'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const usePage = () => {

    const [pages, setPages] = useState([]);

    const [pageSelected, setPageSelected] = useState<any>(null);

    const router = useRouter();

    const fetchAllPages = async () => {
        try {
            const url = `${window.location.origin}/api/pages`;
            const response = await axios.get(url);
            const data = response.data;
            if (data.data) {
                setPages(data.data);
            }
        } catch (error) {
            console.log("Error fetching pages : ", error);
            setPages([]);
        }
    }

    const updatePage = async (data: any): Promise<boolean> => {
        try {
            const url = `${window.location.origin}/api/pages/${pageSelected.id}`;
            const response = await axios.put(url, data);
            if (response.data.httpStatus == 200) {
                await fetchAllPages();
                router.push(`/pages/`);
            }
            return false;
        } catch (error) {
            console.log("Error updating page : ", error);
            return false;
        }
    }

    const deletePage = async (id: number) => {
        try {
            const url = `${window.location.origin}/api/pages/${id}`;
            const response = await axios.delete(url);
            if (response.data.httpStatus == 200) {
                await fetchAllPages();
                router.push(`/pages/`);
            }
        } catch (error) {
            console.log("Error deleting page : ", error);
        }
    }

    const createPage = async (data: any): Promise<boolean> => {
        try {
            const url = `${window.location.origin}/api/pages`;
            const response = await axios.post(url, data);
            if (response.data.httpStatus == 201) {
                await fetchAllPages();
                router.push(`/pages/`);
            }
            return false;
        } catch (error) {
            console.log("Error creating page : ", error);
            return false;
        }
    }

    useEffect(() => {
        fetchAllPages();
    }, [])

    return { pages, pageSelected, fetchAllPages, updatePage, deletePage, setPageSelected, createPage };
}