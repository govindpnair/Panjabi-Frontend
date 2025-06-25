import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Outlet from '../Outlet/Outlet';
import Home from '../Components/Pages/Home/Home/Home';
import Products from '../Components/Pages/AllProducts/Products/Products';
import RegisterForm from '../Components/Pages/RegisterForm/RegisterForm';
import LoginForm from '../Components/Pages/LoginForm/LoginForm';
import Secret from '../Sheard/Secret/Secret';
import PrivetRouts from './PrivetRouts';
import ProductsDetailsPage from '../Components/Pages/ProductsDetailsPage/ProductsDetailsPage';
import Dashboard from '../Outlet/DashBoard/Dashboard';
import Carts from '../Components/Pages/Dashboard/Carts/Carts';
import AllUsers from '../Outlet/DashBoard/AllUsers/AllUsers';
import AddProducts from '../Components/Pages/Dashboard/AddProduct/AddProducts';
import AllProducts from '../Components/Pages/Dashboard/AllProducts/AllProducts';
import AllProductsEdit from '../Components/Pages/Dashboard/AllProductsEdit/AllProductsEdit';
import Payment from '../Components/Pages/Dashboard/PaymentLaouts/Payment';
import PaymentHistory from '../Components/Pages/Dashboard/PaymentHistory/PaymentHistory';
import AddminAllHistory from '../Components/Pages/Dashboard/AddminAllHistory/AddminAllHistory';
import UserHome from '../Components/Pages/Dashboard/UserHome/UserHome';
import AdminAllHistory from '../Components/Pages/Dashboard/AddminAllHistory/AddminAllHistory';
import AdminHome from '../Components/Pages/Dashboard/AdminHome/AdminHome';

const Routers = createBrowserRouter([
    {
        path : '/',
        element : <Outlet></Outlet>,
        children : [
            {
                path : '/',
                element : <Home></Home>
            }
            ,
            {
                path : '/allProducts/:category',
                element : <Products></Products>
            },
            {
                path : '/RegisterForm',
                element : <RegisterForm></RegisterForm>
            },
            {
                path : '/loginForm',
                element : <LoginForm></LoginForm>
            },
            {
                path : '/secret',
                element : <PrivetRouts><Secret></Secret></PrivetRouts>
            },
            {
                path : '/products/:id',
                element : <ProductsDetailsPage></ProductsDetailsPage>,
                loader : ({params}) => fetch(`https://panjabi-server-three.vercel.app/products/${params.id}`)
            }
        ]
    }, 
    {
        path : 'dashboard',
        element : <Dashboard></Dashboard>,
        children : [
            {
                path : 'userHome',
                element : <UserHome></UserHome>
            },
            {
                path : 'cart',
                element : <PrivetRouts><Carts></Carts></PrivetRouts>
            },
            {
                path : 'payments',
                element : <PrivetRouts><Payment></Payment></PrivetRouts>
            },
            {
                path : 'paymentHistory',
                element : <PrivetRouts><PaymentHistory></PaymentHistory></PrivetRouts>
            },
            // Admin routs
            {
                path : 'adminHome',
                element : <PrivetRouts><AdminHome></AdminHome></PrivetRouts>
            },
            {
                path : 'allUsers',
                element : <PrivetRouts><AllUsers></AllUsers></PrivetRouts>
            },
            {
                path : 'allProduct',
                element : <PrivetRouts><AllProducts></AllProducts></PrivetRouts>
            },
            {
                path : 'updateItem/:id',
                element : <PrivetRouts><AllProductsEdit></AllProductsEdit></PrivetRouts>,
                loader : ({params})=> fetch(`https://panjabi-server-three.vercel.app/products/${params.id}`)
            },
            {
                path : 'addProduct',
                element : <PrivetRouts><AddProducts></AddProducts></PrivetRouts>
            },
            {
                path : 'allPayments',
                element : <PrivetRouts><AddminAllHistory></AddminAllHistory></PrivetRouts>
            }
        ]
    }
])

export default Routers;