/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CiMenuKebab } from 'react-icons/ci'
import { FaEdit, FaTrash } from 'react-icons/fa'
import { FaArrowsToEye } from 'react-icons/fa6'
import { DeleteCancelButton, DeleteConfirmButton, DeleteModal } from '@/components/Modal/DeleteModal'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import useScrollTop from '@/hooks/useScrollTop'
import trim from '@/utils/trim'
import { BookLock } from 'lucide-react'
import usePathAfterSlash from '@/hooks/usePathAfterSlash'


function TableBody({ details, handleUpdateExam, handleDeleteExam, page }) {

    const { scrollTop } = useScrollTop()

    const [isModalOpen, setIsModalOpen] = useState(false)
    const [dataToDelete, setDataToDelete] = useState('')
    const pathAfterSlash = usePathAfterSlash(-1)

    return (
        <>
            {details?.length > 0 && (
                details?.map((detail, i) => {
                    return (
                        <div className="grid grid-cols-[repeat(9,minmax(0,1fr)),50px] border border-solid px-6 py-[0.9rem] rounded-xl mb-1 font-poppins" key={detail?._id}>
                            <div className='col-span-2 grid grid-cols-[40px,1fr] gap-4' >
                                <p className='text-base mr-7 font-600'>{page?.page * page?.n + i + 1}.</p>
                                <p className='text-base'>{detail?.examYear || 'N/A'}</p>
                            </div>
                            <p className='text-base capitalize text-center'>{detail?.examType || 'N/A'}</p>
                            <p className='col-span-2 text-center text-sm capitalize'>{detail?.subject ? trim(detail?.subject, 18) : 'N/A'}</p>
                            <p className='text-base col-span-2 text-center'>{detail?.questionsData?.length}</p>
                            <p className='text-sm text-center capitalize text-red-500 font-mon font-600'>{detail?.mode || 'N/A'}</p>
                            <p className='text-sm text-center'>
                                {
                                    detail?.state === 'published' ? 'Published' : 'Saved'
                                }
                            </p>
                            {pathAfterSlash !== 'teacher' && (
                                <HoverCard openDelay={20} closeDelay={20}>
                                    <HoverCardTrigger asChild>
                                        <div className='flex justify-end items-center group'>
                                            <CiMenuKebab className='cursor-pointer' />
                                        </div>
                                    </HoverCardTrigger>
                                    <HoverCardContent className="p-0 absolute -right-4 top-0 rounded-none border border-solid border-slate-400">
                                        <ul>
                                            <Link to={`${detail?._id}/edit`} className='cursor-pointer font-400 hover:bg-[#f2f2f2] pl-5 hover:font-500 py-2 grid grid-flow-col justify-start items-center gap-3 select-none' onClick={scrollTop}>
                                                <span className='text-[#6a6767]'>
                                                    <FaEdit />
                                                </span>
                                                <span className='font-sans'>Edit details</span>
                                            </Link>
                                            <Dialog>
                                                <DialogTrigger asChild>
                                                    <li className='cursor-pointer text-red-500 font-400 pl-5 hover:font-500 py-2 flex justify-between items-center select-none transition-all duration hover:bg-red-600 hover:text-[#fff]'>
                                                        <div className='grid grid-flow-col justify-start items-center gap-3'>
                                                            <FaArrowsToEye />
                                                            <span className='font-sans'>Change Visibility</span>
                                                        </div>
                                                    </li>
                                                </DialogTrigger>
                                                <DialogContent>
                                                    <DialogHeader>
                                                        <DialogTitle>
                                                            <BookLock className='w-full text-center mb-2 mt-1' />
                                                            <p>
                                                                Change Visibility
                                                            </p>
                                                        </DialogTitle>
                                                        <DialogDescription className='text-red-600'>
                                                            You agree to make this exam {detail?.state === 'saved' ? (
                                                                <button
                                                                    type='button'
                                                                    className='bg-[#100e0e] text-[#fff] px-3 py-2 rounded-xl font-mon font-500 text-sm mx-2'
                                                                >
                                                                    Public
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    type='button'
                                                                    className='bg-[#100e0e] text-[#fff] px-3 py-2 rounded-xl font-mon font-500 text-sm mx-2'
                                                                >
                                                                    Private
                                                                </button>
                                                            )}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <div className="flex items-center space-x-2">
                                                        <div className="grid flex-1 gap-2">
                                                            <p className='text-center font-poppins text-base/relaxed'>
                                                                If you make this exam {detail?.state === 'saved' && detail?.mode === 'live' ? (
                                                                    <>
                                                                        <span className='text-red-600 font-poppins font-700'>public </span>
                                                                        <span className='text-red-600 font-poppins font-700'>only those with the exam ID</span> will be able to see it and take the exam once
                                                                    </>
                                                                ) : detail?.state === 'published' && detail?.mode === 'live' ? (
                                                                    <span>
                                                                        <span className='text-red-600 font-poppins font-700'>private </span>
                                                                        <span className='text-red-600 font-poppins font-700'>those with the exam ID</span> will not be able to take the exam </span>
                                                                ) : detail?.state === 'saved' && (detail?.mode === 'practice' || !details?.mode) ? (
                                                                    <>
                                                                        <span className='text-red-600 font-poppins font-700'>public </span>
                                                                        <span className='text-red-600 font-poppins font-700'>everyone</span> will be able to see it and practice with the exam
                                                                    </>
                                                                ) : (
                                                                    <>
                                                                        <span className='text-red-600 font-poppins font-700'>private </span>
                                                                        <span className='text-red-600 font-poppins font-700'>nobody</span> will be able to see it and practice with the exam
                                                                    </>
                                                                )}
                                                            </p>
                                                            {detail?.state === 'saved' ? (
                                                                <button
                                                                    type='button'
                                                                    className='bg-[#080808] text-[#fff] font-poppins font-500 py-2 w-full shadow border border-solid border-gray-950 rounded-md'
                                                                    onClick={() => handleUpdateExam.mutate({ examID: detail?._id, state: 'published' })}
                                                                >
                                                                    Make Public
                                                                </button>
                                                            ) : (
                                                                <button
                                                                    type='button'
                                                                    className='bg-[#080808] text-[#fff] font-poppins font-500 py-2 w-full shadow border border-solid border-gray-950 rounded-md'
                                                                    onClick={() => handleUpdateExam.mutate({ examID: detail?._id, state: 'saved' })}
                                                                >
                                                                    Make Private
                                                                </button>
                                                            )}

                                                        </div>
                                                    </div>

                                                </DialogContent>
                                            </Dialog>
                                            <li className='cursor-pointer text-red-500 font-400 pl-5 hover:font-500 py-2 flex justify-between items-center select-none transition-all duration hover:bg-red-600 hover:text-[#fff]' onClick={() => { setDataToDelete(detail?._id); setIsModalOpen(!isModalOpen) }}>
                                                <div className='grid grid-flow-col justify-start items-center gap-3'>
                                                    <FaTrash />
                                                    <span className='font-sans'>Delete Exam</span>
                                                </div>
                                            </li>
                                        </ul>
                                    </HoverCardContent>
                                </HoverCard>
                            )}
                        </div>
                    )
                })
            )}
            {isModalOpen && (
                <DeleteModal>
                    <p>
                        {`Are you sure you want to delete this exam's questions`}
                    </p>
                    <p className='font-poppins font-500 text-base/relaxed'>
                        Exam ID: {dataToDelete}
                    </p>
                    <div className='mt-3 w-full text-center flex gap-4 justify-center'>
                        <DeleteCancelButton
                            onClick={() => {
                                setIsModalOpen(false)
                            }}
                        />
                        <DeleteConfirmButton
                            onClick={() => {
                                handleDeleteExam.mutate({ examID: dataToDelete });
                                setIsModalOpen(false)
                            }}
                        />
                    </div>
                </DeleteModal>
            )}
        </>
    )
}

export default TableBody