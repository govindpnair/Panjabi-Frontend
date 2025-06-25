import React, { useContext } from 'react';
import { AuthContext } from '../Providers/AuthProvider';

const useAuthContext = () => {
    const auth = useContext(AuthContext);
    return auth
};

export default useAuthContext;