import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import {
    IoPersonOutline,
    IoCallOutline,
    IoMailOutline,
    IoKeyOutline,
    IoCalendarOutline,
    IoTimeOutline,
    IoCheckmarkCircleOutline,
    IoCheckmarkCircle
} from 'react-icons/io5';
import {
    MdOutlinePersonPin,
    MdOutlinePhoneAndroid,
    MdOutlineEmail,
    MdOutlineWorkOutline,
    MdOutlineSecurity,
    MdOutlineUpdate
} from 'react-icons/md';
import {
    FaUserShield,
    FaUserCheck,
    FaUserClock
} from 'react-icons/fa';
import {
    HiOutlineUserCircle,
    HiOutlineStatusOnline
} from 'react-icons/hi';

const API_URL = import.meta.env.VITE_API_URL;

const ViewProfile = () => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserProfile = async () => {
            try {
                setLoading(true);
                const token = localStorage.getItem("token");

                if (!token) {
                    setError("No authentication token found");
                    setLoading(false);
                    return;
                }

                const response = await axios.get(`${API_URL}/user/auth`, {
                    headers: {
                        "Authorization": token,
                        "Content-Type": "application/json"
                    }
                });

                if (response.data.success) {
                    setUser(response.data.data);
                } else {
                    setError("Failed to fetch user data");
                }
            } catch (err) {
                console.error("Profile fetch error:", err);
                setError("Error fetching profile data");
            } finally {
                setLoading(false);
            }
        };

        fetchUserProfile();
    }, []);

    // Format date function
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Loading Skeleton
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 py-12 px-4">
                <div className="max-w-6xl mx-auto">
                    {/* Header Skeleton */}
                    <div className="mb-8">
                        <div className="h-8 bg-gray-800 rounded w-64 mx-auto mb-4 animate-pulse"></div>
                        <div className="h-4 bg-gray-800 rounded w-96 mx-auto animate-pulse"></div>
                    </div>

                    {/* Profile Card Skeleton */}
                    <div className="bg-gray-800/50 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden animate-pulse">
                        {/* Profile Image Skeleton */}
                        <div className="relative h-64 bg-gradient-to-r from-gray-800 to-gray-700">
                            <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                                <div className="w-32 h-32 rounded-full bg-gray-700 border-4 border-gray-900"></div>
                            </div>
                        </div>

                        {/* Profile Info Skeleton */}
                        <div className="pt-20 pb-8 px-6">
                            <div className="h-8 bg-gray-700 rounded w-64 mx-auto mb-4"></div>
                            <div className="h-4 bg-gray-700 rounded w-48 mx-auto mb-12"></div>

                            {/* Stats Skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-gray-800/50 rounded-xl p-6">
                                        <div className="h-6 bg-gray-700 rounded w-24 mb-4"></div>
                                        <div className="h-4 bg-gray-700 rounded w-16"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Info Cards Skeleton */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {[...Array(4)].map((_, i) => (
                                    <div key={i} className="bg-gray-800/50 rounded-xl p-6">
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="h-10 w-10 bg-gray-700 rounded-full"></div>
                                            <div className="h-4 bg-gray-700 rounded w-32"></div>
                                        </div>
                                        <div className="h-3 bg-gray-700 rounded w-full mb-2"></div>
                                        <div className="h-3 bg-gray-700 rounded w-3/4"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Error State
    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-blue-900 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-red-900/20 border border-red-500/30 rounded-2xl p-8 max-w-md text-center"
                >
                    <div className="text-red-400 text-5xl mb-4">⚠️</div>
                    <h2 className="text-2xl font-bold text-white mb-2">Error</h2>
                    <p className="text-gray-300 mb-6">{error}</p>
                    <button
                        onClick={() => window.location.reload()}
                        className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all"
                    >
                        Try Again
                    </button>
                </motion.div>
            </div>
        );
    }

    // Main Profile View
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent mb-4">
                        {user.role} Profile
                    </h1>
                    <p className="text-gray-400 text-lg">
                        View and manage your account information
                    </p>
                </motion.div>

                {/* Main Profile Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2 }}
                    className="bg-gray-800/40 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden border border-gray-700/50"
                >
                    {/* Profile Header with Image */}
                    <div className="relative h-64 bg-gradient-to-r from-blue-900/30 via-purple-900/30 to-pink-900/30">
                        {/* Decorative elements */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                        {/* Profile Image */}
                        <div className="absolute -bottom-16 left-1/2 transform -translate-x-1/2">
                            <div className="relative">
                                <motion.img
                                    src={user.image || "https://via.placeholder.com/150"}
                                    alt={user.name}
                                    className="w-32 h-32 rounded-full border-4 border-gray-900 shadow-2xl object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                />
                                {/* Online Status */}
                                <div className="absolute bottom-2 right-2 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900"></div>
                            </div>
                        </div>
                    </div>

                    {/* Profile Info */}
                    <div className="pt-20 pb-8 px-6">
                        {/* Name and Role */}
                        <div className="text-center mb-12">
                            <motion.h2
                                className="text-3xl md:text-4xl font-bold text-white mb-3"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.3 }}
                            >
                                {user.name}
                            </motion.h2>
                            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600/20 to-purple-600/20 px-6 py-2 rounded-full border border-blue-500/30">
                                <FaUserShield className="text-blue-400" />
                                <span className="text-blue-300 font-semibold uppercase tracking-wider text-sm">
                                    {user.role}
                                </span>
                                <div className={`px-3 py-1 rounded-full text-xs font-bold ${user.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                                    {user.status}
                                </div>
                            </div>
                        </div>

                        {/* Stats */}
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
                            {/* Account Age */}
                            <motion.div
                                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-blue-500/20 rounded-xl">
                                        <IoCalendarOutline className="text-2xl text-blue-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Member Since</p>
                                        <p className="text-white font-bold">{new Date(user.createdAt).toLocaleDateString()}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Last Login */}
                            <motion.div
                                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-green-500/20 rounded-xl">
                                        <IoTimeOutline className="text-2xl text-green-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Last Login</p>
                                        <p className="text-white font-bold">{formatDate(user.last_login_at)}</p>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Account Status */}
                            <motion.div
                                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-purple-500/20 rounded-xl">
                                        <HiOutlineStatusOnline className="text-2xl text-purple-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">Account Status</p>
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full ${user.status === 'active' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                                            <p className="text-white font-bold capitalize">{user.status}</p>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>

                            {/* User ID */}
                            <motion.div
                                className="bg-gray-900/50 rounded-2xl p-6 border border-gray-700/50"
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="flex items-center gap-4">
                                    <div className="p-3 bg-orange-500/20 rounded-xl">
                                        <IoKeyOutline className="text-2xl text-orange-400" />
                                    </div>
                                    <div>
                                        <p className="text-gray-400 text-sm">User ID</p>
                                        <p className="text-white font-bold text-xs truncate">{user.id}</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Detailed Information */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            {/* Left Column */}
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.4 }}
                            >
                                {/* Personal Information Card */}
                                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-blue-500/20 rounded-lg">
                                            <IoPersonOutline className="text-blue-400" />
                                        </div>
                                        Personal Information
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Name */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-colors">
                                            <MdOutlinePersonPin className="text-2xl text-blue-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Full Name</p>
                                                <p className="text-white font-medium">{user.name}</p>
                                            </div>
                                        </div>

                                        {/* Phone Number */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-colors">
                                            <MdOutlinePhoneAndroid className="text-2xl text-green-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Phone Number</p>
                                                <p className="text-white font-medium">{user.phone_number}</p>
                                            </div>
                                        </div>

                                        {/* Email */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl hover:bg-gray-700/30 transition-colors">
                                            <MdOutlineEmail className="text-2xl text-purple-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Email Address</p>
                                                <p className="text-white font-medium">
                                                    {user.email || "Not provided"}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Account Settings Card */}
                                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-purple-500/20 rounded-lg">
                                            <MdOutlineSecurity className="text-purple-400" />
                                        </div>
                                        Account Settings
                                    </h3>

                                    <div className="space-y-4">
                                        <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-xl hover:from-blue-600/30 hover:to-purple-600/30 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <IoKeyOutline className="text-xl text-blue-400" />
                                                <div className="text-left">
                                                    <p className="text-white font-medium">Change Password</p>
                                                    <p className="text-gray-400 text-sm">Update your security credentials</p>
                                                </div>
                                            </div>
                                            <div className="text-gray-400 group-hover:text-white transition-colors">
                                                →
                                            </div>
                                        </button>

                                        <button className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 rounded-xl hover:from-green-600/30 hover:to-blue-600/30 transition-all group">
                                            <div className="flex items-center gap-3">
                                                <MdOutlineUpdate className="text-xl text-green-400" />
                                                <div className="text-left">
                                                    <p className="text-white font-medium">Update Profile</p>
                                                    <p className="text-gray-400 text-sm">Edit your personal information</p>
                                                </div>
                                            </div>
                                            <div className="text-gray-400 group-hover:text-white transition-colors">
                                                →
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Right Column */}
                            <motion.div
                                className="space-y-6"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.5 }}
                            >
                                {/* Account Details Card */}
                                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-green-500/20 rounded-lg">
                                            <MdOutlineWorkOutline className="text-green-400" />
                                        </div>
                                        Account Details
                                    </h3>

                                    <div className="space-y-4">
                                        {/* Role */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl">
                                            <FaUserShield className="text-2xl text-green-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Account Role</p>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-white font-medium capitalize">{user.role}</span>
                                                    {user.role === 'customer' && (
                                                        <span className="px-2 py-1 bg-green-500/20 text-green-400 text-xs rounded-full">
                                                            Verified User
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Status */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl">
                                            {user.status === 'active' ? (
                                                <FaUserCheck className="text-2xl text-green-400" />
                                            ) : (
                                                <FaUserClock className="text-2xl text-red-400" />
                                            )}
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Account Status</p>
                                                <div className="flex items-center gap-2">
                                                    <span className={`text-white font-medium capitalize ${user.status === 'active' ? 'text-green-400' : 'text-red-400'}`}>
                                                        {user.status}
                                                    </span>
                                                    {user.status === 'active' && (
                                                        <IoCheckmarkCircle className="text-green-400" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Created Date */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl">
                                            <IoCalendarOutline className="text-2xl text-blue-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Account Created</p>
                                                <p className="text-white font-medium">{formatDate(user.createdAt)}</p>
                                            </div>
                                        </div>

                                        {/* Last Updated */}
                                        <div className="flex items-center gap-4 p-3 bg-gray-800/30 rounded-xl">
                                            <IoTimeOutline className="text-2xl text-purple-400" />
                                            <div className="flex-1">
                                                <p className="text-gray-400 text-sm">Last Updated</p>
                                                <p className="text-white font-medium">{formatDate(user.updatedAt)}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Security Status Card */}
                                <div className="bg-gradient-to-br from-gray-900/60 to-gray-800/40 rounded-2xl p-6 border border-gray-700/50">
                                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-3">
                                        <div className="p-2 bg-red-500/20 rounded-lg">
                                            <MdOutlineSecurity className="text-red-400" />
                                        </div>
                                        Security Status
                                    </h3>

                                    <div className="space-y-4">
                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-300">Account Protection</span>
                                                <span className="text-green-400 font-semibold flex items-center gap-1">
                                                    <IoCheckmarkCircleOutline /> Active
                                                </span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full w-full bg-gradient-to-r from-green-500 to-blue-500"></div>
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <div className="flex items-center justify-between">
                                                <span className="text-gray-300">Profile Completeness</span>
                                                <span className="text-blue-400 font-semibold">80%</span>
                                            </div>
                                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                                <div className="h-full w-4/5 bg-gradient-to-r from-blue-500 to-purple-500"></div>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t border-gray-700/50">
                                            <div className="flex items-center justify-between text-sm">
                                                <span className="text-gray-400">Last Security Check</span>
                                                <span className="text-white">{new Date().toLocaleDateString()}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </div>

                        {/* Action Buttons */}
                        <motion.div
                            className="flex flex-wrap gap-4 justify-center mt-12"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-blue-500/30 transition-all flex items-center gap-2">
                                <HiOutlineUserCircle className="text-lg" />
                                Edit Profile
                            </button>
                            <button className="px-8 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-purple-500/30 transition-all flex items-center gap-2">
                                <IoKeyOutline className="text-lg" />
                                Change Password
                            </button>
                            <button className="px-8 py-3 bg-gradient-to-r from-gray-700 to-gray-800 text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-gray-500/30 transition-all flex items-center gap-2 border border-gray-600">
                                <IoTimeOutline className="text-lg" />
                                View Activity Log
                            </button>
                        </motion.div>
                    </div>
                </motion.div>

                {/* Footer Note */}
                <motion.div
                    className="text-center mt-8 text-gray-500 text-sm"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                >
                    <p>Profile last updated: {formatDate(user.updatedAt)}</p>
                    <p className="mt-2">For security reasons, never share your credentials with anyone</p>
                </motion.div>
            </div>
        </div>
    );
};

export default ViewProfile;