import myAxios from "@/lib/axios"
import useSWR from "swr"

import { BorrowBooksTable } from "@/components/tables/borrow-books/data-table"
import { BorrowBook, columns } from "@/components/tables/borrow-books/columns"

async function getBorrowBooks(): Promise<BorrowBook[]> {
    const res = await myAxios.get("/transaction")
    return res.data
}

async function getBooks(): Promise<BorrowBook[]> {
    const res = await myAxios.get("/book")
    return res.data
}

const BorrowBooks = () => {
    const { data } = useSWR("/transaction", getBorrowBooks)

    // get book name
    const { data: books } = useSWR("/book", getBooks)

    if (!data) {
        return <div className="w-full h-full flex justify-center items-center">Loading...</div>
    }
    return (
        <BorrowBooksTable columns={columns} data={data} />
    )
}

export default BorrowBooks