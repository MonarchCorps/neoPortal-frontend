import { useState } from 'react'
import Loading from '@/components/Loaders/Loading'
import Header from '@/components/partials/Header/Header'
import LoginForm from './LoginForm'
import AuthSwiper from '../AuthSwiper'
import { useLocation, useNavigate } from 'react-router-dom'
import useAuth from '@/hooks/useAuth'
import useHideScroll from '@/hooks/useHideScroll'
import { useMutation } from '@tanstack/react-query'
import axios from '@/api/axios'
import toast from 'react-hot-toast'
import useModal from '@/hooks/useModal'

function Login() {
    const { setAuth } = useAuth()
    const { hideModal } = useModal()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';

    const [formData, setFormData] = useState({
        state: '',
        password: ''
    })

    const handleLogin = useMutation({
        mutationFn: (e) => {
            e.preventDefault()
            return axios.post('/auth', {
                state: formData.state,
                password: formData.password
            }, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            })
        },
        onSuccess: ({ data }) => {
            setAuth(data)
            localStorage.setItem("neoPortal_auth_token", JSON.stringify(data));
            setFormData({
                state: '',
                password: ''
            })
            hideModal()
            navigate(from, {
                replace: true
            });
            toast.success('Logged in successfully')
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to login';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(handleLogin.isPending)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <>
            <Loading isLoading={handleLogin.isPending} text='Logging in' />
            <Header />
            <main>
                <section>
                    <div className='grid grid-cols-2 hrmd2:grid-cols-1 h-screen min-h-[40rem] relative'>
                        <div className='flex flex-col items-center justify-center size-full'>
                            <LoginForm formData={formData} handleChange={handleChange} handleLogin={handleLogin} />
                        </div>
                        <div className=' hrmd2:hidden'>
                            <AuthSwiper />
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

export default Login