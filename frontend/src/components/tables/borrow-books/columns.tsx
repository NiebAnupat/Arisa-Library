"use client"

import { MoreHorizontal } from "lucide-react"

import { ColumnDef } from "@tanstack/react-table"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import myAxios from "@/lib/axios"

export type BorrowBook = {
    bookId: string
    title: string
    joinDate: Date
}


export const columns: ColumnDef<BorrowBook>[] = [
    {
        accessorKey: "bookId",
        header: "ชื่อหนังสือ",
    },
    {
        accessorKey: "userId",
        header: "รหัสผู้ยืม",
    },
    {
        accessorKey: "joinDate",
        header: "วันที่ยืม",
    },
    {
        accessorKey: "joinDate",
        header: "วันที่คืน",
    },
    {
        id: "actions",
        cell: ({ row }) => {
            const user = row.original

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                            แก้ไขข้อมูล
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={
                                async () => {
                                    try {

                                        setTimeout(() => {
                                            window.location.reload()
                                        }, 1500)
                                    } catch (error) {
                                        console.error(error)
                                    }
                                }
                            }
                        >
                            ลบสมาชิก
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        },
    },
]
