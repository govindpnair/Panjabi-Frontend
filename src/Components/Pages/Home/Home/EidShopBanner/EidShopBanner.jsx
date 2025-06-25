import React from 'react';
import { AiOutlineShoppingCart, AiOutlineArrowRight, AiOutlineGift } from "react-icons/ai";

const EidShopBanner = () => {
    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Background Image */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: `url('/src/assets/sellor-2.jpg')`
                }}
            ></div>
            
            {/* Eid themed overlay with crescent moon pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-800/70 to-green-700/60"></div>
            
            {/* Decorative Islamic Pattern Elements */}
            <div className="absolute top-20 right-20 w-32 h-32 border-2 border-yellow-400/30 rounded-full animate-pulse">
                <div className="absolute inset-4 border border-yellow-400/20 rounded-full"></div>
            </div>
            <div className="absolute bottom-32 left-20 w-24 h-24 border-2 border-emerald-400/40 rotate-45 animate-bounce"></div>
            <div className="absolute top-1/4 right-1/4 w-16 h-16 bg-gradient-to-r from-yellow-400/20 to-amber-400/20 rounded-full animate-ping"></div>
            
            {/* Floating crescent moon */}
            <div className="absolute top-16 left-1/4 text-yellow-400/40 text-6xl animate-pulse">☾</div>
            <div className="absolute bottom-1/4 right-16 text-emerald-400/30 text-4xl animate-bounce">✦</div>
            
            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-20 min-h-screen flex items-center">
                <div className="max-w-4xl">
                    {/* Eid Mubarak Badge */}
                    <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 backdrop-blur-sm text-white rounded-full text-sm font-bold mb-6 shadow-xl animate-pulse">
                        {/* <BiSparkles className="mr-2 text-lg" /> */}
                        Eid Mubarak Collection 2025
                        {/* <BiSparkles className="ml-2 text-lg" /> */}
                    </div>
                    
                    {/* Main Heading */}
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6">
                        We have brought you
                        <span className="block bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400 bg-clip-text text-transparent animate-pulse">
                            the best
                        </span>
                        <span className="block text-emerald-300 flex items-center">
                            Eid collection
                            <AiOutlineGift className="ml-4 text-yellow-400 animate-bounce" />
                        </span>
                    </h1>
                    
                    {/* Description */}
                    <p className="text-xl text-gray-200 mb-8 max-w-2xl leading-relaxed">
                        Celebrate this blessed Eid with our exclusive collection of premium traditional wear, 
                        modern outfits, and festive accessories. Make your Eid celebration truly special.
                    </p>
                    
                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 mb-12">
                        <button className="group flex items-center justify-center px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-bold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 hover:scale-105">
                            <AiOutlineShoppingCart className="mr-3 text-xl group-hover:scale-110 transition-transform duration-200" />
                            Shop Eid Collection
                            <AiOutlineArrowRight className="ml-3 group-hover:translate-x-1 transition-transform duration-200" />
                        </button>
                        
                        <button className="flex items-center justify-center px-8 py-4 border-2 border-yellow-400/80 text-yellow-400 font-bold rounded-full backdrop-blur-sm hover:bg-yellow-400 hover:text-gray-900 transition-all duration-300">
                            <AiOutlineGift className="mr-2" />
                            View Gift Ideas
                        </button>
                    </div>
                    
                    
                </div>
            </div>
            
            {/* Floating Eid Sale Badge */}
            <div className="absolute top-8 right-8 bg-gradient-to-r from-red-500 via-pink-500 to-rose-500 text-white px-6 py-4 rounded-2xl font-bold shadow-2xl animate-pulse border border-yellow-400/30">
                <div className="text-center">
                    <div className="text-lg flex items-center justify-center">
                        {/* <BiSparkles className="mr-1" /> */}
                        EID MEGA SALE
                        {/* <BiSparkles className="ml-1" /> */}
                    </div>
                    <div className="text-sm">Up to 60% OFF</div>
                </div>
            </div>
            
            {/* Islamic Pattern Corner Decoration */}
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-20">
                <div className="absolute inset-0 bg-gradient-to-tr from-emerald-400 to-transparent transform rotate-45"></div>
                <div className="absolute inset-2 bg-gradient-to-tr from-yellow-400 to-transparent transform rotate-45"></div>
            </div>
            
            {/* Bottom Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-8 h-12 border-2 border-emerald-400/50 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-emerald-400/70 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>
            
            {/* Floating decorative text */}
            <div className="absolute top-1/2 left-8 transform -translate-y-1/2 -rotate-90 text-emerald-400/30 font-bold text-sm tracking-widest">
                EID MUBARAK
            </div>
        </div>
    );
};

export default EidShopBanner;