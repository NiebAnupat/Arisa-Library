import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

import { BookPlus } from 'lucide-react'

import BookForm from '@/components/inputs/bookForm'

export const booksList = [
    {
        id: 1,
        title: 'Circle of Life',
        writer: 'John Doe',
        image: 'https://cdn.pixabay.com/photo/2024/08/05/21/19/lion-8947711_1280.jpg',
    },
    {
        id: 2,
        title: 'The Catcher in the Rye',
        writer: 'J.D. Salinger',
        image: 'https://cdn.pixabay.com/photo/2017/12/17/19/08/away-3024773_1280.jpg',
    },
    {
        id: 3,
        title: 'To Kill a Mockingbird',
        writer: 'Harper Lee',
        image: 'https://cdn.pixabay.com/photo/2016/11/29/05/45/astronomy-1867616_1280.jpg',
    },
    {
        id: 4,
        title: 'The Lord of the Rings',
        writer: 'J.R.R. Tolkien',
        image: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
    },
    {
        id: 5,
        title: 'The Da Vinci Code',
        writer: 'Dan Brown',
        image: 'https://cdn.pixabay.com/photo/2017/08/30/01/05/milky-way-2695569_1280.jpg',
    },
    {
        id: 6,
        title: 'The Great Gatsby',
        writer: 'F. Scott Fitzgerald',
        image: 'https://cdn.pixabay.com/photo/2017/12/17/19/08/away-3024773_1280.jpg',
    },
    {
        id: 7,
        title: 'The Great Gatsby',
        writer: 'F. Scott Fitzgerald',
        image: 'https://cdn.pixabay.com/photo/2017/12/17/19/08/away-3024773_1280.jpg',
    },
]

const BookManage = () => {
    const handleAddBook = () => {
        // Add book
        console.log('Add book')
    }

    return (
        <div className="flex flex-col gap-6 p-8 overflow-auto">
            <div className='flex w-full items-center justify-between'>
                <div className='flex gap-4'>
                    <p className="text-3xl font-bold">จัดการหนังสือ</p>

                    {/*  Add Book Dialog */}
                    {/* <Dialog>
                        <DialogTrigger asChild>
                            <Button variant='ghost' onClick={handleAddBook}>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger><BookPlus size={30} /></TooltipTrigger>
                                        <TooltipContent side='right'>เพิ่มรายการหนังสือ</TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>เพิ่มรายการหนังสือ</DialogTitle>
                            </DialogHeader>
                            <BookForm />
                            <DialogFooter>
                                <Button type="submit">Save changes</Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog> */}
                    <BookForm />
                </div>

                <Input placeholder='ค้นหาหนังสือ' className='w-[20rem]' />
            </div>

            {/* Books List */}
            <div className='w-full grid md:grid-cols-4 lg:grid-cols-6 gap-4'>
                {booksList.map((book) => (
                    <div className='flex flex-col gap-4  w-fit'>
                        <div className='flex w-[11rem] h-[14rem] rounded-xl'>
                            <img src={book.image} className=' object-cover rounded-xl' />
                        </div>
                        <div>
                            <p className='font-semibold'>{book.title}</p>
                            <p className='text-xs'>{book.writer}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookManage