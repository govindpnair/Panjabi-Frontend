import React from 'react';
import useAuthContext from '../../../../hooks/useAuthContext';
import { useQuery } from '@tanstack/react-query';
import { axiosSecur } from '../../../../hooks/useAxiosSecur';

const PaymentHistory = () => {
    const { user } = useAuthContext();

    const { data: payments = [], isLoading } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecur.get(`/payments/${user.email}`);
            return res.data;
        }
    });

    if (isLoading) return <div className="text-center mt-10">Loading...</div>;

    return (
        <div className="p-4 md:p-8">
            <h2 className="text-2xl font-semibold mb-4">Your Payment History</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow">
                    <thead className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-white">
                        <tr>
                            <th className="text-left p-3 border-b">#</th>
                            <th className="text-left p-3 border-b">Amount</th>
                            <th className="text-left p-3 border-b">Transaction ID</th>
                            <th className="text-left p-3 border-b">Date</th>
                            <th className="text-left p-3 border-b">Status</th>
                            <th className="text-left p-3 border-b">Please read carefully</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.map((payment, index) => (
                            <React.Fragment key={payment._id}>
                                <tr className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="p-3 border-b">{index + 1}</td>
                                    <td className="p-3 border-b">${payment.price}</td>
                                    <td className="p-3 border-b">{payment.transactionId}</td>
                                    <td className="p-3 border-b">{new Date(payment.date).toLocaleDateString()}</td>
                                    <td className="p-3 border-b">
                                        <span className={`px-3 py-1 rounded-full text-sm font-medium 
                                            ${payment.status === 'Approved' ? 'bg-green-200 text-green-800' :
                                                payment.status === 'Rejected' ? 'bg-red-200 text-red-800' :
                                                    'bg-yellow-200 text-yellow-800'}`}>
                                            {payment.status || 'Pending'}
                                        </span>

                                    </td>
                                    <td className="p-3 border-b">

                                        {payment.status === 'Approved' && (
                                            <p className="text-sm text-green-600 mt-1">
                                                Your product will be delivered to you within three days.
                                            </p>
                                        )}

                                        {payment.status === 'Pending' && (
                                            <p className="text-sm text-yellow-600 mt-1">
                                                Your payment is being reviewed. Please wait for approval.
                                            </p>
                                        )}

                                        {payment.status === 'Rejected' && (
                                            <p className="text-sm text-red-600 mt-1">
                                                We haven't received your money yet, so we rejected you.
                                            </p>
                                        )}
                                    </td>

                                </tr>
                            </React.Fragment>
                        ))}
                    </tbody>
                </table>
                {payments.length === 0 && <p className="text-center mt-4 text-gray-500">No payments found.</p>}
            </div>
        </div>
    );
};

export default PaymentHistory;
