import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { PasswordInput } from "@/components/ui/password-input"
import { useToast } from "@/components/ui/use-toast"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"

import { Eye, EyeOff } from 'lucide-react'

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import myAxios from "@/lib/axios"

const formSchema = z.object({
    email: z.string().nonempty("กรุณากรอกอีเมล"),
    password: z.string().nonempty("กรุณากรอกรหัสผ่าน"),
})

const Auth = () => {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        try {
            const respons = await myAxios.post('/auth/login', {
                header: { 'Content-Type': 'application/json' },
                email: values.email,
                password: values.password,
            })
            console.log(respons.data)

            toast({
                title: "เข้าสู่ระบบสำเร็จ",
                description: "ยินดีต้อนรับคุณ " + values.email,
            })

            // set cookie
            // document.cookie = `access_token=${respons.data.accessToken}; path=/; max-age=99999`

            // Redirect to home page
            window.location.href = "/home"
        } catch (error) {
            console.log(error)
            toast({
                title: "เข้าสู่ระบบไม่สำเร็จ",
                description: "กรุณาตรวจสอบชื่อผู้ใช้งานหรือรหัสผ่านอีกครั้ง",
            })
        }
    }

    return (
        <div className="w-full h-screen flex justify-center items-center bg-gray-100">
            <div className="flex flex-col gap-12 p-8 min-w-[24rem] justify-center items-center bg-white rounded-xl">
                <p className="text-2xl font-bold">ระบบบรรณารักษ์</p>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>ชื่อผู้ใช้งาน</FormLabel>
                                    <FormControl>
                                        <Input placeholder="example@gmail.com" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>รหัสผ่าน</FormLabel>
                                    <FormControl>
                                        <PasswordInput placeholder="Abc1234" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <Button type="submit" className="w-full mt-4">เข้าสู่ระบบ</Button>
                    </form>
                </Form>
            </div>
        </div>
    )
}

export default Auth