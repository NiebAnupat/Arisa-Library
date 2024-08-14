import { Button } from '@/components/ui/button'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"

import { Home, LibraryBig, IdCard, LogOut } from 'lucide-react'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    return (
        <div className="relative w-[65px] h-screen p-4">
            <div className="font-bold mb-14">
                <div>
                    <img src="./book.png" />
                </div>
            </div>

            <ul className="flex flex-col gap-12 items-center">
                <li className="">
                    <Link to='/' className="nav-link">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><Home /></TooltipTrigger>
                                <TooltipContent side='right'>หน้าหลัก</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </li>
                <li className="">
                    <Link to="/bookManage" className="nav-link">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><IdCard /></TooltipTrigger>
                                <TooltipContent side='right'>จัดการสมาชิก</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </li>
                <li className="">
                    <Link to="/userManage" className="nav-link">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger><LibraryBig /></TooltipTrigger>
                                <TooltipContent side='right'>จัดการหนังสือ</TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </Link>
                </li>
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