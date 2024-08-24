import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

import { UserTable } from "@/components/tables/userTable"

const UserManage = () => {
    return (
        <div className="flex flex-col gap-6 p-8">
            <div className="flex justify-between">
                <p className="text-3xl font-bold">สมาชิกทั้งหมด</p>
                <Input type="text" placeholder="ค้นหาสมาชิก" suffix={<Search size={18} />} className="w-[20rem]" />
            </div>

            {/* User Table */}
            <div className="w-full bg-white rounded-xl">
                <UserTable />
            </div>
        </div>
    )
}

export default UserManage