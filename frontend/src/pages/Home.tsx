import myAxios from "@/lib/axios";
import useSWR from "swr";

import { LateBooks } from "@/components/tables/late-books/lateBooks";
import BorrowBooks from "@/components/tables/borrow-books/borrow-books";

const Home = () => {
  return (
    <div className="flex flex-col gap-6 p-8 overflow-auto">
      <div className="flex justify-between">
        <p className="text-3xl font-bold">หน้าหลัก</p>
      </div>

      {/* Grid of Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <div className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">100</p>
          <p>สมาชิกทั้งหมด</p>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">100</p>
          <p>หนังสือที่ถูกยืม</p>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">100</p>
          <p>หนังสือคืนเกินเวลา</p>
        </div>
        <div className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">100</p>
          <p>สมาชิกใหม่</p>
        </div>
      </div>

      {/* Borrow Books & Retuned Late Books Table */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full p-4  bg-white rounded-xl ">
          <p className="font-semibold mb-2">หนังสือที่ถูกยืม</p>
          <div className="h-full overflow-x-auto">
            <BorrowBooks />
          </div>
        </div>
        <div className="w-full p-4  bg-white rounded-xl">
          <p className="font-semibold mb-2">หนังสือคืนเกินเวลา</p>
          <div className="h-full overflow-x-auto">
            <LateBooks />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home