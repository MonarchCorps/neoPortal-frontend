import { useMutation } from '@tanstack/react-query'
import Footer from './partials/Footer/Footer'
import Header from './partials/Header/Header'
import SubmitButton from './SubmitButton'
import toast from 'react-hot-toast'
import { useParams } from 'react-router-dom'
import axios from '@/api/axios'
import { useState } from 'react'
import { FaEye, FaEyeSlash } from 'react-icons/fa'

function ResetPassword() {

    const { token } = useParams()
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')

    const [isOpen, setIsOpen] = useState(false)

    const valid = password && password === confirmPassword

    const handleResetPassword = useMutation({
        mutationFn: () => axios.post(`/auth/reset-password/${token}`, {
            password
        }, {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        }),
        onSuccess: ({ data }) => {
            console.log(data)
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to login';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    return (
        <div className='flex flex-col min-h-screen'>
            <Header />
            <main className='flex-1 min-h-[55vh] size-full flex justify-center items-center max-w-[36rem] mx-auto'>
                <section className='size-full'>
                    <div className='pt-40 tmd:pt-48 px-6 pb-4 size-full'>
                        <h1 className='text-[#344CB7] font-poppins font-500 text-3xl mb-3'>Reset Password</h1>

                        <div className='mb-3 relative'>
                            <input
                                type={`${isOpen ? 'text' : 'password'}`}
                                name="password"
                                id="password"
                                placeholder='Enter password...'
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                                onChange={(e) => { setPassword(e.target.value) }}
                            />
                            {isOpen ? (
                                <FaEyeSlash className='cursor-pointer absolute right-6 top-3' onClick={() => setIsOpen(false)} />
                            ) : (
                                <FaEye className='cursor-pointer absolute right-6 top-3' onClick={() => setIsOpen(true)} />
                            )}
                        </div>
                        <input
                            type={`${isOpen ? 'text' : 'password'}`}
                            name="confirmPassword"
                            id="confirmPassword"
                            placeholder='Confirm password...'
                            className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                            onChange={(e) => { setConfirmPassword(e.target.value) }}

                        />
                        {!valid && (password.length > 0 || confirmPassword.length > 0) && <p className='text-red-700 mt-2 shadow-sm py-2'>Password must match</p>}
                        {
                            handleResetPassword.isPending ? (
                                <SubmitButton divStyle='w-full mt-4' valid={false} action={null}>
                                    Resetting...
                                </SubmitButton>
                            ) : (
                                <SubmitButton divStyle='w-full mt-4' valid={valid} action={() => handleResetPassword.mutate()}>
                                    Reset
                                </SubmitButton>
                            )
                        }
                    </div>
                </section>
            </main>
            <Footer />
        </div >
    )
}

export default ResetPassword
