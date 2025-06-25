import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';

const PrivetRouts = ({ children }) => {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation()

    if (user) {
        return children
    }
    if (loading) {
        return <>
            <div className="relative flex mt-32 justify-center items-center">
                <div className="absolute animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-purple-500"></div>
                <img src="https://www.svgrepo.com/show/509001/avatar-thinking-9.svg" className="rounded-full h-28 w-28"/>
            </div>
        </>
    }

    return (
        <Navigate to={'/loginForm'} state={{from : location}} replace>

        </Navigate>
    );
};

export default PrivetRouts;