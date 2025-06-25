import React from 'react';
import useAxiosSecur from '../../../../hooks/useAxiosSecur';
import Swal from 'sweetalert2';

const AddProducts = () => {

    const axiosSecure = useAxiosSecur()
    const handleAddSubmit = async e => {
        e.preventDefault();
        const name = e.target.name.value;
        const price = e.target.price.value;
        const category = e.target.category.value;
        const categoryImage = e.target.categoryImage.value;
        const color = e.target.color.value;
        const section = e.target.section.value;
        const details = e.target.details.value;

        const image = e.target.image1.value;
        const image2 = e.target.image2.value;
        const image3 = e.target.image3.value;

        const product = {
            name,
            price : parseFloat(price),
            category,
            categoryImage,
            color,
            section,
            details,
            image : image,
            image2 : image2,
            image3 : image3
        };

        // console.log(product);
        const productRes = await axiosSecure.post('/products', product)
        if (productRes.data.insertedId) {
            Swal.fire({
                title: 'Success!',
                text: 'Product added successfully!',
                icon: 'success',
                confirmButtonText: 'OK'
            });
        }
    }

    return (
        <div className="w-full mx-auto p-6  shadow-xl rounded-xl mt-10">
            <h2 className="text-3xl font-bold text-center text-indigo-600 mb-6">Add New Product</h2>

            <form onSubmit={handleAddSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                    <label className="text-gray-700 font-medium">Product Name</label>
                    <input name="name" type="text" required placeholder="MEN'S KNIT T-SHIRT" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800" />
                </div>

                {/* Price */}
                <div>
                    <label className="text-gray-700 font-medium">Price</label>
                    <input name="price" type="number" required placeholder="750" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800" />
                </div>

                {/* Category */}
                <div>
                    <label className="text-gray-700 font-medium">Category</label>
                    <input name="category" type="text" required placeholder="t-shirt" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800" />
                </div>

                {/* Category Image */}
                <div>
                    <label className="text-gray-700 font-medium">Category Image URL</label>
                    <input name="categoryImage" type="text"  placeholder="https://..." className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800" />
                </div>

                {/* Color */}
                <div>
                    <label className="text-gray-700 font-medium">Color</label>
                    <input name="color" type="text" required placeholder="light olive green" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800" />
                </div>

                {/* Section */}
                <div>
                    <label className="text-gray-700 font-medium">Section</label>
                    <input name="section" type="text" required placeholder="New-Arrivals" className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800" />
                </div>

                {/* Details */}
                <div className="md:col-span-2">
                    <label className="text-gray-700 font-medium">Product Details</label>
                    <textarea name="details" rows="3" required placeholder="Write something about the product..." className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"></textarea>
                </div>

                {/* Images 1-5 */}
                {[1, 2, 3].map((num) => (
                    <div key={num}>
                        <label className="text-gray-700 font-medium">Image {num} URL</label>
                        <input
                            name={`image${num}`}
                            type="text"
                            required
                            placeholder={`https://...`}
                            className="w-full mt-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400 dark:bg-gray-800"
                        />
                    </div>
                ))}

                {/* Submit Button */}
                <div className="md:col-span-2 text-center mt-4">
                    <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-2 rounded-md font-semibold transition duration-300 dark:bg-gray-800">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddProducts;
