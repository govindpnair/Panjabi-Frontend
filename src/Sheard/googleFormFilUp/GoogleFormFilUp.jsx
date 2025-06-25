import React from 'react';
import useAuthContext from '../../hooks/useAuthContext';
import Swal from 'sweetalert2';
import useAxiosPublick from '../../hooks/useAxiosPublick';

const GoogleFormFilUp = () => {
    const { googleSignIn } = useAuthContext();
    const axiosPublic = useAxiosPublick()
    const handleLogin = () => {
        googleSignIn()
            .then(res => {
                const userInfo = {
                    name: res.user.displayName,
                    image: res.user.photoURL,
                    email: res.user.email
                }
                axiosPublic.post('/users', userInfo)
                    .then(res => {
                        Swal.fire({
                            position: "top-end",
                            icon: "success",
                            title: "Google sigIn complite",
                            showConfirmButton: false,
                            timer: 1500
                          });
                    })

            })
    }
    return (
        <div>
            <div className="flex items-center space-x-3 mt-4">
                <div className="w-full">
                    <button
                        onClick={handleLogin}
                        type="button"
                        className="w-full px-4 py-3 bg-red-600 text-white rounded-lg shadow-lg hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-red-500 transition-all"
                    >
                        <span className="font-semibold flex items-center justify-center gap-3">
                            Login with <img className="w-16 rounded-md h-10" src="https://i.ibb.co.com/nswC7kh5/google-1018443-640.webp" alt="" />
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default GoogleFormFilUp;