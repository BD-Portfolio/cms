'use client';

import { useRouter } from "next/navigation";
import { useContext } from "react";
import { PageContext } from "../contexts/PageContext";

interface PageCardProps {
    title: string,
    slug: string,
    content: string,
    hashtag: string | null | undefined,
    showDeleteBtn?: boolean,
    showDetailsBtn?: boolean,
    data: any
}

export default function PageCard(props: PageCardProps) {

    const router = useRouter();

    const { setPageSelected, deletePage } = useContext(PageContext);

    const navigateToPagePage = (data: any) => {
        setPageSelected(data);
        router.push(`/pages/fetch/?data=${JSON.stringify(data)}`);
    }

    const updatePage = (data: any) => {
        setPageSelected(data);
        router.push(`/pages/add/`)
    }

    return <div
        className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-3 cursor-pointer max-w-100">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Page</h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">The details of page is :- </p>

        <label className="inline-flex items-center cursor-pointer font-bold">
            Title:
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-3">
                {props.title}
            </span>
        </label>

        <br />

        <label className="inline-flex items-center cursor-pointer font-bold">
            Slug:
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-3">
                {props.slug}
            </span>
        </label>

        <br />

        <label className="inline-flex items-center cursor-pointer font-bold">
            Content:
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-3">
                {props.content}
            </span>
        </label>

        <br />

        {props.hashtag && <label className="inline-flex items-center cursor-pointer font-bold">
            Hashtag:
            <span className="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mr-3">
                #{props.hashtag}
            </span>
        </label>}

        <br />
        <br />

        {props.showDetailsBtn && <button type="button" onClick={() => navigateToPagePage(props.data)}
            className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">Details</button>}

        {props.showDeleteBtn &&
            <button type="button" onClick={() => deletePage(props.data.id)}
                className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>}


        <button type="button" onClick={() => updatePage(props.data)}
            className="text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Update</button>

    </div>
}