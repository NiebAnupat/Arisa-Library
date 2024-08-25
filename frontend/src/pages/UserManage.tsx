import { useEffect, useState } from "react"
import myAxios from "@/lib/axios"
import useSWR from "swr"

import { Input } from "@/components/ui/input"
import { UserSearch } from "lucide-react"
import UserForm from "@/components/inputs/userForm"

import { UsersTable } from "@/components/tables/users/data-table"
import { Users, columns } from "@/components/tables/users/columns"

async function getUsers(): Promise<Users[]> {
    const res = await myAxios.get("/user")
    return res.data
}

const UserManage = () => {
    const { data } = useSWR("/user", getUsers)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        console.log(e.target.value)
    }

    if (!data) {
        return <div>Loading...</div>
    }

    return (
        <div className="flex flex-col gap-6 p-8">
            <div className='flex w-full items-center justify-between'>
                <div className='flex gap-4 items-center'>
                    <p className="text-3xl font-bold">สมาชิกทั้งหมด</p>
                    <UserForm />
                </div>

                <Input
                    type="text"
                    placeholder="ค้นหาหนังสือ"
                    suffix={<UserSearch size={18} color="grey" />}
                    onChange={handleSearch}
                    className="w-[20rem]" />
            </div>

            {/* User Table */}
            <div className="w-full bg-white rounded-xl">
                <UsersTable columns={columns} data={data} />
            </div>
        </div>
    )
}

export default UserManage