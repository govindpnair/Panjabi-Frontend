import { useQuery } from '@tanstack/react-query';
import React from 'react';
import useAxiosSecur from '../../../hooks/useAxiosSecur';
import { Trash, User, UserCheck } from 'lucide-react';
import Swal from 'sweetalert2';

const AllUsers = () => {
    const axiosSecure = useAxiosSecur();
    const { data: users = [], refetch } = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users', {
                headers : {
                    authorization : `Bearer ${localStorage.getItem('access-token')}`
                }
            });
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
                axiosSecure.delete(`/users/${id}`).then(res => {
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

    const handleToggleAdmin = (user) => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        Swal.fire({
            title: "Are you sure?",
            text: `Do you want to change this user to ${newRole}?`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, change it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axiosSecure.patch(`/users/role/${user._id}`, { role: newRole })
                    .then(res => {
                        if (res.data.modifiedCount > 0) {
                            refetch();
                            Swal.fire({
                                icon: "success",
                                title: `User role updated to ${newRole}`,
                                position: "top-end",
                                showConfirmButton: false,
                                timer: 2000
                            });
                        }
                    })
                    .catch(error => {
                        Swal.fire({
                            icon: "error",
                            title: "Something went wrong!",
                            text: error.message
                        });
                    });
            }
        });
    };

    return (
        <div className="p-6">
            <h1 className='font-bold text-2xl mb-4 text-center'>All Users: {users.length}</h1>
            <div className="overflow-x-auto">
                <table className="w-full border  rounded-lg text-center">
                    <thead>
                        <tr className="">
                            <th className="p-3">Image</th>
                            <th className="p-3">Name</th>
                            <th className="p-3">Date or Time</th>
                            <th className="p-3">Email</th>
                            <th className="p-3">Role</th>
                            <th className="p-3">Actions</th>
                            <th className="p-3">Delete user</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr key={user._id} className="border-t  transition-all">
                                <td className="p-3">
                                    <img src={user.image} alt={user.name} className="w-12 h-12 object-cover mx-auto rounded-full" />
                                </td>
                                <td className="p-3 text-sm md:text-base">{user.name}</td>
                                <td className="p-3 text-sm text-yellow-400 font-bold md:text-base">{user.dateAdded}</td>
                                <td className="p-3 text-sm md:text-base">{user.email}</td>
                                <td className="p-3 text-sm font-bold md:text-base flex items-center justify-center space-x-2">
                                    {user.role === 'admin' ? (
                                        <UserCheck size={16} className="text-green-500" />
                                    ) : (
                                        <User size={16} className="text-gray-500" />
                                    )}
                                    <span>{user.role === 'admin' ? 'Admin' : 'User'}</span>
                                </td>
                                <td className="p-3 text-sm md:text-base">
                                    <div className="flex items-center justify-center space-x-3">
                                        <button
                                            onClick={() => handleToggleAdmin(user)}
                                            className={`px-3 py-1 rounded text-white font-bold transition-all ${user.role === 'admin' ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`}
                                        >
                                            {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                                        </button>

                                    </div>
                                </td>
                                <td className="p-3 text-sm md:text-base">
                                    <button
                                        onClick={() => deleteUser(user._id)}
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
    );
};

export default AllUsers;
