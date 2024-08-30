import { useState } from "react";
import myAxios from "@/lib/axios";
import useSWR from "swr";

import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { MoreHorizontal, Search } from "lucide-react";

import BookForm from "@/components/inputs/bookForm";
import BorrowForm from "@/components/inputs/borrowForm";
import { ResponsiveDialog } from "@/components/ui/responesive-dialog";

export interface Book {
  bookId: string;
  title: string;
  author: string;
  description: string;
  coverFilename: string;
}

function Item(props: Book) {
  const [isBorrowOpen, setBorrowOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await myAxios.delete(`/book/${id}`);

      setTimeout(() => {
        window.location.reload();
      }, 800);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isBorrowOpen}
        setIsOpen={setBorrowOpen}
        title="ยืมหนังสือ"
      >
        <BorrowForm bookId={props.bookId} setIsOpen={setBorrowOpen} />
      </ResponsiveDialog>

      <div key={props.bookId} className="flex flex-col gap-4 w-fit">
        <div className="flex w-[11rem] h-[14rem] bg-white rounded-xl">
          <img
            src={`http://localhost:8080/api/file/${props.coverFilename}`}
            className=" object-cover rounded-xl"
          />
        </div>
        <div>
          <p className="font-semibold flex items-center justify-between">
            {props.title}
            <DropdownMenu>
              <DropdownMenuTrigger>
                <MoreHorizontal className="h-4 w-4" />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem
                  onClick={() => {
                    setBorrowOpen(true);
                  }}
                >
                  ยืมหนังสือ
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleDelete(props.bookId)}>
                  ลบหนังสือ
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </p>
          <p className="text-xs">{props.author}</p>
        </div>
      </div>
    </>
  );
}
const BookManage = () => {
  const fetcher = (url: string): Promise<Book[]> =>
    myAxios.get(url).then((res) => res.data);

  const { data, error, isLoading } = useSWR<Book[]>(
    "http://localhost:8080/api/book",
    fetcher
  );

  // search state
  const [search, setSearch] = useState("");

  // filter books
  const filteredBooks = data?.filter((book) =>
    book.title.toLowerCase().includes(search.toLowerCase())
  );

  if (error)
    return (
      <div className="h-screen flex justify-center items-center">
        failed to load
      </div>
    );
  if (isLoading)
    return <div className="h-screen flex items-center">loading...</div>;

  return (
    <div className="flex flex-col gap-6 p-8 overflow-auto">
      <div className="flex w-full items-center justify-between">
        <div className="flex gap-4 items-center">
          <p className="text-3xl font-bold">จัดการหนังสือ</p>
          <BookForm />
        </div>

        <Input
          type="text"
          placeholder="ค้นหาหนังสือ"
          suffix={<Search size={18} />}
          className="w-[20rem]"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Books List */}
      <div className="w-full grid md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredBooks?.length === 0 ? (
          <p className="md:col-span-4 lg:col-span-6 content-center text-center min-h-[30rem]">
            
          </p>
        ) : (
          filteredBooks?.map((book, i) => <Item key={i} {...book} />)
        )}
      </div>
    </div>
  );
};

export default BookManage;
