import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "@/components/ui/avatar"

const Header = () => {
    return (
        <div className="flex gap-4 p-4 justify-end">
            <div className="flex flex-col items-end ">
                <p className="font-semibold">Username</p>
                <p className="text-xs">Libralian</p>
            </div>

            <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
        </div>
    )
}

export default Header