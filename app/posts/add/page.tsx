'use client';

import { useContext, useEffect, useState } from "react";
import { PostContext } from '../../contexts/PostContext';
import HashtagPlugin from '../../plugins/hashtagPlugin';

export default function Home() {

    const { postSelected, createPost, updatePost, activePlugins } = useContext(PostContext);

    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [slug, setSlug] = useState("");
    const [hashtag, setHashtag] = useState("");

    const [msg, setMsg] = useState<{ type: string, value: string } | null>(null);

    const submit = async (event: any) => {
        event.preventDefault();

        if (title.length < 3) {
            setMsg({ value: "Title should have atleast length 3", type: "error" });
            return;
        }
        if (content.length < 3) {
            setMsg({ value: "Content should have atleast length 3", type: "error" });
            return;
        }
        const data = {
            title: title,
            content: content,
            hashtag: hashtag.length ? hashtag : null,
            slug: slug
        }

        let result;

        if (postSelected && postSelected.id) {
            result = await updatePost(data);
        } else {
            result = await createPost(data);
        }

        if (result) {
            setMsg({ value: "Failed to create post", type: "error" });
        } else {
            setMsg({ value: "Post create successfully", type: "success" });
        }
    }

    useEffect(() => {
        if (postSelected) {
            setTitle(postSelected.title);
            setContent(postSelected.content);
            setHashtag(postSelected.hashtag ?? "");
            setSlug(postSelected.slug);
        }
    }, [])

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mt-[150px]">
            <form className="max-w-sm mx-auto" onSubmit={submit}>
                <div className="mb-5 w-80">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Title <span className="text-[red]">*</span></label>
                    <input type="text" value={title} onChange={(e) => {
                        setTitle(e.target.value);
                        setSlug(e.target.value);
                    }}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="title" required />
                </div>
                <div className="mb-5">
                    <label htmlFor="" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Content <span className="text-[red]">*</span></label>
                    <input type="text" value={content} onChange={(e) => setContent(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="content" required />
                </div>
                <div className="mb-5">
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Slug <span className="text-[red]">*</span></label>
                    <input type="text" value={slug} onChange={(e) => setSlug(e.target.value)}
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="slug" />
                </div>
                {activePlugins.length > 0 &&
                    <HashtagPlugin hashtag={hashtag} setHashtag={setHashtag} />}

                {msg && <div className={msg.value === "error" ? "text-red" : "text-green"}>
                    {msg && msg.value}
                </div>}

                <br />

                <button onClick={submit} type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
            </form>

        </div>
    );
}
