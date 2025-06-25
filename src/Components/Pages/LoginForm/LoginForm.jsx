import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { FaGoogle } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // ✅ SweetAlert2 ইমপোর্ট করুন
import { AuthContext } from "../../../Providers/AuthProvider";
import useAuthContext from "../../../hooks/useAuthContext";
import GoogleFormFilUp from "../../../Sheard/googleFormFilUp/googleFormFilUp";

const LoginForm = () => {
    const { loginUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();


    const form = location.state?.from?.pathname || '/';

    const handleLogin = (e) => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;

        loginUser(email, password)
            .then((res) => {
                const user = res.user;

                // ✅ সফল Login হলে Success Alert দেখানো হবে
                Swal.fire({
                    title: "Login Successful!",
                    text: `Welcome, ${user.displayName || "User"}!`,
                    icon: "success",
                    confirmButtonColor: "#3085d6",
                    confirmButtonText: "OK",
                });
                navigate(form, { replace: true })
            })
            .catch((error) => {
                // ❌ Login ব্যর্থ হলে Error Alert দেখানো হবে
                Swal.fire({
                    title: "Login Failed!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "Try Again",
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Login page</title>
            </Helmet>

            <form
                onSubmit={handleLogin}
                className="space-y-6 max-w-md mx-auto p-6 rounded-xl shadow-lg mt-28 my-8"
            >
                {/* Email Input */}
                <div>
                    <label className="block font-medium">Email</label>
                    <input
                        type="email"
                        name="email"
                        required
                        placeholder="Enter your email"
                        className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                </div>

                {/* Password Input */}
                <div>
                    <label className="block font-medium">Password</label>
                    <input
                        type="password"
                        name="password"
                        required
                        placeholder="Enter password"
                        className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                </div>

                <div>
                    <p>
                        You have not any account?{" "}
                        <Link className="text-green-400 underline" to={"/RegisterForm"}>
                            Please register
                        </Link>
                    </p>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-yellow-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-950 focus:outline-none focus:ring-4 focus:ring-yellow-950 transition duration-200"
                >
                    Login Now
                </button>

                {/* Google Login Button */}
                <GoogleFormFilUp></GoogleFormFilUp>
            </form>
        </>
    );
};

export default LoginForm;
