import React from 'react';
import { useLoaderData } from 'react-router-dom';
import useAxiosSecur, { axiosSecur } from '../../../../hooks/useAxiosSecur';
import Swal from 'sweetalert2';

const AllProductsEdit = () => {

    const products = useLoaderData()

    const handleAddSubmit = async e => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = e.target.price.value;
        const category = e.target.category.value;
        const categoryImage = e.target.categoryImage.value;
        const color = e.target.color.value;
        const section = e.target.section.value;
        const details = e.target.details.value;

        const product = {
            name,
            price: parseFloat(price),
            category,
            categoryImage,
            color,
            section,
            details,
        };

        try {
            const productRes = await axiosSecur.patch(`/products/${products._id}`, product);

            // 🔄 Corrected check for PATCH response
            if (productRes.data.modifiedCount > 0) {
                Swal.fire({
                    title: 'Success!',
                    text: 'Product edited successfully!',
                    icon: 'success',
                    confirmButtonText: 'OK'
                });
            } else {
                Swal.fire({
                    title: 'No Changes',
                    text: 'No fields were changed or product not found.',
                    icon: 'info',
                    confirmButtonText: 'OK'
                });
            }
        } catch (error) {
            Swal.fire({
                title: 'Error!',
                text: 'Something went wrong.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
            console.error('Update Error:', error);
        }
    }



    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center text-indigo-700">Edit Products : <span className='text-orange-400'>{products.name}</span></h2>

            <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                    <label className="text-gray-700 font-medium">Product Name</label>
                    <input name="name" defaultValue={products.name} type="text" required placeholder="MEN'S KNIT T-SHIRT" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/* Price */}
                <div>
                    <label className="text-gray-700 font-medium">Price</label>
                    <input name="price" defaultValue={products.price} type="number" required placeholder="750" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/* Category */}
                <div>
                    <label className="text-gray-700 font-medium">Category</label>
                    <input name="category" defaultValue={products.category} type="text" required placeholder="t-shirt" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/* Category Image */}
                <div>
                    <label className="text-gray-700 font-medium">Category Image URL</label>
                    <input name="categoryImage" defaultValue={products.categoryImage} type="text" placeholder="https://..." className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/* Color */}
                <div>
                    <label className="text-gray-700 font-medium">Color</label>
                    <input name="color" defaultValue={products.color} type="text" required placeholder="light olive green" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/* Section */}
                <div>
                    <label className="text-gray-700 font-medium">Section</label>
                    <input name="section" defaultValue={products.section} type="text" required placeholder="New-Arrivals" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400" />
                </div>

                {/* Details */}
                <div className="md:col-span-2">
                    <label className="text-gray-700 font-medium">Product Details</label>
                    <textarea name="details" defaultValue={products.details} rows="3" required placeholder="Write something about the product..." className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"></textarea>
                </div>



                {/* Submit Button */}
                <div className="md:col-span-2 text-center mt-4">
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-md font-semibold transition duration-300">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AllProductsEdit;