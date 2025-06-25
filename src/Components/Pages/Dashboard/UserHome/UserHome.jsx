import React from "react";
import useAuthContext from "../../../../hooks/useAuthContext";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecur from "../../../../hooks/useAxiosSecur";

const UserHome = () => {
  const { user } = useAuthContext();
  const axiosSecur = useAxiosSecur();

  // User stats API কল
  const { data = {}, isLoading, isError, error } = useQuery({
    queryKey: ["user-stats", user?.email],
    queryFn: async () => {
      const res = await axiosSecur.get("/user-stats");
      return res.data;
    },
    enabled: !!user?.email,
  });


    const { data: payments = [] } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const res = await axiosSecur.get(`/payments/${user.email}`);
            return res.data;
        }
    });

  if (isLoading) return <div className="p-5">Loading your dashboard...</div>;
  if (isError)
    return (
      <div className="p-5 text-red-600">
        Error loading data: {error.message || "Please try again later."}
      </div>
    );

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">👤 User Dashboard</h1>

      {user?.displayName && (
        <p className="text-lg text-gray-500 mb-6">Welcome back, {user.displayName}!</p>
      )}

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Total Orders</p>
          <p className="text-2xl font-bold text-gray-700">{data.totalOrders || 0}</p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Total Spending</p>
          <p className="text-2xl font-bold text-gray-700">
            ${data.totalSpending ? data.totalSpending.toFixed(2) : "0.00"}
          </p>
        </div>
        <div className="bg-white p-5 rounded-xl shadow hover:shadow-md transition">
          <p className="text-gray-500 text-sm">Total Items Ordered</p>
          <p className="text-2xl font-bold text-gray-700">{data.totalItemsOrdered || 0}</p>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="bg-white p-5 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Orders</h2>

        {data.recentOrders && data.recentOrders.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {data.recentOrders.map((order) => (
              <li key={order._id} className="py-3 flex justify-between">
                <div>
                  <p>
                    <span className="font-semibold">Order ID:</span> {order._id}
                  </p>
                  <p>
                    <span className="font-semibold">Price:</span> ${order.price ?? 0}
                  </p>
                  <p>
                    <span className="font-semibold">Quantity:</span> {order.quantity ?? 1}
                  </p>
                </div>
                <div className="text-gray-400 text-sm">
                  {new Date(order.createdAt).toLocaleDateString()}
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No recent orders found.</p>
        )}
      </div>
    </div>
  );
};

export default UserHome;
