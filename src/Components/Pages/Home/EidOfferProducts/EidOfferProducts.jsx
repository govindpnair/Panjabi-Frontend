import React, { useEffect, useState } from 'react';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiMoon } from "react-icons/bi";
import { FiGift } from "react-icons/fi";
import Productsitem from '../../../../Sheard/ProductsItem';

const EidOfferProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://panjabi-server-three.vercel.app/products")
            .then((res) => res.json())
            .then((data) => {
                const filterdata = data.filter(product => product.section === 'eid');
                setProducts(filterdata);
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching products:", error);
                setLoading(false);
            });
    }, []);

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 4,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3500,
        pauseOnHover: true,
        nextArrow: <CustomNextArrow />, 
        prevArrow: <CustomPrevArrow />,
        dotsClass: "slick-dots custom-dots-eid",
        responsive: [
            {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 3,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 640,
                settings: {
                    slidesToShow: 1,
                    arrows: false,
                },
            },
        ],
    };

    if (loading) {
        return (
            <div className="w-full p-8">
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-green-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-16 px-4 bg-gradient-to-br  relative overflow-hidden">
            {/* Islamic Pattern Background */}
            <div className="absolute inset-0 opacity-5">
                <div className="absolute top-10 left-10 w-32 h-32 border-4 border-green-400 rounded-full"></div>
                <div className="absolute top-20 right-20 w-24 h-24 border-4 border-yellow-400 rounded-full"></div>
                <div className="absolute bottom-20 left-1/4 w-40 h-40 border-4 border-emerald-400 rounded-full"></div>
                <div className="absolute bottom-10 right-10 w-28 h-28 border-4 border-amber-400 rounded-full"></div>
            </div>
            
            {/* Decorative Stars */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-16 left-1/4 text-yellow-300 text-2xl animate-pulse">✦</div>
                <div className="absolute top-32 right-1/3 text-green-300 text-xl animate-pulse delay-300">✦</div>
                <div className="absolute bottom-32 left-1/3 text-amber-300 text-lg animate-pulse delay-700">✦</div>
                <div className="absolute bottom-16 right-1/4 text-emerald-300 text-2xl animate-pulse delay-500">✦</div>
            </div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center mb-4">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-green-500 mr-4"></div>
                        <BiMoon className="text-green-600 text-3xl" />
                        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-green-500 ml-4"></div>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-green-600 via-yellow-600 to-emerald-600 bg-clip-text text-transparent mb-4">
                        EID OFFER
                    </h2>
                    
                    <p className=" text-lg mb-6 max-w-2xl mx-auto">
                        🌙 Celebrate this blessed Eid with our exclusive collection of traditional wear
                    </p>
                    
                    <div className="inline-flex items-center space-x-3">
                        <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 relative overflow-hidden">
                            <FiGift className="text-lg" />
                            <span className="font-semibold tracking-wide">EID 2K25</span>
                            <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-amber-400 opacity-0 hover:opacity-20 transition-opacity duration-300"></div>
                        </div>
                        <div className="flex items-center space-x-2 px-4 py-2 bg-white border border-green-200 rounded-full text-sm text-gray-700 shadow-sm">
                            <span>🎁</span>
                            <span>{products.length} Special Items</span>
                        </div>
                    </div>

                    {/* Eid Mubarak Text */}
                    <div className="mt-6">
                        <p className="text-green-700 font-arabic text-xl">
                            عيد مبارك
                        </p>
                        <p className="text-sm  mt-1">Eid Mubarak!</p>
                    </div>
                </div>

                {/* Products Slider */}
                <div className="relative slider-container-eid">
                    <Slider {...settings}>
                        {products.map((product, index) => (
                            <div key={product._id} className="px-3">
                                <div className="transform transition-all duration-300 hover:scale-105 relative">
                                    {/* Special Offer Badge */}
                                    <div className="absolute -top-2 -right-2 z-20 bg-gradient-to-r from-red-500 to-pink-500 text-white text-xs px-2 py-1 rounded-full shadow-lg animate-bounce">
                                        🎉 OFFER
                                    </div>
                                    <Productsitem product={product} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .custom-dots-eid {
                    bottom: -50px !important;
                }
                .custom-dots-eid li button:before {
                    font-size: 12px !important;
                    color: #cbd5e1 !important;
                    opacity: 1 !important;
                }
                .custom-dots-eid li.slick-active button:before {
                    color: #059669 !important;
                }
                .slider-container-eid .slick-track {
                    display: flex !important;
                    align-items: stretch !important;
                }
                .slider-container-eid .slick-slide > div {
                    height: 100% !important;
                }
                .font-arabic {
                    font-family: 'Amiri', serif;
                }
            `}</style>
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-green-50 border border-green-200 hover:border-green-400 shadow-lg hover:shadow-xl rounded-full z-20 flex items-center justify-center transition-all duration-300 group"
            onClick={onClick}
        >
            <AiOutlineRight className="text-xl text-gray-600 group-hover:text-green-600 group-hover:translate-x-0.5 transition-all duration-200" />
        </button>
    );
};

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white hover:bg-green-50 border border-green-200 hover:border-green-400 shadow-lg hover:shadow-xl rounded-full z-20 flex items-center justify-center transition-all duration-300 group"
            onClick={onClick}
        >
            <AiOutlineLeft className="text-xl text-gray-600 group-hover:text-green-600 group-hover:-translate-x-0.5 transition-all duration-200" />
        </button>
    );
};

export default EidOfferProducts;