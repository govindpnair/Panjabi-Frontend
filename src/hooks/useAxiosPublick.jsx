import axios from 'axios';
import React from 'react';

const axiosPublic = axios.create({
    baseURL : 'https://panjabi-server-three.vercel.app'
})

const useAxiosPublick = () => {
    return axiosPublic
};

export default useAxiosPublick;