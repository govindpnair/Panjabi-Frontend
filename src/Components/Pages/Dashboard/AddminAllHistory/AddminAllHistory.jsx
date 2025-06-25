import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosSecur } from '../../../../hooks/useAxiosSecur';
import useAuthContext from '../../../../hooks/useAuthContext';
import useAdmin from '../../../../hooks/useAdmin';

const AdminAllHistory = () => {
    const { user } = useAuthContext();
    const [isAdmin] = useAdmin();
    const queryClient = useQueryClient();

    const { data: payments = [], isLoading } = useQuery({

        queryKey: ['adminPayments'],
        queryFn: async () => {
            const res = await axiosSecur.get('/admin/payments');
            return res.data;
        },
        enabled: isAdmin // only fetch if admin
    });
    console.log(payments)
    const mutation = useMutation({
        mutationFn: async ({ id, status }) => {
            const res = await axiosSecur.patch(`/payments/status/${id}`, { status });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['adminPayments']);
        }
    });

    const handleStatusChange = (id, newStatus) => {
        mutation.mutate({ id, status: newStatus });
    };

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-semibold mb-6">All Payment History (Admin)</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded shadow-md">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                        <tr>
                            <th className="text-left p-3 border-b">#</th>
                            <th className="text-left p-3 border-b">User</th>
                            <th className="text-left p-3 border-b">Email</th>
                            <th className="text-left p-3 border-b">Phone</th>
                            <th className="text-left p-3 border-b">Address</th>
                            <th className="text-left p-3 border-b">Amount</th>
                            <th className="text-left p-3 border-b">Transaction ID</th>
                            <th className="text-left p-3 border-b">Date</th>
                            <th className="text-left p-3 border-b">Status</th>
                            <th className="text-left p-3 border-b">Please read carefully</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <tr key={payment._id} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="p-3 border-b">{index + 1}</td>
                                <td className="p-3 border-b">{payment.displayName || 'N/A'}</td>
                                <td className="p-3 border-b">{payment.email}</td>
                                <td className="p-3 border-b">{payment.phone || 'N/A'}</td>
                                <td className="p-3 border-b">{payment.address || 'N/A'}</td>
                                <td className="p-3 border-b">${payment.price}</td>
                                <td className="p-3 border-b">{payment.transactionId}</td>
                                <td className="p-3 border-b">{new Date(payment.date).toLocaleDateString()}</td>
                                <td className="p-3 border-b">
                                    <select
                                        value={payment.status || 'Pending'}
                                        onChange={(e) => handleStatusChange(payment._id, e.target.value)}
                                        className="bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-white rounded px-2 py-1"
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="Approved">Approved</option>
                                        <option value="Rejected">Rejected</option>
                                    </select>
                                </td>
                                <td className="p-3 border-b">

                                    {payment.status === 'Approved' && (
                                        <p className="text-sm text-green-600 mt-1">
                                            Approved Done ✅.
                                        </p>
                                    )}

                                    {payment.status === 'Pending' && (
                                        <p className="text-sm text-yellow-600 mt-1">
                                            See Item 🥱.
                                        </p>
                                    )}

                                    {payment.status === 'Rejected' && (
                                        <p className="text-sm text-red-600 mt-1">
                                            Rejected Item 😢.
                                        </p>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {payments.length === 0 && <p className="text-center mt-4 text-gray-500">No payments found.</p>}
            </div>
        </div>
    );
};

export default AdminAllHistory;
