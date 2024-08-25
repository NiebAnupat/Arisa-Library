import { zodResolver } from "@hookform/resolvers/zod"
import { Dispatch, SetStateAction } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import myAxios from "@/lib/axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "../ui/input"


const formSchema = z.object({
  bookId: z.string().nonempty("กรุณากรอกรหัสหนังสือ"),
  username: z.string().nonempty("กรุณากรอกรหัสผู้ยืม"),
  borrowDate: z.string().nonempty("กรุณากรอกวันที่ยืม"),
  returnDate: z.string().nonempty("กรุณากรอกวันที่คืน"),
})

export default function BorrowForm({
  bookId,
  setIsOpen
}: {
  bookId: string
  setIsOpen: Dispatch<SetStateAction<boolean>>
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      bookId: bookId,
      username: "",
      borrowDate: "",
      returnDate: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await myAxios.post("/borrow", {
        bookId: values.bookId,
        username: values.username,
        borrowDate: values.borrowDate,
        returnDate: values.returnDate,
      })
      console.log(res.data)

      if (!res) {
        console.log("Failed to borrow")
      } else {
        setIsOpen(false)

        setTimeout(() => {
          window.location.reload()
        }, 800)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>Hello</div>
  )
}