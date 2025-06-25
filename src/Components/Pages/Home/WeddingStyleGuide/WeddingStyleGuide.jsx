import React from "react";

const WeddingStyleGuide = () => {
  return (
    <section className="flex md:mt-28 flex-col lg:flex-row items-center justify-between px-6 md:px-12 lg:px-24 py-16 md:py-24 lg:py-32 bg-gradient-to-b  dark:from-gray-900 dark:to-gray-800">
      {/* Left Content */}
      <div className="lg:w-1/2 text-center lg:text-left space-y-6">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight">
          WEDDING STYLE GUIDE
        </h2>
        <p className="text-gray-700 dark:text-gray-300 text-lg md:text-xl">
          DISCOVER THE LATEST TRENDS IN GROOM'S SHERWANI DESIGNS
        </p>
        <p className="text-gray-600 dark:text-gray-400 md:text-lg">
          Embrace the joyous festivities of new beginnings as you embark on the
          journey of a lifetime. Every detail meticulously crafted to elevate
          your wedding attire to perfection.
        </p>
        <button className="mt-6 px-8 py-3 bg-black text-white text-lg font-semibold rounded-xl shadow-lg hover:bg-gray-800 transition-all">
          READ MORE
        </button>
      </div>

      {/* Right Content - Image Section */}
      <div className="lg:w-1/2 mt-10 lg:mt-0 relative flex justify-center">
        {/* Background Gradient */}
        <div className="absolute top-16 right-14 w-72 h-96 bg-gradient-to-r from-yellow-400 to-yellow-600 rounded-3xl -z-10 shadow-2xl"></div>

        {/* First Image */}
        <img
          src="https://sojanya.com/cdn/shop/files/Artboard_4.jpg?v=1738586010&width=460"
          alt="Sherwani 1"
          className="w-80 md:w-80 h-auto object-cover rounded-2xl shadow-xl relative z-10 transition-transform duration-500 hover:scale-110 hover:shadow-2xl"
        />

        {/* Second Image - Positioned Behind */}
        <img
          src="https://sojanya.com/cdn/shop/files/Artboard_5.jpg?v=1738586013&width=460"
          alt="Sherwani 2"
          className="absolute top-[-100px] right-[-50px] w-72 md:w-80 h-auto object-cover rounded-2xl shadow-lg opacity-90 hover:opacity-100 transition-opacity duration-500"
        />
      </div>
    </section>
  );
};

export default WeddingStyleGuide;
