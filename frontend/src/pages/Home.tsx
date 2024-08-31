import myAxios from "@/lib/axios";
import useSWR from "swr";

import { BorrowBooksTable } from "@/components/tables/borrow-books/data-table";
import {
  BorrowBook,
  borrowColumns,
} from "@/components/tables/borrow-books/columns";
import { LateBooksTable } from "@/components/tables/late-books/data-table";
import { lateColumns } from "@/components/tables/late-books/columns";

const Home = () => {
  const fetcher = (url: string): Promise<BorrowBook[]> =>
    myAxios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR<BorrowBook[]>(
    "http://localhost:8080/api/transaction",
    fetcher
  );

  // Fetch User Data
  const fetcherUser = (url: string) =>
    myAxios.get(url).then((res) => res.data);

  const { data: userData } = useSWR(
    "http://localhost:8080/api/user",
    fetcherUser
  );

  // Function to Filter Books from dueDate and Book available: false
  const filteredBorrowData = Array.isArray(data)
    ? data.filter((book: BorrowBook) => {
        const dueDate = new Date(book.dueDate);
        const currentDate = new Date();
        return currentDate <= dueDate && !book.book.available;
      })
    : [];

  // Function to Filter Books from dueDate and Book available: false
  const filteredLateData = Array.isArray(data)
    ? data.filter((book: BorrowBook) => {
        const dueDate = new Date(book.dueDate);
        const currentDate = new Date();
        return currentDate > dueDate && !book.book.available;
      })
    : [];

  return (
    <div className="flex flex-col gap-6 p-8 mb-[4rem]">
      <div className="flex justify-between">
        <p className="text-3xl font-bold">หน้าหลัก</p>
      </div>

      {/* Grid of Cards */}
      <div className="grid md:grid-cols-4 gap-6 ">
        <div></div>
        <div className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">{userData?.length}</p>
          <p>สมาชิกทั้งหมด</p>
        </div>

        <div className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">
            {filteredBorrowData.length + filteredLateData.length}
          </p>
          <p>หนังสือที่ถูกยืม</p>
        </div>

        <div className="bg-white p-4 rounded-xl">
          <p className="text-2xl font-semibold">{filteredLateData.length}</p>
          <p>หนังสือคืนเกินเวลา</p>
        </div>
      </div>

      {/* Borrow Books & Retuned Late Books Table */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="w-full p-4  bg-white rounded-xl">
          <p className="font-semibold mb-2">หนังสือที่ถูกยืม</p>
          <div className="min-h-[20rem] max-h-[36rem] overflow-auto">
            {isLoading ? (
              <p className="w-full min-h-[20rem] flex text-center justify-center items-center">
                กำลังโหลด...
              </p>
            ) : error ? (
              <p className="w-full min-h-[20rem] flex text-center justify-center items-center">
                เกิดข้อผิดพลาด
              </p>
            ) : (
              <BorrowBooksTable
                columns={borrowColumns}
                data={filteredBorrowData}
              />
            )}
          </div>
        </div>

        <div className="w-full p-4  bg-white rounded-xl">
          <p className="font-semibold mb-2">หนังสือคืนเกินเวลา</p>
          <div className="min-h-[20rem] max-h-[36rem] overflow-auto">
            {isLoading ? (
              <p className="w-full min-h-[20rem] flex text-center justify-center items-center">
                กำลังโหลด...
              </p>
            ) : error ? (
              <p className="w-full min-h-[20rem] flex text-center justify-center items-center">
                เกิดข้อผิดพลาด
              </p>
            ) : (
              <LateBooksTable columns={lateColumns} data={filteredLateData} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
