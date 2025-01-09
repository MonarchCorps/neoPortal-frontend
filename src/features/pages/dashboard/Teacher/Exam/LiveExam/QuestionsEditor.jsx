/* eslint-disable react/prop-types */
import QuillEditor from '@/components/QuillEditor'
import { useEffect, useState } from 'react'
import { FaAngleDoubleUp, FaDotCircle, FaEye, FaPlusCircle } from 'react-icons/fa'
import { FaRegTrashCan } from 'react-icons/fa6'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { v4 as uuidv4 } from "uuid"
import { handleAddOption, handleAddQuestion, handleRemoveOption, handleRemoveQuestion, handleSetAnswer, handleSetAnswerDesc, handleSetOption, handleSetQuestion, handleValueChange } from './questionAction'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import useAuth from '@/hooks/useAuth'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import Loading from '@/components/Loaders/Loading'
import { useNavigate } from 'react-router-dom'
import Preview from '../Preview'

function QuestionsEditor({ formData, handleChange }) {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const queryClient = useQueryClient()
    const navigate = useNavigate()

    const defaultOption = [{
        question: '',
        key: uuidv4(),
        qOpt: [
            { key: uuidv4(), id: 'A', text: '' },
            { key: uuidv4(), id: 'B', text: '' },
        ],
        answer: {
            text: '',
            desc: ''
        },
        qType: 'multi-choice'
    }]

    const [questions, setQuestions] = useState(defaultOption)
    const [openItems, setOpenItems] = useState([]);

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [preview, setPreview] = useState(questions)
    const currQue = preview?.[currentQuestionIndex] || {}

    const questionsData = questions.map(({ question: questionText, qOpt, answer, qType }) => {
        return {
            question: questionText,
            qOpt: qOpt.filter(opt => opt.text !== '').map(opt => {
                return {
                    id: opt.id,
                    text: opt.text
                }
            }),
            answer,
            qType
        }
    })

    const handleUploadQuestions = useMutation({
        mutationFn: ({ state }) => {
            const result = questions.some(que => !que.answer.text)
            if (questionsData.length === 1 && questionsData[0].question === '')
                return toast.error('Fill in a question!')
            else if (result)
                return toast.error('You need to select an answer')
            else if (!formData.liveId)
                return toast.error('You need to generate an exam Id')
            else if (!formData.startTime)
                return toast.error('Start time is required')
            else if (!formData.endTime)
                return toast.error('End time is required')
            else {
                return axiosPrivate.post(`/upload/exam/${auth?._id}`, {
                    questionsData,
                    state,
                    mode: 'live',
                    liveId: formData.liveId,
                    liveStartTime: formData.startTime,
                    liveEndTime: formData.endTime
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
            }
        },
        onSuccess: (response) => {
            if (response.data?.state) {
                toast.success(`Upload successful! 🌿`)
                queryClient.invalidateQueries({ queryKey: ['uploaded_exams', auth?._id] })
                navigate('/dashboard/teacher/uploaded-exams')
            }
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to upload';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
    };

    useEffect(() => {
        setPreview(questions.map(q => ({
            ...q,
            qOpt: q.qOpt.map(opt => ({ ...opt })),
            answer: { ...q.answer },
        })));
    }, [questions]);

    return (
        <>
            <Loading isLoading={handleUploadQuestions.isPending} text='Uploading questions' />
            <div className='fixed top-4 left-1/2 -translate-x-1/2 bg-[#100e0e] text-[#fff] px-3 py-2 rounded-md shadow z-[100] flex items-center himd:flex-col'>
                <div className='himd:text-nowrap'>
                    Save your data to avoid losing it!&nbsp;
                </div>
                <div className='mt-1'>
                    <button
                        type='button'
                        className='bg-[#fff] text-[#100e0e] px-3 py-2 rounded-xl font-mon font-500 text-sm mx-2'
                        onClick={() => handleUploadQuestions.mutate({ state: 'saved' })}
                    >
                        Save
                    </button>
                    &nbsp;
                    <button
                        className='bg-red-700  text-[#fff] px-3 py-[0.4rem] rounded-md font-mon font-600 text-sm'
                        onClick={() => handleUploadQuestions.mutate({ state: 'published' })}
                    >
                        Publish
                    </button>
                </div>
            </div>
            <div className='col-span-2 flex items-center gap-5 mb-3'>
                <div className='w-full flex items-center justify-between cfsm:flex-col cfsm:items-start cfsm:gap-2'>
                    <div className='flex items-center'>
                        <h1 className='font-mon text-slate-950 font-600 text-3xl esm:text-2xl'>Details</h1>
                    </div>
                    <button
                        className='border border-solid border-gray-600 text-gray-600 shadow-sm p-3 font-mon font-600 text-sm rounded-md transition-all duration-300 hover:bg-gray-600 hover:text-[#eee] flex items-center gap-2'
                        onClick={() => setIsModalOpen(true)}
                    >
                        <FaEye />
                        Preview
                    </button>
                </div>
            </div>
            <div className='flex gap-3 my-6 mb-8'>
                <div className='bg-gray-300 px-3 py-2 rounded-md'>
                    <span className='font-mon font-600'>Exam ID: </span>
                    <span>{formData?.liveId}</span>
                </div>
            </div>
            <div className='grid grid-cols-2 esm:grid-cols-1 gap-4'>
                <div>
                    <p className='font-mon font-600 mb-2'>Start Time</p>
                    <input
                        type="datetime-local"
                        name="startTime"
                        id="startTime"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <p className='font-mon font-600 mb-2'>End Time</p>
                    <input
                        type="datetime-local"
                        name="endTime"
                        id="endTime"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className='mt-7'>
                <div className='flex mb-7 items-center justify-between'>
                    <h3 className='font-poppins font-500'>{questions.length}/{questions.length} Question(s)</h3>
                    {openItems.length > 0 && (
                        <button
                            className='flex items-center gap-2 text-[#3460b3] hover:underline font-mon font-600 text-sm'
                            onClick={() => setOpenItems([])}
                        >
                            <span>Collapse all</span>
                            <span>
                                <FaAngleDoubleUp />
                            </span>
                        </button>
                    )}
                </div>
                <ul className='flex flex-col gap-4'>
                    <Accordion type='single' collapsible onValueChange={(e) => handleValueChange(setOpenItems, e)} value={openItems}>
                        {questions.map((question, i) => {
                            return (
                                <AccordionItem
                                    key={question.key}
                                    value={question.key}
                                    className={`border border-solid rounded p-4 mb-2 ${question.question && !question.answer.text ? 'border-red-700' : ''}`}
                                >
                                    <div className='flex items-center justify-between'>
                                        <div className='flex items-center gap-3'>
                                            <p className='bg-gray-200 w-8 h-8 px-3 py-2 grid place-content-center text-sm font-600 rounded-md'>{i + 1}</p>
                                            <p className='bg-gray-200 p-2 text-xs font-600 rounded-md'>
                                                {question?.qType === 'multi-choice' ? 'Multiple Choice' : 'True or False'}
                                            </p>
                                        </div>
                                        <div className='flex items-center justify-between gap-2'>
                                            {question.question && !question.answer.text && (
                                                <p className='bg-red-600 text-[#fff] font-mon font-600 px-2 rounded-md text-sm'>Please select an answer</p>
                                            )}
                                            {i + 1 !== 1 && (<button onClick={() => handleRemoveQuestion(i, question.key, questions, setQuestions)} className='text-red-600 p-3 bg-red-500 bg-opacity-15 border border-red-500 rounded-md transition-all duration-200 hover:bg-opacity-100 hover:text-[#eeeded]'>
                                                <FaRegTrashCan />
                                            </button>
                                            )}
                                            <AccordionTrigger className='text-green-600 p-3 bg-green-500 bg-opacity-15 border border-green-500 rounded-md transition-all duration-200 hover:bg-opacity-100 hover:text-[#eeeded]' style={{ textDecoration: 'none', userSelect: 'text' }} />
                                        </div>
                                    </div>
                                    <AccordionContent className='p-0'>
                                        <div className='my-4'>
                                            <div className='grid grid-flow-col w-fit items-center'>
                                                <FaDotCircle className='text-base text-red-600 mr-1 align-middle -mt-2' />
                                                <h1 className='font-poppins font-600 mb-2 text-xl xsm:text-base'>Question</h1>
                                            </div>
                                            <QuillEditor
                                                value={question.question}
                                                onChange={(value) => handleSetQuestion(i, value, setQuestions)}
                                            />
                                        </div>
                                        <div className='flex flex-col gap-5 ml-10 fxsm:ml-3'>
                                            {question?.qOpt.map(opt => {
                                                return (
                                                    <div key={opt.key}>
                                                        <div className='flex items-center justify-between mb-2 xsm:flex-col'>
                                                            <h1 className='font-mon font-600 text-sm'>Option {opt.id}</h1>
                                                            <div className='flex items-center gap-4'>
                                                                <div className='flex items-center gap-2'>
                                                                    <input
                                                                        type="radio"
                                                                        name={`qAnswer-${question.key}`}
                                                                        id={`qAnswer-${question.key}`}
                                                                        value={opt.id}
                                                                        checked={question.answer.text === opt.id}
                                                                        onChange={(e) => handleSetAnswer(i, e.target.value, questions, setQuestions)}
                                                                        className='appearance-auto w-4  h-4'
                                                                    />
                                                                    <p className='font-poppins font-400 text-sm'>Select as Answer</p>
                                                                </div>
                                                                {opt.id !== 'A' && opt.id !== 'B' && (
                                                                    <button
                                                                        className='text-red-600 p-2 bg-red-500 bg-opacity-15 border border-red-500 rounded-md transition-all duration-200 hover:bg-opacity-100 hover:text-[#eeeded]'
                                                                        onClick={() => handleRemoveOption(i, opt.key, questions, setQuestions)}
                                                                    >
                                                                        <FaRegTrashCan />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                        <QuillEditor
                                                            value={opt.text}
                                                            onChange={(value) => handleSetOption(i, opt.key, value, setQuestions)}
                                                        />
                                                    </div>
                                                )
                                            })}
                                        </div>
                                        <button
                                            type='button'
                                            className={`mt-5 mb-6 border border-solid border-gray-600 text-gray-600 shadow-sm p-3 font-mon font-600 text-sm rounded-md transition-all duration-300 flex items-center gap-2 ${question?.qOpt[question?.qOpt.length - 1].id === 'E' ? 'opacity-45' : ' hover:bg-gray-600 hover:text-[#eee] '}`}
                                            onClick={() => handleAddOption(i, questions, setQuestions)}
                                            disabled={question?.qOpt[question?.qOpt.length - 1].id === 'E'}
                                        >
                                            <FaPlusCircle />
                                            {
                                                question?.qOpt[question?.qOpt.length - 1].id === 'E'
                                                    ? 'Max Option Limit'
                                                    : 'Add More Option'
                                            }
                                        </button>
                                        <div className='my-3'>
                                            <div className='grid grid-flow-col w-fit items-center'>
                                                <FaDotCircle className='text-base text-red-600 mr-1 align-middle -mt-2' />
                                                <h1 className='font-poppins font-600 mb-2 text-xl xsm:text-base'>Answer Description
                                                    <span className='text-sm font-400 opacity-65'> &nbsp;&nbsp;(optional)</span>
                                                </h1>
                                            </div>
                                            <QuillEditor
                                                value={question.answer.desc}
                                                onChange={(value) => handleSetAnswerDesc(i, value, setQuestions)}
                                            />
                                        </div>
                                    </AccordionContent>
                                </AccordionItem>
                            )
                        })}
                    </Accordion>
                </ul>
            </div >
            <div className='w-full grid place-content-center text-center mt-5'>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <button
                            type='button'
                            className='mt-5 border border-solid border-gray-600 text-gray-600 shadow-sm p-3 font-mon font-600 text-sm rounded-md transition-all duration-300 hover:bg-gray-600 hover:text-[#eee] flex items-center gap-2'
                        >
                            <FaPlusCircle />
                            Add New Question
                        </button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel>New Question</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer' onClick={() => handleAddQuestion('multi-choice', setQuestions)}>
                            Multiple Choice
                        </DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer' onClick={() => handleAddQuestion('true-false', setQuestions)}>
                            True or False
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            <Preview isModalOpen={isModalOpen} closeModal={closeModal} currentQuestionIndex={currentQuestionIndex} currQue={currQue} preview={preview} setPreview={setPreview} setCurrentQuestionIndex={setCurrentQuestionIndex} />

        </>
    )
}
export default QuestionsEditor