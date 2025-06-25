import axios from 'axios';
import React from 'react';
import useAuthContext from './useAuthContext';
import { useNavigate } from 'react-router-dom';

export const axiosSecur = axios.create({
    baseURL: `https://panjabi-server-three.vercel.app`
})
const useAxiosSecur = () => {
    const {logOut} = useAuthContext();
    const navigate = useNavigate()
    axiosSecur.interceptors.request.use(function (config) {
        const token = localStorage.getItem('access-token')
        console.log('ami tumake stop hoyte boltechi je', token)
        config.headers.authorization = `Bearer ${token}`
        return config
    }, function (error) {
        return Promise.reject(error)
    }
    );
    axiosSecur.interceptors.response.use(function(response){
        return response;
    }, async(error) =>{
        const status = error.response.status;
        if(status === 401 || status === 403){
            await logOut()
            navigate('/loginForm')
        }
        return Promise.reject(error)
    })
    return axiosSecur
};

export default useAxiosSecur;