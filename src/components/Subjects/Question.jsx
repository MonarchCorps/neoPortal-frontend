import React from "react"
import Header from "../partials/Header/Header"
import { Link, useParams } from "react-router-dom"
import Footer from "../partials/Footer/Footer"
import useScrollTop from "@/hooks/useScrollTop"
import { FaChevronRight } from "react-icons/fa"
import trim from "@/utils/trim"
import axios from "@/api/axios"
import { useQuery } from "@tanstack/react-query"
import DOMPurify from 'dompurify'

function Question() {

    const { subject, questionId } = useParams()
    const { scrollTop } = useScrollTop()

    const { data: questions } = useQuery({
        queryKey: ['fetchQuestions'],
        queryFn: () =>
            axios.get(`/fetch-questions/${subject}`).then((res) => {
                return Array.isArray(res?.data) ? res.data : [];
            }),
        enabled: !!subject
    })

    const currentQuestion = questions.find(que => que?._id == questionId && que?.subject === subject)

    return (
        <React.Fragment>
            <Header />
            <main>
                <section>
                    <div className='pt-40 tmd:pt-48 w-[85%] max-w-[1204px] mx-auto'>
                        <h1 className='flex items-center'>
                            <Link to='/' onClick={scrollTop} className='text-red-700'>Home</Link>
                            <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                            <Link to='/classroom' className='text-red-700'>Classroom</Link>
                            <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                            <Link to={`/classroom/${subject}`} className='text-red-700'>{subject}</Link>
                            <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                            <p className="text-sm opacity-70 lowercase">{trim(currentQuestion?.text || '', 20)}</p>
                        </h1>
                        <div className='border border-solid shadow-sm px-5 py-4 mt-5'>
                            <h1 className='font-roboto font-500 text-4xl text-red-800 opacity-95 smd:text-2xl'
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(trim(currentQuestion?.question || '', 60)) }}
                            >
                            </h1>
                        </div>
                        <div className='grid grid-cols-3 hrmd:grid-cols-1 mt-4 gap-5'>
                            <div className='col-span-2 p-4 shadow h-fit'>
                                <p className="capitalize text-xs font-700 font-mon text-slate-50 bg-red-600 w-fit px-2 py-1 rounded-md">{subject.replace(/-/g, " ")}</p>
                                <div className="mt-5">
                                    <p className="text-base/relaxed font-roboto mb-4"
                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentQuestion?.question) }}
                                    ></p>
                                    <ul className="ml-5">
                                        {currentQuestion?.qOpt.map(option => {
                                            return (
                                                <li className="flex gap-2" key={option?._id}>
                                                    <span className="font-700 font-roboto">{option?.id}</span>
                                                    <span
                                                        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option?.text) }}
                                                    >
                                                    </span>
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </div>
                                <div className="border-l-4 border-solid border-red-700 ml-10 mt-6 p-2 shadow aism:ml-5">
                                    <p className="font-mon font-500">
                                        The correct answer is ({`${currentQuestion?.answer.text}`})
                                    </p>
                                    <div className="my-2">
                                        <h1 className="text-xl mb-1">Explanation:</h1>
                                        {currentQuestion?.answer.desc ? (
                                            <p className="font-poppins font-500 ml-5"
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currentQuestion?.answer.desc) }}
                                            ></p>
                                        ) : (
                                            <p className="font-poppins font-400 ml-5">No explanation available at the moment</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>

                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </React.Fragment>
    )
}

export default Question