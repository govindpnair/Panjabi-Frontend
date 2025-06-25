import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import Routers from './Router/Routers'
import { HelmetProvider } from 'react-helmet-async';
import AuthProvider from './Providers/AuthProvider'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div  className={`min-h-screen flex flex-col bg-white  dark:bg-gray-900 text-gray-900 dark:text-white transition-all ease-in-out duration-500`}>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <HelmetProvider>
          <RouterProvider router={Routers}></RouterProvider>
        </HelmetProvider>
      </AuthProvider>
    </QueryClientProvider>
    </div>
  </StrictMode>,
)
