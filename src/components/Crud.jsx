/** @format */

import { useState } from "react";
import { useCrud } from "../hook/useCrud";

function Crud() {
    const [newPost, setNewPost] = useState("");

    // GET postlar
    const {
        data: posts,
        isLoading,
        error,
    } = useCrud({
        method: "GET",
        url: "/posts",
    });

    // POST yangi post qo'shish
    const { mutate: createPost } = useCrud({
        method: "POST",
        url: "/posts",
        data: { title: newPost },
    });

    if (isLoading) return <div>Yuklanmoqda...</div>;
    if (error) return <div>Xatolik: {error.message}</div>;

    return (
        <div>
            <div>
                <input
                    type='text'
                    placeholder='Yangi post yozing'
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                />
                <button className="bg-blue-600 px-3 py-1 rounded-md" onClick={() => createPost()}>Qo'shish</button>
            </div>
            <h1 className='text-5xl'>Postlar</h1>
            <ul className='flex flex-col gap-2'>
                {posts?.map((post) => (
                    <li
                        key={post.id}
                        className='bg-gray-400 py-2 px-2 rounded-md'>
                        {post.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Crud;
