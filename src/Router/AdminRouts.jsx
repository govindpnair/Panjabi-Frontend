import React from 'react';
import useAdmin from '../hooks/useAdmin';
import useAuthContext from '../hooks/useAuthContext';
import { Navigate, useLocation } from 'react-router-dom';

const AdminRouts = () => {
    const [isuseAdmin, isAdminLoading] = useAdmin();
    const { user, loading } = useAuthContext();
    const location = useLocation()

    if (user|| isAdminLoading) {
        return children
    }
    if (loading && isuseAdmin) {
        return <>
            <div className="relative flex mt-32 justify-center items-center">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28" />
            </div>
        </>
    }

    return (
        <Navigate to={'/loginForm'} state={{ from: location }} replace>

        </Navigate>
    );
};

export default AdminRouts;