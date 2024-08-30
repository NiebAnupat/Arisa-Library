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

  // Filter Books from dueDate
  const filteredBorrowData =
    data?.filter((book: BorrowBook) => {
      const dueDate = new Date(book.dueDate);
      const currentDate = new Date();
      return currentDate <= dueDate;
    }) ?? [];

  const filteredLateData =
    data?.filter((book: BorrowBook) => {
      const dueDate = new Date(book.dueDate);
      const currentDate = new Date();
      return currentDate > dueDate;
    }) ?? [];

  return (
    <div className="flex flex-col gap-6 p-8 mb-[4rem]">
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
        <div className="w-full p-4  bg-white rounded-xl">
          <p className="font-semibold mb-2">หนังสือที่ถูกยืม</p>
          <div className="min-h-[20rem] max-h-[36rem] overflow-auto">
            {error && <p>Failed to load</p>}
            {isLoading && <p>Loading...</p>}
            <BorrowBooksTable
              columns={borrowColumns}
              data={filteredBorrowData}
            />
          </div>
        </div>

        <div className="w-full p-4  bg-white rounded-xl">
          <p className="font-semibold mb-2">หนังสือคืนเกินเวลา</p>
          <div className="min-h-[20rem] max-h-[36rem] overflow-auto">
            {error && <p>Failed to load</p>}
            {isLoading && <p>Loading...</p>}
            <LateBooksTable columns={lateColumns} data={filteredLateData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// const [borrowData, setBorrowData] = useState<BorrowBook[]>([]);
//   const [lateData, setLateData] = useState<LateBook[]>([]);

//   useEffect(() => {
//     myAxios.get("/transaction").then((res) => {
//       const borrowData = res.data.filter((book: BorrowBook) => {
//         const dueDate = new Date(book.dueDate);
//         const currentDate = new Date();
//         return currentDate <= dueDate;
//       });

//       // Fetch book name from book id and fetch user email from user id
//       borrowData.forEach((book: { bookId: any; title: any }) => {
//         myAxios.get(`/book/${book.bookId}`).then((res) => {
//           book.title = res.data.title;
//         });
//       });

//       // fetch user email from user id
//       borrowData.forEach((book: { userId: any; userEmail: any }) => {
//         myAxios.get(`/user/${book.userId}`).then((res) => {
//           book.userEmail = res.data.email;
//         });
//       });

//       const lateData = res.data.filter((book: LateBook) => {
//         const dueDate = new Date(book.dueDate);
//         const currentDate = new Date();
//         return currentDate > dueDate;
//       });

//       // Fetch book name from book id and fetch user email from user id
//       lateData.forEach((book: { bookId: any; title: any }) => {
//         myAxios.get(`/book/${book.bookId}`).then((res) => {
//           book.title = res.data.title;
//         });
//       });

//       // fetch user email from user id
//       lateData.forEach((book: { userId: any; userEmail: any }) => {
//         myAxios.get(`/user/${book.userId}`).then((res) => {
//           book.userEmail = res.data.email;
//         });
//       });

//       setBorrowData(borrowData);
//       setLateData(lateData);
//     });

//     console.log("Borrow Data: ", borrowData);
//     console.log("Late Data: ", lateData);
//   }, []);
