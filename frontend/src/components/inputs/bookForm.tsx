"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import myAxios from "@/lib/axios";
import { useToast } from "@/components/ui/use-toast";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { BookPlus } from "lucide-react";

const formSchema = z.object({
  title: z.string().nonempty("กรุณากรอกชื่อหนังสือ"),
  author: z.string().nonempty("กรุณากรอกชื่อผู้เขียน"),
  description: z.string().nonempty("กรุณากรอกรายละเอียด"),
  coverFile: z.instanceof(FileList).optional(),
});

const BookForm = () => {
  const { toast } = useToast();

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      coverFile: undefined,
    },
  });

  const fileRef = form.register("coverFile");

  // 2. Define a submit handler.
  async function onSubmit(values: z.infer<typeof formSchema>) {
    // form data
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("author", values.author);
    formData.append("description", values.description);
    values.coverFile && formData.append("coverFile", values.coverFile[0]);

    try {
      const response = await myAxios.post("/book", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.isSuccess === true) {
        toast({
          title: "เพิ่มหนังสือสำเร็จ",
          description: "รายการหนังสือถูกเพิ่มเข้าสู่ระบบ",
        });

        // Refresh the page
        setTimeout(() => {
          window.location.reload();
        }, 800);
      }
    } catch (error) {
      console.log(error);

      toast({
        title: "เพิ่มหนังสือไม่สำเร็จ",
        description: "กรุณาลองใหม่อีกครั้ง",
      });
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <BookPlus size={30} />
              </TooltipTrigger>
              <TooltipContent side="right">เพิ่มรายการหนังสือ</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <DialogHeader>
              <DialogTitle>เพิ่มรายการหนังสือ</DialogTitle>
            </DialogHeader>
            {/* Book Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อหนังสือ</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. The Lion King" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Book Writer */}
            <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>ชื่อนักเขียน</FormLabel>
                  <FormControl>
                    <Input placeholder="Ex. Barry Johnson" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Book Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>คำอธิบาย</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="In the Pride Lands of Tanzania, a pride of lions rule over the kingdom from Pride Rock."
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Book Image */}
            <FormField
              control={form.control}
              name="coverFile"
              render={() => {
                return (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <FormControl>
                      <Input type="file" {...fileRef} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                );
              }}
            />

            <DialogFooter>
              <Button type="submit">บันทึก</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default BookForm;
