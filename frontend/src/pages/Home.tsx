import { Link } from "react-router-dom";

import { DataTableDemo } from "@/components/tables/test";

const Home = () => {
  return (
    <div className="flex flex-col gap-6 p-8 overflow-auto">
      <div className="flex justify-between">
        <p className="text-3xl font-bold">หน้าหลัก</p>
      </div>

      {/* Grid of Cards */}
      <div className="grid md:grid-cols-4 gap-6">
        <Link to='/bookManage' className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">100</p>
          <p>สมาชิกทั้งหมด</p>
        </Link>
        <Link to='/bookManage' className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">100</p>
          <p>หนังสือที่ถูกยืม</p>
        </Link>
        <Link to='/bookManage' className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">100</p>
          <p>หนังสือคืนเกินเวลา</p>
        </Link>
        <Link to='/bookManage' className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">100</p>
          <p>สมาชิกใหม่</p>
        </Link>
      </div>

      {/* Booked & Retuned Table */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full p-4 bg-white rounded-xl">
          <p className="font-semibold mb-2">หนังสือที่ถูกยืม</p>
          <DataTableDemo />
        </div>
        <div className="w-full p-4 bg-white rounded-xl">
          <p className="font-semibold mb-2">หนังสือที่คืนแล้ว</p>
          <DataTableDemo />
        </div>
      </div>

      {/* OverBooked Table */}
      <div className="w-full p-4 bg-white rounded-xl">
        <p className="font-semibold mb-2">หนังสือที่คืนเกินเวลา</p>
        <DataTableDemo />
      </div>
    </div>
  )
}

export default Home