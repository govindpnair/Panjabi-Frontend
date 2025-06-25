import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiOutlineHeart, AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { BiStar } from "react-icons/bi";
import Productsitem from "../../../../Sheard/ProductsItem";

const ProductSlider = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch("https://panjabi-server-three.vercel.app/products")
            .then((res) => res.json())
            .then((data) => {
                const filterProduct = data.filter(product => product.section === 'New-Arrivals');
                setProducts(filterProduct);
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
        autoplaySpeed: 4000,
        pauseOnHover: true,
        nextArrow: <CustomNextArrow />, 
        prevArrow: <CustomPrevArrow />,
        dotsClass: "slick-dots custom-dots",
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
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full py-16 px-4 bg-gradient-to-br  relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-0 left-0 w-72 h-72  rounded-full -translate-x-36 -translate-y-36 opacity-30"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96  rounded-full translate-x-48 translate-y-48 opacity-20"></div>
            
            <div className="max-w-7xl mx-auto relative z-10">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center mb-4">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-blue-500 mr-4"></div>
                        <BiStar className="text-yellow-400 text-2xl" />
                        <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-blue-500 ml-4"></div>
                    </div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 via-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        New Arrivals
                    </h2>
                    
                    <p className=" text-lg mb-6 max-w-2xl mx-auto">
                        Discover our latest collection featuring the most trendy and stylish pieces
                    </p>
                    
                    <div className="inline-flex items-center space-x-3">
                        <div className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500  rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                            <span className="font-semibold tracking-wide">SPRING 2025</span>
                            <div className="w-2 h-2  rounded-full animate-pulse"></div>
                        </div>
                        <div className="px-4 py-2  rounded-full text-sm  shadow-sm">
                            {products.length} Items
                        </div>
                    </div>
                </div>

                {/* Products Slider */}
                <div className="relative slider-container">
                    <Slider {...settings}>
                        {products.map((product, index) => (
                            <div key={product._id} className="px-3">
                                <div className="transform transition-all duration-300 hover:scale-105">
                                    <Productsitem product={product} />
                                </div>
                            </div>
                        ))}
                    </Slider>
                </div>

                
            </div>

            {/* Custom Styles */}
            <style jsx>{`
                .custom-dots {
                    bottom: -50px !important;
                }
                .custom-dots li button:before {
                    font-size: 12px !important;
                    color: #cbd5e1 !important;
                    opacity: 1 !important;
                }
                .custom-dots li.slick-active button:before {
                    color: #3b82f6 !important;
                }
                .slider-container .slick-track {
                    display: flex !important;
                    align-items: stretch !important;
                }
                .slider-container .slick-slide > div {
                    height: 100% !important;
                }
            `}</style>
        </div>
    );
};

const CustomNextArrow = (props) => {
    const { onClick } = props;
    return (
        <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 w-12 h-12  hover:bg-blue-50 border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl rounded-full z-20 flex items-center justify-center transition-all duration-300 group"
            onClick={onClick}
        >
            <AiOutlineRight className="text-xl text-gray-600 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all duration-200" />
        </button>
    );
};

const CustomPrevArrow = (props) => {
    const { onClick } = props;
    return (
        <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 w-12 h-12  hover:bg-blue-50 border border-gray-200 hover:border-blue-300 shadow-lg hover:shadow-xl rounded-full z-20 flex items-center justify-center transition-all duration-300 group"
            onClick={onClick}
        >
            <AiOutlineLeft className="text-xl text-gray-600 group-hover:text-blue-600 group-hover:-translate-x-0.5 transition-all duration-200" />
        </button>
    );
};

export default ProductSlider;