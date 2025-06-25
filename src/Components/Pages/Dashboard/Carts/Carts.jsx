import React, { useState, useEffect } from "react";
import useCarts from "../../../../hooks/useCarts";
import { Trash, Plus, Minus } from "lucide-react";
import Swal from "sweetalert2";
import { axiosSecur } from "../../../../hooks/useAxiosSecur";
import { Link } from "react-router-dom";

const Carts = () => {
    const [cart, refetch] = useCarts();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        setProducts(cart);
    }, [cart]);

    const totalPrice = cart.reduce((total, item) => total + item.price, 0);

    // delete product on card
    const deleteProduct = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: ` Do you want to delete the product?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecur.delete(`/carts/${id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch()
                            Swal.fire({
                                position: "top-end",
                                icon: "success",
                                title: "Delete Success",
                                showConfirmButton: false,
                                timer: 1500
                            });

                        }
                    })
            }
        });
    }

    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto">
                <h1 className="text-2xl font-bold mb-8 text-center">Your Order Products</h1>
                <div className="text-right flex flex-col md:flex-row items-center justify-between gap-3 mb-5">
                    <h1 className="text-xl font-bold text-center md:text-left">Total Price : {totalPrice}$</h1>
                    {
                        cart.length ? <Link to={"/dashboard/payments"}>
                        <button className="bg-yellow-400 px-4 rounded-md py-2 font-bold w-full md:w-auto">PAY BUTTON</button>
                    </Link> : <Link  to={"/dashboard/payments"}>
                        <button disabled className="bg-yellow-100 px-4 rounded-md py-2 font-bold w-full md:w-auto">PAY BUTTON</button>
                    </Link>
                    }
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-lg text-center">
                        <thead>
                            <tr className="">
                                <th className="p-3">Image</th>
                                <th className="p-3">Name</th>
                                <th className="p-3">Date or Time</th>
                                <th className="p-3">Price</th>
                                <th className="p-3">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((product) => (
                                <tr key={product.id} className="border-t transition-all">
                                    <td className="p-3">
                                        <img src={product.productImage} alt={product.name} className="w-12 h-12 object-cover mx-auto" />
                                    </td>
                                    <td className="p-3 text-sm md:text-base">{product.name}</td>
                                    <td className="p-3 text-sm text-yellow-400 font-bold md:text-base">{product.dateAdded}</td>
                                    <td className="p-3 text-sm md:text-base">${product.price}</td>
                                    <td className="p-3">
                                        <button
                                            onClick={() => deleteProduct(product._id)}
                                            className="p-2 bg-red-500 rounded text-white hover:bg-red-600 transition-all"
                                        >
                                            <Trash size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Carts;
