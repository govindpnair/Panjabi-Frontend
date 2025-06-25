import React, { useEffect, useState } from 'react';
import { Star, Quote, Shield, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomerReview = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    if (reviews.length > 0) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [reviews.length]);

  useEffect(() => {
    fetch('https://panjabi-server-three.vercel.app/review')
      .then((res) => res.json())
      .then((data) => {
        setReviews(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch reviews:", err);
        setLoading(false);
      });
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % Math.ceil(reviews.length / 3));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + Math.ceil(reviews.length / 3)) % Math.ceil(reviews.length / 3));
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 transition-all duration-200 hover:scale-110 ${i < rating
            ? 'text-yellow-400 fill-yellow-400 drop-shadow-sm'
            : 'text-gray-300'
          }`}
      />
    ));
  };

  const ReviewCard = ({ review }) => (
    <div className="group relative bg-gradient-to-br rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 hover:scale-[1.02] border border-gray-100 overflow-hidden">
      {/* Shimmer effect */}
      <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/40 to-transparent group-hover:translate-x-full transition-transform duration-700"></div>

      {/* Quote decoration */}
      <Quote className="absolute -top-2 -right-2 w-16 h-16  rotate-12" />

      {/* Profile section */}
      <div className="relative mb-6">
        <div className="w-24 h-24 mx-auto relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 animate-pulse"></div>
          <img
            src={review.userImage}
            alt={`${review.name}'s profile`}
            className="relative w-full h-full rounded-full object-cover border-4 border-white shadow-lg transition-transform duration-300 group-hover:scale-110"
          />
        </div>
      </div>

      {/* Content */}
      <div className="text-center relative z-10">
        <h3 className="text-2xl font-bold  mb-2 group-hover:text-blue-600 transition-colors">
          {review.name}
        </h3>

        <div className="inline-block px-4 py-1 bg-gradient-to-r from-blue-50 to-purple-50 text-blue-700 text-sm font-medium rounded-full mb-4 border border-blue-100">
          {review.productName}
        </div>

        <p className=" mb-6 text-lg leading-relaxed italic relative">
          <span className="text-4xl  absolute -top-2 -left-2">"</span>
          {review.des}
          <span className="text-4xl  absolute -bottom-6 -right-2">"</span>
        </p>

        {/* Star rating */}
        <div className="flex justify-center items-center gap-1 mb-4">
          {renderStars(review.rating)}
        </div>

        {/* Verified badge */}
        <div className="flex items-center justify-center text-sm text-gray-500">
          <Shield className="w-4 h-4 mr-1 text-green-500" />
          Verified Purchase
        </div>
      </div>
    </div>
  );

  if (loading) {
    return (
      <section className="w-full max-w-7xl mx-auto px-4 py-16">
        <div className="text-center">
          <div className="inline-block w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className=" text-lg">Loading amazing reviews...</p>
        </div>
      </section>
    );
  }

  const totalSlides = Math.ceil(reviews.length / 3);
  const currentReviews = reviews.slice(currentSlide * 3, (currentSlide + 1) * 3);

  return (
    <section className="w-full max-w-7xl mx-auto px-4 py-16 bg-gradient-to-br ">
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block">
          <h2 className="text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-400 bg-clip-text text-transparent mb-4 relative">
            What Our Customers Say
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </h2>
        </div>
        <p className=" text-lg max-w-2xl mx-auto mt-6">
          Discover why thousands of customers love our products and service.
          Real reviews from real people who've experienced excellence.
        </p>
      </div>

      {/* Reviews Grid */}
      <div className="relative">
        {/* Navigation Arrows */}
        {totalSlides > 1 && (
          <>
            <button
              onClick={prevSlide}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10  rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            >
              <ChevronLeft className="w-6 h-6  group-hover:text-blue-500" />
            </button>

            <button
              onClick={nextSlide}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10  rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 group"
            >
              <ChevronRight className="w-6 h-6  group-hover:text-blue-500" />
            </button>
          </>
        )}

        {/* Reviews Container */}
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {currentReviews.map((review) => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </div>

        {/* Dots Navigation */}
        {totalSlides > 1 && (
          <div className="flex justify-center items-center gap-3 mt-8">
            {Array.from({ length: totalSlides }, (_, i) => (
              <button
                key={i}
                onClick={() => goToSlide(i)}
                className={`transition-all duration-300 rounded-full ${i === currentSlide
                    ? 'w-8 h-3 bg-gradient-to-r from-blue-500 to-purple-500'
                    : 'w-3 h-3  hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Stats Section */}
      <div className="mt-16 grid md:grid-cols-3 gap-8 text-center">
        <div className="border border-white rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-bold text-blue-600 mb-2">{reviews.length}+</div>
          <div className="">Happy Customers</div>
        </div>
        <div className="border border-white rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-bold text-purple-600 mb-2">4.9</div>
          <div className="">Average Rating</div>
        </div>
        <div className="border border-white rounded-xl p-6 shadow-lg">
          <div className="text-3xl font-bold text-green-600 mb-2">100%</div>
          <div className="">Satisfaction Rate</div>
        </div>
      </div>
    </section>
  );
};

export default CustomerReview;