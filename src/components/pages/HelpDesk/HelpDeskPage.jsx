import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { motion, AnimatePresence } from 'framer-motion';
import { useForm } from 'react-hook-form';
import {
    X, Image as ImageIcon, MessageSquare, Send, ChevronRight,
    Calendar, User, Hash, Info, Bookmark, Link as LinkIcon,
    Loader2, Search, Filter, CheckCircle2, AlertCircle,
    File, Video, Upload, Users, Eye, Share2, Repeat, Tag,
    Facebook, Twitter, Linkedin, Copy, Link2, Instagram, Globe
} from 'lucide-react';

import 'swiper/css';
import 'swiper/css/pagination';

// PostType Enum
export const PostType = {
    // --- University Focused ---
    CORE_COURSE: "Core.Course",
    ELECTIVE_COURSE: "Elective.Course",
    LAB_SESSION: "Lab.Session",
    RESEARCH_PROJECT: "Research.Project",

    // --- Corporate Focused ---
    CORPORATE_TRAINING: "Corporate.Training",
    COMPLIANCE_MODULE: "Compliance.Module",
    ONBOARDING_SESSION: "Onboarding.Session",

    // --- General (Both) ---
    SKILL_DEVELOPMENT: "Skill.Development",
    WORKSHOP_SEMINAR: "Workshop.Seminar",
    CERTIFICATION_PROGRAM: "Certification.Program"
};

// PostCategory Enum
export const PostCategory = {
    // --- Science & Engineering Subjects ---
    PHYSICS: "Physics",
    CHEMISTRY: "Chemistry",
    MATHEMATICS: "Mathematics",
    HIGHER_MATH: "Higher.Math",
    BIOLOGY: "Biology",
    ZOOLOGY: "Zoology",
    BOTANY: "Botany",
    GENERAL_SCIENCE: "General.Science",
    COMPUTER_SCIENCE: "Computer.Science",
    ELECTRICAL_ENG: "Electrical.Engineering",
    CIVIL_ENG: "Civil.Engineering",

    // --- Arts & Humanities ---
    BANGLA: "Bangla",
    ENGLISH: "English",
    HISTORY: "History",
    ECONOMICS: "Economics",
    CIVICS: "Civics",
    GEOGRAPHY: "Geography",
    PSYCHOLOGY: "Psychology",
    SOCIOLOGY: "Sociology",
    POLITICAL_SCIENCE: "Political.Science",
    ISLAMIC_STUDIES: "Islamic.Studies",
    LAW: "Law",

    // --- Business Studies ---
    ACCOUNTING: "Accounting",
    FINANCE: "Finance",
    MARKETING: "Marketing",
    MANAGEMENT: "Management",
    STATISTICS: "Statistics",
    BUSINESS_MATH: "Business.Math",

    // --- IT & Software Development ---
    WEB_DEVELOPMENT: "Web.Development",
    APP_DEVELOPMENT: "App.Development",
    SOFTWARE_ENGINEERING: "Software.Engineering",
    GAME_DEVELOPMENT: "Game.Development",
    UI_UX_DESIGN: "UI.UX.Design",
    DEVOPS: "DevOps",
    CYBER_SECURITY: "Cyber.Security",
    CLOUD_COMPUTING: "Cloud.Computing",
    BLOCKCHAIN: "Blockchain",
    DATA_SCIENCE: "Data.Science",
    MACHINE_LEARNING: "Machine.Learning",
    ARTIFICIAL_INTELLIGENCE: "Artificial.Intelligence",

    // --- Programming Languages & Tools ---
    JAVASCRIPT: "JavaScript",
    PYTHON: "Python",
    JAVA: "Java",
    C_PROGRAMMING: "C.Programming",
    C_PLUS_PLUS: "C.Plus.Plus",
    TYPESCRIPT: "TypeScript",
    PHP: "PHP",
    DATABASE: "Database",
    GIT_GITHUB: "Git.GitHub",

    // --- Skill Development & Others ---
    FREELANCING: "Freelancing",
    DIGITAL_MARKETING: "Digital.Marketing",
    GRAPHICS_DESIGN: "Graphics.Design",
    VIDEO_EDITING: "Video.Editing",
    IELTS_PREPARATION: "IELTS.Preparation",
    JOB_PREPARATION: "Job.Preparation",
    RESEARCH: "Research"
};

