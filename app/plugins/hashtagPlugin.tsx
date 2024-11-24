'use client';

import React, { Dispatch, SetStateAction } from 'react';

interface HashTagProps {
    hashtag: string,
    setHashtag: Dispatch<SetStateAction<string>>
}

const HashtagPlugin = (props: HashTagProps) => {
    return (
        <div className="mb-5">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Hashtag</label>
            <input type="text" value={props.hashtag} onChange={(e) => props.setHashtag(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="#cms" />
        </div>
    );
};

export default HashtagPlugin;
