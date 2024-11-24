'use client';

import PageCard from '../../components/PageCard';
import { useSearchParams } from 'next/navigation';

export default function Home() {

    const searchParams = useSearchParams();
    const data = searchParams.get("data") as string;
    const pageSelected = JSON.parse(data);

    return (
        <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen pl-6 pr-6 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)] mt-[100px]">
            <PageCard
                title={pageSelected.title}
                slug={pageSelected.slug}
                content={pageSelected.content}
                hashtag={pageSelected.hashtag ?? ""}
                data={pageSelected}
            />
        </div>
    );
}
