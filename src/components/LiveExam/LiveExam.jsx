import { useState } from "react"
import Footer from "../partials/Footer/Footer"
import Header from "../partials/Header/Header"
import LiveExamLogin from "./LiveExamLogin"
import { useMutation } from "@tanstack/react-query"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import toast from "react-hot-toast"
import Loading from '@/components/Loaders/Loading'
import useAuth from "@/hooks/useAuth"
import Exam from "./Exam"
import { useLocation, useNavigate } from "react-router-dom"

function LiveExam() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const location = useLocation();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        liveId: '',
        name: auth?.name,
        email: auth?.email
    })

    const [questions, setQuestions] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLoginToLiveExam = useMutation({
        mutationFn: () => {
            if (!auth?._id) {
                return navigate('/auth', { state: { from: location } });
            }
            else {
                return axiosPrivate.post('/login-to-live-exam', {
                    liveId: formData.liveId,
                    userId: auth?._id,
                    name: formData.name,
                    email: formData.email
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
            }
        },
        onSuccess: ({ data }) => {
            setQuestions(data);
            setIsLoggedIn(true);
            toast.success('Live Exam has commenced')
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to login';
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
            <Loading isLoading={handleLoginToLiveExam.isPending} text="Loading..." />
            <Header />
            <main className="min-h-[80vh] tmd:pt-12">
                <section>
                    <div className='pt-40 w-[85%] max-w-[1204px] tmd:w-full tmd:max-w-full mx-auto'>
                        {!isLoggedIn ? (
                            <div className="w-[85%] max-w-[600px] mx-auto">
                                <h1 className="mb-8">
                                    <p className="font-600 text-2xl tmd:text-xl"> Note: </p>
                                    <p className="text-base/relaxed font-mon font-600 mb-1 tmd:text-sm">Read the instructions carefully </p>
                                    <p className="font-poppins mb-1 tmd:text-sm">1. When the exam is in session. And you refresh the page it will automatically be submitted.</p>
                                    <p className="font-poppins mb-1 tmd:text-sm">2. If you were to leave the exam tab it will be automatically submitted.</p>
                                    <p className="font-poppins mb-1 tmd:text-sm">3. Any form of cheating suspected the exam will be automatically submitted.</p>
                                </h1>
                                <LiveExamLogin handleChange={handleChange} handleLoginToLiveExam={handleLoginToLiveExam} formData={formData} />
                            </div>
                        ) : (
                            <Exam questions={questions} setQuestions={setQuestions} />
                        )}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default LiveExam