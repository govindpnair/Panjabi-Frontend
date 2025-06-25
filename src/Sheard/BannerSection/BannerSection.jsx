import React from 'react';

const BannerSection = ({bannerImage, title1, title2}) => {
    return (
        <div className="relative w-full h-[400px] md:h-[500px] lg:h-screen overflow-hidden">
            {/* ব্যাকগ্রাউন্ড ইমেজ */}
            <img
                src={bannerImage}
                alt="Punjabi Collection"
                className="w-full h-full object-cover rounded-lg transition-transform duration-500 scale-100 hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent flex items-center justify-center">
                <h1 className="text-white relative md:top-10 md:right-72 md:w-1/2 md:text-left text-3xl md:text-5xl lg:text-6xl font-bold text-center px-4 leading-snug  transition-all duration-300 hover:scale-105">
                    {title1}  <span className="text-yellow-400"> {title2}</span>!
                </h1>
            </div>
        </div>
    );
};

export default BannerSection;