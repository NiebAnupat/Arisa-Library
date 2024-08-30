"use client";

import { useState } from "react";

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
  title: string;
  userEmail: string;
  borrowDate: Date;
  dueDate: Date;
};


function Item(props: LateBook) {
  const [isOpen, setIsOpen] = useState(false);

  const handleReturnBook = async (id: string) => {
    console.log("Return book with id: ", id);
  };

  return (
    <>
      <ResponsiveDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        title="คืนหนังสือ"
      >
        <p>
          ทำรายการคืนหนังสือ {props.title} ของ {props.userEmail} ใช่หรือไม่?
        </p>
        <Button onClick={() => handleReturnBook(props.transactionId)} className="w-[10rem]">
          OK
        </Button>
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
  },
  {
    accessorKey: "userEmail",
    header: "อีเมลผู้ยืม",
    cell: ({ row }) => {
      const book = row.original;

      return <p className="ml-2">{book.userEmail}</p>;
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
          title={user.title}
          userEmail={user.userEmail}
          borrowDate={user.borrowDate}
          dueDate={user.dueDate}
        />
      );
    },
  },
];
