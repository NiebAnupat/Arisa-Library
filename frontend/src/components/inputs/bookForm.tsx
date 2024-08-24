"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// import myAxios from "@/lib/axios"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { BookPlus } from "lucide-react"

const formSchema = z.object({
    title: z.string().nonempty("กรุณากรอกชื่อหนังสือ"),
    writer: z.string().nonempty("กรุณากรอกชื่อผู้เขียน"),
    description: z.string().nonempty("กรุณากรอกรายละเอียด"),
    image: z.string(),
})

const bookForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            writer: "",
            description: "",
            image: "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger><BookPlus size={30} /></TooltipTrigger>
                            <TooltipContent side='right'>เพิ่มรายการหนังสือ</TooltipContent>
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
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Book Writer */}
                        <FormField
                            control={form.control}
                            name="writer"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ชื่อนักเขียน</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" {...field} />
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
                                        <Input placeholder="shadcn" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Book Image */}
                        <FormField
                            control={form.control}
                            name="image"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ภาพปก</FormLabel>
                                    <FormControl>
                                        <Input placeholder="shadcn" type="file" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <DialogFooter>
                            <Button type="submit">บันทึก</Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>

    )
}

export default bookForm