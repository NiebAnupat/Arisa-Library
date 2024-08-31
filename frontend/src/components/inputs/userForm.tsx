"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import myAxios from "@/lib/axios"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { CirclePlus } from "lucide-react"

const formSchema = z.object({
    email: z.string().nonempty("กรุณากรอกอีเมล").email("กรุณากรอกอีเมลให้ถูกต้อง"),
    password: z.string(),
    role: z.string().nonempty("กรุณาเลือกประเภทสมาชิก"),
})

const UserForm = () => {
    // 1. Define your form.
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
            role: "",
        },
    })

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        const roleNum = parseInt(values.role)

        try {
            const res = await myAxios.post('/user', {
                email: values.email,
                password: values.password,
                role: roleNum,
            })
            console.log(res.data)

            if (!res) {
                console.log("Failed to add user")
            } else {
                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant='ghost'>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <CirclePlus size={30} />
                            </TooltipTrigger>
                            <TooltipContent side='right'>เพิ่มสมาชิก</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                        <DialogHeader>
                            <DialogTitle>เพิ่มสมาชิกห้องสมุด</DialogTitle>
                        </DialogHeader>
                        {/* User Email */}
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>อีเมลสมาชิก</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex. example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Book Description */}
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>รหัสผ่าน</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Ex. Abc1235" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        {/* Book Image */}
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ประเภทสมาชิก</FormLabel>
                                    <Select onValueChange={field.onChange} >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="เลือกประเภทสมาชิก" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value={'1'}>ผู้ดูแลระบบ</SelectItem>
                                            <SelectItem value={'2'}>ผู้ใช้งานทั่วไป</SelectItem>
                                        </SelectContent>
                                    </Select>
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

export default UserForm