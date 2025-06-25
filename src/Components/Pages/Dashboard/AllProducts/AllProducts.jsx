import React from 'react';
import useAxiosSecur from '../../../../hooks/useAxiosSecur';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { FaEdit } from 'react-icons/fa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom';

const AllProducts = () => {
    const axiosSecure = useAxiosSecur();

    const { data: products = [], refetch, isLoading } = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosSecure.get('/products');
            return res.data;
        }
    });
    const deleteUser = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you want to delete this user?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.delete(`/products/${id}`).then(res => {
                    if (res.data.deletedCount > 0) {
                        refetch();
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "User Deleted Successfully",
                            showConfirmButton: false,
                            timer: 1500
                        });
                    }
                });
            }
        });
    };

    if (isLoading) {
        return <p className="text-center text-lg ">Loading...</p>;
    }

    return (
        <div className="p-8">
            <h2 className="text-3xl font-bold mb-6 text-center ">All Products</h2>

            <div className="overflow-x-auto">
                <table className="min-w-full   rounded-lg shadow">
                    <thead>
                        <tr className="">
                            <th className="py-3 px-4 text-left">#</th>
                            <th className="py-3 px-4 text-left">Product Name</th>
                            <th className="py-3 px-4 text-left">Price</th>
                            <th className="py-3 px-4 text-left">Category</th>
                            <th className="py-3 px-4 text-left">Color</th>
                            <th className="py-3 px-4 text-left">Section</th>
                            <th className="py-3 px-4 text-left">Edit Products</th>
                            <th className="py-3 px-4 text-left">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map((product, index) => (
                            <tr key={product._id} className="border-t ">
                                <td className="py-3 px-4">{index + 1}</td>
                                <td className="py-3 px-4 font-medium">{product.name}</td>
                                <td className="py-3 px-4">${product.price}</td>
                                <td className="py-3 px-4">{product.category}</td>
                                <td className="py-3 px-4">{product.color}</td>
                                <td className="py-3 px-4">{product.section}</td>
                                <td className="py-3 px-4">
                                    <Link to={`/dashboard/updateItem/${product._id}`} onClick={()=> editUser(product._id)} className="bg-green-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm flex items-center gap-2">
                                        <FaEdit/>
                                        Edit Product
                                    </Link>
                                </td>
                                <td className="py-3 px-4">
                                    <button onClick={()=> deleteUser(product._id)} className="bg-red-500 hover:bg-green-600 text-white px-4 py-1 rounded text-sm flex items-center gap-2">
                                        <FaDeleteLeft/>
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AllProducts;
