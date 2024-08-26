import myAxios from "@/lib/axios"
import useSWR from "swr";

import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const Header = () => {
    const fetcher = (url: string): Promise<any> =>
        myAxios.get(url).then((res) => res.data);

    const { data, error, isLoading } = useSWR<any>(
        "http://localhost:8080/api/auth/profile",
        fetcher
    );

    if (error)
        return (
            <div className="h-screen flex justify-center items-center">
                failed to load
            </div>
        );
    if (isLoading)
        return <div className="h-screen flex items-center">loading...</div>;


    return (
        <div className="flex gap-4 p-4 justify-end">
            <div className="flex flex-col items-end ">
                <p className="font-semibold">
                    {data.user.email}
                </p>
                <p className="text-xs">บรรณารักษ์</p>
            </div>

            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default Header