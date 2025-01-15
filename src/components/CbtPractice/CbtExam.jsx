import { useEffect, useState } from "react"
import DOMPurify from 'dompurify'
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import useScrollTop from "@/hooks/useScrollTop"
import Header from "../partials/Header/Header"
import Footer from "../partials/Footer/Footer"
import { Link, useNavigate } from "react-router-dom"
import { FaArrowLeft, FaArrowRight, FaBookmark, FaCalculator, FaCheckCircle, FaChevronRight, FaRegArrowAltCircleDown } from "react-icons/fa"
import ProgressBar from "./ProgressBar"
import { useMutation, useQuery } from "@tanstack/react-query"
import useExamQuestions from "@/hooks/useExamQuestions"
import Loading2 from "../Loaders/Loading2"
import ExamSummary from "./ExamSummary"
import toast from "react-hot-toast"
import { formatTime, formatTimeLeft } from "@/utils/timeFormatter"
import { motion } from 'motion/react'
import Calculator from "../Calculator"

function CbtExam() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { scrollTop } = useScrollTop()
    const navigate = useNavigate()

    const { questions, setQuestions } = useExamQuestions()
    const [currentSelectedQuestions, setCurrentSelectedQuestions] = useState(Object.keys(questions?.questions || {})[0])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const currQueSelectedQue = questions?.questions?.[currentSelectedQuestions] || []
    const currQue = currQueSelectedQue?.[currentQuestionIndex] || {}
    const [timeLeft, setTimeLeft] = useState(0)
    const [isOpen, setIsOpen] = useState(false)

    const { data, isPending } = useQuery({
        queryKey: ['exam', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/track-progress/get/${auth?._id}/practice`).then((res) => {
                return res?.data
            })
    })

    useEffect(() => {
        if (questions?._id) {
            const currentSelectedQuestions = JSON.parse(sessionStorage.getItem('neoPortal_curr_que_details'))?.currentSelectedQuestions || Object.keys(questions?.questions || {})[0]
            const currentQuestionIndex = JSON.parse(sessionStorage.getItem('neoPortal_curr_que_details'))?.currentQuestionIndex || 0
            setQuestions(questions);
            setCurrentSelectedQuestions(currentSelectedQuestions)
            setCurrentQuestionIndex(currentQuestionIndex)
        } else if (data?._id) {
            const currentSelectedQuestions = JSON.parse(sessionStorage.getItem('neoPortal_curr_que_details'))?.currentSelectedQuestions || Object.keys(questions?.questions || {})[0]
            const currentQuestionIndex = JSON.parse(sessionStorage.getItem('neoPortal_curr_que_details'))?.currentQuestionIndex || 0
            setQuestions(data);
            setCurrentSelectedQuestions(currentSelectedQuestions)
            setCurrentQuestionIndex(currentQuestionIndex)
        }
    }, [data, navigate, questions, setQuestions])

    const handleSubmit = () => {
        mutate();
    };

    const handleProcessSubmit = (params) => {
        const userConfirmed = window.confirm(`Are you sure you want to ${params || 'submit'} the exam?`);

        if (userConfirmed) {
            console.log("Proceeding with submission...");
            mutate();
        } else {
            console.log("Submission canceled.");
        }
    }

    const { mutate, isPending: submitLoading } = useMutation({
        mutationFn: () => {
            return axiosPrivate.post('/submit-exam', {
                userId: auth?._id,
                examProgressId: JSON.parse(sessionStorage.getItem('neoPortal_current_exam')),
                examMode: 'practice'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
        },
        onSuccess: ({ data }) => {
            setQuestions(data)
            localStorage.removeItem('neoPortal_subject_exams')
            sessionStorage.removeItem('neoPortal_current_exam')
            sessionStorage.removeItem('neoPortal_curr_que_details')
        },
        onError(error) {
            if (error?.response?.data?.message) {
                return window.location.reload();
            }
            const errorMessage = error?.response?.data?.message || 'Failed to submit';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const handleNext = () => {
        const questionsLength = currQueSelectedQue?.length || 0;
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, questionsLength - 1));
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    };

    const { mutate: handleSaveProgress } = useMutation({
        mutationFn: ({ questionId, userAnswer }) =>
            axiosPrivate.post('/track-progress/save', {
                userId: auth?._id,
                examId: questions?.examId,
                currentSelectedQuestions,
                questionId,
                userAnswer
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }),
        onSuccess: () => {
            console.log('Progress Saved!!')
        },
        onError: (error) => {
            console.log(error)
        }
    })

    const handleSetAnswer = (questionToAnswer, qId, answer) => {
        sessionStorage.setItem('neoPortal_curr_que_details', JSON.stringify({
            currentSelectedQuestions,
            currentQuestionIndex
        }))
        setQuestions(prev => ({
            ...prev,
            questions: {
                ...prev?.questions,
                [questionToAnswer]: prev?.questions[questionToAnswer].map(question => {
                    if (question.questionId === qId) {
                        return {
                            ...question,
                            userAnswer: answer
                        }
                    }
                    return question;
                })
            }
        }))
    }

    return (
        <div className="flex flex-col h-full">
            <Header />
            <main className="min-h-[80vh]">
                <section>
                    <div className='pt-40 tmd:pt-48 w-[85%] max-w-[1204px] mx-auto'>
                        {submitLoading && (
                            <div className="bg-[#344CB7] text-[#fff] font-mon font-500 py-3 px-3 rounded-sm">
                                <Loading2 text='Loading details' data='' isLoading={submitLoading} />
                            </div>
                        )}
                        {!submitLoading && !isPending && questions?.isCompleted === true ? (
                            <ExamSummary isLoading={isPending} flattenedSummary={questions} />
                        ) : !submitLoading && !isPending && questions?.isCompleted === false ? (
                            <>
                                <h1 className='flex items-center'>
                                    <Link to='/' onClick={scrollTop} className='text-[#344CB7]'>Home</Link>
                                    <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                                    <p className="text-sm opacity-70 lowercase">exam</p>
                                </h1>
                                <div className="flex justify-between mt-5 mb-2">
                                    <h1 className="font-sans font-400 text-2xl csm:text-xl">
                                        Time Left: <span className="font-500 text-[#1F509A]">{formatTimeLeft(timeLeft)}</span>
                                    </h1>
                                    <p className="font-mon text-base chmd:hidden">
                                        <span className="font-500">{questions?.startTime ? formatTime(questions?.startTime) : '00'}</span>
                                        <span> to </span>
                                        <span className="font-500">{questions?.endTime ? formatTime(questions?.endTime) : '00'}</span>
                                    </p>
                                </div>
                                <ProgressBar startTime={questions?.startTime} endTime={questions?.endTime} setTimeLeft={setTimeLeft} handleSubmit={handleSubmit} />
                                <div className="flex justify-between csm:flex-col csm:gap-3 csm:items-start items-center mt-2 shadow-sm py-4 px-3">
                                    <h1 className="font-poppins font-400 text-3xl capitalize">{currentSelectedQuestions?.replace(/-/g, " ")}</h1>
                                    <div className="grid grid-flow-col place-content-center gap-3">
                                        <button onClick={() => { handleProcessSubmit('submit'); }} className='border-2 border-solid border-[#1F509A] bg-[#1F509A] text-[#fff] shadow-sm py-2 px-4 rounded-md transition-all duration-300 hover:text-[#1F509A] hover:bg-[#eee] font-500 font-mon'>
                                            Submit
                                        </button>
                                        <button onClick={() => { handleProcessSubmit('quit'); }} className='border-2 border-solid border-gray-700 bg-gray-700 text-[#fff] shadow-sm py-2 px-4 rounded-md transition-all duration-300 hover:text-gray-700 hover:bg-[#eee] hover:rounded-none'>
                                            Leave
                                        </button>
                                    </div>
                                </div>
                                <div className="grid grid-cols-[1fr,auto] cimd:flex cimd:flex-col cimd:gap-0 shadow-sm gap-7 pl-10 cimd:pl-0">
                                    <div className="overflow-scroll max-w-[95%] flex cimd:max-w-full gap-4 py-3 cimd:pl-2 cimd:pr-2">
                                        {Object.keys(questions?.questions || {})?.map((subject, i) => {
                                            return (
                                                <button
                                                    key={i}
                                                    className={`whitespace-nowrap p-2 rounded-md capitalize transition-all duration-200 hover:scale-90 flex items-center
                                                    ${currentSelectedQuestions === subject ? 'bg-[#bd3d3d5c] text-[#1F509A] p-2 font-500' : 'bg-gray-300 text-[#000]'}`}
                                                    onClick={() => {
                                                        setCurrentSelectedQuestions(subject)
                                                        setCurrentQuestionIndex(0)
                                                    }}
                                                >
                                                    <span>{subject.replace(/-/g, " ")}</span>
                                                    <span>
                                                        {questions?.questions[subject]?.flatMap(val => val.userAnswer)?.every(val => Boolean(val)) && (
                                                            <FaCheckCircle className="text-green-800 ml-3" />
                                                        )}
                                                    </span>
                                                </button>
                                            )
                                        })}
                                    </div>
                                    <div className="grid grid-flow-col cimd:flex cimd:border cimd:border-b-0">
                                        <button
                                            className="text-2xl text-slate-800 opacity-85 border-l border-solid border-l-gray-300 py-5 px-4 cimd:border-l-0"
                                            onClick={() => setIsOpen(!isOpen)}
                                        >
                                            <FaCalculator />
                                        </button>
                                        <button className="text-2xl text-slate-800 opacity-85 border-x border-solid border-x-gray-300 py-5 px-4">
                                            <FaBookmark />
                                        </button>
                                        <button className="text-2xl text-slate-800 opacity-85 py-5 px-4 cimd:border-r">
                                            <FaRegArrowAltCircleDown />
                                        </button>

                                        {isOpen && (
                                            <motion.div
                                                className="modal"
                                                initial={{ y: "100%" }}
                                                animate={{ y: "5%" }}
                                                exit={{ y: "100%" }}
                                                transition={{ duration: 0.1 }}
                                                style={{
                                                    right: "0",
                                                    bottom: "-280px",
                                                    position: "absolute",
                                                    width: "fit-content",
                                                    zIndex: 20,
                                                    overflowY: "auto",
                                                }}
                                            >
                                                <Calculator setIsOpen={setIsOpen} isOpen={isOpen} />
                                            </motion.div>
                                        )}

                                    </div>
                                </div>
                                <div className="grid grid-cols-3 umd:grid-cols-1 bg-[#bbbbbb0c] py-6 px-5 gap-5">
                                    {currQueSelectedQue?.length !== 0 ? (
                                        <div className="col-span-2">
                                            <p className="font-poppins">
                                                Question
                                                <span className="font-600">&nbsp;{currentQuestionIndex + 1}&nbsp;</span>
                                                of&nbsp;
                                                <span className="font-600">{currQueSelectedQue?.length || 0}</span>
                                            </p>
                                            <h1 className="font-poppins text-wrap text-base csm:text-sm mt-3 ml-6 fxsm:ml-2 fxsm:text-xs/relaxed flex items-start">
                                                <span className="mr-3 font-500 ">{currentQuestionIndex + 1}. </span>
                                                <span
                                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currQue?.question) }}
                                                >
                                                </span>
                                            </h1>
                                            <ul className="bg-gray-100 max-w-[40rem] border border-solid border-[#edb1b1ba] p-4 flex flex-col gap-4 mt-2 ml-5 fxsm:ml-2 shadow">
                                                {currQue?.options?.map(opt => {
                                                    return (
                                                        <li key={opt?._id} className="flex items-start">
                                                            <input
                                                                type="radio"
                                                                name={`answer-${currQue?._id}`}
                                                                id={`answer-${currQue?._id}`}
                                                                className="size-4 appearance-auto mr-3 mt-[0.4rem]"
                                                                onChange={() => {
                                                                    handleSetAnswer(currentSelectedQuestions, currQue?.questionId, opt?.id)
                                                                    handleSaveProgress({
                                                                        questionId: currQueSelectedQue[currentQuestionIndex]?.questionId,
                                                                        userAnswer: opt?.id
                                                                    })
                                                                }}
                                                                value={opt?.id}
                                                                checked={currQue?.userAnswer === opt?.id || ''}
                                                            />
                                                            <span className="mr-2 font-500">({opt?.id})</span>
                                                            <p
                                                                className="text-base font-500 fxsm:text-sm"
                                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(opt?.text) }}
                                                            >
                                                            </p>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                            <div className="w-full flex justify-between mt-8">
                                                <div>
                                                    {currentQuestionIndex !== 0 && (
                                                        <button className={`flex items-center gap-2 bg-[#6d0000] text-slate-50 rounded-2xl py-4 px-5 transition-all duration-150 border-2 border-solid 'hover:bg-slate-300 hover:text-slate-900 hover:border-sky-400`}
                                                            onClick={() => {
                                                                scrollTop()
                                                                handlePrevious()
                                                            }}
                                                            disabled={currentQuestionIndex === 0}>
                                                            <FaArrowLeft />
                                                            <span>Previous</span>
                                                        </button>
                                                    )}
                                                </div>
                                                <div>
                                                    {currentQuestionIndex !== currQueSelectedQue?.length - 1 && (
                                                        <button
                                                            className={`flex items-center gap-2 bg-[#6d0000] text-slate-50 rounded-2xl py-4 px-5 transition-all duration-150 border-2 border-solid $ 'hover:bg-slate-300 hover:text-slate-900 hover:border-sky-400`}
                                                            onClick={() => {
                                                                scrollTop()
                                                                handleNext()
                                                            }}
                                                            disabled={currentQuestionIndex === currQueSelectedQue?.length - 1}>
                                                            <FaArrowRight />
                                                            <span>Next</span>
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                            <ul className="flex flex-wrap gap-4 mt-8">
                                                {currQueSelectedQue?.map((pag, i) => {
                                                    return (
                                                        <li key={pag?.questionId}>
                                                            <button
                                                                onClick={() => {
                                                                    scrollTop()
                                                                    setCurrentQuestionIndex(i)
                                                                }}
                                                                className={
                                                                    ` border border-solid  px-4 py-[0.6rem] rounded-xl transition-all duration-500 hover:scale-90 hover:border-[#b70c01] hover:shadow-[0px_2px_4px_0px_rgba(0_0_0_0.12)]
                                                                 ${currQueSelectedQue[i]?.userAnswer !== null
                                                                        ? 'bg-[#1F509A]'
                                                                        : currentQuestionIndex === i
                                                                            ? 'bg-slate-200 text-[#1F509A]  border-[#1F509A] hover:border-[#b70c01]'
                                                                            : ' bg-slate-200 border-slate-600'}`}
                                                            >
                                                                {i + 1}
                                                            </button>
                                                        </li>
                                                    )
                                                })}
                                            </ul>
                                        </div>
                                    ) : (
                                        <div className="col-span-2 text-center bg-[#608BC1] py-2 font-500 rounded shadow">
                                            <p>No questions available at the moment!</p>
                                        </div>
                                    )
                                    }
                                    <div className="col-span-1"></div>
                                </div>
                            </>
                        ) : !submitLoading && isPending ? (
                            <div className="bg-[#344CB7] text-[#fff] font-mon font-500 py-3 px-3 rounded-sm">
                                <Loading2 text='Loading details' data='' isLoading={isPending} />
                            </div>
                        ) : (
                            <></>
                        )}

                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default CbtExam