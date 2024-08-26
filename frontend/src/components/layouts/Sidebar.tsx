import { useState } from 'react'
import { Link } from 'react-router-dom'

import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Home, LibraryBig, IdCard, LogOut } from 'lucide-react'
import Logo from '@/assets/images/book.png'
import myAxios from '@/lib/axios'

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(0)

    const handleClicked = (index: number) => {
        setActiveLink(index)
    }

    const SIDEBAR_LINKS = [
        { id: 1, path: '/home', icon: Home, title: 'หน้าหลัก' },
        { id: 2, path: '/userManage', icon: IdCard, title: 'จัดการสมาชิก' },
        { id: 3, path: '/bookManage', icon: LibraryBig, title: 'จัดการหนังสือ' },
    ]

    const handleLogout = () => {
        try {
            // Logout
            myAxios.post('/auth/logout')
            localStorage.removeItem('token')

            // Redirect to login page
            setTimeout(() => {
                window.location.href = "/"
            }, 3000);
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="fixed w-[65px] h-screen p-4">
            <div className="font-bold mb-14">
                <div>
                    <img src={Logo} />
                </div>
            </div>

            <ul className="flex flex-col gap-12 items-center">
                {
                    SIDEBAR_LINKS.map((link, index) => (
                        <li key={index} className={`rounded-md pt-2 px-2 hover:bg-gray-100 hover:text-blue-600 ${activeLink === index ? 'bg-gray-100 text-blue-600' : ''
                            } ${activeLink === index ? 'text-blue-600' : ''
                            }`}>
                            <Link to={link.path} onClick={() => handleClicked(index)}>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger>{<link.icon />}</TooltipTrigger>
                                        <TooltipContent side='right'>{link.title}</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Link>
                        </li>
                    ))
                }
            </ul>

            {/* Logout */}
            <div className="absolute bottom-2 left-3">
                <Button
                    variant="ghost"
                    className="p-2 rounded-md"
                    onClick={handleLogout}
                >
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><LogOut /></TooltipTrigger>
                            <TooltipContent side='right'>ออกจากระบบ</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Button>
            </div>
        </div>
    )
}

export default Sidebar