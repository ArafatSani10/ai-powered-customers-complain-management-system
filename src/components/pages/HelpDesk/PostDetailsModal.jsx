import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, Info, MessageSquare, AlertCircle, RefreshCw, Send, Tag, Paperclip } from 'lucide-react';

const API_URL = import.meta.env.VITE_API_URL;

const PostDetailsModal = ({ isOpen, onClose, postId }) => {
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (isOpen && postId) {
            fetchPostDetails();
        }
    }, [isOpen, postId]);

    const fetchPostDetails = async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get(`${API_URL}/help-desk/${postId}`, {
                headers: { 'Authorization': token }
            });
            setPost(response.data.data);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 10 }}
                    className="relative w-full max-w-5xl bg-gray-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl flex flex-col md:flex-row max-h-[90vh]"
                >
                    <button onClick={onClose} className="absolute top-4 right-4 z-50 bg-gray-800 hover:bg-red-500 text-white p-1.5 rounded-lg transition-all border border-white/10">
                        <X size={18} />
                    </button>

                    {loading ? (
                        <div className="flex-1 flex items-center justify-center py-40">
                            <RefreshCw className="animate-spin text-purple-500" size={32} />
                        </div>
                    ) : post ? (
                        <>
                            {/* Left Side: Content */}
                            <div className="flex-1 p-6 md:p-8 overflow-y-auto border-r border-white/5 custom-scrollbar">
                                <div className="flex items-center gap-2 mb-4">
                                    <span className="bg-purple-500/10 text-purple-400 text-[10px] px-2 py-1 rounded-md border border-purple-500/20 font-bold uppercase">
                                        {post.postType}
                                    </span>
                                    {post.is_duplicate && (
                                        <span className="bg-red-500/10 text-red-500 text-[10px] px-2 py-1 rounded-md border border-red-500/20 font-bold">
                                            DUPLICATE
                                        </span>
                                    )}
                                </div>

                                <h2 className="text-xl md:text-2xl font-bold text-white mb-4 leading-tight">
                                    {post.title}
                                </h2>

                                <p className="text-slate-400 text-sm md:text-base leading-relaxed mb-6">
                                    {post.description}
                                </p>

                                {/* Attachments Section */}
                                {post.attachments?.length > 0 && (
                                    <div className="mb-8">
                                        <div className="flex items-center gap-2 text-slate-300 text-xs font-bold mb-3">
                                            <Paperclip size={14} /> ATTACHMENTS
                                        </div>
                                        <div className="grid grid-cols-2 gap-3">
                                            {post.attachments.map((img, idx) => (
                                                <img key={idx} src={img} alt="Attachment" className="rounded-xl border border-white/10 w-full h-40 object-cover hover:opacity-80 transition-cursor cursor-zoom-in" />
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Keywords */}
                                <div className="flex flex-wrap gap-2 mb-8">
                                    {post.keywords?.map((key, idx) => (
                                        <span key={idx} className="flex items-center gap-1 text-[10px] bg-white/5 text-slate-400 px-2 py-1 rounded-md border border-white/5">
                                            <Tag size={10} /> {key}
                                        </span>
                                    ))}
                                </div>

                                {/* Comment Input */}
                                <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                    <textarea
                                        placeholder="Write a comment..."
                                        className="w-full bg-transparent border-none focus:ring-0 text-sm text-white placeholder:text-slate-600 resize-none h-20"
                                    />
                                    <div className="flex justify-between items-center mt-2 pt-2 border-t border-white/5">
                                        <button className="text-slate-500 hover:text-white transition-colors"><Paperclip size={18} /></button>
                                        <button className="bg-purple-600 hover:bg-purple-500 text-white px-4 py-1.5 rounded-lg text-xs font-bold flex items-center gap-2 transition-all">
                                            <Send size={14} /> Post
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Right Side: Sidebar Info */}
                            <div className="w-full md:w-72 bg-gray-900/50 p-6 flex flex-col gap-6">
                                <div>
                                    <h4 className="text-slate-500 text-[10px] font-bold uppercase tracking-widest mb-4">Post Information</h4>

                                    <div className="space-y-4">
                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 text-xs">Author</span>
                                            <div className="flex items-center gap-2">
                                                <img
                                                    src={post.createdBy?.image || "https://i.ibb.co/5h9M0pC/avatar.png"}
                                                    className="w-6 h-6 rounded-full border border-purple-500/30"
                                                    alt=""
                                                />
                                                <span className="text-slate-300 text-xs font-medium">{post.createdBy?.name || "User"}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 text-xs">Status</span>
                                            <span className="bg-blue-500/10 text-blue-400 text-[10px] px-2 py-0.5 rounded border border-blue-500/20 font-bold">
                                                {post.status}
                                            </span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <span className="text-slate-500 text-xs">Created At</span>
                                            <span className="text-slate-300 text-[10px] font-medium flex items-center gap-1">
                                                <Clock size={10} /> {new Date(post.createdAt).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-white/5">
                                    <div className="bg-blue-500/5 border border-blue-500/10 rounded-xl p-3 flex gap-3">
                                        <Info size={16} className="text-blue-500 shrink-0 mt-0.5" />
                                        <p className="text-[10px] text-slate-400 leading-relaxed">
                                            This post is currently <span className="text-blue-400 font-bold">{post.status}</span>. Our team will review it soon.
                                        </p>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mt-auto">
                                    <div className="flex items-center justify-between text-slate-500 text-xs font-bold">
                                        <div className="flex items-center gap-1.5">
                                            <MessageSquare size={14} /> {post.comments?.length || 0} Comments
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="p-20 text-center text-slate-500 w-full">Data not found.</div>
                    )}
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default PostDetailsModal;