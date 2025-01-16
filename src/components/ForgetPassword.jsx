import { useState } from 'react'
import Footer from './partials/Footer/Footer'
import Header from './partials/Header/Header'
import SubmitButton from './SubmitButton'
import { useMutation } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import axios from '@/api/axios'

function ForgetPassword() {

    const [email, setEmail] = useState('')

    const handleForgetPassword = useMutation({
        mutationFn: () =>
            axios.post(`/auth/forget-password`, {
                email
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }),
        onSuccess: ({ data }) => {
            console.log(data)
            toast.success(data?.message)
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to forget password';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-1 min-h-[55vh] size-full flex justify-center items-center max-w-[36rem] mx-auto'>
                <section className='size-full'>
                    <div className='pt-40 tmd:pt-48 px-6 pb-4 size-full'>
                        <h1 className='text-[#344CB7] font-poppins font-500 text-3xl mb-1'>Reset Password</h1>
                        <p className='text-sm font-mon font-500 mb-1'>Provide your email to reset your password!</p>
                        <div className='mt-4'>
                            <input
                                type="email"
                                name="resetEmail"
                                id="resetEmail"
                                placeholder='Enter your email...'
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                                onChange={(e) => setEmail(e.target.value)}
                                value={email}

                            />
                            {
                                handleForgetPassword.isPending ? (
                                    <SubmitButton divStyle='w-full mt-4' valid={false} action={null}>
                                        Sending email...
                                    </SubmitButton>
                                ) : (
                                    <SubmitButton divStyle='w-full mt-4' valid={email !== ''} action={() => handleForgetPassword.mutate()}>
                                        Send
                                    </SubmitButton>
                                )
                            }
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default ForgetPassword
