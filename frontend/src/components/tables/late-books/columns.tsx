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
  const [isOpen, setIsOpen] = useState(false);
  const [isFineOpen, setIsFineOpen] = useState(false);

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
      await myAxios.patch(`/transaction/${id}`, {
        returnDate: date,
      });

      console.log("Return book with id: ", id);
      console.log("Return date: ", date);

      setIsOpen(false);

      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="คืนหนังสือ"
      >
        <p>
          ทำรายการคืนหนังสือ {props.book.title} ของ {props.user.email}
        </p>

        <div className="flex justify-end">
          <Button
            onClick={() => handleReturnBook(props.transactionId)}
            className="w-[4rem]"
          >
            ยืนยัน
          </Button>
        </div>
      </ResponsiveDialog>

      <ResponsiveDialog
        isOpen={isFineOpen}
        setIsOpen={setIsFineOpen}
        title="ค่าปรับ"
      >
        <p>ค่าปรับที่ต้องจ่ายสำหรับหนังสือ {props.book.title} คือ บาท</p>

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
              setIsOpen(true);
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
