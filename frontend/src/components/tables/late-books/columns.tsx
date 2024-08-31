"use client";

import { useState } from "react";
import myAxios from "@/lib/axios";

import { MoreHorizontal } from "lucide-react";

import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ResponsiveDialog } from "@/components/ui/responesive-dialog";

export type LateBook = {
  transactionId: string;
  book: { title: string; available: boolean };
  user: { email: string };
  borrowDate: Date;
  dueDate: Date;
};

function Item(props: LateBook) {
  const [isFineOpen, setIsFineOpen] = useState(false);

  const [fine, setFine] = useState(0);

  const handleReturnBook = async (id: string) => {
    // current date
    const toDay = new Date();
    const date =
      toDay.getFullYear() +
      "-" +
      (toDay.getMonth() + 1).toString().padStart(2, "0") +
      "-" +
      toDay.getDate();

    try {
      const res = await myAxios.patch(`/transaction/${id}`, {
        returnDate: date,
      });

      setFine(res.data.transaction.fine);

      setIsFineOpen(true);

      setTimeout(() => {
        window.location.reload();
      } , 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isFineOpen}
        setIsOpen={setIsFineOpen}
        title={`ค่าปรับ ${props.book.title}`}
      >
        <p>
          เกินระยะเวลาคืน {fine / 20} วัน ต้องชำระค่าปรับ {fine} บาท
          <p className="text-xs">โดยคิดค่าปรับ 20 บาท / วัน</p>
        </p>

        <div className="flex justify-end">
          <Button onClick={() => setIsFineOpen(false)} className="w-[4rem]">
            ตกลง
          </Button>
        </div>
      </ResponsiveDialog>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem
            onClick={() => {
              handleReturnBook(props.transactionId);
            }}
          >
            คืนหนังสือ
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export const lateColumns: ColumnDef<LateBook>[] = [
  {
    accessorKey: "title",
    header: "ชื่อหนังสือ",
    cell: ({ row }) => {
      const book = row.original;

      return <p className="ml-2">{book.book.title}</p>;
    },
  },
  {
    accessorKey: "userEmail",
    header: "อีเมลผู้ยืม",
    cell: ({ row }) => {
      const book = row.original;

      return <p className="ml-2">{book.user.email}</p>;
    },
  },
  {
    accessorKey: "borrowDate",
    header: "วันที่ยืม",
  },
  {
    accessorKey: "dueDate",
    header: "กำหนดคืน",
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const user = row.original;

      return (
        <Item
          transactionId={user.transactionId}
          book={user.book}
          user={user.user}
          borrowDate={user.borrowDate}
          dueDate={user.dueDate}
        />
      );
    },
  },
];
