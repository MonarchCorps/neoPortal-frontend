/* eslint-disable react/prop-types */
import useScrollTop from '@/hooks/useScrollTop'
import { useEffect, useState } from 'react'
import { FaArrowLeft, FaArrowRight, FaBookmark, FaCalculator, FaChevronRight, FaRegArrowAltCircleDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify'
import trim from '@/utils/trim'
import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import useAuth from '@/hooks/useAuth'
import toast from 'react-hot-toast'
import ProgressBar from '../CbtPractice/ProgressBar'
import { CheckCircle2 } from 'lucide-react'
import Loading2 from '../Loaders/Loading2'
import { formatTimeLeft } from '@/utils/timeFormatter'
import Calculator from '../Calculator'
import { motion } from 'motion/react'

function Exam({ questions, setQuestions }) {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const { scrollTop } = useScrollTop()
    const [timeLeft, setTimeLeft] = useState(0)
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const currQue = questions?.questionsData?.[currentQuestionIndex] || {}
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    const formatDate = (date) => {
        const options = {
            month: "short",
            day: "numeric",
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
        };
        return new Intl.DateTimeFormat("en-US", options).format(new Date(date));
    };

    const handleNext = () => {
        const questionsLength = questions?.questionsData?.length || 0;
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, questionsLength - 1));
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleSetAnswer = (questionId, value) => {
        setQuestions(prev => ({
            ...prev,
            liveUserAnswer: questions?.liveUserAnswer?.map((liveAns, i) => {
                if (i === 0) { //check if it's index is 0 cos it is only 1 in the array
                    return {
                        ...liveAns,
                        answers: liveAns?.answers?.map(ans => {
                            if (ans?.questionId == questionId) {
                                return {
                                    ...ans,
                                    selectedOptionId: value
                                }
                            }
                            return ans
                        })
                    }
                }
                return liveAns
            })
        }))

    }

    const { mutate: handleSaveProgress } = useMutation({
        mutationFn: ({ liveId, questionId, selectedOptionId }) =>
            axiosPrivate.post('/live-save-answer', {
                liveId,
                userId: auth?._id,
                questionId,
                selectedOptionId
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }),
        onSuccess: ({ data }) => {
            setQuestions(data)
            console.log('Progress Saved!!')
        },
        onError: (error) => {
            console.log(error)
        }
    })

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

    const { mutate, submitLoading } = useMutation({
        mutationFn: () => {
            return axiosPrivate.post('/live-submit-exam', {
                liveId: questions?.liveId,
                userId: auth?._id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
        },
        onSuccess: ({ data }) => {
            console.log(data)
            setHasSubmitted(true)
            toast.success('Exam submitted!')
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to submit';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })


    useEffect(() => {
        const handleTabInactive = () => {
            if (!hasSubmitted) {
                handleSubmit()
            }
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                handleTabInactive();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);

        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, [hasSubmitted]);

    return (
        submitLoading ? (
            <div className="bg-[#344CB7] text-[#fff] py-3 px-3 rounded-sm font-poppins font-700">
                <Loading2 text='Submitting Exam' data='' isLoading={submitLoading} />
            </div>
        )
            : !submitLoading && !hasSubmitted ? (
                <div className='w-[85%] max-w-[1204px] mx-auto'>
                    <h1 className='flex items-center'>
                        <Link to='/' onClick={scrollTop} className='text-[#344CB7]'>Home</Link>
                        <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                        <p className="text-sm opacity-70 lowercase">exam</p>
                    </h1>
                    <div className="flex justify-between mt-5 mb-2">
                        <h1 className="font-sans font-400 text-2xl csm:text-xl tmd:text-base">
                            Time Left: <span className="font-500 text-[#1F509A]">{formatTimeLeft(timeLeft)}</span>
                        </h1>
                        <p className="font-mon text-base chmd:hidden tmd:text-base">
                            <span className="font-500">{questions?.liveStartTime ? formatDate(questions?.liveStartTime) : new Date().toISOString()}</span>
                            <span> to </span>
                            <span className="font-500">{questions?.liveEndTime ? formatDate(questions?.liveEndTime) : new Date().toISOString()}</span>
                        </p>
                    </div>
                    <ProgressBar startTime={questions?.liveStartTime} endTime={questions?.liveEndTime} setTimeLeft={setTimeLeft} handleSubmit={handleSubmit} />
                    <div className="flex justify-between csm:flex-col csm:gap-3 csm:items-start items-center mt-2 shadow-sm py-4 px-3">
                        <h1 className="font-poppins font-400 text-3xl capitalize">Live Exam</h1>
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
                            <span
                                className='text-wrap text-3xl text-[#1F509A]'
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(trim(currQue?.question, 100)) }}
                            >
                            </span>
                        </div>
                        <div className="grid grid-flow-col cimd:flex cimd:border cimd:border-b-0">
                            <button
                                className="text-2xl text-slate-800 opacity-85 border-l border-solid border-l-gray-300 py-5 px-4"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                <FaCalculator />
                            </button>
                            <button className="text-2xl text-slate-800 opacity-85 border-x border-solid border-x-gray-300 py-5 px-4">
                                <FaBookmark />
                            </button>
                            <button className="text-2xl text-slate-800 opacity-85 py-5 px-4">
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
                    {questions?.questionsData?.length > 0 ? (
                        <div className='my-7'>
                            <p className="font-poppins">
                                Question
                                <span className="font-600">&nbsp;{currentQuestionIndex + 1}&nbsp;</span>
                                of&nbsp;
                                <span className="font-600">{questions?.questionsData?.length || 0}</span>
                            </p>
                            <h1 className="font-poppins text-wrap text-base csm:text-sm mt-3 ml-6 fxsm:ml-2 fxsm:text-xs/relaxed flex items-start">
                                <span className="mr-3 font-500 ">{currentQuestionIndex + 1}. </span>
                                <span
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currQue?.question) }}
                                >
                                </span>
                            </h1>
                            <ul className="bg-gray-100 max-w-[40rem] border border-solid border-[#edb1b1ba] p-4 flex flex-col gap-4 mt-2 ml-5 shadow">
                                {currQue?.qOpt?.map(opt => {
                                    return (
                                        <li key={opt?._id} className="flex items-start">
                                            <input
                                                type="radio"
                                                name={`answer-${currQue?._id}`}
                                                id={`answer-${currQue?._id}`}
                                                className="size-4 appearance-auto mr-3 mt-[0.4rem]"
                                                value={opt?.id}
                                                onChange={() => {
                                                    handleSetAnswer(currQue?._id, opt?.id)
                                                    handleSaveProgress({ liveId: questions?.liveId, questionId: currQue?._id, selectedOptionId: opt?.id })
                                                }}
                                                checked={questions?.liveUserAnswer[0]?.answers?.find(ans => ans?.questionId === currQue?._id)?.selectedOptionId === opt?.id || ''}
                                            />

                                            <span className="mr-2 font-500">({opt?.id})</span>
                                            <p
                                                className="text-base font-500"
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
                                    {currentQuestionIndex !== questions?.questionsData?.length - 1 && (
                                        <button
                                            className={`flex items-center gap-2 bg-[#6d0000] text-slate-50 rounded-2xl py-4 px-5 transition-all duration-150 border-2 border-solid $ 'hover:bg-slate-300 hover:text-slate-900 hover:border-sky-400`}
                                            onClick={() => {
                                                scrollTop()
                                                handleNext()
                                            }}
                                            disabled={currentQuestionIndex === questions?.questionsData?.length - 1}>
                                            <FaArrowRight />
                                            <span>Next</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <ul className="flex flex-wrap gap-4 mt-8">
                                {questions?.questionsData?.map((pag, i) => {
                                    return (
                                        <li key={pag?._id}>
                                            <button
                                                onClick={() => {
                                                    scrollTop()
                                                    setCurrentQuestionIndex(i)
                                                }}
                                                className={
                                                    ` border border-solid  px-4 py-[0.6rem] rounded-xl transition-all duration-500 hover:scale-90 hover:border-[#b70c01] hover:shadow-[0px_2px_4px_0px_rgba(0_0_0_0.12)]
                                                                 ${questions?.liveUserAnswer[0]?.answers?.find(ans => ans?.questionId === currQue?._id && ans?.selectedOptionId !== '')
                                                        ? 'bg-[#1F509A] text-[#fff]'
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
                        <div className="col-span-2 text-center bg-[#608BC1] py-2 font-500 rounded shadow mt-4">
                            <p>No questions available at the moment!</p>
                        </div>
                    )}
                </div>
            ) : !submitLoading && hasSubmitted && (
                <div className='w-[85%] max-w-[1204px] mx-auto text-center shadow p-3'>
                    <h1 className='text-xl font-500 csm:text-base'>Your exam has been successfully submitted <CheckCircle2 className='inline text-green-700 -mt-[1px]' /> </h1>
                    <p className='my-2 font-poppins max-w-[40rem] mx-auto text-wrap csm:text-sm'><strong>Note: </strong>You won&apos;t be able to see the details of your exam. So make sure to check back with your tutor</p>
                    <p className='font-poppins text-[#1F509A] csm:text-sm'>You can only take a live exam once!</p>
                </div>
            )
    )
}

export default Exam