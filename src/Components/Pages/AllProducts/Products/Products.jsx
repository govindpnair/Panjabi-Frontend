import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { AiOutlineHeart } from "react-icons/ai";
import { useParams } from 'react-router-dom';
import Productsitem from '../../../../Sheard/ProductsItem';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [priceLimit, setPriceLimit] = useState(5000);
    const { category } = useParams(); // URL থেকে ক্যাটাগরি নেওয়া

    // Fetch products
    useEffect(() => {
        fetch('https://panjabi-server-three.vercel.app/products')
            .then(res => res.json())
            .then(data => {
                setProducts(data);

                // Extract unique categories
                const uniqueCategories = ["all", ...new Set(data.map(product => product.category))];
                setCategories(uniqueCategories);
            });
    }, []);

    // ক্যাটাগরি URL থেকে পেয়ে সেট করা
    useEffect(() => {
        if (category) {
            setSelectedCategory((category)); // URL থেকে ক্যাটাগরি পেয়ে সেট করা
        }
    }, [category]);

    // Filtered products
    const filteredProducts = products.filter(product => 
        (selectedCategory === 'all' || product.category === selectedCategory) &&
        product.price <= priceLimit &&
        product.name.toLowerCase().includes(search.toLowerCase()) // Search functionality
    );

    return (
        <>
        <Helmet>
            <title>Products Page</title>
        </Helmet>
        <div className="p-4 max-w-6xl mx-auto mt-28">
            {/* Search Input */}
            <input
                type="text"
                placeholder="Search products..."
                className="w-full p-2 border rounded mb-4"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Sidebar (Categories & Price Filter) */}
                <div className="md:col-span-1 p-4 rounded-lg">
                    <h2 className="font-bold mb-2">Categories</h2>
                    <ul>
                        {categories.map((cat, index) => (
                            <li
                                key={index}
                                className={`p-2 cursor-pointer rounded text-sm md:text-base ${
                                    selectedCategory === cat ? "bg-yellow-800 text-white" : ""
                                }`}
                                onClick={() => setSelectedCategory(cat)}
                            >
                                {cat}
                            </li>
                        ))}
                    </ul>

                    {/* Price Filter */}
                    <h2 className="font-bold mt-4">Price</h2>
                    <input
                        type="range"
                        min="0"
                        max="5000"
                        value={priceLimit}
                        onChange={(e) => setPriceLimit(Number(e.target.value))}
                        className="w-full"
                    />
                    <p className="text-sm md:text-base">Up to ৳{priceLimit}</p>
                </div>

                {/* Product List */}
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <Productsitem product={product}></Productsitem>
                        ))
                    ) : (
                        <p className="col-span-full text-center text-lg font-semibold">No products found</p>
                    )}
                </div>
            </div>
        </div>
        </>
    );
};

export default Products;
