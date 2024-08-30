import myAxios from "@/lib/axios";
import useSWR from "swr";

import { BorrowBooksTable } from "@/components/tables/borrow-books/data-table";
import { BorrowBook, borrowColumns } from "@/components/tables/borrow-books/columns";

async function getBorrowBooks(): Promise<BorrowBook[]> {
  // show only current day !> dueDate
  const res = await myAxios.get("/transaction");
  const data = res.data.filter((book: BorrowBook) => {
    const dueDate = new Date(book.dueDate);
    const currentDate = new Date();
    return currentDate <= dueDate;
  });

  console.log('Borrow Book',data);
  return data;
}

const BorrowBooks = () => {
  const { data } = useSWR("/transaction", getBorrowBooks);

  if (!data) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return <BorrowBooksTable columns={borrowColumns} data={data} />;
};

export default BorrowBooks;
