import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
    X, Image as ImageIcon, MessageSquare, Send, ChevronRight,
    Calendar, User, Hash, Info, Bookmark, Link as LinkIcon,
    Loader2, Search, Filter, CheckCircle2, AlertCircle,
    File, Video, Upload, Users, Eye, Share2, Repeat
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

const HelpDeskPage = () => {
    const [activeTab, setActiveTab] = useState('All Post');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [postFilter, setPostFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const fileInputRef = useRef(null);

    // Current user info
    const currentUser = {
        id: "u-current",
        name: "Me",
        batch: "Level2-Batch-6"
    };

    // Dummy Data with all types of posts
    const [posts, setPosts] = useState([
        {
            id: "1",
            title: "Assignment Submit Related Problem",
            author: "Tanvir Mahtab",
            authorId: "u1",
            role: "user",
            time: "Dec 14, 2025",
            batch: "Batch 11",
            status: "Acknowledged",
            postType: "Courses Topics",
            content: "Assignment Skip korar jonno submit button a click kore then porer module a jawa lage. Akn assignment submit er somoy ki likhbo? Blank rakha jassena.",
            reposts: [
                { id: "r1", author: "Rahim Khan", authorId: "u3", time: "Dec 15, 2025" },
                { id: "r2", author: "Karim Ahmed", authorId: "u4", time: "Dec 16, 2025" }
            ],
            views: 145,
            hasImage: true,
            comments: [
                { id: "c1", author: "Admin Rakib", text: "You can write 'N/A' or describe why you skipped.", time: "2 hours ago" },
                { id: "c2", author: "Tanvir Mahtab", text: "Thank you for the suggestion!", time: "1 hour ago" }
            ]
        },
        {
            id: "2",
            title: "Neptune App Desktop Update Problem",
            author: "Mahin Khan",
            authorId: "u2",
            role: "user",
            time: "Dec 20, 2025",
            batch: "Batch 11",
            status: "New",
            postType: "Bugs",
            content: "App open korle update pop up ase kinto click korle crash khay.",
            reposts: [],
            views: 89,
            hasVideo: true,
            comments: []
        },
        {
            id: "3",
            title: "React Hook Dependency Warning",
            author: "Admin Rakib",
            authorId: "admin1",
            role: "admin",
            time: "Dec 18, 2025",
            batch: "All",
            status: "Resolved",
            postType: "Announcements",
            content: "For React hook dependencies, make sure to include all variables that change over time. This is a common issue many students face.",
            reposts: [],
            views: 234,
            comments: [
                { id: "c3", author: "Student", text: "This helped me fix my issue!", time: "1 day ago" }
            ]
        },
        {
            id: "4",
            title: "Cannot Access Course Materials",
            author: "Sakib Hasan",
            authorId: "u5",
            role: "user",
            time: "Dec 22, 2025",
            batch: "Batch 12",
            status: "In Progress",
            postType: "Courses Topics",
            content: "Course materials download hoy na, error show korche.",
            reposts: [
                { id: "r3", author: "Me", authorId: "u-current", time: "Just now" }
            ],
            views: 67,
            comments: []
        }
    ]);

    const adminAnnouncements = [
        {
            id: "a1",
            title: "Technical support session (9PM-10PM)",
            author: "Sakib Ahammed",
            date: "Aug 25, 2025",
            content: "Join our live support session for any queries.",
            type: "Registered"
        },
        {
            id: "a2",
            title: "Mobile Playback Issue Fixed",
            author: "Admin Rakib",
            date: "Aug 24, 2025",
            content: "We have fixed the mobile video player.",
            type: "Update"
        }
    ];

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // File upload handler
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files.slice(0, 5)]); // Limit to 5 files
    };

    // Filter posts based on selected topic and post filter
    const filteredPosts = posts.filter(post => {
        const topicMatch = selectedTopic === 'All' || post.postType === selectedTopic;

        let filterMatch = true;
        if (postFilter === 'my') {
            filterMatch = post.authorId === currentUser.id ||
                post.reposts.some(repost => repost.authorId === currentUser.id);
        } else if (postFilter === 'admin') {
            filterMatch = post.role === 'admin';
        } else if (postFilter === 'common') {
            filterMatch = post.reposts.length > 0;
        }

        const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase());

        return topicMatch && filterMatch && searchMatch;
    });

    // Handle post submission with duplicate detection
    const onPostSubmit = (data) => {
        setIsLoading(true);

        // Check for similar posts (by title or content)
        const similarPost = posts.find(post =>
            post.title.toLowerCase().includes(data.title.toLowerCase()) ||
            post.content.toLowerCase().includes(data.content.toLowerCase().substring(0, 50))
        );

        setTimeout(() => {
            if (similarPost) {
                // Add as repost to existing post
                const updatedPosts = posts.map(post =>
                    post.id === similarPost.id
                        ? {
                            ...post,
                            reposts: [
                                ...post.reposts,
                                {
                                    id: `r${Date.now()}`,
                                    author: currentUser.name,
                                    authorId: currentUser.id,
                                    time: "Just now"
                                }
                            ]
                        }
                        : post
                );
                setPosts(updatedPosts);

                // Show notification for common issue
                alert(`This issue has been reported by ${similarPost.author}. Your profile has been added to the existing post.`);
            } else {
                // Create new post
                const newPost = {
                    ...data,
                    id: Date.now().toString(),
                    author: currentUser.name,
                    authorId: currentUser.id,
                    role: "user",
                    time: "Just Now",
                    batch: currentUser.batch,
                    status: "New",
                    views: 0,
                    reposts: [],
                    comments: [],
                    hasImage: selectedFiles.some(file => file.type.startsWith('image/')),
                    hasVideo: selectedFiles.some(file => file.type.startsWith('video/'))
                };
                setPosts([newPost, ...posts]);
            }

            setSelectedFiles([]);
            setIsLoading(false);
            setCreateModalOpen(false);
        }, 1000);
    };

    // Handle share/ask click
    const handleShareClick = () => {
        setCreateModalOpen(true);
    };

    return (
        <div className="min-h-screen overflow-hidden bg-[#0a0a0f] text-gray-300 p-4 md:p-10">
            <div className="max-w-7xl mx-auto">

                {/* Tab Section */}
                <div className="flex bg-white/5 p-1 rounded-2xl mb-10 w-fit">
                    {['All Post', 'Roadmap', 'Release log'].map(tab => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`px-8 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 ${activeTab === tab ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'hover:text-white text-gray-500'}`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Admin Swiper */}
                <div className="mb-12">
                    <h2 className="text-white font-bold mb-6 flex items-center gap-2 tracking-tight text-lg">
                        <Users size={20} className="text-purple-500" />
                        Admin Announcements
                    </h2>
                    <Swiper
                        modules={[Autoplay, Pagination]}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{ 768: { slidesPerView: 2 } }}
                        autoplay={{ delay: 3500 }}
                        pagination={{ clickable: true }}
                        className="pb-10"
                    >
                        {adminAnnouncements.map(ann => (
                            <SwiperSlide key={ann.id}>
                                <div className="bg-gradient-to-br from-[#151521] to-[#1a1a2e] border border-white/10 p-6 rounded-[2rem] flex gap-5 items-center hover:border-purple-500/30 transition-all duration-300 group">
                                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0 flex items-center justify-center">
                                        <span className="text-white font-bold text-lg">A</span>
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex justify-between items-start">
                                            <h4 className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors">{ann.author}</h4>
                                            <span className="text-[9px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-black uppercase">{ann.type}</span>
                                        </div>
                                        <h3 className="text-white text-sm mt-1 font-semibold">{ann.title}</h3>
                                        <p className="text-xs text-gray-400 mt-2 line-clamp-2">{ann.content}</p>
                                        <p className="text-[10px] text-gray-600 mt-2">{ann.date}</p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
                    {/* Left Sidebar - Filters */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Search Bar */}
                        <div className="bg-[#151521] border border-white/10 rounded-[2rem] p-5">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent pl-12 pr-4 py-3 text-sm rounded-xl border border-white/5 focus:border-purple-500/50 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Post Type Filter */}
                        <div className="bg-[#151521] border border-white/10 rounded-[2rem] p-6 sticky top-10">
                            <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase opacity-50 flex items-center gap-2">
                                <Filter size={16} />
                                Post Filter
                            </h3>
                            <div className="space-y-2">
                                {[
                                    { value: 'all', label: 'All Posts', icon: <Eye size={16} /> },
                                    { value: 'my', label: 'My Posts', icon: <User size={16} /> },
                                    { value: 'admin', label: 'Admin Posts', icon: <Users size={16} /> },
                                    { value: 'common', label: 'Common Issues', icon: <Repeat size={16} /> }
                                ].map(filter => (
                                    <button
                                        key={filter.value}
                                        onClick={() => setPostFilter(filter.value)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 group ${postFilter === filter.value
                                            ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20'
                                            : 'bg-white/5 hover:bg-white/10 text-gray-400'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {filter.icon}
                                            <span className="text-sm font-bold">{filter.label}</span>
                                        </div>
                                        <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Topic Filter */}
                        <div className="bg-[#151521] border border-white/10 rounded-[2rem] p-6">
                            <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase opacity-50">Topic Type Filter</h3>
                            <div className="space-y-2">
                                {['All', 'Courses Topics', 'Bugs', 'Announcements', 'Others'].map(topic => (
                                    <button
                                        key={topic}
                                        onClick={() => setSelectedTopic(topic)}
                                        className={`w-full flex items-center justify-between p-4 rounded-2xl transition-all duration-300 ${selectedTopic === topic
                                            ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-600/20'
                                            : 'bg-white/5 hover:bg-white/10 text-gray-400'
                                            }`}
                                    >
                                        <span className="text-sm font-bold">{topic}</span>
                                        <ChevronRight size={16} />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Main Feed */}
                    <div className="lg:col-span-3">
                        {/* Share/Ask Section */}
                        <div className="bg-gradient-to-br from-[#151521] to-[#1a1a2e] border border-white/10 p-6 rounded-[2rem] mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 border border-white/10 flex items-center justify-center">
                                <span className="text-white font-bold">{currentUser.name[0]}</span>
                            </div>
                            <div
                                onClick={handleShareClick}
                                className="flex-1 bg-white/5 border border-dashed border-white/10 rounded-2xl px-6 py-4 text-gray-400 text-sm cursor-pointer hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3">
                                    <Share2 size={18} className="text-purple-500 group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">Share or Ask Something to Everyone?</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="bg-white/5 border border-white/10 rounded-xl p-3 text-gray-400 hover:text-purple-500 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300 group"
                                    title="Upload Photo/Video"
                                >
                                    <ImageIcon size={20} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={handleShareClick}
                                    className="bg-purple-600 border border-purple-600 rounded-xl p-3 text-white hover:bg-purple-700 transition-all duration-300 shadow-lg shadow-purple-600/20"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileUpload}
                            />
                        </div>

                        {/* File Preview */}
                        {selectedFiles.length > 0 && (
                            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-2xl">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="text-sm font-bold text-gray-400">Selected Files ({selectedFiles.length})</span>
                                    <button
                                        onClick={() => setSelectedFiles([])}
                                        className="text-xs text-red-400 hover:text-red-300"
                                    >
                                        Clear All
                                    </button>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center gap-2 bg-white/5 px-3 py-2 rounded-lg">
                                            {file.type.startsWith('image/') ? (
                                                <ImageIcon size={14} className="text-purple-500" />
                                            ) : (
                                                <Video size={14} className="text-blue-500" />
                                            )}
                                            <span className="text-xs truncate max-w-[150px]">{file.name}</span>
                                            <button
                                                onClick={() => setSelectedFiles(prev => prev.filter((_, i) => i !== index))}
                                                className="text-gray-500 hover:text-red-400"
                                            >
                                                <X size={14} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Loading State */}
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20 gap-6">
                                <div className="relative">
                                    <div className="w-20 h-20 border-4 border-white/10 rounded-full"></div>
                                    <div className="absolute top-0 left-0 w-20 h-20 border-4 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                                    <Loader2 className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 animate-spin text-purple-500" size={24} />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-gray-400 tracking-widest uppercase">Loading Feed</p>
                                    <p className="text-xs text-gray-600 mt-2">Fetching latest posts...</p>
                                </div>
                            </div>
                        ) : (
                            <>
                                {/* Stats */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="text-sm text-gray-400">
                                        Showing <span className="text-white font-bold">{filteredPosts.length}</span> posts
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {postFilter === 'common' && `${filteredPosts.length} common issues found`}
                                    </div>
                                </div>

                                {/* Posts */}
                                <div className="space-y-6">
                                    {filteredPosts.length === 0 ? (
                                        <div className="text-center py-20">
                                            <div className="w-20 h-20 mx-auto bg-white/5 rounded-full flex items-center justify-center mb-4">
                                                <Search className="text-gray-600" size={30} />
                                            </div>
                                            <h3 className="text-white font-bold text-lg mb-2">No posts found</h3>
                                            <p className="text-gray-500 text-sm">Try changing your filters or create a new post</p>
                                        </div>
                                    ) : (
                                        filteredPosts.map(post => (
                                            <motion.div
                                                key={post.id}
                                                layout
                                                initial={{ opacity: 0, y: 20 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -20 }}
                                                onClick={() => setSelectedPost(post)}
                                                className="bg-gradient-to-br from-[#151521] to-[#1a1a2e] border border-white/10 p-8 rounded-[2.5rem] hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 cursor-pointer group"
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white shadow-xl ${post.role === 'admin'
                                                            ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                                                            : 'bg-gradient-to-br from-purple-600 to-pink-600'
                                                            }`}>
                                                            {post.author[0]}
                                                            {post.role === 'admin' && (
                                                                <div className="absolute -top-1 -right-1 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                                                                    <span className="text-[10px]">A</span>
                                                                </div>
                                                            )}
                                                        </div>
                                                        <div>
                                                            <div className="flex items-center gap-2">
                                                                <h4 className="text-white font-bold text-sm group-hover:text-purple-400 transition-colors">
                                                                    {post.author}
                                                                </h4>
                                                                {post.reposts.some(repost => repost.authorId === currentUser.id) && (
                                                                    <span className="text-[9px] bg-purple-500/20 text-purple-400 px-2 py-0.5 rounded font-bold uppercase">
                                                                        You Reposted
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-[11px] text-gray-500">
                                                                {post.time} • {post.batch}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-3">
                                                        {post.reposts.length > 0 && (
                                                            <div className="flex items-center gap-1 text-[10px] bg-purple-500/10 text-purple-400 px-2 py-1 rounded-lg font-bold">
                                                                <Repeat size={10} />
                                                                {post.reposts.length}
                                                            </div>
                                                        )}
                                                        <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase border ${post.status === 'Resolved'
                                                            ? 'bg-green-500/10 text-green-400 border-green-500/20'
                                                            : post.status === 'In Progress'
                                                                ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
                                                                : 'bg-purple-500/10 text-purple-400 border-purple-500/20'
                                                            }`}>
                                                            {post.status}
                                                        </span>
                                                    </div>
                                                </div>

                                                <h2 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors leading-tight mb-4">
                                                    {post.title}
                                                </h2>

                                                <p className="text-gray-400 mt-4 leading-relaxed text-sm line-clamp-2">
                                                    {post.content}
                                                </p>

                                                {/* File indicators */}
                                                <div className="flex items-center gap-4 mt-6">
                                                    {post.hasImage && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <ImageIcon size={14} />
                                                            <span>Image</span>
                                                        </div>
                                                    )}
                                                    {post.hasVideo && (
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <Video size={14} />
                                                            <span>Video</span>
                                                        </div>
                                                    )}
                                                </div>

                                                <div className="flex items-center justify-between mt-8 pt-6 border-t border-white/5">
                                                    <div className="flex gap-6">
                                                        <div className="flex items-center gap-2 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                                                            <MessageSquare size={14} />
                                                            {post.comments.length} Comments
                                                        </div>
                                                        <div className="flex items-center gap-2 text-gray-500 text-[11px] font-bold uppercase tracking-wider">
                                                            <Eye size={14} />
                                                            {post.views} Views
                                                        </div>
                                                        <span className="bg-white/5 px-3 py-1 rounded-md border border-white/5 text-[11px] font-bold">
                                                            {post.postType}
                                                        </span>
                                                    </div>
                                                    <button className="text-purple-500 hover:text-purple-400 font-black text-[11px] uppercase tracking-widest flex items-center gap-2 group">
                                                        View Details
                                                        <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
                                                    </button>
                                                </div>
                                            </motion.div>
                                        ))
                                    )}
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Modals */}
            <AnimatePresence>
                {isCreateModalOpen && (
                    <CreatePostModal
                        onClose={() => setCreateModalOpen(false)}
                        onSubmit={onPostSubmit}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        fileInputRef={fileInputRef}
                        handleFileUpload={handleFileUpload}
                    />
                )}
                {selectedPost && (
                    <PostDetailsModal
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                        currentUserId={currentUser.id}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Create Post Modal
const CreatePostModal = ({ onClose, onSubmit, selectedFiles, setSelectedFiles, fileInputRef, handleFileUpload }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.form
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] w-full max-w-2xl rounded-[3rem] border border-white/10 p-10 space-y-6 shadow-2xl"
            >
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Create New Post</h2>
                    <button
                        type="button"
                        onClick={onClose}
                        className="text-gray-500 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
                    >
                        <X size={24} />
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Title *</label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-500 transition-all"
                            placeholder="What's the issue?"
                        />
                        {errors.title && (
                            <p className="text-red-400 text-sm mt-2">{errors.title.message}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2">Post Type</label>
                            <select
                                {...register("postType")}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-500"
                            >
                                <option value="Courses Topics">Courses Topics</option>
                                <option value="Bugs">Bugs</option>
                                <option value="Announcements">Announcements</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2">Batch</label>
                            <select className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white outline-none focus:border-purple-500">
                                <option>Level2-Batch-6</option>
                                <option>Batch 11</option>
                                <option>Batch 12</option>
                            </select>
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Description *</label>
                        <textarea
                            {...register("content", {
                                required: "Description is required",
                                minLength: { value: 20, message: "Please provide more details (min 20 characters)" }
                            })}
                            className="w-full bg-white/5 border border-white/10 rounded-2xl p-4 text-white h-40 outline-none focus:border-purple-500 resize-none"
                            placeholder="Describe your issue in detail..."
                        />
                        {errors.content && (
                            <p className="text-red-400 text-sm mt-2">{errors.content.message}</p>
                        )}
                    </div>

                    {/* File Upload Section */}
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Attachments</label>
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className="border-2 border-dashed border-white/10 rounded-2xl p-8 text-center cursor-pointer hover:border-purple-500/50 hover:bg-white/5 transition-all group"
                        >
                            <Upload className="mx-auto text-gray-500 group-hover:text-purple-500 mb-3" size={32} />
                            <p className="text-gray-400 mb-1">Click to upload photos or videos</p>
                            <p className="text-xs text-gray-600">Supports: JPG, PNG, MP4, AVI (Max 10MB each)</p>
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                multiple
                                accept="image/*,video/*"
                                onChange={handleFileUpload}
                            />
                        </div>

                        {/* File Preview */}
                        {selectedFiles.length > 0 && (
                            <div className="mt-4">
                                <div className="flex flex-wrap gap-3">
                                    {selectedFiles.map((file, index) => (
                                        <div key={index} className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-xl">
                                            {file.type.startsWith('image/') ? (
                                                <ImageIcon size={16} className="text-purple-500" />
                                            ) : (
                                                <Video size={16} className="text-blue-500" />
                                            )}
                                            <span className="text-sm truncate max-w-[120px]">{file.name}</span>
                                            <button
                                                type="button"
                                                onClick={() => removeFile(index)}
                                                className="text-gray-500 hover:text-red-400 ml-2"
                                            >
                                                <X size={16} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex gap-4 pt-4">
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl py-4 font-bold text-gray-400 hover:text-white transition-all"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-4 rounded-2xl font-bold text-white transition-all shadow-xl shadow-purple-600/20 flex items-center justify-center gap-3 disabled:opacity-50"
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="animate-spin" size={20} />
                                Posting...
                            </>
                        ) : (
                            'Submit Post'
                        )}
                    </button>
                </div>
            </motion.form>
        </div>
    );
};

// Post Details Modal
const PostDetailsModal = ({ post, onClose, currentUserId }) => {
    const [comment, setComment] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsCommenting(true);
        setTimeout(() => {
            // In a real app, you would update the post with new comment
            setIsCommenting(false);
            setComment('');
        }, 1000);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gradient-to-br from-[#151521] to-[#1a1a2e] w-full max-w-6xl h-[85vh] rounded-[3rem] border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white ${post.role === 'admin'
                                    ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                                    : 'bg-gradient-to-br from-purple-600 to-pink-600'
                                    }`}>
                                    {post.author[0]}
                                </div>
                                <div>
                                    <h3 className="text-white font-bold text-lg">{post.author}</h3>
                                    <p className="text-sm text-gray-500">{post.time} • {post.batch}</p>
                                </div>
                            </div>

                            <div className="flex flex-wrap gap-3 mb-6">
                                <span className={`text-xs px-3 py-1.5 rounded-lg font-bold uppercase ${post.status === 'Resolved'
                                    ? 'bg-green-500/20 text-green-400'
                                    : post.status === 'In Progress'
                                        ? 'bg-yellow-500/20 text-yellow-400'
                                        : 'bg-purple-500/20 text-purple-400'
                                    }`}>
                                    {post.status}
                                </span>
                                <span className="bg-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-lg font-bold">
                                    {post.postType}
                                </span>
                                {post.reposts.some(repost => repost.authorId === currentUserId) && (
                                    <span className="bg-purple-500/20 text-purple-400 text-xs px-3 py-1.5 rounded-lg font-bold">
                                        You Reposted
                                    </span>
                                )}
                            </div>
                        </div>

                        <button
                            onClick={onClose}
                            className="text-gray-500 hover:text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 leading-tight">
                        {post.title}
                    </h2>

                    <p className="text-gray-300 text-lg leading-relaxed mb-12">
                        {post.content}
                    </p>

                    {/* Common Issues Section */}
                    {post.reposts.length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Repeat className="text-purple-500" size={20} />
                                <h4 className="text-white font-bold text-lg">
                                    {post.reposts.length} Other {post.reposts.length === 1 ? 'Person Has' : 'People Have'} This Issue
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {post.reposts.map(repost => (
                                    <div key={repost.id} className="bg-white/5 border border-white/5 p-4 rounded-2xl">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                                <span className="text-purple-400 font-bold">{repost.author[0]}</span>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">{repost.author}</p>
                                                <p className="text-[10px] text-gray-500">{repost.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comments Section */}
                    <div className="border-t border-white/10 pt-12">
                        <div className="flex items-center gap-3 mb-8">
                            <MessageSquare className="text-purple-500" size={24} />
                            <h4 className="text-white font-bold text-xl">
                                Comments ({post.comments.length})
                            </h4>
                        </div>

                        <div className="space-y-6 mb-8">
                            {post.comments.map(comment => (
                                <div key={comment.id} className="bg-white/5 border border-white/5 p-6 rounded-3xl">
                                    <div className="flex justify-between items-start mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                                <span className="text-blue-400 font-bold">{comment.author[0]}</span>
                                            </div>
                                            <div>
                                                <span className="text-purple-400 font-bold text-sm">{comment.author}</span>
                                                <p className="text-gray-500 text-xs">{comment.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed">{comment.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment */}
                        <form onSubmit={handleCommentSubmit} className="relative">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-sm text-white outline-none focus:border-purple-500/50 resize-none h-32"
                                placeholder="Add a helpful comment..."
                            />
                            <button
                                type="submit"
                                disabled={isCommenting || !comment.trim()}
                                className="absolute right-4 bottom-4 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2.5 rounded-xl text-xs font-bold text-white hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
                            >
                                {isCommenting ? (
                                    <>
                                        <Loader2 className="animate-spin" size={14} />
                                        Posting...
                                    </>
                                ) : (
                                    'Post Comment'
                                )}
                            </button>
                        </form>
                    </div>
                </div>

                {/* Sidebar Info */}
                <div className="w-full md:w-96 bg-black/20 p-8 flex flex-col border-t md:border-t-0 md:border-l border-white/10">
                    <div className="mb-10">
                        <h3 className="text-white font-black text-xs uppercase tracking-widest mb-6">Post Information</h3>

                        <div className="space-y-6">
                            <InfoRow
                                label="Status"
                                value={post.status}
                                icon={<CheckCircle2 size={16} />}
                                color={post.status === 'Resolved' ? 'green' : 'purple'}
                            />
                            <InfoRow label="Post Type" value={post.postType} icon={<Hash size={16} />} />
                            <InfoRow label="Author" value={post.author} icon={<User size={16} />} />
                            <InfoRow label="Batch" value={post.batch} icon={<Info size={16} />} />
                            <InfoRow label="Date" value={post.time} icon={<Calendar size={16} />} />
                            <InfoRow label="Views" value={post.views} icon={<Eye size={16} />} />
                            <InfoRow
                                label="Common Issue"
                                value={post.reposts.length > 0 ? `${post.reposts.length} people affected` : 'No'}
                                icon={<Users size={16} />}
                            />
                        </div>
                    </div>

                    <div className="mt-auto space-y-4">
                        <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6 rounded-[2rem]">
                            <div className="flex items-start gap-4">
                                <AlertCircle className="text-blue-500 shrink-0 mt-1" size={20} />
                                <div>
                                    <p className="text-xs text-blue-300 leading-normal font-medium">
                                        Currently <b className="text-white">{post.status}</b>.
                                        {post.status === 'Resolved'
                                            ? ' Issue has been resolved.'
                                            : ' Expected resolution by 22 Dec 2025.'
                                        }
                                    </p>
                                    {post.status !== 'Resolved' && (
                                        <p className="text-[10px] text-blue-400/70 mt-2">Thank you for your patience.</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2">
                                <Bookmark size={14} />
                                Save
                            </button>
                            <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl py-3 text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2">
                                <Share2 size={14} />
                                Share
                            </button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const InfoRow = ({ label, value, icon, color = 'gray' }) => {
    const colorClasses = {
        green: 'text-green-400',
        purple: 'text-purple-400',
        blue: 'text-blue-400',
        gray: 'text-white'
    };

    return (
        <div className="flex justify-between items-center text-sm">
            <div className="flex items-center gap-3 text-gray-500 font-bold uppercase tracking-wider">
                <div className={`p-2 rounded-lg bg-white/5 border border-white/5 ${colorClasses[color]}`}>
                    {icon}
                </div>
                <span>{label}</span>
            </div>
            <div className={`font-bold ${colorClasses[color]}`}>{value}</div>
        </div>
    );
};

export default HelpDeskPage;