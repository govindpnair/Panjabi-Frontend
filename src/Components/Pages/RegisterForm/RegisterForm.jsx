import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { FaGoogle } from "react-icons/fa";
import Swal from "sweetalert2"; // ✅ SweetAlert2 ইমপোর্ট করুন
import { AuthContext } from "../../../Providers/AuthProvider";
import { updateProfile } from "firebase/auth";
import useAxiosPublick from "../../../hooks/useAxiosPublick";
import GoogleFormFilUp from "../../../Sheard/googleFormFilUp/googleFormFilUp";

const RegisterForm = () => {
    const { createUser } = useContext(AuthContext);
    const axiosPublic = useAxiosPublick()

    const handleRegisterform = (e) => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        const imageurl = e.target.imageurl.value;

        createUser(email, password)
            .then((res) => {
                const user = res.user;
                console.log(user)
                updateProfile(user, {
                    displayName: name,
                    photoURL: imageurl,
                })
                    .then(() => {

                        const userInfo = {
                            name: user.displayName,
                            image: user.photoURL,
                            email: user.email,
                            dateAdded: new Date().toLocaleString(),
                        }
                        axiosPublic.post('/users', userInfo)
                            .then(res => {
                                console.log(res)
                                if (res.data.insertedId) {
                                    // ✅ সফল হলে Success Alert
                                    Swal.fire({
                                        title: "Registration Successful!",
                                        text: "Your account has been created successfully.",
                                        icon: "success",
                                        confirmButtonColor: "#3085d6",
                                        confirmButtonText: "OK",
                                    });
                                }
                            })


                    })
                    .catch(() => {
                        // ❌ Profile Update Failed Alert
                        Swal.fire({
                            title: "Profile Update Failed!",
                            text: "Could not update profile. Please try again.",
                            icon: "error",
                            confirmButtonColor: "#d33",
                            confirmButtonText: "Close",
                        });
                    });
            })
            .catch((error) => {
                // ❌ Error Alert
                Swal.fire({
                    title: "Registration Failed!",
                    text: error.message,
                    icon: "error",
                    confirmButtonColor: "#d33",
                    confirmButtonText: "Close",
                });
            });
    };

    return (
        <>
            <Helmet>
                <title>Register page</title>
            </Helmet>

            <form
                onSubmit={handleRegisterform}
                className="space-y-6 max-w-md mx-auto p-6 rounded-xl shadow-lg mt-28 my-8"
            >
                {/* Name Input */}
                <div>
                    <label className="block font-medium">Full Name</label>
                    <input
                        type="text"
                        name="name"
                        required
                        placeholder="Enter your name"
                        className="w-full px-4 py-3 mt-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                </div>

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

                {/* Image URL Input */}
                <div>
                    <label className="block font-medium">Image URL</label>
                    <input
                        type="url"
                        name="imageurl"
                        required
                        placeholder="Enter Image URL"
                        className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full bg-yellow-800 text-white py-3 rounded-lg font-semibold shadow-lg hover:bg-yellow-950 focus:outline-none focus:ring-4 focus:ring-yellow-950 transition duration-200"
                >
                    Register
                </button>

                {/* Google Login Button */}
                <GoogleFormFilUp></GoogleFormFilUp>
            </form>
        </>
    );
};

export default RegisterForm;
