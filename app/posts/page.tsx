"use client";

import { useRouter } from "next/navigation";
import PostCard from "../components/PostCard";
import { useContext, useEffect } from "react";
import { PostContext } from "../contexts/PostContext";

export default function Home() {

    const { posts, setPostSelected } = useContext(PostContext);

    const router = useRouter();

    const navigateToCreatePage = () => {
        router.push(`/posts/add/`);
    }

    useEffect(() => {
        setPostSelected(null);
    }, []);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pb-8 pl-4 pe-4 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">

            <button type="button" onClick={navigateToCreatePage}
                className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Create post</button>

            <div className="grid grid-cols-3 gap-3 justify-between w-[100%]">
                {posts.length > 0 && posts.map((p, index) => <PostCard
                    title={p.title}
                    slug={p.slug}
                    content={p.content}
                    hashtag={p.hashtag ?? ""}
                    key={index}
                    data={p}
                    showDeleteBtn={true}
                    showDetailsBtn={true}
                />)
                }
            </div>
        </div>
    );
}
