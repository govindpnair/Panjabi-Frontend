import React from 'react';
import { Truck, Gift, Zap, Star } from 'lucide-react';

const OfferBanner = () => {
    return (
        <div className="relative overflow-hidden bg-gradient-to-r from-red-50 via-white to-red-50">
            {/* Animated Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-red-100 rounded-full opacity-20 animate-pulse"></div>
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-red-100 rounded-full opacity-20 animate-pulse delay-700"></div>
                <div className="absolute top-1/2 left-1/4 w-16 h-16 bg-red-200 rounded-full opacity-10 animate-bounce delay-300"></div>
                <div className="absolute top-1/4 right-1/4 w-20 h-20 bg-red-200 rounded-full opacity-10 animate-bounce delay-500"></div>
            </div>

            {/* Main Banner Content */}
            <div className="relative md:w-11/12 md:mx-auto border-t-4 border-b-4 border-gradient-to-r from-red-500 to-red-600 py-8 px-6">
                {/* Top decorative border */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600"></div>
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-400 via-red-500 to-red-600"></div>

                <div className="flex flex-col lg:flex-row justify-between items-center gap-6 text-center lg:text-left">
                    {/* Left Section - Home Delivery */}
                    <div className="flex-1 group">
                        <div className="flex items-center justify-center lg:justify-start gap-3 mb-2">
                            <div className="bg-red-500 p-2 rounded-full group-hover:bg-red-600 transition-colors duration-300">
                                <Truck className="w-6 h-6 text-white" />
                            </div>
                            <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-full opacity-20">
                                <Star className="w-4 h-4 text-red-600" />
                            </div>
                        </div>
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                                HOME DELIVERY
                            </span>
                            <br />
                            <span className="text-red-600 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent animate-pulse">
                                ALL OVER BANGLADESH
                            </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 font-medium">
                            🚚 Fast & Reliable Shipping
                        </div>
                    </div>

                    {/* Center Divider */}
                    <div className="hidden lg:block">
                        <div className="w-px h-20 bg-gradient-to-b from-transparent via-red-300 to-transparent"></div>
                    </div>
                    <div className="lg:hidden">
                        <div className="h-px w-32 bg-gradient-to-r from-transparent via-red-300 to-transparent"></div>
                    </div>

                    {/* Right Section - Special Offer */}
                    <div className="flex-1 group">
                        <div className="flex items-center justify-center lg:justify-end gap-3 mb-2">
                            <div className="bg-gradient-to-r from-red-500 to-red-600 p-2 rounded-full opacity-20">
                                <Zap className="w-4 h-4 text-red-600" />
                            </div>
                            <div className="bg-red-500 p-2 rounded-full group-hover:bg-red-600 transition-colors duration-300">
                                <Gift className="w-6 h-6 text-white" />
                            </div>
                        </div>
                        <div className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 leading-tight">
                            <span className="inline-block transform hover:scale-105 transition-transform duration-300">
                                SPECIAL
                            </span>{' '}
                            <span className="text-red-600 bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent animate-pulse">
                                OFFER
                            </span>
                        </div>
                        <div className="mt-2 text-sm text-gray-600 font-medium">
                            🎁 Limited Time Deals
                        </div>
                    </div>
                </div>

                {/* Call to Action */}
                <div className="mt-8 text-center">
                    <button className="group relative inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300">
                        <span className="relative z-10 flex items-center gap-2">
                            <Gift className="w-5 h-5" />
                            Shop Now & Save Big!
                            <Zap className="w-4 h-4 animate-pulse" />
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                </div>

                {/* Bottom Features */}
                <div className="mt-6 flex flex-wrap justify-center lg:justify-between items-center gap-4 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span>✅ Free Shipping Over ৳500</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse delay-300"></div>
                        <span>🔄 Easy Return Policy</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500"></div>
                        <span>⚡ Same Day Delivery Available</span>
                    </div>
                </div>
            </div>

            {/* Floating Elements */}
            <div className="absolute top-4 right-4 opacity-20">
                <div className="relative">
                    <Star className="w-6 h-6 text-red-500 animate-spin" style={{ animationDuration: '3s' }} />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></div>
                </div>
            </div>
            <div className="absolute bottom-4 left-4 opacity-20">
                <div className="relative">
                    <Gift className="w-6 h-6 text-red-500 animate-bounce" />
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping delay-700"></div>
                </div>
            </div>
        </div>
    );
};

export default OfferBanner;