import React, { useContext, useEffect, useState } from "react";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import Productsitem from "../../../Sheard/ProductsItem";
import useAuthContext from "../../../hooks/useAuthContext";
import Swal from "sweetalert2";
import useAxiosSecur from "../../../hooks/useAxiosSecur";
import useCarts from "../../../hooks/useCarts";
import ReviewProducts from "./ReviewProducts/ReviewProducts";
// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductsDetailsPage = () => {
    const product = useLoaderData();
    const [allProducts, setAllProducts] = useState([]);
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [selectedSize, setSelectedSize] = useState("M");
    const {user} = useAuthContext();
    const navigate = useNavigate();
    const location = useLocation();
    const axios = useAxiosSecur();
    const [,refetch] = useCarts()

    useEffect(() => {
        fetch('https://panjabi-server-three.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                setAllProducts(data);
            });
    }, []);

    // প্রোডাক্ট ইমেজ অ্যারে
    const images = [
        product.image,
        product.image2,
        product.image3,
    ];
    const {name,_id,price,category,image} = product
    const handleAddToCard = (productItme) =>{
        if(user && user.email){
            const productItem = {
                productId : _id,
                email : user.email,
                userName : user.displayName,
                userImage : user.photoURL,
                productImage : image,
                price, 
                category,
                name,
                dateAdded: new Date().toLocaleString(),
            }
            axios.post('/carts', productItem)
            .then(res =>{
                if(res.data.insertedId){
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${name} added to your cart`,
                        showConfirmButton: false,
                        timer: 1500
                      });
                      refetch()
                }
            })
        }
        else{
            Swal.fire({
                title: "You are not login",
                text: "Please login to add to the cart?",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login!"
              }).then((result) => {
                if (result.isConfirmed) {
                  navigate('/loginForm', {state : {from:location}})
                }
              });
        }
    }

    // সম্পর্কিত প্রোডাক্ট গুলি (ধরা যাক, ক্যাটাগরি অনুযায়ী)
    const relatedProducts = allProducts.filter((p) => p.category === product.category && p._id !== product._id); // একই ক্যাটাগরির প্রোডাক্ট, বর্তমানে দেখানো প্রোডাক্টটি বাদ দিয়ে

    return (
        <>
            <div className="flex flex-col md:flex-row gap-8 p-6 mt-20 md:p-10 md:w-11/12 md:mx-auto md:mt-32 md:mb-20">
                {/* বাম পাশের ইমেজ সেকশন */}
                <div className="flex flex-col md:flex-row gap-3 md:w-1/2">
                    <div className="flex flex-row md:flex-col gap-3">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`Thumbnail ${index + 1}`}
                                className={`w-16 h-16 object-cover border rounded cursor-pointer ${selectedImage === img ? "border-black" : "border-gray-300"}`}
                                onClick={() => setSelectedImage(img)}
                            />
                        ))}
                    </div>
                    <img src={selectedImage} alt="Product" className="w-96 h-auto object-cover" />
                </div>

                {/* ডান পাশের প্রোডাক্ট ডিটেইলস */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-xl font-bold">{product.name}</h2>
                    <p className="text-gray-500 text-sm">SKU: {product._id}</p>
                    <p className="text-2xl font-bold mt-2">৳ {product.price}</p>

                    <p className="mt-4 font-semibold">Color: {product.Color}</p>
                    <p className="mt-4">{product.details}</p>

                    <p className="mt-4 font-semibold">Size</p>
                    <div className="flex gap-2 mt-2">
                        {["XS", "S", "M", "L"].map((size) => (
                            <button
                                key={size}
                                className={`px-4 py-2 border rounded-full ${selectedSize === size ? "bg-red-500 text-white" : "border-gray-400"}`}
                                onClick={() => setSelectedSize(size)}
                            >
                                {size}
                            </button>
                        ))}
                    </div>

                    <button onClick={()=>handleAddToCard(product)} className="mt-5 w-full bg-black text-white py-3 text-lg font-semibold">
                        ADD TO BAG
                    </button>

                    <div className="mt-6 border-t pt-3">
                        <p className="font-semibold">Details</p>
                        <p className="font-semibold mt-3">Size Guide</p>
                        <p className="font-semibold mt-3">Availability In Store</p>
                    </div>
                </div>
            </div>

            {/* সম্পর্কিত প্রোডাক্টস সেকশন with Swiper */}
            <div className="mt-10 md:w-11/12 md:mx-auto mb-10">
                <h3 className="text-xl font-semibold mb-6 text-center md:text-left md:ml-5">Related Products</h3>
                
                {relatedProducts.length > 0 ? (
                    <Swiper
                        modules={[Navigation, Pagination, Autoplay]}
                        spaceBetween={20}
                        slidesPerView={1}
                        navigation={true}
                        pagination={{
                            clickable: true,
                            dynamicBullets: true,
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 3,
                                spaceBetween: 25,
                            },
                            1024: {
                                slidesPerView: 4,
                                spaceBetween: 30,
                            },
                        }}
                        className="related-products-swiper px-4"
                    >
                        {relatedProducts.map((relatedProduct) => (
                            <SwiperSlide key={relatedProduct._id}>
                                <Productsitem product={relatedProduct} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                ) : (
                    <div className="text-center py-10">
                        <p className="text-gray-500">No related products found</p>
                    </div>
                )}
            </div>

            <section className="md:w-11/12 md:mx-auto mb-20">
                <ReviewProducts></ReviewProducts>
            </section>
        </>
    );
};

export default ProductsDetailsPage;