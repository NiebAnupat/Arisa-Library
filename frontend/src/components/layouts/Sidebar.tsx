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

const Sidebar = () => {
    const [activeLink, setActiveLink] = useState(0)

    const handleClicked = (index: number) => {
        setActiveLink(index)
    }

    const SIDEBAR_LINKS = [
        { id: 1, path: '/', icon: Home, title: 'หน้าหลัก' },
        { id: 2, path: '/bookManage', icon: IdCard, title: 'จัดการสมาชิก' },
        { id: 3, path: '/userManage', icon: LibraryBig, title: 'จัดการหนังสือ' },
    ]

    return (
        <div className="fixed w-[65px] h-screen p-4">
            <div className="font-bold mb-14">
                <div>
                    <img src={Logo} />
                </div>
            </div>

            <ul className="flex flex-col gap-12 items-center">
                {/* <li className="">
                    <Link to='/' className="">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Home /></TooltipTrigger>
                                <TooltipContent side='right'>หน้าหลัก</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </li>
                <li className="">
                    <Link to="/bookManage" className="">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><IdCard /></TooltipTrigger>
                                <TooltipContent side='right'>จัดการสมาชิก</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </li>
                <li className="">
                    <Link to="/userManage" className="">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><LibraryBig /></TooltipTrigger>
                                <TooltipContent side='right'>จัดการหนังสือ</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </li> */}

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
                <Button variant="ghost" className="p-2 rounded-md">
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