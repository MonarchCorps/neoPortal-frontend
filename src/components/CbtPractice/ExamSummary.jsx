/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import useScrollTop from '@/hooks/useScrollTop'
import { formatTime } from '@/utils/timeFormatter'
import { calculateSummary } from '@/utils/calculateSummary'
import Loading2 from '../Loaders/Loading2'

function ExamSummary({ isLoading, flattenedSummary }) {

    const { scrollTop } = useScrollTop()

    return (
        <>
            {isLoading && (
                <div className="bg-red-700 text-[#fff] font-mon font-500 py-3 px-3 rounded-sm">
                    <Loading2 text='Loading details' data='' isLoading={isLoading} />
                </div>
            )}
            {!isLoading && (
                <>
                    <h1 className='flex items-center'>
                        <Link to='/' onClick={scrollTop} className='text-red-700'>Home</Link>
                        <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                        <p className="text-sm opacity-70 lowercase">Classroom</p>
                    </h1>
                    <div className='border border-solid shadow-sm px-5 py-4 mt-5'>
                        <h1 className='font-roboto font-500 text-4xl text-red-800 opacity-95 esm:text-2xl'>
                            Exam Performance and result
                        </h1>
                    </div>

                    <div className='mt-4'>
                        <h1 className='text-3xl mb-1 esm:text-xl'>Score:</h1>
                        <h1 className='text-5xl text-red-700 font-500 tracking-wide esm:text-3xl'>{flattenedSummary?.totalPercentage === '0.00' || flattenedSummary?.totalPercentage === 'N/A' || flattenedSummary?.totalPercentage === undefined ? '0%' : `${flattenedSummary?.totalPercentage}%`}</h1>
                    </div>

                    <div className='mt-10 mb-7 utsm:flex utsm:flex-col utsm:gap-2 utsm:text-center'>
                        <Link to='/cbt-practice/exam-history' onClick={scrollTop} className='border-2 border-solid border-red-600 text-red-600 shadow-sm p-3 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-[#eee]'>
                            Exam History
                        </Link>
                        <Link to='/cbt-practice' onClick={scrollTop} className='border-2 ml-3 utsm:ml-0 border-solid border-red-600 text-red-600 shadow-sm p-3 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-[#eee]'>
                            Start another exam
                        </Link>
                    </div>

                    <div className="border-l-4 border-solid border-red-700 ml-10 mt-8 p-2 shadow w-fit">
                        <p className='font-karla font-500 text-slate-900'>
                            Answered <span className='font-700 text-red-700'>10</span> out of <span className='font-700 text-red-700'>40</span> correctly!
                        </p>
                    </div>

                    <div className='mt-8'>
                        <h2 className='font-roboto font-500 text-3xl'>Time Analysis</h2>
                        <div className='w-1/4 min-w-[20rem] utsm:max-w-[20rem] mt-5'>
                            <div className='grid grid-flow-col bg-gray-200 px-2 py-1 font-poppins'>
                                <p className='font-500'>Start Time:</p>
                                <p className='text-end text-sm'>{flattenedSummary?.startTime ? formatTime(flattenedSummary?.startTime) : '00'}</p>
                            </div>
                            <div className='grid grid-flow-col px-2 py-1 font-poppins'>
                                <p className='font-500'>End Time:</p>
                                <p className='text-end text-sm'>{flattenedSummary?.startTime ? formatTime(flattenedSummary?.endTime) : '00'}</p>
                            </div>
                        </div>
                    </div>

                    <div className='mt-4 gap-5'>
                        <div className='p-4 shadow-sm h-fit'>
                            <div className='grid grid-cols-6 ism:grid-cols-1 border-y-2 border-solid border-gray-100 py-2 pt-3'>
                                <p className='font-poppins font-700 text-sm opacity-80 col-span-2 ism:hidden'>#Subjects</p>
                                <p className='font-poppins font-700 text-sm opacity-80 col-span-2 hidden ism:block'>#Details</p>
                                <p className='font-poppins font-500 text-sm opacity-80 text-center ism:hidden'>Total</p>
                                <p className='font-poppins font-500 text-sm opacity-80 text-center ism:hidden'>Attempted</p>
                                <p className='font-poppins font-500 text-sm opacity-80 text-center ism:hidden'>Passed</p>
                                <p className='font-poppins font-500 text-sm opacity-80 text-center ism:hidden'>Failed</p>
                            </div>
                            <div>
                                {Object.entries(flattenedSummary?.subjectBreakdown || {}).map(([subjectName, subjectData], i) => {
                                    const { attempted, failed } = calculateSummary(subjectData || {});

                                    return (
                                        <div className='grid grid-cols-6 ism:grid-cols-2 py-4 border-b border-solid border-gray-100' key={subjectName}>
                                            <p className='font-poppins text-sm opacity-80 col-span-2 capitalize ism:flex ism:gap-3'>
                                                <span className='hidden ism:block'>{i + 1}. </span>
                                                <span className='font-700'>{subjectName.replace(/-/g, " ")}</span>
                                            </p>
                                            <p className='font-poppins text-sm opacity-80 text-center ism:mt-2 ism:flex ism:items-center ism:gap-1'>
                                                <span className='hidden ism:block'>{'Total'}</span>
                                                <span className='font-700'>{subjectData?.total}</span>
                                            </p>
                                            <p className='font-poppins text-sm opacity-80 text-center ism:mt-2 ism:flex ism:items-center ism:gap-1'>
                                                <span className='hidden ism:block'>{'Attempted'}</span>
                                                <span className='font-700'>{attempted}</span>
                                            </p>
                                            <p className='font-poppins text-sm opacity-80 text-center ism:mt-2 ism:flex ism:items-center ism:gap-1'>
                                                <span className='hidden ism:block'>{'Correct'}</span>
                                                <span className='font-700'>{subjectData.correct}</span>
                                            </p>
                                            <p className='font-poppins text-sm opacity-80 text-center ism:mt-2 ism:flex ism:items-center ism:gap-1'>
                                                <span className='hidden ism:block'>{'Failed'}</span>
                                                <span className='font-700'>{failed}</span>
                                            </p>
                                        </div>
                                    );
                                })}

                            </div>
                        </div>
                    </div>
                </>
            )}
        </>
    )
}

export default ExamSummary