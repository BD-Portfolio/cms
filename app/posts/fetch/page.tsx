'use client';

import { useSearchParams } from 'next/navigation';
import PostCard from '../../components/PostCard';
export default function Home() {

    const searchParams = useSearchParams();
    const data = searchParams.get("data") as string;
    const postSelected = JSON.parse(data);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mt-[100px]">
            <PostCard
                title={postSelected.title}
                slug={postSelected.slug}
                content={postSelected.content}
                hashtag={postSelected.hashtag ?? ""}
                data={postSelected}
            />
        </div>
    );
}
