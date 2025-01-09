import { Link } from 'react-router-dom'
import { subjects } from '../../utils/subjects'
import Loading2 from '../Loaders/Loading2'
import useScrollTop from '@/hooks/useScrollTop'

function SubjectsList() {

    const { scrollTop } = useScrollTop()

    return (
        <>
            <Loading2 text='Start studying' data='' isLoading={true} className={'font-mon font-500 mt-3 text-red-700 text-2xl tracking-tight'} />
            <div className='grid grid-cols-3 ilg:flex ilg:flex-col gap-8 border border-solid shadow-sm mt-4 px-8 py-4'>
                <div className='flex flex-col gap-6 col-span-2'>
                    {subjects.map(subject => {
                        return (
                            <figure key={subject.id} className='flex flex-col gap-5 border-b border-solid border-b-gray-200 pb-4'>
                                <div className='flex htmd:flex-col gap-5'>
                                    <img
                                        src={subject?.img}
                                        className='min-w-32 min-h-32 max-w-32 max-h-32 rounded-md object-cover'
                                        alt={`${subject.text} image`}
                                        loading="lazy"
                                    />
                                    <div>
                                        <Link to={`${subject.link}`} onClick={scrollTop} className='font-karla font-700 text-2xl hover:text-red-800 hover:underline'>
                                            {subject.text}
                                        </Link>
                                        <p className='mt-1 text-sm/relaxed ahsm:text-xs/relaxed'>Mathematics studies measurement, relationships, and properties of quantities and sets, using numbers and symbols. Arithmetic, algebra, geometry, and calculus are popular topics in mathematics.</p>
                                    </div>
                                </div>
                                <div className='ahsm:flex ahsm:flex-col ahsm:gap-4'>
                                    <Link to={`${subject.link}`} onClick={scrollTop} className='border-2 border-solid border-red-600 text-red-600 shadow-sm p-3 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-[#eee] ahsm:text-center'>
                                        Study questions
                                    </Link>
                                    <button className='ml-4 ahsm:ml-0 border-2 border-solid border-red-600 text-red-600 shadow-sm p-2 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-[#eee]'>
                                        Save for later
                                    </button>
                                </div>
                            </figure>
                        )
                    })}
                </div>
                <div className='border border-solid border-slate-400 h-fit ilg:max-w-[30rem]'>
                    <h1 className=' text-slate-800 font-mon font-600 text-2xl tracking-tight border-b border-solid border-b-slate-300 px-3 py-6'>Quick Links</h1>
                    <div className='flex flex-col gap-3 py-2'>
                        <Link className='border-b border-solid border-b-slate-400 px-3 pb-1'>
                            <h1 className='text-base font-mon font-500 text-red-600 hover:underline'>Practice for Your Upcoming Exams</h1>
                            <p className='font-karla text-sm/normal mt-1 ml-2'>To prepare for your exams, review key topics, practice past questions, manage time well, and stay consistent with your study routine. Take breaks and stay positive!</p>
                        </Link>
                        <Link className='border-b border-solid border-b-slate-400 px-3 pb-1'>
                            <h1 className='text-base font-mon font-500 text-red-600 hover:underline'>JAMB Questions and Answers</h1>
                            <p className='font-karla text-sm/normal mt-1 ml-2'>JAMB questions and answers help with focused exam preparation.</p>
                        </Link>
                        <Link className='border-b border-solid border-b-slate-400 px-3 pb-1'>
                            <h1 className='text-base font-mon font-500 text-red-600 hover:underline'>JAMB Questions and Answers</h1>
                            <p className='font-karla text-sm/normal mt-1 ml-2'>
                                WAEC questions and answers enhance targeted exam preparation and practice.
                            </p>
                        </Link>
                        <Link className='border-b border-solid border-b-slate-400 px-3 pb-1'>
                            <h1 className='text-base font-mon font-500 text-red-600 hover:underline'>Study  Questions and Answers</h1>
                            <p className='font-karla text-sm/normal mt-1 ml-2'>Access and study JAMB, WAEC, NECO, and Post UTME past questions for effective exam preparation.</p>
                        </Link>
                        <Link className=' px-3 pb-1'>
                            <h1 className='text-base font-mon font-500 text-red-600 hover:underline'>Live exam</h1>
                            <p className='font-karla text-sm/normal mt-1 ml-2'>Live exam section for real-time, interactive, and timed assessments.</p>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SubjectsList