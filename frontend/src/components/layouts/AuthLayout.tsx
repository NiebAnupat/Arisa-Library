import { Outlet } from "react-router-dom"

import { Toaster } from "@/components/ui/toaster"

const AuthLayout = () => {
    return (
        <div className="w-full h-screen">
            <Outlet />
            <Toaster />
        </div>
    )
}

export default AuthLayout