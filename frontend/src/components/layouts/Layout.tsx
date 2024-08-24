import { Outlet } from "react-router-dom"
import Header from '@/components/layouts/Header';
import Sidebar from '@/components/layouts/Sidebar';

const Layout = () => {
    return (
        <div className="w-full h-screen flex">
            <Sidebar />
            <div className='flex-1'>
                <Header />
                <div className='bg-gray-100 min-h-screen ml-16 rounded-tl-[30px] overflow-hidden'>
                    <Outlet />
                </div>
            </div>
        </div>
    )
}

export default Layout