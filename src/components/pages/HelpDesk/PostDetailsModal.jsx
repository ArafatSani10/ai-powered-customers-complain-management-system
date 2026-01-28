import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Info, RefreshCw, Send, MoreVertical, Link, Trash2, Edit3, Bookmark, Lock, CheckCircle2, Image as ImageIcon } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const PostDetailsModal = ({ isOpen, onClose, postId, currentUser }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);
    const [comment, setComment] = useState('');
    const [showMenu, setShowMenu] = useState(false);
    const menuRef = useRef(null);


    const currentUserId = currentUser?._id || currentUser?.id || '';
    const postOwnerId = post?.createdBy?._id || '';

    const isOwner = currentUserId && postOwnerId && (String(currentUserId) === String(postOwnerId));

    useEffect(() => {
        if (post && isOpen) {
            console.log("--------------------------------");
            console.log("LOGGED IN USER ID:", currentUserId);
            console.log("POST OWNER ID:", postOwnerId);
            console.log("IS OWNER MATCHED?:", isOwner);
            console.log("--------------------------------");
        }
    }, [post, currentUser, isOpen]);
    // ------------------------------------

    useEffect(() => {
        if (isOpen && postId) fetchPostDetails();
    }, [isOpen, postId]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) setShowMenu(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const fetchPostDetails = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/help-desk/${postId}`, {
                headers: { 'Authorization': token }
            });
            setPost(response.data.data);
        } catch (error) {
            console.error("Error fetching post:", error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm font-sans">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    className="relative w-full max-w-6xl bg-[#1c162d] rounded-xl overflow-hidden flex flex-col md:flex-row h-[90vh] shadow-2xl border border-white/5"
                >
                    {/* Close Button */}
                    <button
                        onClick={onClose}
                        className="absolute top-0 right-0 z-[110] bg-[#ef4444] text-white p-1.5 rounded-bl-lg hover:bg-red-600 transition-colors"
                    >
                        <X size={20} />
                    </button>

                    {loading ? (
                        <div className="flex-1 flex items-center justify-center bg-[#1c162d]"><RefreshCw className="animate-spin text-purple-500" size={30} /></div>
                    ) : post ? (
                        <>
                            {/* LEFT SIDE CONTENT */}
                            <div className="flex-[1.8] flex flex-col overflow-hidden">
                                <div className="flex-1 overflow-y-auto p-10 custom-scrollbar">
                                    <h2 className="text-2xl font-bold text-white mb-4">{post.title}</h2>
                                    <p className="text-gray-400 text-sm mb-8 leading-relaxed font-light">{post.description}</p>

                                    {post.attachments?.length > 0 && (
                                        <div className="rounded-xl overflow-hidden border border-white/5 bg-black/20 mb-10">
                                            <img src={post.attachments[0]} className="w-full h-auto object-contain" alt="post attachment" />
                                        </div>
                                    )}

                                    {/* Comment Section */}
                                    <div className="bg-[#251e3a] rounded-xl p-4 border border-white/5 mt-auto">
                                        <div className="flex gap-3">
                                            <img src={currentUser?.image || "https://i.ibb.co/QjJJnFZ9/download-19.png"} className="w-8 h-8 rounded-full object-cover" alt="me" />
                                            <div className="flex-1">
                                                <textarea
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                    placeholder="Write a comment..."
                                                    className="w-full bg-transparent border-none focus:ring-0 text-gray-200 placeholder-gray-500 text-sm h-16 resize-none"
                                                />
                                                <div className="flex justify-between items-center mt-2 border-t border-white/5 pt-3">
                                                    <button className="text-gray-500 hover:text-white transition-colors"><ImageIcon size={18} /></button>
                                                    <button className="bg-[#6d28d9] hover:bg-[#7c3aed] text-white px-5 py-1.5 rounded-lg text-xs font-medium transition-all active:scale-95">
                                                        Post Comment
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* RIGHT SIDEBAR */}
                            <div className="flex-1 bg-[#161126] border-l border-white/5 p-8 flex flex-col overflow-y-auto">
                                <div className="flex justify-between items-center mb-10">
                                    <h3 className="text-gray-400 text-sm font-medium">Post Info</h3>
                                    <div className="flex items-center gap-4 relative" ref={menuRef}>
                                        <Bookmark size={18} className="text-gray-500 hover:text-white cursor-pointer" />

                                        <div className="relative">
                                            <MoreVertical
                                                size={18}
                                                className="text-gray-500 hover:text-white cursor-pointer"
                                                onClick={() => setShowMenu(!showMenu)}
                                            />
                                            {/* DROPDOWN MENU LOGIC */}
                                            {showMenu && (
                                                <div className="absolute right-0 mt-2 w-44 bg-[#2d2446] border border-white/10 rounded-lg shadow-xl z-[120] py-1 overflow-hidden">
                                                    {isOwner ? (
                                                        <>
                                                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-200 hover:bg-white/5 flex items-center gap-2 transition-colors">
                                                                <Edit3 size={14} className="text-blue-400" /> Edit Post
                                                            </button>
                                                            <button className="w-full text-left px-4 py-2.5 text-xs text-red-400 hover:bg-red-500/10 flex items-center gap-2 border-t border-white/5 transition-colors">
                                                                <Trash2 size={14} /> Delete Post
                                                            </button>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-200 hover:bg-white/5 flex items-center gap-2 transition-colors">
                                                                <Link size={14} /> Copy Link
                                                            </button>
                                                            <button className="w-full text-left px-4 py-2.5 text-xs text-gray-200 hover:bg-white/5 flex items-center gap-2 border-t border-white/5 transition-colors">
                                                                Report Post
                                                            </button>
                                                        </>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* Details List */}
                                <div className="space-y-6 mb-10 text-sm">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Status</span>
                                        <div className="flex items-center gap-2 bg-[#1e293b] text-[#38bdf8] px-3 py-1 rounded-md text-xs border border-blue-500/20 font-medium">
                                            <CheckCircle2 size={13} /> {post.status}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Type</span>
                                        <div className="flex items-center gap-2 bg-[#2d2446] text-[#fbbf24] px-3 py-1 rounded-md text-xs border border-yellow-500/20 font-medium">
                                            <Lock size={12} /> {post.postType}
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-500">Date</span>
                                        <span className="text-gray-300 text-xs">{new Date(post.createdAt).toLocaleDateString()}</span>
                                    </div>

                                    <div className="flex justify-between items-start pt-2 border-t border-white/5">
                                        <span className="text-gray-500">Author</span>
                                        <div className="flex items-center gap-2">
                                            <img src={post.createdBy?.image} className="w-6 h-6 rounded-full border border-purple-500/40" alt="author" />
                                            <span className="text-gray-200 text-xs font-bold">{post.createdBy?.name}</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Info Box */}
                                <div className="mt-auto">
                                    <div className="bg-[#1e293b]/50 border border-blue-500/20 p-4 rounded-xl flex gap-3 shadow-lg">
                                        <div className="mt-0.5 text-blue-400"><Info size={16} /></div>
                                        <p className="text-[11px] text-gray-400 leading-relaxed font-light">
                                            Currently marked as <span className="text-white font-bold">{post.status}</span>.
                                            {isOwner ? " As the owner, you can Edit or Delete this post." : " Please remain respectful."}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : null}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PostDetailsModal;