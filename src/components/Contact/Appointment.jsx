import { useRef, useState } from "react"
import { DialogTitle } from "@radix-ui/react-dialog"
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTrigger } from "../ui/dialog"
import { FaBookmark } from "react-icons/fa"
import { Button } from "../ui/button"
import { useMutation } from "@tanstack/react-query"
import toast from "react-hot-toast"
import axios from "@/api/axios"

function Appointment() {

    const dialogCloseRef = useRef(null)

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        content: ''
    })

    const emptyField = Object.values(formData).every(val => val === '')
    const valid = Object.values(formData).some(val => val === '')

    const resetForm = () => {
        setFormData({
            firstName: '',
            lastName: '',
            email: '',
            content: ''
        })
    }

    const handleBookAppointment = useMutation({
        mutationFn: () => {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            })

            return axios.post(`/book-appointment`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
        },
        onSuccess: ({ data }) => {
            toast.success(data.message)
            dialogCloseRef.current?.click()
            resetForm()
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to book appointment';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <>
            <div className="shadow p-4 rounded-md transition-all transform hover:scale-110 hover:rotate-[-2deg] text-center grid place-content-center">
                <div className="flex items-center justify-center w-full mb-2">
                    <FaBookmark className="text-[#4188ae] text-3xl" />
                </div>
                <h1 className="mb-2 text-xl font-poppins ">Book an Appointment</h1>
                <div className="flex items-center justify-center w-full">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button className='bg-[#4188ae] hover:bg-[#1f3543] w-40'
                            >
                                Schedule
                            </Button>
                        </DialogTrigger>
                        <DialogContent className='rounded-md max-w-[40rem] mt-10'>
                            <DialogClose ref={dialogCloseRef} className="absolute top-2 right-2" />
                            <DialogHeader>
                                <DialogTitle className='text-start'>
                                    <p className="font-poppins font-600 text-xl">
                                        Book an Appointment
                                    </p>
                                </DialogTitle>
                            </DialogHeader>
                            <form
                                className="grid grid-cols-2 gap-x-4 gap-y-3 my-3"
                                onSubmit={(e) => {
                                    e.preventDefault()
                                    handleBookAppointment.mutate()
                                }}
                            >

                                <div className='flex flex-col w-full'>
                                    <label className='text-sm mb-1 font-500 text-slate-900' htmlFor="firstName">First Name</label>
                                    <input
                                        type="text"
                                        name="firstName"
                                        id="firstName"
                                        required
                                        placeholder="First Name"
                                        className={`border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full ${handleBookAppointment.isPending ? 'bg-[#eff5ff]' : ''}`}
                                        onChange={handleChange}
                                        value={formData.firstName}
                                        disabled={handleBookAppointment.isPending}
                                    />
                                </div>

                                <div className='flex flex-col w-full'>
                                    <label className='text-sm mb-1 font-500 text-slate-900' htmlFor="lastName">Last Name</label>
                                    <input
                                        type="text"
                                        name="lastName"
                                        id="lastName"
                                        required
                                        placeholder="Last Name"
                                        className={`border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full ${handleBookAppointment.isPending ? 'bg-[#eff5ff]' : ''}`}
                                        onChange={handleChange}
                                        value={formData.lastName}
                                        disabled={handleBookAppointment.isPending}
                                    />
                                </div>

                                <div className='flex flex-col w-full col-span-2'>
                                    <label className='text-sm mb-1 font-500 text-slate-900' htmlFor="email">Email</label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        required
                                        placeholder="Email"
                                        className={`border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full ${handleBookAppointment.isPending ? 'bg-[#eff5ff]' : ''}`}
                                        onChange={handleChange}
                                        value={formData.email}
                                        disabled={handleBookAppointment.isPending}
                                    />
                                </div>

                                <div className='col-span-2 flex flex-col gap-1'>
                                    <label htmlFor="content" className='text-base/relaxed font-500'>Message <span className="text-sm opacity-70">(100 words max)</span></label>
                                    <textarea
                                        name="content"
                                        id="content"
                                        className={`border-[1px] border-solid border-[#aeacac] h-64 p-2 rounded placeholder:text-sm w-full resize-none max-h-[7rem] ${handleBookAppointment.isPending ? 'bg-[#eff5ff]' : ''}`}
                                        maxLength='100'
                                        onChange={handleChange}
                                        value={formData.content}
                                        disabled={handleBookAppointment.isPending}
                                    >

                                    </textarea>
                                </div>

                                <div className="mt-2 -mb-4 w-full flex justify-end items-center col-span-2">
                                    <button
                                        type='button'
                                        className={`bg-red-700 text-[#fff] font-mon font-600 text-base mr-3 px-3 py-2 rounded-md shadow ${emptyField || handleBookAppointment.isPending ? 'bg-opacity-70' : ''}`}
                                        onClick={() => {
                                            dialogCloseRef.current?.click();
                                            resetForm()
                                        }}
                                        disabled={emptyField || handleBookAppointment.isPending}
                                    >
                                        Discard
                                    </button>
                                    <button type='submit'
                                        className={`bg-[#000] text-[#fff] font-mon font-600 text-base mr-3 px-3 py-2 rounded-md shadow ${valid || handleBookAppointment.isPending ? 'bg-opacity-70' : ''}`}
                                        disabled={valid || handleBookAppointment.isPending}
                                    >
                                        {handleBookAppointment.isPending ? 'Booking...' : 'Book Appointment'}
                                    </button>
                                </div>
                            </form>

                        </DialogContent>
                    </Dialog>
                </div>
            </div>

        </>
    )
}

export default Appointment
