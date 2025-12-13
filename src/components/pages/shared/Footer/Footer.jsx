import React from 'react';
import { motion } from 'framer-motion';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaRegEnvelope, FaMapMarkerAlt, FaPhoneAlt, FaChartBar } from 'react-icons/fa';

// --- Framer Motion Variants ---

// Container for staggered animation
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

// Item animation for links and sections
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
};

// Social icon pop/pulse animation
const socialHover = {
    hover: { scale: 1.2, transition: { type: "spring", stiffness: 400, damping: 10 } } // Stronger pop effect
};

// Quick Link hover animation (Slide to the right)
const linkSlideHover = {
    hover: { x: 5, transition: { type: "spring", stiffness: 300 } } // Subtle slide
};


const Footer = () => {
    const headerStyle = "text-xl font-bold text-green-400 mb-6 relative after:content-[''] after:absolute after:bottom-[-8px] after:left-0 after:w-10 after:h-[2px] after:bg-green-500";
    const linkStyle = "text-gray-400 hover:text-green-400 transition duration-300 cursor-pointer text-sm block py-1";
    const contactIconBg = "bg-gray-700/50 p-2 rounded-lg text-green-400";
    const contactTextStyle = "text-gray-400 text-sm";


    return (
        <motion.footer
            // NOTE: Changing bg-transparent to bg-gray-900/95 for a modern dark look that respects transparency slightly
            className="w-full bg-transparent text-white"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
        >
            <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">

             

                {/* --- 2. Main Footer Content Grid --- */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-12 pb-16 pt-8">

                    {/* 2.1. Logo and Description */}
                    <motion.div variants={itemVariants} className="col-span-1 md:col-span-1">
                        <div className="flex items-center mb-6">
                            <img className='w-32 -mt-5' src="../../../../../public/logo/download.png" alt="" />
                        </div>
                        <p className="text-gray-400 mt-4 text-sm">
                            Transform your academic goals with AI-powered insights. Achieve mastery through data-driven, strategic preparation.
                        </p>
                        {/* Social Icons with POP Animation */}
                        <div className="flex space-x-4 mt-8">
                            {[FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram].map((Icon, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className="p-3 bg-gray-700 text-gray-300 rounded-full"
                                    variants={socialHover}
                                    whileHover="hover"
                                >
                                    <Icon className="w-4 h-4" />
                                </motion.a>
                            ))}
                        </div>
                    </motion.div>

                    {/* 2.2. Quick Links (with Slide Animation) */}
                    <motion.div variants={itemVariants}>
                        <h3 className={headerStyle}>Quick Links</h3>
                        <motion.ul className="space-y-4">
                            {['Features', 'How It Works', 'Why Choose Us', 'Pricing', 'Success Stories'].map((link, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    whileHover="hover"
                                >
                                    <motion.a
                                        href="#"
                                        className={linkStyle}
                                        variants={linkSlideHover}
                                    >
                                        {link}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* 2.3. Resources (with Slide Animation) */}
                    <motion.div variants={itemVariants}>
                        <h3 className={headerStyle}>Resources</h3>
                        <motion.ul className="space-y-4">
                            {['Blog', 'Study Tips', 'FAQ', 'Support Center', 'Documentation'].map((link, index) => (
                                <motion.li
                                    key={index}
                                    variants={itemVariants}
                                    whileHover="hover"
                                >
                                    <motion.a
                                        href="#"
                                        className={linkStyle}
                                        variants={linkSlideHover}
                                    >
                                        {link}
                                    </motion.a>
                                </motion.li>
                            ))}
                        </motion.ul>
                    </motion.div>

                    {/* 2.4. Contact Us */}
                    <motion.div variants={itemVariants}>
                        <h3 className={headerStyle}>Contact Us</h3>
                        <div className="space-y-5">
                            <div className="flex items-start">
                                <div className={contactIconBg}><FaMapMarkerAlt className="w-4 h-4" /></div>
                                <div className="ml-4">
                                    <p className="text-sm font-semibold text-white">Office Address</p>
                                    <span className={contactTextStyle}>Bogra, Rajshahi Division, Bangladesh</span>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className={contactIconBg}><FaRegEnvelope className="w-4 h-4" /></div>
                                <div className="ml-4">
                                    <p className="text-sm font-semibold text-white">Email Us</p>
                                    <span className={contactTextStyle}>info@mcqanalysisbd.com</span>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className={contactIconBg}><FaPhoneAlt className="w-4 h-4" /></div>
                                <div className="ml-4">
                                    <p className="text-sm font-semibold text-white">Call Us</p>
                                    <span className={contactTextStyle}>+880 123 456 7890</span>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>

                {/* Bottom Bar (Copyright & Legal Links) */}
                <div className="w-full border-t border-gray-700 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }} className="mb-3 md:mb-0">
                            &copy; 2026 AI Powered Customers Complain Management. All rights reserved. Made with <span role="img" aria-label="love" className="text-red-500">❤️</span> in Bangladesh
                        </motion.p>
                        <div className="flex space-x-6">
                            {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((text, index) => (
                                <motion.a
                                    key={index}
                                    href="#"
                                    className="hover:text-green-400 transition duration-300"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.7 + index * 0.1 }}
                                >
                                    {text}
                                </motion.a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </motion.footer>
    );
};

export default Footer;