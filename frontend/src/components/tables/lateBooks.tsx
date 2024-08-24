"use client"

import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import { MoreHorizontal } from "lucide-react"

const data: BorrowBooks[] = [
    {
        bookId: "1u1reuv4",
        bookName: "What is Lorem Ipsum?",
        userName: "สุชานาถ คุ้มบุ่งคล้า",
        borrowDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-15"),
        fine: 200,
    },
    {
        bookId: "1u1reuv4",
        bookName: "What is Lorem Ipsum?",
        userName: "สุชานาถ คุ้มบุ่งคล้า",
        borrowDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-15"),
        fine: 200,
    },
    {
        bookId: "1u1reuv4",
        bookName: "What is Lorem Ipsum?",
        userName: "สุชานาถ คุ้มบุ่งคล้า",
        borrowDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-15"),
        fine: 200,
    },
    {
        bookId: "1u1reuv4",
        bookName: "What is Lorem Ipsum?",
        userName: "สุชานาถ คุ้มบุ่งคล้า",
        borrowDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-15"),
        fine: 200,
    },
    {
        bookId: "1u1reuv4",
        bookName: "What is Lorem Ipsum?",
        userName: "สุชานาถ คุ้มบุ่งคล้า",
        borrowDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-15"),
        fine: 200,
    },
    {
        bookId: "1u1reuv4",
        bookName: "What is Lorem Ipsum?",
        userName: "สุชานาถ คุ้มบุ่งคล้า",
        borrowDate: new Date("2021-01-01"),
        dueDate: new Date("2021-01-15"),
        fine: 200,
    },
]

export type BorrowBooks = {
    bookId: string
    bookName: string
    userName: string
    borrowDate: Date
    dueDate: Date
    fine: number
}

export const columns: ColumnDef<BorrowBooks>[] = [
    {
        accessorKey: "bookId",
        header: "รหัสหนังสือ",
        cell: ({ row }) => (
            <div>{row.getValue("bookId")}</div>
        ),
    },
    {
        accessorKey: "bookName",
        header: "ชื่อหนังสือ",
        cell: ({ row }) => (
            <div>{row.getValue("bookName")}</div>
        ),
    },
    {
        accessorKey: "userName",
        header: "ชื่อผู้ยืม",
        cell: ({ row }) => (
            <div>{row.getValue("userName")}</div>
        ),
    },
    {
        accessorKey: "borrowDate",
        header: "วันที่ยืม",
        cell: ({ row }) => (
            <div>
                {
                    (row.getValue("borrowDate") as Date).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    })
                }
            </div>
        ),
    },
    {
        accessorKey: "dueDate",
        header: "ยืมได้ถึง",
        cell: ({ row }) => (
            <div>
                {
                    (row.getValue("dueDate") as Date).toLocaleDateString('th-TH', {
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric',
                    })
                }
            </div>
        ),
    },
    {
        accessorKey: "fine",
        header: "ค่าปรับ",
        cell: ({ row }) => (
            <div>{row.getValue("fine")}</div>
        ),
    },
    {
        id: "actions",
        enableHiding: false,
        cell: ({ row }) => {
            // const payment = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>รายการยืม - คืน</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>ข้อมูลสมาชิก</DropdownMenuItem>
                        <DropdownMenuItem>แก้ไขข้อมูล</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]

export function LateBooks() {
    const [sorting, setSorting] = React.useState<SortingState>([])
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    )
    const [columnVisibility, setColumnVisibility] =
        React.useState<VisibilityState>({})
    const [rowSelection, setRowSelection] = React.useState({})

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    })

    return (
        <div className="w-full">
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    ไม่พบข้อมูล
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    )
}
