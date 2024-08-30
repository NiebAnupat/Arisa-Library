import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import myAxios from "@/lib/axios";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const formSchema = z.object({
  bookId: z.string().nonempty("กรุณากรอกรหัสหนังสือ"),
  userEmail: z.string().nonempty("กรุณากรอกอีเมลผู้ยืม"),
  borrowDate: z.string().nonempty("กรุณากรอกวันที่ยืม"),
  returnDate: z.string().nonempty("กรุณากรอกวันที่คืน"),
});

export default function BorrowForm({
  bookId,
  setIsOpen,
}: {
  bookId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookId: bookId,
      userEmail: "",
      borrowDate: "",
      returnDate: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    // try {
    //   const res = await myAxios.post("/borrow", {
    //     bookId: values.bookId,
    //     username: values.userEmail,
    //     borrowDate: values.borrowDate,
    //     returnDate: values.returnDate,
    //   });
    //   console.log(res.data);
    //   if (!res) {
    //     console.log("Failed to borrow");
    //   } else {
    //     setIsOpen(false);
    //     setTimeout(() => {
    //       window.location.reload();
    //     }, 800);
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        {/* Book ID */}
        <FormField
          control={form.control}
          name="bookId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รหัสหนังสือ</FormLabel>
              <FormControl>
                <Input defaultValue={bookId} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* User Email */}
        <FormField
          control={form.control}
          name="userEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>รหัสผู้ยืม</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ex. example@test.com" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Borrow Date */}
        <FormField
          control={form.control}
          name="borrowDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>วันที่ยืม</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Return Date */}
        <FormField
          control={form.control}
          name="returnDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>วันที่คืน</FormLabel>
              <FormControl>
                <Input {...field} type="date" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full">
          ยืมหนังสือ
        </Button>
      </form>
    </Form>
  );
}