const HelpDeskPage = () => {
    const [activeTab, setActiveTab] = useState('All Post');
    const [selectedTopic, setSelectedTopic] = useState('All');
    const [postFilter, setPostFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [commonIssues, setCommonIssues] = useState([]);
    const [keywordsInput, setKeywordsInput] = useState('');
    const [showShareOptions, setShowShareOptions] = useState(false);
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
            postType: "Course Topic",
            postCategory: PostCategory.COMPUTER_SCIENCE,
            keywords: ["assignment", "submit", "button", "skip"],
            content: "Assignment Skip korar jonno submit button a click kore then porer module a jawa lage. Akn assignment submit er somoy ki likhbo? Blank rakha jassena.",
            reposts: [
                { id: "r1", author: "Rahim Khan", authorId: "u3", time: "Dec 15, 2025", profilePic: "RK" },
                { id: "r2", author: "Karim Ahmed", authorId: "u4", time: "Dec 16, 2025", profilePic: "KA" }
            ],
            views: 145,
            attachments: [
                { id: "att1", type: "image", url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop", name: "assignment_screenshot.png" }
            ],
            comments: [
                { id: "c1", author: "Admin Rakib", text: "You can write 'N/A' or describe why you skipped.", time: "2 hours ago" },
                { id: "c2", author: "Tanvir Mahtab", text: "Thank you for the suggestion!", time: "1 hour ago" }
            ],
            isHidden: false
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
            postCategory: PostCategory.WEB_DEVELOPMENT,
            keywords: ["app", "update", "crash", "desktop"],
            content: "App open korle update pop up ase kinto click korle crash khay.",
            reposts: [],
            views: 89,
            attachments: [
                { id: "att2", type: "video", url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4", name: "app_crash.mp4" },
                { id: "att3", type: "image", url: "https://images.unsplash.com/photo-1551650975-87deedd944c3?w-400&h=300&fit=crop", name: "error_screenshot.png" }
            ],
            comments: [],
            isHidden: false
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
            postCategory: PostCategory.JAVASCRIPT,
            keywords: ["react", "hook", "dependency", "warning"],
            content: "For React hook dependencies, make sure to include all variables that change over time. This is a common issue many students face.",
            reposts: [],
            views: 234,
            attachments: [],
            comments: [
                { id: "c3", author: "Student", text: "This helped me fix my issue!", time: "1 day ago" }
            ],
            isHidden: false
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
            postType: "Course Topic",
            postCategory: PostCategory.COMPUTER_SCIENCE,
            keywords: ["course", "materials", "download", "error"],
            content: "Course materials download hoy na, error show korche. Screenshot attach korlam jate bujhte paren kemon error.",
            reposts: [
                { id: "r3", author: "Me", authorId: "u-current", time: "Just now", profilePic: "M" },
                { id: "r4", author: "John Doe", authorId: "u6", time: "1 hour ago", profilePic: "JD" },
                { id: "r5", author: "Jane Smith", authorId: "u7", time: "2 hours ago", profilePic: "JS" }
            ],
            views: 67,
            attachments: [
                { id: "att4", type: "image", url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop", name: "download_error.png" },
                { id: "att5", type: "image", url: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=300&fit=crop", name: "error_details.png" }
            ],
            comments: [],
            isHidden: false
        },
        {
            id: "5",
            title: "Dark Mode Feature Request",
            author: "Ahmed Hossain",
            authorId: "u8",
            role: "user",
            time: "Dec 23, 2025",
            batch: "Batch 10",
            status: "In Progress",
            postType: "Feature Request",
            postCategory: PostCategory.UI_UX_DESIGN,
            keywords: ["dark", "mode", "theme", "eye comfort"],
            content: "App e dark mode add korle valo hoto, ratri bela use korte chaile light theme e chokhe lage.",
            reposts: [
                { id: "r6", author: "Rifat Islam", authorId: "u9", time: "3 hours ago", profilePic: "RI" }
            ],
            views: 92,
            attachments: [
                { id: "att6", type: "image", url: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=400&h=300&fit=crop", name: "dark_mode_design.png" }
            ],
            comments: [],
            isHidden: false
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

    // Topic Types for filtering
    const topicTypes = ['All', 'Course Topic', 'Feature Request', 'Bugs', 'Announcements', 'Resolved'];

    // Simulate loading
    useEffect(() => {
        const timer = setTimeout(() => setIsLoading(false), 1500);
        return () => clearTimeout(timer);
    }, []);

    // Calculate common issues
    useEffect(() => {
        const common = posts.filter(post =>
            post.reposts.length > 0 &&
            !post.isHidden
        );
        setCommonIssues(common);
    }, [posts]);

    // File upload handler
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setSelectedFiles(prev => [...prev, ...files.slice(0, 5)]);
    };

    // Handle keyword input with # support
    const handleKeywordInput = (e) => {
        const value = e.target.value;
        setKeywordsInput(value);
    };

    // Convert keyword string to array
    const parseKeywords = (keywordString) => {
        if (!keywordString) return [];

        // Split by comma or space, remove # and trim
        return keywordString
            .split(/[, ]+/)
            .map(keyword => keyword.replace(/^#+/, '').trim())
            .filter(keyword => keyword.length > 0);
    };

    // Filter posts based on selected topic and post filter
    const filteredPosts = posts.filter(post => {
        if (post.isHidden && postFilter !== 'common') return false;

        const topicMatch = selectedTopic === 'All' || post.postType === selectedTopic;

        let filterMatch = true;
        if (postFilter === 'my') {
            filterMatch = post.authorId === currentUser.id ||
                post.reposts.some(repost => repost.authorId === currentUser.id);
        } else if (postFilter === 'admin') {
            filterMatch = post.role === 'admin';
        } else if (postFilter === 'common') {
            filterMatch = post.reposts.length > 0 && !post.isHidden;
        }

        const searchMatch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (post.keywords && post.keywords.some(keyword =>
                keyword.toLowerCase().includes(searchQuery.toLowerCase())
            ));

        return topicMatch && filterMatch && searchMatch;
    });

    // Handle post submission with duplicate detection
    const onPostSubmit = (data) => {
        setIsLoading(true);

        // Parse keywords
        const keywordsArray = parseKeywords(data.keywords || '');

        // Check for similar posts
        const similarPost = posts.find(post => {
            const titleMatch = post.title.toLowerCase().includes(data.title.toLowerCase());
            const contentMatch = post.content.toLowerCase().includes(data.content.toLowerCase().substring(0, 50));
            const keywordsMatch = keywordsArray.length > 0 && post.keywords &&
                keywordsArray.some(keyword =>
                    post.keywords.some(postKeyword =>
                        postKeyword.toLowerCase().includes(keyword.toLowerCase())
                    )
                );

            return titleMatch || contentMatch || keywordsMatch;
        });

        setTimeout(() => {
            if (similarPost) {
                // Add as repost to existing post and hide the new post
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
                                    time: "Just now",
                                    profilePic: currentUser.name[0]
                                }
                            ],
                            isHidden: false
                        }
                        : post
                );
                setPosts(updatedPosts);

                // Hide the duplicate post that was created
                const newPostWithDuplicateFlag = {
                    ...data,
                    keywords: keywordsArray,
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
                    attachments: selectedFiles.map((file, index) => ({
                        id: `att${Date.now() + index}`,
                        type: file.type.startsWith('image/') ? 'image' : 'video',
                        url: URL.createObjectURL(file),
                        name: file.name
                    })),
                    isHidden: true
                };

                setPosts(prev => [newPostWithDuplicateFlag, ...prev]);

                // Show notification for common issue
                alert(`This issue has been reported by ${similarPost.author}. Your profile has been added to the existing post.`);
            } else {
                // Create new post
                const newPost = {
                    ...data,
                    keywords: keywordsArray,
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
                    attachments: selectedFiles.map((file, index) => ({
                        id: `att${Date.now() + index}`,
                        type: file.type.startsWith('image/') ? 'image' : 'video',
                        url: URL.createObjectURL(file),
                        name: file.name
                    })),
                    isHidden: false
                };
                setPosts([newPost, ...posts]);
            }

            setSelectedFiles([]);
            setKeywordsInput('');
            setIsLoading(false);
            setCreateModalOpen(false);
        }, 1000);
    };

    // Handle share/ask click
    const handleShareClick = () => {
        setCreateModalOpen(true);
    };

    // Handle repost
    const handleRepost = (postId) => {
        const updatedPosts = posts.map(post => {
            if (post.id === postId) {
                const isAlreadyReposted = post.reposts.some(repost => repost.authorId === currentUser.id);
                if (!isAlreadyReposted) {
                    return {
                        ...post,
                        reposts: [
                            ...post.reposts,
                            {
                                id: `r${Date.now()}`,
                                author: currentUser.name,
                                authorId: currentUser.id,
                                time: "Just now",
                                profilePic: currentUser.name[0]
                            }
                        ]
                    };
                }
            }
            return post;
        });
        setPosts(updatedPosts);
    };

    // Handle social media sharing
    const handleSocialShare = (platform, post) => {
        const postUrl = `https://helpdesk.com/post/${post.id}`;
        const text = `Check out this post: ${post.title}`;

        let shareUrl = '';

        switch (platform) {
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(postUrl)}`;
                break;
            case 'twitter':
                shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(postUrl)}&text=${encodeURIComponent(text)}`;
                break;
            case 'linkedin':
                shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(postUrl)}`;
                break;
            case 'instagram':
                shareUrl = `https://www.instagram.com/`;
                break;
            case 'copy':
                navigator.clipboard.writeText(postUrl);
                alert('Link copied to clipboard!');
                return;
            default:
                return;
        }

        window.open(shareUrl, '_blank', 'width=600,height=400');
        setShowShareOptions(false);
    };

    return (
        <div className="min-h-screen overflow-hidden bg-[#0a0a0f] text-gray-300 p-4 md:p-10">
            <div className="max-w-7xl mx-auto">

                {/* Tab Section */}
                <div className="flex bg-white/5 p-1 rounded-xl mb-10 w-fit">
                    <button
                        onClick={() => setActiveTab('All Post')}
                        className={`px-8 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 ${activeTab === 'All Post' ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/30' : 'hover:text-white text-gray-500'}`}
                    >
                        All Post
                    </button>
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
                                <div className="bg-gradient-to-br from-[#151521] to-[#1a1a2e] border border-white/10 p-6 rounded-2xl flex gap-5 items-center hover:border-purple-500/30 transition-all duration-300 group">
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
                        <div className="bg-[#151521] border border-white/10 rounded-2xl p-5">
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search posts..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-transparent pl-12 pr-4 py-3 text-sm rounded-lg border border-white/5 focus:border-purple-500/50 outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Post Type Filter */}
                        <div className="bg-[#151521] border border-white/10 rounded-2xl p-6 sticky top-10">
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
                                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 group ${postFilter === filter.value
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

                        {/* Topic Type Filter */}
                        <div className="bg-[#151521] border border-white/10 rounded-2xl p-6">
                            <h3 className="text-white font-bold mb-6 text-sm tracking-widest uppercase opacity-50">Topic Type Filter</h3>
                            <div className="space-y-2">
                                {topicTypes.map(topic => (
                                    <button
                                        key={topic}
                                        onClick={() => setSelectedTopic(topic)}
                                        className={`w-full flex items-center justify-between p-4 rounded-xl transition-all duration-300 ${selectedTopic === topic
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
                        <div className="bg-gradient-to-br from-[#151521] to-[#1a1a2e] border border-white/10 p-6 rounded-2xl mb-8 flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 border border-white/10 flex items-center justify-center">
                                <span className="text-white font-bold">{currentUser.name[0]}</span>
                            </div>
                            <div
                                onClick={handleShareClick}
                                className="flex-1 bg-white/5 border border-dashed border-white/10 rounded-xl px-6 py-4 text-gray-400 text-sm cursor-pointer hover:bg-white/10 hover:border-purple-500/30 transition-all duration-300 group"
                            >
                                <div className="flex items-center gap-3">
                                    <Share2 size={18} className="text-purple-500 group-hover:scale-110 transition-transform" />
                                    <span className="font-medium">Share or Ask Something to Everyone?</span>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => fileInputRef.current.click()}
                                    className="bg-white/5 border border-white/10 rounded-lg p-3 text-gray-400 hover:text-purple-500 hover:border-purple-500/30 hover:bg-purple-500/10 transition-all duration-300 group"
                                    title="Upload Photo/Video"
                                >
                                    <ImageIcon size={20} className="group-hover:scale-110 transition-transform" />
                                </button>
                                <button
                                    onClick={handleShareClick}
                                    className="bg-purple-600 border border-purple-600 rounded-lg p-3 text-white hover:bg-purple-700 transition-all duration-300 shadow-lg shadow-purple-600/20"
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
                            <div className="mb-6 p-4 bg-white/5 border border-white/10 rounded-xl">
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
                                        {postFilter === 'common' && (
                                            <span className="ml-2">
                                                ({commonIssues.length} common issues)
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-xs text-gray-500">
                                        {postFilter === 'common' && `${commonIssues.length} common issues found`}
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
                                                className="bg-gradient-to-br from-[#151521] to-[#1a1a2e] border border-white/10 p-8 rounded-2xl hover:border-purple-500/40 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-500 cursor-pointer group"
                                            >
                                                <div className="flex justify-between items-start mb-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-white shadow-xl ${post.role === 'admin'
                                                            ? 'bg-gradient-to-br from-blue-600 to-cyan-600'
                                                            : 'bg-gradient-to-br from-purple-600 to-pink-600'
                                                            } relative`}>
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
                                                                {post.time} • {post.postType}
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

                                                {/* Keywords */}
                                                {post.keywords && post.keywords.length > 0 && (
                                                    <div className="flex flex-wrap gap-2 mt-4">
                                                        {post.keywords.slice(0, 5).map((keyword, index) => (
                                                            <span key={index} className="text-xs bg-white/5 text-gray-400 px-3 py-1 rounded-full border border-white/5">
                                                                #{keyword}
                                                            </span>
                                                        ))}
                                                        {post.keywords.length > 5 && (
                                                            <span className="text-xs text-gray-500">
                                                                +{post.keywords.length - 5} more
                                                            </span>
                                                        )}
                                                    </div>
                                                )}

                                                {/* Attachment indicators */}
                                                {post.attachments && post.attachments.length > 0 && (
                                                    <div className="flex items-center gap-4 mt-6">
                                                        <div className="flex items-center gap-2 text-xs text-gray-500">
                                                            <ImageIcon size={14} />
                                                            <span>{post.attachments.filter(a => a.type === 'image').length} Images</span>
                                                        </div>
                                                        {post.attachments.some(a => a.type === 'video') && (
                                                            <div className="flex items-center gap-2 text-xs text-gray-500">
                                                                <Video size={14} />
                                                                <span>Video</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                )}

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
                                                            {post.postCategory}
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
                        keywordsInput={keywordsInput}
                        setKeywordsInput={setKeywordsInput}
                        handleKeywordInput={handleKeywordInput}
                    />
                )}
                {selectedPost && (
                    <PostDetailsModal
                        post={selectedPost}
                        onClose={() => setSelectedPost(null)}
                        currentUserId={currentUser.id}
                        onRepost={handleRepost}
                        showShareOptions={showShareOptions}
                        setShowShareOptions={setShowShareOptions}
                        handleSocialShare={handleSocialShare}
                    />
                )}
            </AnimatePresence>
        </div>
    );
};

// Create Post Modal
const CreatePostModal = ({ onClose, onSubmit, selectedFiles, setSelectedFiles, fileInputRef, handleFileUpload, keywordsInput, setKeywordsInput }) => {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm();

    // Suggestion State
    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);

    // Keyword Suggestion Logic
    useEffect(() => {
        const lastWord = keywordsInput.split(/[\s,]+/).pop();
        if (lastWord && lastWord.startsWith("#")) {
            const searchTerm = lastWord.slice(1).toLowerCase();
            const filtered = Object.values(PostCategory).filter(cat =>
                cat.toLowerCase().includes(searchTerm)
            );
            setSuggestions(filtered);
            setShowSuggestions(true);
        } else {
            setShowSuggestions(false);
        }
    }, [keywordsInput]);

    const selectSuggestion = (suggestion) => {
        const words = keywordsInput.split(/[\s,]+/);
        words.pop(); // Remove the partial hashtag
        const newValue = [...words, `#${suggestion.replace(/\s+/g, '')}`].join(" ") + " ";
        setKeywordsInput(newValue);
        setShowSuggestions(false);
    };

    const removeFile = (index) => {
        setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md overflow-hidden">
            <motion.form
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                onSubmit={handleSubmit(onSubmit)}
                // Fixed: max-h-[90vh] and overflow-y-auto added to prevent going off-screen
                className="bg-gradient-to-br from-[#1a1a2e] to-[#16213e] w-full max-w-2xl rounded-2xl border border-white/10 flex flex-col max-h-[90vh] shadow-2xl relative"
            >
                {/* Close button */}
                <button
                    type="button"
                    onClick={onClose}
                    className="absolute -top-3 -right-3 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-[110] shadow-lg"
                >
                    <X size={18} />
                </button>

                {/* Header */}
                <div className="p-8 pb-0">
                    <h2 className="text-2xl font-bold text-white mb-4">Create New Post</h2>
                </div>

                {/* Scrollable Content Body */}
                <div className="p-8 pt-2 overflow-y-auto custom-scrollbar space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Title *</label>
                        <input
                            {...register("title", { required: "Title is required" })}
                            className="w-full bg-transparent border border-white/10 rounded-lg p-4 text-white outline-none focus:border-purple-500 transition-all"
                            placeholder="What's the issue?"
                        />
                        {errors.title && <p className="text-red-400 text-sm mt-2">{errors.title.message}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2">Post Type *</label>
                            <select
                                {...register("postCategory", { required: "Category is required" })}
                                className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg p-4 text-white outline-none focus:border-purple-500"
                            >
                                <option value="" className="bg-[#1a1a2e]">Select Type</option>
                                {Object.entries(PostType).map(([key, value]) => (
                                    <option key={key} value={value} className="bg-[#1a1a2e]">
                                        {value.replace('.', ' ')}
                                    </option>
                                ))}
                            </select>
                        </div>
                        {/* <div>
                            <label className="block text-sm font-bold text-gray-400 mb-2">Post Category *</label>
                            <select
                                {...register("postCategory", { required: "Category is required" })}
                                className="w-full bg-[#1a1a2e] border border-white/10 rounded-lg p-4 text-white outline-none focus:border-purple-500"
                            >
                                <option value="" className="bg-[#1a1a2e]">Select Category</option>
                                {Object.entries(PostCategory).map(([key, value]) => (
                                    <option key={key} value={value} className="bg-[#1a1a2e]">
                                        {value.replace('.', ' ')}
                                    </option>
                                ))}
                            </select>
                        </div> */}

                        {/* Keywords with Auto-Suggestion */}
                        <div className="relative">
                            <label className="block text-sm font-bold text-gray-400 mb-2 flex items-center gap-2">
                                <Tag size={16} />
                                Keywords (Type # for suggestions)
                            </label>
                            <input
                                value={keywordsInput}
                                onChange={(e) => setKeywordsInput(e.target.value)}
                                className="w-full bg-transparent border border-white/10 rounded-lg p-4 text-white outline-none focus:border-purple-500 transition-all"
                                placeholder="#physics #assignment"
                                autoComplete="off"
                            />

                            {/* Suggestion Dropdown */}
                            {showSuggestions && suggestions.length > 0 && (
                                <ul className="absolute z-[120] w-full mt-1 bg-[#252644] border border-white/20 rounded-lg shadow-2xl max-h-48 overflow-y-auto ring-1 ring-purple-500/50">
                                    {suggestions.map((s, index) => (
                                        <li
                                            key={index}
                                            onClick={() => selectSuggestion(s)}
                                            className="p-3 hover:bg-purple-600 text-white cursor-pointer transition-colors border-b border-white/5 last:border-0 flex items-center gap-2"
                                        >
                                            <Tag size={14} className="text-purple-400" />
                                            #{s.replace('.', ' ')}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>

                    </div>

                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Description *</label>
                        <textarea
                            {...register("content", {
                                required: "Description is required",
                                minLength: { value: 20, message: "Please provide more details (min 20 characters)" }
                            })}
                            className="w-full bg-transparent border border-white/10 rounded-lg p-4 text-white h-32 outline-none focus:border-purple-500 resize-none"
                            placeholder="Describe your issue in detail..."
                        />
                        {errors.content && <p className="text-red-400 text-sm mt-2">{errors.content.message}</p>}
                    </div>


                    {/* File Upload Section */}
                    <div>
                        <label className="block text-sm font-bold text-gray-400 mb-2">Attach Screenshots/Images</label>
                        <div
                            onClick={() => fileInputRef.current.click()}
                            className="border-2 border-dashed border-white/10 rounded-lg p-6 text-center cursor-pointer hover:border-purple-500/50 hover:bg-white/5 transition-all group"
                        >
                            <Upload className="mx-auto text-gray-500 group-hover:text-purple-500 mb-3" size={28} />
                            <p className="text-gray-400">Click to upload screenshots or images</p>
                            <input type="file" ref={fileInputRef} className="hidden" multiple accept="image/*,video/*" onChange={handleFileUpload} />
                        </div>
                        {selectedFiles.length > 0 && (
                            <div className="flex flex-wrap gap-3 mt-4">
                                {selectedFiles.map((file, index) => (
                                    <div key={index} className="flex items-center gap-2 bg-white/5 px-4 py-3 rounded-lg border border-white/5">
                                        {file.type.startsWith('image/') ? <ImageIcon size={16} className="text-purple-500" /> : <Video size={16} className="text-blue-500" />}
                                        <span className="text-xs truncate max-w-[100px]">{file.name}</span>
                                        <X size={14} onClick={() => removeFile(index)} className="cursor-pointer hover:text-red-500" />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Footer Sticky - To keep buttons visible */}
                <div className="p-8 pt-4 border-t border-white/10 bg-[#16213e] rounded-b-2xl flex gap-4">
                    <button type="button" onClick={onClose} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-4 font-bold text-gray-400 transition-all">
                        Cancel
                    </button>
                    <button type="submit" disabled={isSubmitting} className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-4 rounded-lg font-bold text-white transition-all flex items-center justify-center gap-3">
                        {isSubmitting ? <><Loader2 className="animate-spin" size={20} /> Posting...</> : 'Submit Post'}
                    </button>
                </div>
            </motion.form>
        </div>
    );
};



// Post Details Modal
const PostDetailsModal = ({ post, onClose, currentUserId, onRepost, showShareOptions, setShowShareOptions, handleSocialShare }) => {
    const [comment, setComment] = useState('');
    const [isCommenting, setIsCommenting] = useState(false);

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (!comment.trim()) return;

        setIsCommenting(true);
        setTimeout(() => {
            setIsCommenting(false);
            setComment('');
        }, 1000);
    };

    // Filter out current user from reposts
    const filteredReposts = post.reposts.filter(repost => repost.authorId !== currentUserId);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-gradient-to-br from-[#151521] to-[#1a1a2e] w-full max-w-6xl h-[90vh] rounded-2xl border border-white/10 overflow-hidden flex flex-col md:flex-row shadow-2xl relative"
            >
                {/* Close button at top right corner */}
                <button
                    onClick={onClose}
                    className="absolute -top-3 -right-3 w-10 h-10 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600 transition-colors z-10 shadow-lg"
                >
                    <X size={20} />
                </button>

                {/* Main Content */}
                <div className="flex-1 overflow-y-auto p-6 md:p-8 custom-scrollbar">
                    <div className="flex justify-between items-start mb-6">
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
                                {/* <span className="bg-white/10 text-gray-300 text-xs px-3 py-1.5 rounded-lg font-bold">
                                    {post.postCategory}
                                </span> */}
                                {post.reposts.some(repost => repost.authorId === currentUserId) && (
                                    <span className="bg-purple-500/20 text-purple-400 text-xs px-3 py-1.5 rounded-lg font-bold">
                                        You Reposted
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 leading-tight">
                        {post.title}
                    </h2>

                    <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {post.content}
                    </p>

                    {/* Keywords */}
                    {post.keywords && post.keywords.length > 0 && (
                        <div className="mb-8">
                            <div className="flex items-center gap-2 mb-4">
                                <Tag className="text-purple-500" size={18} />
                                <h4 className="text-white font-bold">Keywords</h4>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {post.keywords.map((keyword, index) => (
                                    <span key={index} className="bg-white/5 text-gray-300 text-sm px-4 py-2 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                        #{keyword}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Attachments/Screenshots */}
                    {post.attachments && post.attachments.length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <ImageIcon className="text-purple-500" size={20} />
                                <h4 className="text-white font-bold text-lg">
                                    Attached Screenshots ({post.attachments.length})
                                </h4>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {post.attachments.map(attachment => (
                                    <div key={attachment.id} className="bg-white/5 border border-white/10 rounded-xl overflow-hidden">
                                        {attachment.type === 'image' ? (
                                            <div className="relative">
                                                <img
                                                    src={attachment.url}
                                                    alt={attachment.name}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="absolute bottom-0 left-0 right-0 bg-black/70 p-3">
                                                    <p className="text-white text-sm truncate">{attachment.name}</p>
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <Video className="text-blue-500" size={24} />
                                                    <div>
                                                        <p className="text-white font-bold">{attachment.name}</p>
                                                        <p className="text-gray-400 text-sm">Video attachment</p>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Common Issues Section */}
                    {post.reposts.length > 0 && (
                        <div className="mb-12">
                            <div className="flex items-center gap-3 mb-6">
                                <Repeat className="text-purple-500" size={20} />
                                <h4 className="text-white font-bold text-lg">
                                    {post.reposts.length} Other {post.reposts.length === 1 ? 'Person Has' : 'People Have'} This Issue
                                </h4>
                                <button
                                    onClick={() => onRepost(post.id)}
                                    className="ml-auto bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-colors"
                                    disabled={post.reposts.some(repost => repost.authorId === currentUserId)}
                                >
                                    <Repeat size={14} />
                                    {post.reposts.some(repost => repost.authorId === currentUserId) ? 'Already Reposted' : 'I Have This Too'}
                                </button>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredReposts.map(repost => (
                                    <div key={repost.id} className="bg-white/5 border border-white/5 p-4 rounded-xl hover:bg-white/10 transition-colors">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
                                                <span className="text-purple-400 font-bold">{repost.profilePic || repost.author[0]}</span>
                                            </div>
                                            <div>
                                                <p className="text-white font-bold text-sm">{repost.author}</p>
                                                <p className="text-[10px] text-gray-500">{repost.time}</p>
                                            </div>
                                            <a
                                                href={`/profile/${repost.authorId}`}
                                                className="ml-auto text-gray-500 hover:text-purple-500"
                                            >
                                                <Globe size={14} />
                                            </a>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Comments Section */}
                    <div className="border-t border-white/10 pt-8">
                        <div className="flex items-center gap-3 mb-6">
                            <MessageSquare className="text-purple-500" size={24} />
                            <h4 className="text-white font-bold text-xl">
                                Comments ({post.comments.length})
                            </h4>
                        </div>

                        <div className="space-y-4 mb-6">
                            {post.comments.map(comment => (
                                <div key={comment.id} className="bg-white/5 border border-white/5 p-4 rounded-xl">
                                    <div className="flex justify-between items-start mb-3">
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-cyan-500/20 flex items-center justify-center">
                                                <span className="text-blue-400 font-bold text-sm">{comment.author[0]}</span>
                                            </div>
                                            <div>
                                                <span className="text-purple-400 font-bold text-sm">{comment.author}</span>
                                                <p className="text-gray-500 text-xs">{comment.time}</p>
                                            </div>
                                        </div>
                                    </div>
                                    <p className="text-gray-300 text-sm leading-relaxed pl-11">{comment.text}</p>
                                </div>
                            ))}
                        </div>

                        {/* Add Comment */}
                        <form onSubmit={handleCommentSubmit} className="relative">
                            <textarea
                                value={comment}
                                onChange={(e) => setComment(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-lg p-4 text-sm text-white outline-none focus:border-purple-500/50 resize-none h-28"
                                placeholder="Add a helpful comment..."
                            />
                            <button
                                type="submit"
                                disabled={isCommenting || !comment.trim()}
                                className="absolute right-4 bottom-4 bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-2 rounded-lg text-xs font-bold text-white hover:from-purple-700 hover:to-blue-700 transition-all disabled:opacity-50 flex items-center gap-2"
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
                <div className="w-full md:w-80 bg-black/20 p-6 flex flex-col border-t md:border-t-0 md:border-l border-white/10">
                    <div className="mb-8">
                        <h3 className="text-white font-black text-xs uppercase tracking-widest mb-6">Post Information</h3>

                        <div className="space-y-6">
                            <InfoRow
                                label="Status"
                                value={post.status}
                                icon={<CheckCircle2 size={16} />}
                                color={post.status === 'Resolved' ? 'green' : 'purple'}
                            />
                            <InfoRow label="Post Type" value={post.postType} icon={<Hash size={16} />} />
                            {/* <InfoRow label="Category" value={post.postCategory} icon={<Info size={16} />} /> */}
                            <InfoRow label="Author" value={post.author} icon={<User size={16} />} />
                            <InfoRow label="Date" value={post.time} icon={<Calendar size={16} />} />
                            <InfoRow label="Views" value={post.views} icon={<Eye size={16} />} />
                            <InfoRow
                                label="Common Issue"
                                value={post.reposts.length > 0 ? `${post.reposts.length} people affected` : 'No'}
                                icon={<Users size={16} />}
                                color={post.reposts.length > 0 ? 'purple' : 'gray'}
                            />
                        </div>
                    </div>

                    <div className="mt-auto space-y-4">
                        {/* Share Section */}
                        <div className="relative">
                            <button
                                onClick={() => setShowShareOptions(!showShareOptions)}
                                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 py-3 rounded-lg font-bold text-white transition-all shadow-xl shadow-purple-600/20 flex items-center justify-center gap-2"
                            >
                                <Share2 size={16} />
                                Share This Post
                            </button>

                            {/* Social Media Share Options */}
                            {showShareOptions && (
                                <div className="absolute bottom-full mb-2 w-full bg-[#1a1a2e] border border-white/10 rounded-xl p-4 shadow-2xl">
                                    <div className="grid grid-cols-3 gap-2 mb-3">
                                        <button
                                            onClick={() => handleSocialShare('facebook', post)}
                                            className="flex flex-col items-center p-3 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 transition-colors"
                                        >
                                            <Facebook className="text-[#1877F2]" size={20} />
                                            <span className="text-xs mt-1">Facebook</span>
                                        </button>
                                        <button
                                            onClick={() => handleSocialShare('twitter', post)}
                                            className="flex flex-col items-center p-3 rounded-lg bg-[#1DA1F2]/10 hover:bg-[#1DA1F2]/20 transition-colors"
                                        >
                                            <Twitter className="text-[#1DA1F2]" size={20} />
                                            <span className="text-xs mt-1">Twitter</span>
                                        </button>
                                        <button
                                            onClick={() => handleSocialShare('linkedin', post)}
                                            className="flex flex-col items-center p-3 rounded-lg bg-[#0A66C2]/10 hover:bg-[#0A66C2]/20 transition-colors"
                                        >
                                            <Linkedin className="text-[#0A66C2]" size={20} />
                                            <span className="text-xs mt-1">LinkedIn</span>
                                        </button>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2">
                                        <button
                                            onClick={() => handleSocialShare('instagram', post)}
                                            className="flex items-center justify-center gap-2 p-2 rounded-lg bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45]/10 hover:opacity-90 transition-opacity"
                                        >
                                            <Instagram size={16} />
                                            <span className="text-xs">Instagram</span>
                                        </button>
                                        <button
                                            onClick={() => handleSocialShare('copy', post)}
                                            className="flex items-center justify-center gap-2 p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
                                        >
                                            <Copy size={16} />
                                            <span className="text-xs">Copy Link</span>
                                        </button>
                                    </div>
                                    <p className="text-xs text-gray-500 text-center mt-3">Share on social media</p>
                                </div>
                            )}
                        </div>

                        <div className="flex gap-3">
                            <button className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2">
                                <Bookmark size={14} />
                                Save
                            </button>
                            <button
                                onClick={() => window.print()}
                                className="flex-1 bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg py-3 text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center gap-2"
                            >
                                <Link2 size={14} />
                                Print
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