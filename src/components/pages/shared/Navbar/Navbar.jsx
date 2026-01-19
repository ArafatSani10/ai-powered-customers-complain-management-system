import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CiMenuFries } from 'react-icons/ci';
import { IoClose, IoHomeOutline, IoLogOutOutline, IoPersonOutline, IoChevronDown } from 'react-icons/io5';
import logo from "../../../../../public/logo/download.png"
import { AiOutlineInfoCircle } from 'react-icons/ai';
import { MdOutlineContactSupport, MdPolicy } from 'react-icons/md';
import { SiHelpdesk } from 'react-icons/si';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const [isScrolled, setIsScrolled] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const API_URL = import.meta.env.VITE_API_URL;

    useEffect(() => {
        const fetchUserData = async () => {
            const token = localStorage.getItem("token");
            if (token && API_URL) {
                try {
                    const res = await axios.get(`${API_URL}/user/auth`, {
                        headers: {
                            "Authorization": token,
                            "Content-Type": "application/json"
                        }
                    });
                    if (res.data.success) {
                        setUser(res.data.data);
                    }
                } catch (err) {
                    console.error("Auth error:", err);
                    localStorage.removeItem("token");
                    setUser(null);
                }
            }
        };

        fetchUserData();
    }, [API_URL, location.pathname]);

    const handleLogout = async () => {
        const token = localStorage.getItem("token");
        try {
            await axios.post(`${API_URL}/user/logout`, {}, {
                headers: { "Authorization": token }
            });
        } catch (err) {
            console.error("Logout error:", err);
        } finally {
            localStorage.removeItem("token");
            setUser(null);
            setShowUserDropdown(false);
            navigate("/login");
        }
    };

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setShowUserDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { name: 'Home', to: '/', icon: IoHomeOutline },
        { name: 'About', to: '/about', icon: AiOutlineInfoCircle },
        { name: 'Terms & Conditions', to: '/terms-and-conditions', icon: MdPolicy },
        { name: 'Contact Us ', to: '/contact-us', icon: MdOutlineContactSupport },
        { name: 'Help Desk ', to: '/help-desk', icon: SiHelpdesk }
    ];

    const isActiveLink = (path) => location.pathname === path;

    const handleScroll = () => {
        if (isOpen) return;
        const currentScrollY = window.scrollY;
        setIsScrolled(currentScrollY > 50);
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
        } else if (currentScrollY < lastScrollY) {
            setIsVisible(true);
        }
        if (currentScrollY < 50) setIsVisible(true);
        setLastScrollY(currentScrollY);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, isOpen]);

    const navbarVariants = {
        visible: {
            y: 0,
            opacity: 1,
            backdropFilter: isScrolled ? 'blur(10px)' : 'blur(0px)',
            backgroundColor: isScrolled ? 'rgba(0, 9, 26, 0.9)' : 'rgba(0, 9, 26, 1)',
            transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] },
        },
        hidden: { y: -100, opacity: 0, transition: { duration: 0.4 } },
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
                    <Link to="/" className='flex items-center'>
                        <motion.div className='w-32 h-10 bg-[#00091a] rounded-lg flex items-center justify-center mr-3' whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <img className='rounded-full' src={logo} alt="Logo" />
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className='hidden md:flex items-center space-x-4'>
                        {navItems.map((item, index) => (
                            <motion.div key={item.name} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.1 }} whileHover={{ scale: 1.05 }}>
                                <Link to={item.to} className={`relative px-3 py-2 transition-all group flex items-center ${isActiveLink(item.to) ? 'text-[#00baff] font-semibold' : 'text-white hover:text-[#00baff]'}`}>
                                    <span className='flex items-center gap-2'>
                                        <item.icon className='text-xl' />
                                        <span className='whitespace-nowrap'>{item.name}</span>
                                    </span>
                                    {isActiveLink(item.to) && (
                                        <motion.span layoutId="activeIndicator" className='absolute -bottom-1 left-0 w-full h-0.5 bg-gradient-to-r from-blue-400 to-purple-500' />
                                    )}
                                    {!isActiveLink(item.to) && (
                                        <span className='absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full'></span>
                                    )}
                                </Link>
                            </motion.div>
                        ))}
                    </div>

                    {/* Desktop Buttons & User Profile */}
                    <div className='hidden md:flex items-center space-x-3'>
                        {user ? (
                            /* User Profile Dropdown */
                            <div className="relative" ref={dropdownRef}>
                                <motion.div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="relative">
                                        <img
                                            src={user.image || "https://via.placeholder.com/40"}
                                            alt={user.name}
                                            className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover shadow-md"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-[#00091a]"></div>
                                    </div>
                                    {/* <IoChevronDown className={`ml-2 text-white transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} /> */}
                                </motion.div>

                                {/* Dropdown Menu */}
                                <AnimatePresence>
                                    {showUserDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-48 bg-[#0a1124] border border-gray-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                                        >
                                            {/* User Info */}
                                            <div className="p-4 border-b border-gray-800 bg-gray-900/50">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={user.image || "https://via.placeholder.com/40"}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                                                    />
                                                    <div>
                                                        <h3 className="text-white font-bold text-sm">{user.name}</h3>
                                                        <p className="text-gray-400 text-xs">{user.role}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                <Link
                                                    to="/view-profile"
                                                    onClick={() => setShowUserDropdown(false)}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-all"
                                                >
                                                    <IoPersonOutline className="text-lg" />
                                                    <span>View Profile</span>
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                                                >
                                                    <IoLogOutOutline className="text-lg" />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            /* Login & Register Buttons */
                            <>
                                <Link to="/login">
                                    <motion.button
                                        className='px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-300'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Login
                                    </motion.button>
                                </Link>
                                <Link to="/register">
                                    <motion.button
                                        className='px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg shadow-lg shadow-green-500/20 hover:shadow-green-500/40 transition-all duration-300'
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Register
                                    </motion.button>
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile View - User Profile & Menu Button */}
                    <div className='md:hidden flex items-center space-x-3'>
                        {user ? (
                            /* Mobile User Profile Dropdown */
                            <div className="relative" ref={dropdownRef}>
                                <motion.div
                                    className="flex items-center cursor-pointer"
                                    onClick={() => setShowUserDropdown(!showUserDropdown)}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <div className="relative">
                                        <img
                                            src={user.image || "https://via.placeholder.com/36"}
                                            alt={user.name}
                                            className="w-9 h-9 rounded-full border-2 border-blue-500 object-cover shadow-md"
                                        />
                                        <div className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[#00091a]"></div>
                                    </div>
                                    <IoChevronDown className={`ml-1 text-white transition-transform duration-300 ${showUserDropdown ? 'rotate-180' : ''}`} />
                                </motion.div>

                                {/* Mobile Dropdown Menu */}
                                <AnimatePresence>
                                    {showUserDropdown && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className="absolute right-0 mt-3 w-48 bg-[#0a1124] border border-gray-700 rounded-xl shadow-2xl shadow-black/50 overflow-hidden z-50"
                                        >
                                            {/* User Info */}
                                            <div className="p-4 border-b border-gray-800 bg-gray-900/50">
                                                <div className="flex items-center gap-3">
                                                    <img
                                                        src={user.image || "https://via.placeholder.com/40"}
                                                        alt={user.name}
                                                        className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
                                                    />
                                                    <div>
                                                        <h3 className="text-white font-bold text-sm">{user.name}</h3>
                                                        <p className="text-gray-400 text-xs">{user.role}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Menu Items */}
                                            <div className="py-2">
                                                <Link
                                                    to="/view-profile"
                                                    onClick={() => {
                                                        setShowUserDropdown(false);
                                                        setIsOpen(false);
                                                    }}
                                                    className="flex items-center gap-3 px-4 py-3 text-sm text-gray-300 hover:bg-blue-600/20 hover:text-white transition-all"
                                                >
                                                    <IoPersonOutline className="text-lg" />
                                                    <span>View Profile</span>
                                                </Link>
                                                <button
                                                    onClick={handleLogout}
                                                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-all"
                                                >
                                                    <IoLogOutOutline className="text-lg" />
                                                    <span>Logout</span>
                                                </button>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        ) : (
                            /* Mobile Login Button (Only visible when user not logged in) */
                            <Link to="/login" className="md:hidden">
                                <motion.button
                                    className='px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-lg shadow-blue-500/20 text-sm'
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    Login
                                </motion.button>
                            </Link>
                        )}

                        {/* Mobile Menu Button */}
                        <motion.button
                            className='text-white p-2 rounded-lg bg-gray-800/50 hover:bg-gray-700/50 transition-colors'
                            onClick={toggleMenu}
                            whileTap={{ scale: 0.9 }}
                        >
                            {isOpen ? <IoClose size={24} /> : <CiMenuFries size={24} />}
                        </motion.button>
                    </div>
                </div>

                {/* Mobile Navigation Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            className='md:hidden bg-[#0a1124]/95 backdrop-blur-lg border-t border-gray-800/50'
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                        >
                            <div className='py-4 space-y-1 px-2'>
                                {navItems.map((item, index) => (
                                    <motion.div
                                        key={item.name}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                    >
                                        <Link
                                            to={item.to}
                                            className={`flex items-center gap-3 px-4 py-3 rounded-lg ${isActiveLink(item.to) ? 'text-[#00baff] bg-blue-500/10' : 'text-white hover:bg-gray-800/50'}`}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            <item.icon className='text-xl' />
                                            <span>{item.name}</span>
                                        </Link>
                                    </motion.div>
                                ))}

                                {/* Mobile Menu Buttons (only show when user not logged in) */}
                                {!user && (
                                    <div className='pt-4 border-t border-gray-800 mt-2 space-y-3 px-2'>
                                        <Link
                                            to="/login"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-lg font-bold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                                        >
                                            Login
                                        </Link>
                                        <Link
                                            to="/register"
                                            onClick={() => setIsOpen(false)}
                                            className="block w-full p-3 bg-gradient-to-r from-green-500 to-green-600 text-white text-center rounded-lg font-bold hover:shadow-lg hover:shadow-green-500/30 transition-all"
                                        >
                                            Register
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.nav>
    );
};

export default Navbar;