import { useEffect, useState } from "react";
import myAxios from "@/lib/axios";
import useSWR from "swr";

import { Input } from "@/components/ui/input";
import { UserSearch } from "lucide-react";
import UserForm from "@/components/inputs/userForm";

import { UsersTable } from "@/components/tables/users/data-table";
import { Users, columns } from "@/components/tables/users/columns";

async function getUsers(): Promise<Users[]> {
  const res = await myAxios.get("/user");
  return res.data;
}

const UserManage = () => {
  const { data, error, isLoading } = useSWR("/user", getUsers);
  const [searchValue, setSearchValue] = useState("");

  const filteredData =
    data?.filter((user) =>
      user.email.toLowerCase().includes(searchValue.toLowerCase())
    ) ?? [];

  return (
    <div className="flex flex-col gap-6 p-8">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4 items-center">
          <p className="text-3xl font-bold">สมาชิกทั้งหมด</p>
          <UserForm />
        </div>

        <Input
          type="text"
          placeholder="ค้นหาสมาชิก"
          suffix={<UserSearch size={18} color="grey" />}
          className="w-[20rem]"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
      </div>

      {/* User Table */}
      <div className="w-full bg-white rounded-xl ">
        {error && (
          <p className="w-full min-h-[20rem] flex text-center justify-center items-center">
            เกิดข้อผิดพลาด
          </p>
        )}
        {isLoading && (
          <p className="w-full min-h-[20rem] flex text-center justify-center items-center">
            กำลังโหลด...
          </p>
        )}
        {data && <UsersTable data={filteredData} columns={columns} />}
      </div>
    </div>
  );
};

export default UserManage;
