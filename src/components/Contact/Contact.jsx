import Header from '../partials/Header/Header'
import Footer from '../partials/Footer/Footer'
import { Button } from '../ui/button'
import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useAuth from '@/hooks/useAuth'
import { useLocation, useNavigate } from 'react-router-dom'

function Contact() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        content: '',
        subject: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const resetChange = () => {
        setFormData({
            name: '',
            email: '',
            subject: '',
            content: ''
        })
    }

    const emptyField = Object.values(formData).every(val => val === '')

    const handleSendMail = useMutation({
        mutationFn: () => {
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            })

            return axiosPrivate.post(`/send-mail`, formDataToSend, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
        }
        ,
        onSuccess: ({ data }) => {
            toast.success(data?.message)
            resetChange()
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to send mail';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    return (
        <>
            <Header />
            <main>
                <section>
                    <div className='pt-40 tmd:pt-48 w-[85%] max-w-[700px] mx-auto'>
                        <h1 className='mb-3 font-600 text-4xl'>Contact Page</h1>
                        <div className='w-full grid grid-cols-2 ixsm:flex ixsm:flex-col gap-4'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="name" className='text-base/relaxed font-500'>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    placeholder="Enter name"
                                    className={`border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full ${handleSendMail.isPending ? 'bg-[#eff5ff]' : ''}`}
                                    onChange={handleChange}
                                    value={formData.name}
                                    readOnly={handleSendMail.isPending}
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className='text-base/relaxed font-500'>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="Enter email"
                                    className={`border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full ${handleSendMail.isPending ? 'bg-[#eff5ff]' : ''}`}
                                    onChange={handleChange}
                                    value={formData.email}
                                    readOnly={handleSendMail.isPending}
                                />
                            </div>

                            <div className='flex flex-col gap-1 col-span-2'>
                                <label htmlFor="email" className='text-base/relaxed font-500'>Subject</label>
                                <input
                                    type="email"
                                    name="subject"
                                    id="subject"
                                    required
                                    placeholder="Subject"
                                    className={`border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full ${handleSendMail.isPending ? 'bg-[#eff5ff]' : ''}`}
                                    onChange={handleChange}
                                    value={formData.subject}
                                    readOnly={handleSendMail.isPending}
                                />
                            </div>

                            <div className='col-span-2 flex flex-col gap-1'>
                                <label htmlFor="content" className='text-base/relaxed font-500'>Content</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    className='border-[1px] border-solid border-[#aeacac] h-64 p-2 rounded placeholder:text-sm w-full resize-none'
                                    onChange={handleChange}
                                    value={formData.content}
                                    disabled={handleSendMail.isPending}
                                >

                                </textarea>
                            </div>

                            <div className='col-span-2'>
                                <button
                                    type='button'
                                    className={`bg-red-600 text-[#fff] font-mon font-600 text-base mr-3 px-3 py-3 ml-3 rounded-md shadow ${emptyField || handleSendMail.isPending ? 'bg-opacity-70' : ''}`}
                                    onClick={() => resetChange()}
                                    disabled={emptyField || handleSendMail.isPending}

                                >
                                    Discard
                                </button>
                                {handleSendMail.isPending ? (
                                    <Button
                                        className='w-28 h-12 text-base'
                                        disabled={true}
                                    >
                                        Sending...
                                    </Button>
                                ) : (
                                    <Button
                                        className='w-28 h-12 text-base'
                                        disabled={emptyField}
                                        onClick={
                                            () => {
                                                if (!auth?._id) {
                                                    return navigate('/auth', { state: { from: location } });
                                                } else {
                                                    handleSendMail.mutate()
                                                }
                                            }}
                                    >
                                        Send
                                    </Button>
                                )}
                            </div>

                        </div>
                    </div>
                </section>
            </main >
            <Footer />
        </>
    )
}

export default Contact