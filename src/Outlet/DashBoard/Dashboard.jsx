import React, { useState } from "react";
import { FiHome, FiSettings, FiLogOut } from "react-icons/fi";
import { MdDashboard, MdPayment } from "react-icons/md";
import { FaDiceD6, FaMoneyCheckAlt, FaShoppingCart, FaUser } from "react-icons/fa";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link, Outlet } from "react-router-dom";
import useAuthContext from "../../hooks/useAuthContext";
import Swal from "sweetalert2";
import useTheme from "../../hooks/useTheme";
import useAdmin from "../../hooks/useAdmin";

const Sidebar = ({ isOpen, toggleSidebar }) => {
    const { theme } = useTheme();
    const { user, logOut } = useAuthContext();
    const [isuseAdmin] = useAdmin()

    const isAdmin = isuseAdmin;

    const handleLogout = () => {
        Swal.fire({
            title: "Are you sure?",
            text: "Do you really want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                logOut()
                    .then(() => {
                        Swal.fire({
                            title: "Logged Out!",
                            text: "You have successfully logged out.",
                            icon: "success",
                            confirmButtonColor: "#3085d6",
                        });
                    })
                    .catch((error) => {
                        Swal.fire({
                            title: "Logout Failed!",
                            text: error.message,
                            icon: "error",
                            confirmButtonColor: "#d33",
                        });
                    });
            }
        });
    };

    return (
        <div
            className={`fixed top-0 left-0 h-full w-64 bg-gray-900 text-white p-5 transform ${isOpen ? "translate-x-0" : "-translate-x-64"} md:translate-x-0 transition-transform duration-300 ease-in-out z-50`}
        >
            <Link to={'/'}>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <MdDashboard /> Dashboard
            </h2></Link>
            <ul className="space-y-4">
                {
                    isAdmin ? <>
                        <Link to={'/dashboard/adminHome'} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded cursor-pointer">
                            <FiHome /> Home || Admin
                        </Link>
                        <Link to={'/dashboard/allUsers'} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded cursor-pointer">
                            <FaUser /> All Users
                        </Link>
                        <Link to={'/dashboard/addProduct'} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded cursor-pointer">
                            <FaDiceD6 /> Add Products
                        </Link>
                        <Link to={'/dashboard/allProduct'} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded cursor-pointer">
                            <RiShoppingCart2Line /> All Products
                        </Link>
                        <Link to={'/dashboard/allPayments'} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded cursor-pointer">
                            <MdPayment /> All Payments
                        </Link>
                    </> : <>
                        <Link to={'/dashboard/userHome'} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded cursor-pointer">
                            <FiHome /> Home || User
                        </Link>
                        
                    </>
                }

                <Link to={'/dashboard/cart'} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded cursor-pointer">
                    <FaShoppingCart /> Your ordered product
                </Link>
                <Link to={'/dashboard/paymentHistory'} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded cursor-pointer">
                    <FaMoneyCheckAlt /> Your payment history
                </Link>
                
                <li onClick={handleLogout} className="flex items-center gap-3 p-3 hover:bg-gray-800 rounded cursor-pointer text-red-400">
                    <FiLogOut /> Logout
                </li>
                <div className="flex items-center gap-3 p-3">
                    <img src={user?.photoURL} className="rounded-full w-10 h-10" alt="" />
                    <h1 className="font-bold text-lg">{user?.displayName}</h1>
                </div>
            </ul>
        </div>
    );
};

const Dashboard = () => {
    const [isOpen, setIsOpen] = useState(false);
    const toggleSidebar = () => setIsOpen(!isOpen);

    return (
        <div className="flex min-h-screen">
            <Sidebar isOpen={isOpen} toggleSidebar={toggleSidebar} />
            <div className="flex-1 md:ml-64 p-6 transition-all">
                <button
                    className="md:hidden mb-4 bg-gray-900 text-white p-2 rounded fixed top-4 left-4 z-50"
                    onClick={toggleSidebar}
                >
                    ☰
                </button>
                <div className="min-h-screen flex flex-col bg-white dark:bg-gray-900 text-gray-900 dark:text-white transition-all duration-500">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
