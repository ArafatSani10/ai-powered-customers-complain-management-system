import React from 'react';

const ContactBanner = () => {
    return (
        <div className="relative w-full h-[280px] md:h-[320px] lg:h-[350px] overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">

            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
                {/* Geometric Pattern */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute top-10 right-10 w-40 h-40 border-2 border-white/20 rounded-full"></div>
                    <div className="absolute bottom-10 left-10 w-60 h-60 border-2 border-white/20 rounded-lg rotate-45"></div>
                    <div className="absolute top-1/2 left-1/4 w-20 h-20 border border-white/20 rounded-full"></div>
                </div>

                {/* Grid Lines */}
                <div className="absolute inset-0" style={{
                    backgroundImage: `
            linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px),
            linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)
          `,
                    backgroundSize: '40px 40px',
                }}></div>
            </div>

            {/* Glowing Orbs */}
            <div className="absolute top-1/4 -left-20 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

            {/* Content Container */}
            <div className="relative z-10 max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col justify-center h-full">

                    {/* Breadcrumb Navigation - Professional Style */}
                    <div className="inline-flex items-center space-x-4">
                        {/* Home Link */}
                        <a
                            href="/"
                            className="group flex items-center text-white/80 hover:text-white transition-all duration-300"
                        >
                            <div className="relative">
                                <div className="absolute -inset-2 bg-white/5 rounded-lg group-hover:bg-white/10 transition-all duration-300"></div>
                                <div className="relative flex items-center space-x-2 px-4 py-3">
                                    <svg
                                        className="w-5 h-5 transition-transform group-hover:scale-110"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                    >
                                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                                    </svg>
                                    <span className="font-medium tracking-wide">Home</span>
                                </div>
                            </div>
                        </a>

                        {/* Separator */}
                        <div className="flex items-center">
                            <div className="w-2 h-0.5 bg-white/40 rounded-full"></div>
                            <div className="mx-2">
                                <svg
                                    className="w-4 h-4 text-white/50"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </div>
                            <div className="w-2 h-0.5 bg-white/40 rounded-full"></div>
                        </div>

                        {/* Current Page */}
                        <div className="relative">
                            <div className="absolute -inset-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-lg blur-sm"></div>
                            <div className="relative px-6 py-3 bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/20 rounded-lg shadow-2xl">
                                <span className="text-white font-bold text-lg tracking-wide">
                                    Contact Us
                                </span>
                                {/* Indicator Dot */}
                                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Line */}
                    <div className="mt-12 w-32 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>

                    {/* Subtle Title (Optional - Minimal) */}
                    <div className="mt-6 opacity-80">
                        <div className="text-white/60 text-sm font-medium tracking-wider uppercase">
                            Customer Complaint Management System
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Fade Effect */}
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-slate-900/80 to-transparent"></div>

            {/* Corner Accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-white/10"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-white/10"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-white/10"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-white/10"></div>
        </div>
    );
};

export default ContactBanner;