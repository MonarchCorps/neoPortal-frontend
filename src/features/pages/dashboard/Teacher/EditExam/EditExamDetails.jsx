import Loading2 from "@/components/Loaders/Loading2"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { FaAngleDoubleUp, FaDotCircle, FaEye, FaPlusCircle } from "react-icons/fa"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { FaRegTrashCan } from "react-icons/fa6"
import QuillEditor from "@/components/QuillEditor"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { v4 as uuidv4 } from "uuid"
import { handleAddOption, handleAddQuestion, handleChange, handleRemoveOption, handleRemoveQuestion, handleSetAnswer, handleSetAnswerDesc, handleSetOption, handleSetQuestion, handleValueChange } from "./questionAction"
import { getYears } from "@/utils/getYears"
import { subjects } from "@/utils/subjects"
import toast from "react-hot-toast"
import Loading from "@/components/Loaders/Loading"
import useHideScroll from "@/hooks/useHideScroll"
import Preview from "../Exam/Preview"
import { formatDateTimeLocal } from "@/utils/timeFormatter"
import GenerateUniqueId from "../Exam/GenerateUniqueId"

function EditExamDetails() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { examID } = useParams()
    const navigate = useNavigate()

    const [examDetails, setExamDetails] = useState({})
    const [openItems, setOpenItems] = useState([]);

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['uploaded_exams', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/uploaded/exams/${auth?._id}`).then((res) => {
                return res?.data
            }),
        enabled: !!auth?._id
    })

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [preview, setPreview] = useState()
    const currQue = preview?.[currentQuestionIndex] || {}

    useEffect(() => {
        if (!examDetails?._id) {
            const filteredExam = data?.length > 0 && data?.find(exam => exam?._id === examID)
            setExamDetails({
                ...filteredExam,
                questionsData: filteredExam?.questionsData?.map(question => {
                    return {
                        ...question,
                        key: uuidv4(),
                        qOpt: question?.qOpt?.map(opt => {
                            return {
                                ...opt,
                                key: uuidv4()
                            }
                        })
                    }
                })
            })
        }
    }, [data, examDetails?._id, examID])

    const questionsData = examDetails?.questionsData?.map(question => {
        return {
            question: question?.question,
            qOpt: question?.qOpt.filter(opt => opt.text !== '').map(opt => {
                return {
                    id: opt.id,
                    text: opt.text
                }
            }),
            answer: question?.answer,
            qType: question?.qType
        }
    })

    const handleEditExamDetails = useMutation({
        mutationFn: ({ state }) => {
            const result = examDetails?.questionsData?.some(que => !que?.answer.text)
            if (result)
                return toast.error('You need to select an answer')
            else {
                return axiosPrivate.patch(`/edit-exam/${auth?._id}`, {
                    examID: examDetails?._id,
                    questionsData: questionsData || [],
                    examType: examDetails?.examType,
                    examYear: examDetails?.examYear,
                    subject: examDetails?.subject,
                    state,
                    liveStartTime: examDetails?.liveStartTime,
                    liveEndTime: examDetails?.liveStartTime,
                    liveId: examDetails?.liveId
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                })
            }
        },
        onSuccess: () => {
            toast.success('Update Successful!')
            navigate('/dashboard/teacher/uploaded-exams')
            queryClient.invalidateQueries({ queryKey: ['uploaded_exams', auth?._id] })
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to edit';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(handleEditExamDetails.isPending)

    const [isModalOpen, setIsModalOpen] = useState(false)

    const closeModal = () => {
        setIsModalOpen(false)
    };

    useEffect(() => {
        setPreview(examDetails?.questionsData?.map(q => ({
            ...q,
            qOpt: q?.qOpt.map(opt => ({ ...opt })),
            answer: { ...q?.answer },
        })));
    }, [examDetails]);

    return (
        <>
            <Loading isLoading={handleEditExamDetails.isPending} text='Updating questions' />

            <section>
                <div className='mt-10 pt-10 px-5 pb-5 w-[85%] max-w-[1000px] mx-auto shadow fxsm:mt-20'>
                    {isLoading ? (
                        <Loading2 text='Loading' data='document' isLoading={isLoading} className='my-8 bg-red-950 text-slate-50 font-mon font-600 text-base px-3 py-2 rounded-sm' />
                    ) : !isLoading && examDetails?._id
                        ? (
                            <>
                                <div className="fixed top-10 left-1/2 -translate-x-1/2 text-nowrap asm:text-wrap asm:left-0 asm:-translate-x-0 right-0 grid place-content-center h-fit z-[10]">
                                    <div className='axsm:mx-10 bg-[#100e0e] text-[#fff] px-3 py-2 rounded-md shadow text-center'>
                                        Save your data to avoid losing it!&nbsp;
                                        <button
                                            type='button'
                                            className='bg-[#fff] text-[#100e0e] px-3 py-2 rounded-xl font-mon font-500 text-sm mx-2'
                                            onClick={() => handleEditExamDetails.mutate({ state: 'published' })}
                                        >
                                            Save
                                        </button>
                                    </div>
                                </div>
                                <div className='col-span-2 flex items-center gap-5 mb-3'>
                                    <div className='w-full flex items-center justify-between fxsm:flex-col fxsm:items-start fxsm:gap-2'>
                                        <div className='flex items-center'>
                                            <h1 className='font-mon text-slate-950 font-600 text-3xl'>Edit Details</h1>
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
                                {examDetails?.mode !== 'live' && (
                                    <>
                                        <div className='flex flex-wrap gap-3 my-6 mb-8'>
                                            <select
                                                name="examType"
                                                id="examType"
                                                className="p-2 font-karla outline-none border border-solid bg-gray-50 px-3 py-2 rounded-md"
                                                onChange={(e) => handleChange(e, setExamDetails)}
                                                value={examDetails?.examType}
                                            >
                                                <option value="type">Type</option>
                                                <option value="waec">Waec</option>
                                                <option value="jamb">Jamb</option>
                                                <option value="neco">Neco</option>
                                                <option value="postUtme">Post Utme</option>
                                            </select>

                                            <select
                                                name="examYear"
                                                id="examYear"
                                                className="p-2 font-karla outline-none border border-solid bg-gray-50 px-3 py-2 rounded-md"
                                                onChange={(e) => handleChange(e, setExamDetails)}
                                                value={examDetails?.examYear}
                                            >
                                                <option value="year">Year</option>
                                                {getYears().map((year) => (
                                                    <option key={year} value={year}>
                                                        {year}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                name="subject"
                                                id="subject"
                                                className=" p-2 font-karla outline-none border border-solid bg-gray-50 px-3 py-2 rounded-md text-center hxsm:max-w-full"
                                                onChange={(e) => handleChange(e, setExamDetails)}
                                                value={examDetails?.subject}
                                            >
                                                <option value="subject">Subject</option>
                                                {subjects.map(subject => (
                                                    <option key={subject.id} value={subject.text.replace(/\s+/g, '-').toLowerCase()}>
                                                        {subject.text}
                                                    </option>
                                                ))}
                                            </select>

                                        </div>
                                        <div className='flex gap-3 my-6 mb-8 flex-wrap'>
                                            <div className='bg-gray-300 px-3 py-2 rounded-md'>{examDetails?.examType}</div>
                                            <div className='bg-gray-300 px-3 py-2 rounded-md'>{examDetails?.examYear}</div>
                                            <div className='bg-gray-300 px-3 py-2 rounded-md'>{examDetails?.subject}</div>
                                        </div>
                                    </>
                                )}
                                {examDetails?.mode === 'live' && (
                                    <>
                                        <div className="flex flex-wrap items-center justify-between">
                                            <div className='flex items-center gap-3'>
                                                <div className='bg-gray-300 px-3 py-2 rounded-md'>
                                                    <span className='font-mon font-600'>Exam ID: </span>
                                                    <span>{examDetails?.liveId}</span>
                                                </div>
                                            </div>
                                            <div className="mt-5">
                                                <GenerateUniqueId setFormData={setExamDetails} />
                                            </div>
                                        </div>

                                        <div className='grid grid-cols-2 cfsm:grid-cols-1 gap-4'>
                                            <div>
                                                <p className='font-mon font-600 mb-2'>Start Time</p>
                                                <input
                                                    type="datetime-local"
                                                    name="liveStartTime"
                                                    id="liveStartTime"
                                                    className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                                                    onChange={(e) => handleChange(e, setExamDetails)}
                                                    value={formatDateTimeLocal(examDetails?.liveStartTime)}
                                                />
                                            </div>

                                            <div>
                                                <p className='font-mon font-600 mb-2'>End Time</p>
                                                <input
                                                    type="datetime-local"
                                                    name="liveEndTime"
                                                    id="liveEndTime"
                                                    className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                                                    onChange={(e) => handleChange(e, setExamDetails)}
                                                    value={formatDateTimeLocal(examDetails?.liveEndTime)}
                                                />
                                            </div>
                                        </div>
                                    </>
                                )}
                                <div className='mt-7'>
                                    <div className='flex mb-7 items-center justify-between flex-wrap gap-2'>
                                        <h3 className='font-poppins font-500'>{examDetails?.questionsData?.length}/{examDetails?.questionsData?.length} Question(s)</h3>
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
                                            {examDetails?.questionsData?.map((question, i) => {
                                                return (
                                                    <AccordionItem
                                                        key={question?.key}
                                                        value={question?.key}
                                                        className={`border border-solid rounded p-4 mb-2 ${question?.question && !question?.answer.text ? 'border-[#344CB7]' : ''}`}
                                                    >
                                                        <div className='flex items-center justify-between flex-wrap gap-2'>
                                                            <div className='flex items-center gap-3 mr-3'>
                                                                <p className='bg-gray-200 w-8 h-8 px-3 py-2 grid place-content-center text-sm font-600 rounded-md'>{i + 1}</p>
                                                                <p className='bg-gray-200 p-2 text-xs font-600 rounded-md'>
                                                                    {question?.qType === 'multi-choice' ? 'Multiple Choice' : 'True or False'}
                                                                </p>
                                                            </div>
                                                            <div className='flex items-center justify-between gap-2'>
                                                                {question?.question && !question?.answer?.text && (
                                                                    <p className='bg-red-600 text-[#fff] font-mon font-600 px-2 rounded-md text-sm'>Please select an answer</p>
                                                                )}
                                                                {i + 1 !== 1 && (<button onClick={() => handleRemoveQuestion(question.key, setExamDetails)} className='text-red-700 p-3 bg-red-600 bg-opacity-15 border border-red-600 rounded-md transition-all duration-200 hover:bg-opacity-100 hover:text-[#eeeded]'>
                                                                    <FaRegTrashCan />
                                                                </button>
                                                                )}
                                                                <AccordionTrigger className='text-green-600 p-3 bg-green-500 bg-opacity-15 border border-green-500 rounded-md transition-all duration-200 hover:bg-opacity-100 hover:text-[#eeeded]' style={{ textDecoration: 'none', userSelect: 'text' }} />
                                                            </div>
                                                        </div>
                                                        <AccordionContent className='p-0'>
                                                            <div className='my-4'>
                                                                <div className='grid grid-flow-col w-fit items-center'>
                                                                    <FaDotCircle className='text-base text-[#1F509A] mr-1 align-middle -mt-2' />
                                                                    <h1 className='font-poppins font-600 mb-2 text-xl'>Question</h1>
                                                                </div>
                                                                <QuillEditor
                                                                    value={question?.question}
                                                                    onChange={(value) => handleSetQuestion(i, value, setExamDetails)}
                                                                />
                                                            </div>
                                                            <div className='flex flex-col gap-5 ml-10'>
                                                                {question?.qOpt.map(opt => {
                                                                    return (
                                                                        <div key={opt.key}>
                                                                            <div className='flex items-center justify-between mb-2 flex-wrap gap-2'>
                                                                                <h1 className='font-mon font-600 text-sm'>Option {opt.id}</h1>
                                                                                <div className='flex items-center gap-4'>
                                                                                    <div className='flex items-center gap-1'>
                                                                                        <input
                                                                                            type="radio"
                                                                                            name={`qAnswer-${question.key}`}
                                                                                            id={`qAnswer-${question.key}`}
                                                                                            value={opt.id}
                                                                                            checked={question?.answer.text == opt.id}
                                                                                            onChange={(e) => handleSetAnswer(i, e.target.value, setExamDetails)}
                                                                                            className='appearance-auto w-4  h-4'
                                                                                        />
                                                                                        <p className='font-poppins font-400 text-sm'>Select as Answer</p>
                                                                                    </div>
                                                                                    {opt?.id !== 'A' && opt?.id !== 'B' && (
                                                                                        <button
                                                                                            className='text-red-700 p-2 bg-red-600 bg-opacity-15 border border-red-600 rounded-md transition-all duration-200 hover:bg-opacity-100 hover:text-[#eeeded]'
                                                                                            onClick={() => handleRemoveOption(i, opt.key, setExamDetails)}
                                                                                        >
                                                                                            <FaRegTrashCan />
                                                                                        </button>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                            <QuillEditor
                                                                                value={opt.text}
                                                                                onChange={(value) => handleSetOption(i, opt.key, value, setExamDetails)}
                                                                            />
                                                                        </div>
                                                                    )
                                                                })}
                                                            </div>
                                                            <button
                                                                type='button'
                                                                className={`mt-5 mb-6 border border-solid border-gray-600 text-gray-600 shadow-sm p-3 font-mon font-600 text-sm rounded-md transition-all duration-300 flex items-center gap-2 ${question?.qOpt[question?.qOpt.length - 1].id === 'E' ? 'opacity-45' : ' hover:bg-gray-600 hover:text-[#eee] '}`}
                                                                disabled={question?.qOpt[question?.qOpt.length - 1].id === 'E'}
                                                                onClick={() => handleAddOption(i, setExamDetails)}
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
                                                                    <FaDotCircle className='text-base text-[#1F509A] mr-1 align-middle -mt-2' />
                                                                    <h1 className='font-poppins font-600 mb-2 text-xl'>Answer Description
                                                                        <span className='text-sm font-400 opacity-65'> &nbsp;&nbsp;(optional)</span>
                                                                    </h1>
                                                                </div>
                                                                <QuillEditor
                                                                    value={question?.answer.desc}
                                                                    onChange={(value) => handleSetAnswerDesc(i, value, setExamDetails)}
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
                                            <DropdownMenuItem className='cursor-pointer' onClick={() => handleAddQuestion('multi-choice', setExamDetails)}>
                                                Multiple Choice
                                            </DropdownMenuItem>
                                            <DropdownMenuItem className='cursor-pointer' onClick={() => handleAddQuestion('true-false', setExamDetails)}>
                                                True or False
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </>
                        ) : (
                            <p className="w-full text-center mb-5">No details available at the moment. Check back later or reload the pae</p>
                        )}

                    <Preview isModalOpen={isModalOpen} closeModal={closeModal} currentQuestionIndex={currentQuestionIndex} currQue={currQue} preview={preview} setPreview={setPreview} setCurrentQuestionIndex={setCurrentQuestionIndex} />

                </div >
            </section >
        </>
    )
}

export default EditExamDetails