


import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { CiMenuFries } from 'react-icons/ci';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    const navItems = [
        { name: 'Home', to: '/' },
        { name: 'About', to: '/about' },
        { name: 'Batches', to: '/batches' },
        // { name: 'Branches', to: '/branches' },
        { name: 'Books', to: '/books' },
        { name: 'Instructors', to: '/instructor' },
        { name: 'Contact Us', to: '/contact-us' },
    ];

    // Active class check function
    const isActiveLink = (path) => {
        return location.pathname === path;
    };

    // Improved Scroll Logic
    const handleScroll = () => {
        if (isOpen) return;

        const currentScrollY = window.scrollY;

        // Background change when scrolled
        setIsScrolled(currentScrollY > 50);

        // Show/hide navbar logic
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            // Scrolling down & past 100px - hide navbar
            setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
            // Scrolling up - show navbar
            setIsVisible(true);
        }

        // Always show navbar at top of page
        if (currentScrollY < 50) {
            setIsVisible(true);
        }

        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [lastScrollY, isOpen]);

    // Navbar animations
    const navbarVariants = {
        visible: {
            y: 0,
            opacity: 1,
            backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
            backgroundColor: isScrolled ? 'rgba(0, 9, 26, 0.9)' : 'rgba(0, 9, 26, 1)',
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
        hidden: {
            y: -100,
            opacity: 0,
            transition: {
                duration: 0.4,
                ease: [0.25, 0.46, 0.45, 0.94],
            },
        },
    };

    // Mobile menu animations
    const mobileMenuVariants = {
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                duration: 0.3,
                ease: 'easeInOut',
            },
        },
        open: {
            opacity: 1,
            height: 'auto',
            transition: {
                duration: 0.4,
                ease: 'easeInOut',
            },
        },
    };

    // Menu item animations
    const itemVariants = {
        closed: {
            opacity: 0,
            y: -10,
            transition: {
                duration: 0.2,
            },
        },
        open: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.3,
            },
        },
    };

    // Desktop nav item hover animation
    const navItemHover = {
        scale: 1.05,
        transition: {
            type: "spring",
            stiffness: 400,
            damping: 17
        }
    };

    return (
        <motion.nav
            className='w-full fixed top-0 z-50 border-b border-gray-800/50'
            variants={navbarVariants}
            initial="visible"
            animate={isVisible ? 'visible' : 'hidden'}
        >
            <div className='max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex justify-between items-center py-3'>
                    {/* Logo */}
                    <motion.div
                        className='flex items-center'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Link to="/" className='flex items-center'>
                            <motion.div
                                className='w-14 h-14 max-sm:w-10 max-sm:h-10 bg-[#00091a] rounded-lg flex items-center justify-center mr-3'
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <img className=' rounded-full' src="https://i.ibb.co.com/mrGbBCtq/511017443-1126095552869235-1406722978156443780-n.jpg" alt="" />
                            </motion.div>
                        </Link>
                    </motion.div>

                    {/* Desktop Navigation */}
                    <div className='hidden md:flex items-center space-x-4'>
                        {navItems.map((item, index) => (
                            <motion.div
                                key={item.name}
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{
                                    duration: 0.5,
                                    delay: index * 0.1,
                                    type: "spring",
                                    stiffness: 100
                                }}
                                whileHover={navItemHover}
                            >
                                <Link
                                    to={item.to}
                                    className={`relative px-3 py-2 transition-all duration-300 group ${isActiveLink(item.to)
                                        ? 'text-[#00baff] font-semibold'
                                        : 'text-white hover:text-[#00baff]'
                                        }`}
                                >
                                    {item.name}

                                    {/* Active Indicator */}
                                    {isActiveLink(item.to) && (
                                        <motion.span
                                            className='absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500'
                                            layoutId="activeIndicator"
                                            transition={{
                                                type: "spring",
                                                stiffness: 300,
                                                damping: 30
                                            }}
                                        />
                                    )}

                                    {/* Hover Effect */}
                                    {!isActiveLink(item.to) && (
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full'></span>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop Buttons */}
                    <div className='hidden md:flex items-center space-x-3'>
                        <Link to="/login">
                            <motion.button
                                className='px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition-all duration-300 relative overflow-hidden'
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                whileHover={{
                                    scale: 1.05,
                                    boxShadow: "0 0 25px rgba(59, 130, 246, 0.6)"
                                }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <span className="relative z-10">Login</span>
                                <motion.span
                                    className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-500 opacity-0 hover:opacity-100 transition-opacity duration-300"
                                />
                            </motion.button>
                        </Link>


                    </div>

                    {/* Mobile Menu Button */}
                    <motion.button
                        className='md:hidden text-white p-2 rounded-lg bg-gray-800/50 backdrop-blur-sm'
                        onClick={toggleMenu}
                        whileHover={{ scale: 1.05, backgroundColor: 'rgba(55, 65, 81, 0.5)' }}
                        whileTap={{ scale: 0.9 }}
                    >
                        {isOpen ? (
                            <IoClose className='text-white text-2xl' />
                        ) : (
                            <CiMenuFries className='text-white text-xl' />
                        )}
                    </motion.button>
                </div>

                {/* Mobile Navigation */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className='md:hidden bg-[#0a1124]/95 backdrop-blur-lg border-t border-gray-800/50'
                            variants={mobileMenuVariants}
                            initial='closed'
                            animate='open'
                            exit='closed'
                        >
                            <div className='py-4 space-y-2'>
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        variants={itemVariants}
                                        initial='closed'
                                        animate='open'
                                        exit='closed'
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <Link
                                            to={item.to}
                                            className={`block px-4 py-3 rounded-lg transition-all duration-300 mx-2 ${isActiveLink(item.to)
                                                ? 'text-[#00baff] bg-blue-500/10 border-l-2 border-[#00baff]'
                                                : 'text-white hover:text-[#00baff] hover:bg-gray-800/50'
                                                }`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <motion.span
                                                whileHover={{ x: 5 }}
                                                transition={{ type: "spring", stiffness: 400 }}
                                            >
                                                {item.name}
                                            </motion.span>
                                        </Link>
                                    </motion.div>
                                ))}
                                <div className='px-2 pt-4 space-y-3 border-t border-gray-800/50 mt-2'>
                                    <Link to="/login">
                                        <motion.button
                                            className='w-full mx-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg transition-colors duration-300'
                                            variants={itemVariants}
                                            initial='closed'
                                            animate='open'
                                            exit='closed'
                                            transition={{ delay: 0.6 }}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            Login
                                        </motion.button>
                                    </Link>

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;