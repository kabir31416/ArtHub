"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/app/lib/auth-client";
import Image from "next/image";
import { toast } from "react-toastify";


export default function CommentsSection({ artId }) {
    const { data: session } = authClient.useSession();
    const user = session?.user;

    const [comments, setComments] = useState([]);
    const [text, setText] = useState("");
    const [editingId, setEditingId] = useState(null);
    const [loading, setLoading] = useState(false);

    const loadComments = async () => {
        try {
            setLoading(true);

            const res = await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${artId}`
            );

            const data = await res.json();

            console.log("COMMENTS API RESPONSE:", res.status, data);

            if (res.ok && Array.isArray(data)) {
                setComments(data);
            } else {
                setComments([]);
                console.error("Invalid comments response:", data);
            }
        } catch (error) {
            console.error("Load comments error:", error);
            setComments([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (artId) {
            loadComments();
        }
    }, [artId]);


    const handleSubmit = async () => {
        if (!text.trim()) return;

        try {
            const url = editingId
                ? `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${editingId}`
                : `${process.env.NEXT_PUBLIC_SERVER_URL}/comments`;

            const method = editingId ? "PUT" : "POST";

            const body = editingId
                ? { text }
                : {
                    artId,
                    userName: user?.name,
                    userEmail: user?.email,
                    userImage: user?.image,
                    text,
                };

            await fetch(url, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(body),
            });

            toast.success(editingId ? "Comment updated!" : "Comment added!");

            setText("");
            setEditingId(null);
            loadComments();
        } catch (error) {
            console.error("Submit error:", error);
        }
    };


    const handleDelete = async (id) => {
        try {
            await fetch(
                `${process.env.NEXT_PUBLIC_SERVER_URL}/comments/${id}`,
                {

                    method: "DELETE",
                }
            );

            toast.success("Comment deleted!");
            loadComments();
        } catch (error) {
            console.error("Delete error:", error);
        }
    };


    return (
        <div className="mt-16">
            {/* HEADER */}
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h2 className="text-3xl font-bold text-white">
                        Community Discussion
                    </h2>
                    <p className="text-zinc-500 mt-1">
                        Share your thoughts about this artwork
                    </p>
                </div>

                <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-sm">
                    {comments?.length || 0} Comments
                </div>
            </div>

            {/* COMMENT INPUT */}
            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3">
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 via-purple-500/5 to-pink-500/5 pointer-events-none" />

                <div className="relative">
                    <div className="flex items-center gap-4 mb-5">
                        <Image
                            src={
                                user?.image ||
                                "https://i.pravatar.cc/150"
                            }
                            alt="user"
                            width={50}
                            height={50}
                            className="rounded-full border border-white/10"
                        />

                        <div>
                            <h4 className="font-medium text-white">
                                {user?.name || "Guest User"}
                            </h4>
                            <p className="text-xs text-zinc-500">
                                Join the discussion
                            </p>
                        </div>
                    </div>

                    <textarea
                        rows={4}
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Write your thoughts about this artwork..."
                        className="w-full bg-black/30 border border-white/10 rounded-2xl p-5 text-white placeholder:text-zinc-500 outline-none focus:border-orange-500 transition resize-none"
                    />

                    <div className="flex justify-end mt-4">
                        <button
                            onClick={handleSubmit}
                            className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-purple-600 text-white font-medium hover:opacity-90 transition"
                        >
                            {editingId
                                ? "Update Comment"
                                : "Post Comment"}
                        </button>
                    </div>
                </div>
            </div>

            {/* COMMENTS */}
            <div className="mt-10 space-y-5">
                {loading ? (
                    <div className="flex justify-center py-10">
                        <div className="h-8 w-8 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : comments?.length > 0 ? (
                    comments.map((comment) => (
                        <div
                            key={comment._id}
                            className="group rounded-3xl border border-white/10 bg-white/[0.03] backdrop-blur-xl p-3 hover:border-orange-500/30 transition-all duration-300"
                        >
                            <div className="flex gap-4">
                                {/* Avatar */}
                                <Image
                                    src={
                                        comment.userImage ||
                                        "https://i.pravatar.cc/100"
                                    }
                                    alt={comment.userName}
                                    width={52}
                                    height={52}
                                    className="rounded-full w-15 h-15 border border-white/10 object-cover"
                                />

                                {/* Content */}
                                <div className="flex-1">
                                    <div className="flex items-center justify-between flex-wrap gap-3">
                                        <div className="flex gap-2">
                                            <h3 className="font-semibold text-white">
                                                {comment.userName}
                                            </h3>

                                            <p className="text-xs text-zinc-500 mt-1">
                                                {comment.createdAt
                                                    ? new Date(
                                                        comment.createdAt
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            day: "numeric",
                                                            month: "short",
                                                            year: "numeric",
                                                        }
                                                    )
                                                    : ""}
                                            </p>
                                        </div>

                                        {comment.userEmail ===
                                            user?.email && (
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() => {
                                                            setText(
                                                                comment.text
                                                            );
                                                            setEditingId(
                                                                comment._id
                                                            );
                                                        }}
                                                        className="px-4 py-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition text-sm"
                                                    >
                                                        Edit
                                                    </button>

                                                    <button
                                                        onClick={() =>
                                                            handleDelete(
                                                                comment._id
                                                            )
                                                        }
                                                        className="px-4 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition text-sm"
                                                    >
                                                        Delete
                                                    </button>
                                                </div>
                                            )}
                                    </div>

                                    <p className="mt-1 text-zinc-300 leading-7">
                                        {comment.text}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="rounded-3xl border border-dashed border-white/10 p-16 text-center">
                        <h3 className="text-xl font-semibold text-white">
                            No Comments Yet
                        </h3>

                        <p className="text-zinc-500 mt-2">
                            Be the first person to start the
                            conversation.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}