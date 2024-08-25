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

export type Users = {
  userId: string
  email: string
  joinDate: Date
  role: number
}


export const columns: ColumnDef<Users>[] = [
  {
    accessorKey: "userId",
    header: "รหัสสมาชิก",
  },
  {
    accessorKey: "email",
    header: "อีเมล",
  },
  {
    accessorKey: "role",
    header: "ประเภทสมาชิก",
    cell: ({ row }) => {
      const user = row.original

      if (user.role === 1) {
        return "ผู้ดูแลระบบ"
      } else if (user.role === 2) {
        return "ผู้ใช้ทั่วไป"
      }
    },
  },
  {
    accessorKey: "joinDate",
    header: "วันที่เข้าร่วม",
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
            <DropdownMenuItem
              onClick={
                async () => {
                  try {
                    await myAxios.delete(`/user/${user.userId}`)
                    console.log(`Deleted user: ${user.userId}`)

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
