import React, { useState } from 'react';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const Productsitem = ({ product }) => {
    const [isWishlisted, setIsWishlisted] = useState(false);

    const handleWishlistToggle = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setIsWishlisted(!isWishlisted);
    };

    return (
        <div className="group">
            <Link to={`/products/${product._id}`}>
                <div className="relative bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:-translate-y-2 overflow-hidden border border-gray-100 ">
                    {/* Image Container */}
                    <div className="relative overflow-hidden">
                        <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-110" 
                        />
                        
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                        
                        {/* Wishlist Button */}
                        <button 
                            onClick={handleWishlistToggle}
                            className="absolute top-4 right-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-xl hover:bg-white transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-110"
                        >
                            {isWishlisted ? (
                                <AiFillHeart className="text-red-500" />
                            ) : (
                                <AiOutlineHeart className="text-gray-600 hover:text-red-500" />
                            )}
                        </button>

                        {/* Sale Badge (if you want to add it later) */}
                        {/* <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                            Sale
                        </div> */}
                    </div>

                    {/* Product Info */}
                    <div className="p-5">
                        <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
                            {product.name}
                        </h3>
                        
                        <div className="flex items-center justify-between">
                            <div className="flex flex-col">
                                <span className="text-2xl font-bold text-gray-900">
                                    ৳ {product.price}
                                </span>
                                {/* You can add original price here if needed */}
                                {/* <span className="text-sm text-gray-500 line-through">
                                    ৳ {product.originalPrice}
                                </span> */}
                            </div>
                        </div>

                        {/* Rating (if you want to add it later) */}
                        {/* <div className="flex items-center mt-2">
                            <div className="flex text-yellow-400">
                                ★★★★★
                            </div>
                            <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
                        </div> */}
                    </div>

                    {/* Bottom hover effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>
                </div>
            </Link>
        </div>
    );
};

export default Productsitem;