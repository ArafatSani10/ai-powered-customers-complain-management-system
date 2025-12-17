import React, { useState, useEffect } from 'react';
import { motion } from "framer-motion";
import Lottie from 'react-lottie-player';
import lottieRegister from "../../../../public/lottie/ai paper generator.json";
import { FaUser, FaEnvelope, FaPhone, FaCamera, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const LoadingSkeleton = () => (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-indigo-900/20 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl flex flex-col lg:flex-row bg-gray-800/30 backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-700">

            {/* Left Section Skeleton */}
            <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                {/* Gradient Background Skeleton */}
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/20 via-transparent to-gray-800/20"></div>

                {/* Animated Floating Elements */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-gray-700/20 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-gray-700/20 rounded-full blur-3xl animate-pulse delay-1000"></div>

                {/* Content Skeleton */}
                <div className="relative z-10 space-y-8">
                    {/* Header Skeleton */}
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-14 h-14 bg-gradient-to-br from-gray-700 to-gray-800 rounded-2xl animate-pulse"></div>
                        <div className="h-8 w-40 bg-gray-700 rounded-lg animate-pulse"></div>
                    </div>

                    {/* Title Skeleton */}
                    <div className="space-y-4">
                        <div className="h-12 w-full bg-gray-700 rounded-xl animate-pulse"></div>
                        <div className="h-12 w-3/4 bg-gray-700 rounded-xl animate-pulse"></div>
                    </div>

                    {/* Description Skeleton */}
                    <div className="space-y-3">
                        <div className="h-4 w-full bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-5/6 bg-gray-700 rounded animate-pulse"></div>
                        <div className="h-4 w-4/6 bg-gray-700 rounded animate-pulse"></div>
                    </div>

                    {/* Features List Skeleton */}
                    <div className="space-y-4 pt-8">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gray-700 rounded-lg animate-pulse"></div>
                                <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Right Section Skeleton */}
            <div className="lg:w-1/2 p-8 lg:p-12 bg-gray-800/20">
                <div className="max-w-md mx-auto space-y-8">
                    {/* Form Header Skeleton */}
                    <div className="text-center space-y-4">
                        <div className="h-8 w-48 bg-gray-700 rounded-lg mx-auto animate-pulse"></div>
                        <div className="h-4 w-32 bg-gray-700 rounded mx-auto animate-pulse"></div>
                    </div>

                    {/* Social Buttons Skeleton */}
                    <div className="grid grid-cols-3 gap-3">
                        {[1, 2, 3].map((item) => (
                            <div key={item} className="h-12 bg-gray-700 rounded-xl animate-pulse"></div>
                        ))}
                    </div>

                    {/* Divider Skeleton */}
                    <div className="flex items-center my-8">
                        <div className="flex-1 h-px bg-gray-700"></div>
                        <div className="h-4 w-24 bg-gray-700 rounded mx-4 animate-pulse"></div>
                        <div className="flex-1 h-px bg-gray-700"></div>
                    </div>

                    {/* Form Inputs Skeleton - Register specific fields */}
                    <div className="space-y-6">
                        {/* Name */}
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-14 bg-gray-700 rounded-xl animate-pulse"></div>
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-14 bg-gray-700 rounded-xl animate-pulse"></div>
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-14 bg-gray-700 rounded-xl animate-pulse"></div>
                        </div>

                        {/* Profile Image */}
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-24 bg-gray-700 rounded-xl animate-pulse"></div>
                        </div>

                        {/* Password */}
                        <div className="space-y-2">
                            <div className="h-5 w-32 bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-14 bg-gray-700 rounded-xl animate-pulse"></div>
                        </div>

                        {/* Confirm Password */}
                        <div className="space-y-2">
                            <div className="h-5 w-40 bg-gray-700 rounded animate-pulse"></div>
                            <div className="h-14 bg-gray-700 rounded-xl animate-pulse"></div>
                        </div>
                    </div>

                    {/* Submit Button Skeleton */}
                    <div className="h-14 bg-gradient-to-r from-gray-700 to-gray-800 rounded-xl animate-pulse"></div>

                    {/* Footer Skeleton */}
                    <div className="pt-8 border-t border-gray-700">
                        <div className="h-5 w-64 bg-gray-700 rounded mx-auto animate-pulse"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default function ModernRegister() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [isPageLoading, setIsPageLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isFocused, setIsFocused] = useState({
        name: false,
        email: false,
        phone: false,
        password: false,
        confirmPassword: false
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsPageLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (profileImage) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreviewImage(reader.result);
            };
            reader.readAsDataURL(profileImage);
        } else {
            setPreviewImage(null);
        }
    }, [profileImage]);

    const socialButtons = [
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
                    <path fill="currentColor" d="M18.71 19.5C17.88 20.74 17 21.95 15.66 21.97C14.32 22 13.89 21.18 12.37 21.18C10.84 21.18 10.37 21.95 9.09997 22C7.78997 22.05 6.79997 20.68 5.95997 19.47C4.24997 17 2.93997 12.45 4.69997 9.39C5.56997 7.87 7.12997 6.91 8.81997 6.88C10.1 6.86 11.32 7.75 12.11 7.75C12.89 7.75 14.37 6.68 15.92 6.84C16.57 6.87 18.39 7.1 19.56 8.82C19.47 8.88 17.39 10.1 17.41 12.63C17.44 15.65 20.06 16.66 20.09 16.67C20.06 16.74 19.67 18.11 18.71 19.5ZM13 3.5C13.73 2.67 14.94 2.04 15.94 2C16.07 3.17 15.6 4.35 14.9 5.19C14.21 6.04 13.07 6.7 11.95 6.61C11.8 5.46 12.36 4.26 13 3.5Z" />
                </svg>
            ),
            label: 'Apple',
            bg: 'bg-gray-900 hover:bg-gray-800',
            text: 'text-white'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-5 h-5">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                </svg>
            ),
            label: 'Google',
            bg: 'bg-white hover:bg-gray-50',
            text: 'text-gray-700'
        },
        {
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
            ),
            label: 'Twitter',
            bg: 'bg-black hover:bg-gray-900',
            text: 'text-white'
        }
    ];

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                setError("File size must be less than 5MB");
                return;
            }
            if (!file.type.startsWith('image/')) {
                setError("Please select an image file");
                return;
            }
            setProfileImage(file);
            setError(null);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords don't match");
            return;
        }

        if (formData.password.length < 6) {
            setError("Password must be at least 6 characters long");
            return;
        }

        setIsLoading(true);
        try {
            // Registration logic here
            console.log("Registering with:", { ...formData, profileImage });
            await new Promise(resolve => setTimeout(resolve, 2000)); // Simulated API call
            alert("Registration successful!");
        } catch (err) {
            setError(err.message || "Registration failed");
        } finally {
            setIsLoading(false);
        }
    };

    if (isPageLoading) {
        return <LoadingSkeleton />;
    }

    return (
        <div className="min-h-screen bg-transparent flex py-20 items-center justify-center p-4 font-sans">
            <div className="w-full max-w-7xl flex flex-col lg:flex-row bg-transparent backdrop-blur-lg rounded-3xl overflow-hidden shadow-2xl border border-gray-200 dark:border-gray-800">

                {/* Left Section - Lottie Animation & Info */}
                <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center relative overflow-hidden">
                    {/* Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-cyan-500/5"></div>

                    {/* Animated Floating Elements */}
                    <div className="absolute top-10 left-10 w-72 h-72 bg-emerald-300/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-10 right-10 w-96 h-96 bg-cyan-300/10 rounded-full blur-3xl animate-pulse delay-1000"></div>

                    {/* Content */}
                    <div className="relative z-10">
                        <div className="text-start mb-5">
                            <motion.div
                                className="inline-flex items-center gap-2 mb-6"
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                            >
                                <div className="w-2 h-2 bg-gradient-to-r from-emerald-400 to-cyan-400 rounded-full"></div>
                                <span className="text-sm font-medium bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                    Join Our Community
                                </span>
                            </motion.div>

                            <motion.h2
                                className="text-4xl max-sm:text-3xl font-bold text-white tracking-tight"
                                initial={{ y: -20, opacity: 0 }}
                                whileInView={{ y: 0, opacity: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                                    Create Your
                                </span>{' '}
                                Account
                            </motion.h2>
                        </div>

                        <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 max-w-lg">
                            Join thousands of users who are already experiencing the future with our platform. Create your account in seconds.
                        </p>

                        {/* Features List */}

                        {/* Lottie Animation Container */}
                        <div className="relative w-full h-full max-w-xl mx-auto">
                            <div className="absolute -inset-4 bg-gradient-to-r from-emerald-500/10 to-cyan-500/10 rounded-2xl blur-2xl"></div>
                            <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-white/10 to-transparent border border-gray-200/20 dark:border-gray-700/20 backdrop-blur-sm">
                                <Lottie
                                    loop
                                    animationData={lottieRegister}
                                    play
                                    speed={0.8}
                                    className="w-full h-auto"
                                    rendererSettings={{
                                        preserveAspectRatio: 'xMidYMid slice'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right Section - Register Form */}
                <div className="lg:w-1/2 p-8 lg:p-12 bg-transparent">
                    <div className="max-w-md mx-auto">
                        {/* Form Header */}
                        <div className="text-center mb-10">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                Create New Account
                            </h3>
                            <p className="text-gray-500 dark:text-gray-400">
                                Fill in your details below
                            </p>
                        </div>

                        {/* Social Register Buttons */}
                        <div className="grid grid-cols-3 gap-3 mb-8">
                            {socialButtons.map((item, index) => (
                                <motion.button
                                    key={index}
                                    type="button"
                                    disabled={isLoading}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center justify-center h-12 px-4 rounded-xl border transition-all duration-300 ${item.bg} border-gray-200 dark:border-gray-700 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed`}
                                >
                                    <div className={item.text}>
                                        {item.icon}
                                    </div>
                                </motion.button>
                            ))}
                        </div>

                        {/* Divider */}
                        <div className="flex items-center my-8">
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                            <span className="px-4 text-sm text-gray-500 dark:text-gray-400">Or register with email</span>
                            <div className="flex-1 h-px bg-gray-200 dark:bg-gray-700"></div>
                        </div>

                        {/* Register Form */}
                        <form className="space-y-6" onSubmit={handleSubmit}>
                            {/* Name Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Full Name
                                </label>
                                <div className={`relative group ${isFocused.name ? 'ring-2 ring-emerald-500/20' : ''}`}>
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        onFocus={() => setIsFocused(prev => ({ ...prev, name: true }))}
                                        onBlur={() => setIsFocused(prev => ({ ...prev, name: false }))}
                                        placeholder="John Doe"
                                        required
                                        disabled={isLoading}
                                        className="w-full h-14 px-5 pl-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-300 disabled:opacity-50"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaUser className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Email Address
                                </label>
                                <div className={`relative group ${isFocused.email ? 'ring-2 ring-emerald-500/20' : ''}`}>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        onFocus={() => setIsFocused(prev => ({ ...prev, email: true }))}
                                        onBlur={() => setIsFocused(prev => ({ ...prev, email: false }))}
                                        placeholder="you@example.com"
                                        required
                                        disabled={isLoading}
                                        className="w-full h-14 px-5 pl-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-300 disabled:opacity-50"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaEnvelope className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Phone Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Phone Number
                                </label>
                                <div className={`relative group ${isFocused.phone ? 'ring-2 ring-emerald-500/20' : ''}`}>
                                    <input
                                        type="tel"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        onFocus={() => setIsFocused(prev => ({ ...prev, phone: true }))}
                                        onBlur={() => setIsFocused(prev => ({ ...prev, phone: false }))}
                                        placeholder="+880 1234 567890"
                                        required
                                        disabled={isLoading}
                                        className="w-full h-14 px-5 pl-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-300 disabled:opacity-50"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaPhone className="w-5 h-5" />
                                    </div>
                                </div>
                            </div>

                            {/* Profile Image Upload */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Profile Image
                                </label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="profileImage"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        disabled={isLoading}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="profileImage"
                                        className={`flex items-center justify-center h-24 bg-white dark:bg-gray-800 border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-xl cursor-pointer hover:border-emerald-500 dark:hover:border-emerald-500 transition-all duration-300 ${previewImage ? 'border-solid' : ''} disabled:opacity-50`}
                                    >
                                        {previewImage ? (
                                            <div className="relative w-full h-full flex items-center justify-center">
                                                <img
                                                    src={previewImage}
                                                    alt="Preview"
                                                    className="w-20 h-20 rounded-full object-cover border-2 border-emerald-500"
                                                />
                                                <div className="absolute bottom-1 right-1/2 translate-x-1/2 bg-emerald-500 text-white p-1 rounded-full">
                                                    <FaCamera className="w-4 h-4" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="text-center">
                                                <FaCamera className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    Click to upload profile photo
                                                </span>
                                            </div>
                                        )}
                                    </label>
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Password
                                </label>
                                <div className={`relative group ${isFocused.password ? 'ring-2 ring-emerald-500/20' : ''}`}>
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleInputChange}
                                        onFocus={() => setIsFocused(prev => ({ ...prev, password: true }))}
                                        onBlur={() => setIsFocused(prev => ({ ...prev, password: false }))}
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                        className="w-full h-14 px-5 pl-12 pr-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-300 disabled:opacity-50"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaLock className="w-5 h-5" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        disabled={isLoading}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                                    >
                                        {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm Password Input */}
                            <div className="space-y-2">
                                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                    Confirm Password
                                </label>
                                <div className={`relative group ${isFocused.confirmPassword ? 'ring-2 ring-emerald-500/20' : ''}`}>
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        onFocus={() => setIsFocused(prev => ({ ...prev, confirmPassword: true }))}
                                        onBlur={() => setIsFocused(prev => ({ ...prev, confirmPassword: false }))}
                                        placeholder="••••••••"
                                        required
                                        disabled={isLoading}
                                        className="w-full h-14 px-5 pl-12 pr-12 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:border-emerald-500 dark:focus:border-emerald-500 transition-all duration-300 disabled:opacity-50"
                                    />
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                        <FaLock className="w-5 h-5" />
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        disabled={isLoading}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors disabled:opacity-50"
                                    >
                                        {showConfirmPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                                    </button>
                                </div>
                            </div>

                            {/* Terms and Conditions */}
                            <div className="flex items-center">
                                <input
                                    type="checkbox"
                                    id="terms"
                                    required
                                    disabled={isLoading}
                                    className="w-4 h-4 text-emerald-500 bg-gray-100 border-gray-300 rounded focus:ring-emerald-500 focus:ring-2"
                                />
                                <label htmlFor="terms" className="ml-2 text-sm text-gray-600 dark:text-gray-400">
                                    I agree to the{' '}
                                    <Link to="/terms-and-conditions">
                                        <span className="text-emerald-500 hover:text-emerald-400 font-medium">
                                            Terms & Conditions
                                        </span>

                                    </Link>
                                </label>
                            </div>

                            {/* Error Message */}
                            {error && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl"
                                >
                                    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <span className="text-sm font-medium text-red-600 dark:text-red-400">{error}</span>
                                </motion.div>
                            )}

                            {/* Submit Button with Loading State */}
                            <motion.button
                                type="submit"
                                disabled={isLoading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="group relative w-full h-14 bg-gradient-to-r from-emerald-600 to-cyan-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transform transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <div className="absolute inset-0 bg-gradient-to-r from-emerald-700 to-cyan-700 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                {isLoading ? (
                                    <div className="relative flex items-center justify-center gap-3">
                                        <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        <span>Creating Account...</span>
                                    </div>
                                ) : (
                                    <div className="relative flex items-center justify-center gap-3">
                                        <span>Create Account</span>
                                        <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </svg>
                                    </div>
                                )}
                            </motion.button>
                        </form>

                        {/* Footer */}
                        <div className="mt-10 pt-6 border-t border-gray-200 dark:border-gray-800">
                            <p className="text-center text-gray-600 dark:text-gray-400">
                                Already have an account?{' '}
                                <Link to="/login">
                                    <span className="font-semibold text-emerald-600 dark:text-emerald-400 hover:text-emerald-500 transition-colors">
                                        Sign in here
                                    </span>
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}