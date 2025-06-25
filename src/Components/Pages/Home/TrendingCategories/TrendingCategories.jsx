import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, ShoppingBag } from "lucide-react";
import { Link } from "react-router-dom";

const TrendingCategories = () => {
  const [categories, setCategories] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("https://panjabi-server-three.vercel.app/products")
      .then((res) => res.json())
      .then((data) => {
        // ইউনিক ক্যাটাগরি ও তার ইমেজ বের করা
        const uniqueCategories = [
          ...new Map(
            data.map((product) => [
              product.category,
              {
                category: product.category,
                categoryImage: product.categoryImage,
                productCount: data.filter(p => p.category === product.category).length
              }
            ])
          ).values(),
        ];
        setCategories(uniqueCategories);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);

  const getVisibleSlides = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth >= 1280) return 4;
      if (window.innerWidth >= 1024) return 3;
      if (window.innerWidth >= 768) return 2;
      return 1;
    }
    return 4;
  };

  const [visibleSlides, setVisibleSlides] = useState(getVisibleSlides());

  useEffect(() => {
    const handleResize = () => {
      setVisibleSlides(getVisibleSlides());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) =>
      prev >= categories.length - visibleSlides ? 0 : prev + 1
    );
  };

  const prevSlide = () => {
    setCurrentSlide((prev) =>
      prev <= 0 ? Math.max(0, categories.length - visibleSlides) : prev - 1
    );
  };

  const handleCategoryClick = (category) => {
    // This will be handled by Link component
    console.log(`Navigate to: /allProducts/${category.category}`);
  };

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-12">
            Trending Categories
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="animate-pulse">
                <div className=" rounded-2xl h-80 mb-4"></div>
                <div className=" rounded-lg h-6 w-32 mx-auto"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-br ">
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
          Trending Categories
        </h2>
        <p className=" text-lg max-w-2xl mx-auto">
          Discover our most popular collections and find your perfect style
        </p>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-600 to-pink-600 mx-auto mt-6 rounded-full"></div>
      </div>

      {/* Category Slider */}
      <div className="relative">
        {/* Navigation Arrows */}
        {categories.length > visibleSlides && (
          <>
            <button
              onClick={prevSlide}
              className="absolute -left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 group"
            >
              <ChevronLeft className="text-xl text-gray-600 group-hover:text-purple-600 transition-colors" />
            </button>
            <button
              onClick={nextSlide}
              className="absolute -right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white hover:bg-gray-50 border-2 border-gray-200 hover:border-purple-300 shadow-lg hover:shadow-xl p-3 rounded-full transition-all duration-300 group"
            >
              <ChevronRight className="text-xl text-gray-600 group-hover:text-purple-600 transition-colors" />
            </button>
          </>
        )}

        {/* Categories Container */}
        <div className="overflow-hidden">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentSlide * (100 / visibleSlides)}%)`,
            }}
          >
            {categories.length > 0 ? (
              categories.map((category, index) => (
                <Link
                  to={`/allProducts/${category.category}`}
                  key={index}
                  className="flex-shrink-0 px-3"
                  style={{ width: `${100 / visibleSlides}%` }}
                >
                  <div className="group cursor-pointer transform transition-all duration-300 hover:scale-105">
                    {/* Image Container */}
                    <div className="relative overflow-hidden rounded-2xl shadow-lg group-hover:shadow-2xl transition-all duration-300 bg-gradient-to-br from-purple-100 to-pink-100 p-6">
                      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      <img
                        className="w-full h-64 sm:h-72 lg:h-80 object-cover rounded-xl transition-transform duration-500 group-hover:scale-110"
                        src={category.categoryImage}
                        alt={category.category}
                        onError={(e) => {
                          e.target.src = 'https://via.placeholder.com/300x400/f3f4f6/9ca3af?text=No+Image';
                        }}
                      />

                      {/* Product Count Badge */}
                      {category.productCount && (
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-700 px-3 py-1 rounded-full text-sm font-medium shadow-lg">
                          {category.productCount} items
                        </div>
                      )}
                    </div>

                    {/* Category Info */}
                    <div className="mt-6 text-center">
                      <div className="inline-flex items-center justify-center  hover:bg-gradient-to-r hover:from-purple-600 hover:to-pink-600  hover:text-white border-2 border-gray-200 hover:border-transparent py-3 px-6 rounded-full font-semibold text-sm lg:text-base transition-all duration-300 shadow-md hover:shadow-lg group-hover:transform group-hover:-translate-y-1">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        {category.category}
                      </div>
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="w-full text-center py-16">
                <div className="text-gray-400 mb-4">
                  <ShoppingBag className="w-16 h-16 mx-auto" />
                </div>
                <p className="text-gray-500 text-lg">No categories found</p>
              </div>
            )}
          </div>
        </div>

        {/* Dots Indicator */}
        {categories.length > visibleSlides && (
          <div className="flex justify-center mt-8 space-x-2">
            {Array.from({ length: Math.ceil(categories.length - visibleSlides + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${currentSlide === index
                    ? 'bg-gradient-to-r from-purple-600 to-pink-600 w-8'
                    : 'bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default TrendingCategories;