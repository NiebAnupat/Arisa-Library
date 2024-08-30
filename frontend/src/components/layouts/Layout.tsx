import { Outlet } from "react-router-dom"
import { Toaster } from "../ui/toaster";

import Header from '@/components/layouts/Header';
import Sidebar from '@/components/layouts/Sidebar';

const Layout = () => {
    return (
        <div className="w-full h-screen flex">
            <Sidebar />
            <div className='flex-1 overflow-hidden'>
                <Header />
                <div className='bg-gray-100 h-screen ml-16 rounded-tl-[30px] overflow-y-auto'>
                    <Outlet />
                </div>
            </div>
            <Toaster />
        </div>
    )
}

export default Layout