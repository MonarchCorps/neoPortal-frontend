import { useState } from 'react'
import Footer from '@/components/partials/Footer/Footer'
import Header from '@/components/partials/Header/Header'
import { subjects } from '@/utils/subjects'
import { FaChevronRight } from 'react-icons/fa'
import { Link, useParams } from 'react-router-dom'
import SubHeadingSection from './SubHeadingSection'
import QuestionsList from './QuestionsList'
import useScrollTop from '@/hooks/useScrollTop'
import { useQuery } from '@tanstack/react-query'
import axios from '@/api/axios'

function Subject() {

    const { subject } = useParams()
    const { scrollTop } = useScrollTop()

    const currentSubject = subjects?.find(sub => sub.link === subject)
    const [filteredData, setFilteredData] = useState([])

    const { data: questions } = useQuery({
        queryKey: ['fetchQuestions'],
        queryFn: () =>
            axios.get(`/fetch-questions/${subject}`).then((res) => {
                return Array.isArray(res?.data) ? res.data : [];
            }),
        enabled: !!subject
    })

    return (
        <>
            <Header />
            <main>
                <section>
                    <div className='pt-40 w-[85%] max-w-[1204px] mx-auto'>
                        <h1 className='flex items-center'>
                            <Link to='/' className='text-red-700'>Home</Link>
                            <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                            <Link to='/classroom' className='text-red-700'>Classroom</Link>
                            <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                            <p className='font-300 text-[0.95rem] opacity-65'>{subject}</p>
                        </h1>
                        <div className='border border-solid shadow-sm px-5 py-4 mt-5'>
                            <h1 className='font-roboto font-500 text-3xl text-red-800 opacity-95 cemd:text-2xl xsm:text-xl'>
                                {currentSubject?.text} Past Questions, WAEC, NECO and Post UTME Past Questions
                            </h1>
                            <p className="font-roboto text-base/normal mt-3 cemd:text-sm/relaxed xsm:text-xs/relaxed">{currentSubject?.desc}</p>
                        </div>
                        <div className='mt-6'>
                            <Link to='/cbt-practice' onClick={scrollTop} className='ml-2 border-2 border-solid border-red-600 bg-red-600 text-[#fff] shadow-sm p-2 rounded-md transition-all duration-300 hover:text-red-600 hover:bg-[#eee]'>
                                Start a free cbt practice exam
                            </Link>
                        </div>
                        <div className='grid grid-cols-3 ilg:flex ilg:flex-col mt-4 gap-5'>
                            <div className='col-span-2 p-4 shadow h-fit'>
                                <SubHeadingSection questions={questions} setFilteredData={setFilteredData} />
                                <QuestionsList filteredData={filteredData} />
                            </div>
                            <div className='shadow rounded overflow-hidden h-fit ilg:max-w-[30rem]'>
                                <h1 className='bg-red-900 text-slate-50 px-4 py-3 font-mon font-600 text-base border border-solid border-red-600 rounded-t'>Other subjects</h1>
                                <ul >
                                    {subjects.filter(sub => sub.link !== subject).map(subject => {
                                        return (
                                            <li key={subject.id} className='px-4 py-3 border-b border-solid border-gray-200'>
                                                <Link to={`/classroom/${subject.link}`} onClick={scrollTop} className='transition-colors duration-100 hover:text-red-500'>
                                                    {subject.text}
                                                </Link>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Subject