import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Header from '@/components/partials/Header/Header'
import RegisterCards from './RegisterCards'
import RegisterForm from './RegisterForm'
import AuthSwiper from '../AuthSwiper'
import { useMutation } from '@tanstack/react-query'
import axios from '@/api/axios'
import useAuth from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import Loading from '@/components/Loaders/Loading'
import useHideScroll from '@/hooks/useHideScroll'
import useModal from '@/hooks/useModal'

function Register() {
    const { setAuth } = useAuth()
    const { hideModal } = useModal()
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from?.pathname || '/';

    const queryParams = new URLSearchParams(location.search);

    const redirectUrlParams = queryParams.get('redirectUrl')
    const persona = queryParams.get('persona')

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phoneNumber: 0,
        type: '',
        cacNumber: '',
        state: '',
        password: '',
        qualification: '',
        licenseNo: '',
        role: ''
    })

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    useEffect(() => {
        if (!redirectUrlParams || !persona)
            return navigate(`/register`)
    }, [])

    const handleRegister = useMutation({
        mutationFn: (e) => {
            e.preventDefault()
            const formDataToSend = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                formDataToSend.append(key, value);
            })

            return axios.post('/register', formDataToSend, {
                headers: { 'Content-Type': 'application/json' },
                withCredentials: true,
            });
        },
        onSuccess: ({ data }) => {
            setAuth(data)
            localStorage.setItem("neoPortal_auth_token", JSON.stringify(data));
            setFormData({
                name: '',
                email: '',
                phoneNumber: 0,
                type: '',
                cacNumber: '',
                state: '',
                password: '',
                qualification: null,
                licenseNo: '',
                role: ''
            })
            hideModal()
            navigate(from, {
                replace: true
            });
            toast.success('Registered successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to register';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(handleRegister.isPending)

    return (
        <>
            <Loading isLoading={handleRegister.isPending} text='Registering' />
            <Header />
            <main className='h-screen min-h-[40rem]'>
                <section className='h-full'>
                    {!redirectUrlParams && !persona ? <RegisterCards /> : (
                        <div className='grid grid-cols-2 lg:grid-cols-1 place-content-center relative pt-[5rem] h-full'>
                            <div className='mb-4'>
                                <RegisterForm persona={persona} formData={formData} setFormData={setFormData} handleChange={handleChange} handleRegister={handleRegister} />
                            </div>
                            <div className='lg:hidden'>
                                <AuthSwiper />
                            </div>
                        </div>
                    )}
                </section>
            </main>
        </>
    )
}

export default Register