import React, { useEffect, useState } from 'react';
import { motion } from "framer-motion";

const OurTeam = () => {
    const [loading, setLoading] = useState(true);
    const [imagesLoaded, setImagesLoaded] = useState(0);
    const totalImages = 4;

    useEffect(() => {
        // Simulate loading delay
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1500);

        return () => clearTimeout(timer);
    }, []);

    const handleImageLoad = () => {
        setImagesLoaded(prev => {
            const newCount = prev + 1;
            if (newCount === totalImages) {
                setTimeout(() => setLoading(false), 300);
            }
            return newCount;
        });
    };

    const teamMembers = [
        {
            id: 1,
            name: "Alex Johnson",
            role: "AI Solutions Architect",
            description: "10+ years experience in machine learning and natural language processing. Leads our AI algorithm development team.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                github: "#"
            }
        },
        {
            id: 2,
            name: "Sarah Williams",
            role: "Customer Experience Director",
            description: "Expert in customer service optimization and complaint management systems. Former CX lead at Fortune 500 companies.",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                dribbble: "#"
            }
        },
        {
            id: 3,
            name: "Michael Chen",
            role: "Senior Data Scientist",
            description: "Specializes in predictive analytics and sentiment analysis. PhD in Computer Science from Stanford University.",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                github: "#"
            }
        },
        {
            id: 4,
            name: "Emma Davis",
            role: "UX/UI Design Lead",
            description: "Creates intuitive interfaces for complex AI systems. Award-winning designer with focus on user-centered design.",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                dribbble: "#"
            }
        },
        {
            id: 5,
            name: "David Rodriguez",
            role: "Backend Engineering Lead",
            description: "Architects scalable backend systems for real-time complaint processing. Expert in microservices and cloud infrastructure.",
            image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                github: "#"
            }
        },
        {
            id: 6,
            name: "Lisa Thompson",
            role: "Product Manager",
            description: "Drives product vision and strategy. Bridges gap between technical teams and customer needs with 8+ years experience.",
            image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
            social: {
                linkedin: "#",
                twitter: "#",
                medium: "#"
            }
        }
    ];

    const SkeletonCard = () => (
        <div className="bg-transparent rounded-2xl p-6 border border-gray-700/50 shadow-lg animate-pulse">
            <div className="flex flex-col items-center">
                {/* Image Skeleton */}
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 mb-6"></div>
                {/* Name Skeleton */}
                <div className="h-6 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-3/4 mb-3"></div>
                {/* Role Skeleton */}
                <div className="h-4 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-1/2 mb-4"></div>
                {/* Description Skeleton */}
                <div className="space-y-2 w-full">
                    <div className="h-3 bg-gradient-to-r from-gray-900 to-gray-800 rounded w-full"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-5/6"></div>
                    <div className="h-3 bg-gradient-to-r from-gray-700 to-gray-800 rounded w-4/6"></div>
                </div>
                {/* Social Icons Skeleton */}
                <div className="flex gap-3 mt-6">
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full"></div>
                    <div className="w-8 h-8 bg-gradient-to-r from-gray-700 to-gray-800 rounded-full"></div>
                </div>
            </div>
        </div>
    );

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.1
            }
        }
    };

    const cardVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    return (
        <div className="relative overflow-hidden bg-transparent py-16 md:py-24">
            {/* Background Elements */}
            <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-900/10 to-purple-900/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tr from-cyan-900/10 to-pink-900/10 rounded-full blur-3xl"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <motion.div
                        className="inline-flex items-center gap-2 mb-6"
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                        <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            MEET OUR TEAM
                        </span>
                    </motion.div>

                    <motion.h2
                        className="text-4xl max-sm:text-3xl font-bold text-white tracking-tight mb-6"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Our Expert
                        </span>{' '}
                        Team Members
                    </motion.h2>

                    <motion.p
                        className="mt-4 text-xl text-gray-300 font-light max-w-3xl mx-auto"
                        initial={{ y: -20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        The brilliant minds behind our AI-powered customer complaint management system.
                        Each member brings unique expertise to create exceptional customer experiences.
                    </motion.p>
                </div>

                {/* Team Members Grid */}
                {loading ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3, 4, 5, 6].map((item) => (
                            <SkeletonCard key={item} />
                        ))}
                    </div>
                ) : (
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {teamMembers.map((member, index) => (
                            <motion.div
                                key={member.id}
                                variants={cardVariants}
                                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                                className="group relative"
                            >
                                {/* Card */}
                                <div className="relative bg-gray-900 rounded-2xl p-6 border border-gray-700/50 hover:border-emerald-500/30 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-emerald-900/10 overflow-hidden">
                                    {/* Background Pattern */}
                                    <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 rounded-full -translate-y-16 translate-x-16"></div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col items-center text-center">
                                        {/* Image Container */}
                                        <div className="relative mb-6">
                                            <div className="absolute -inset-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity"></div>
                                            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-gray-800 group-hover:border-emerald-500/30 transition-colors">
                                                <img
                                                    src={member.image}
                                                    alt={member.name}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                    onLoad={handleImageLoad}
                                                    loading="lazy"
                                                />
                                            </div>
                                        </div>

                                        {/* Name */}
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                                            {member.name}
                                        </h3>

                                        {/* Role */}
                                        <div className="inline-flex items-center gap-2 mb-4">
                                            <div className="w-1 h-1 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                                            <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                                {member.role}
                                            </span>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                                            {member.description}
                                        </p>

                                        {/* Social Links */}
                                        <div className="flex gap-3">
                                            {member.social.linkedin && (
                                                <a href={member.social.linkedin} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-all duration-300 group-hover:scale-110">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {member.social.twitter && (
                                                <a href={member.social.twitter} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-all duration-300 group-hover:scale-110">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.213c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                    </svg>
                                                </a>
                                            )}
                                            {member.social.github && (
                                                <a href={member.social.github} className="w-9 h-9 rounded-full bg-gray-800 flex items-center justify-center hover:bg-purple-500 hover:text-white transition-all duration-300 group-hover:scale-110">
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                                    </svg>
                                                </a>
                                            )}
                                        </div>
                                    </div>

                                    {/* Hover Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-cyan-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}

            </div>
        </div>
    );
};

export default OurTeam;