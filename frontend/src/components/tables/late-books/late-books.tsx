import myAxios from "@/lib/axios";
import useSWR from "swr";

import { LateBooksTable } from "@/components/tables/late-books/data-table";
import { LateBook, lateColumns } from "@/components/tables/late-books/columns";

async function getLateBooks(): Promise<LateBook[]> {
  // show only current day > dueDate
  const res = await myAxios.get("/transaction");
  const data = res.data.filter((book: LateBook) => {
    const dueDate = new Date(book.dueDate);
    const currentDate = new Date();
    return currentDate > dueDate;
  });

  console.log('Late Book', data);
  return data;
}

const LateBooks = () => {
  const { data } = useSWR("/transaction", getLateBooks);

  if (!data) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }
  return <LateBooksTable columns={lateColumns} data={data} />;
};

export default LateBooks;
