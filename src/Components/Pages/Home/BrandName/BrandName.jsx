import React from "react";

const brands = [
  { name: "Yellow", color: "from-yellow-400 to-yellow-600" },
  { name: "Aarong", color: "from-green-400 to-green-600" },
  { name: "Richman", color: "from-blue-400 to-blue-600" },
  { name: "Ecstasy", color: "from-purple-400 to-purple-600" },
  { name: "Sailor", color: "from-cyan-400 to-cyan-600" },
  { name: "Cats Eye", color: "from-pink-400 to-pink-600" },
  { name: "Lubnan", color: "from-red-400 to-red-600" },
  { name: "Manyavar", color: "from-indigo-400 to-indigo-600" },
  { name: "Fabindia", color: "from-orange-400 to-orange-600" },
  { name: "Peter England", color: "from-teal-400 to-teal-600" },
];

const BrandName = () => {
  return (
    <section className="py-12 sm:py-16 lg:py-20 bg-gradient-to-b ">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold  mb-4 leading-tight">
            Popular{" "}
            <span className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 bg-clip-text text-transparent">
              Punjabi
            </span>{" "}
            Brands
          </h2>
          <p className=" text-base sm:text-lg lg:text-xl max-w-2xl mx-auto">
            Discover authentic collections from Bangladesh's most trusted fashion brands
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Brands Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {brands.map((brand, index) => (
            <div
              key={index}
              className="group relative  rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center shadow-lg hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`
              }}
            >
              {/* Background Gradient Overlay */}
              <div className={`absolute inset-0 bg-gradient-to-br ${brand.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl sm:rounded-3xl`}></div>
              
              {/* Brand Icon/Avatar */}
              <div className={`w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mx-auto mb-3 sm:mb-4 bg-gradient-to-br ${brand.color} rounded-full flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110`}>
                <span className=" font-bold text-lg sm:text-xl lg:text-2xl">
                  {brand.name.charAt(0)}
                </span>
              </div>

              {/* Brand Name */}
              <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-semibold   transition-colors duration-300 leading-tight">
                {brand.name}
              </h3>

              {/* Hover Effect Indicator */}
              <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-0 h-1 bg-gradient-to-r from-yellow-400 to-yellow-600 group-hover:w-full transition-all duration-500 rounded-t-full"></div>
              
              {/* Corner Decoration */}
              <div className="absolute top-2 right-2 w-2 h-2 bg-yellow-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-125"></div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12 sm:mt-16 lg:mt-20">
          <button className="group relative px-6 sm:px-8 lg:px-12 py-3 sm:py-4 bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 text-white font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl text-sm sm:text-base lg:text-lg">
            <span className="relative z-10">Explore All Brands</span>
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-600 to-yellow-800 rounded-full transform scale-0 group-hover:scale-100 transition-transform duration-500"></div>
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-1/4 left-4 w-2 h-2 bg-yellow-400 rounded-full opacity-30 animate-pulse hidden lg:block"></div>
        <div className="absolute top-1/2 right-8 w-3 h-3 bg-yellow-500 rounded-full opacity-20 animate-bounce hidden lg:block"></div>
        <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-yellow-600 rounded-full opacity-40 animate-ping hidden lg:block"></div>
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .group {
          animation: slideUp 0.6s ease-out forwards;
        }
        
        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
};

export default BrandName;