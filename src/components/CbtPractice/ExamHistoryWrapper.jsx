import useAuth from "@/hooks/useAuth"
import Footer from "../partials/Footer/Footer"
import Header from "../partials/Header/Header"
import ExamHistory from "./ExamHistory"
import useGetColors from "@/hooks/useGetColors"
import { Link } from "react-router-dom"
import useScrollTop from "@/hooks/useScrollTop"
import { useQuery } from "@tanstack/react-query"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

function ExamHistoryWrapper() {

    const { colors } = useGetColors()
    const { auth } = useAuth()
    const { scrollTop } = useScrollTop()
    const axiosPrivate = useAxiosPrivate()

    const { data, isLoading } = useQuery({
        queryKey: ['exam_history', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/exam-history/${auth?._id}`).then(res => {
                return Array.isArray(res?.data) ? res?.data : []
            }),
        enabled: !!auth?._id
    })

    const [page, setPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const n = 5

    useEffect(() => {
        if (data) {
            setFilteredData(
                data?.length > 0 && data.filter((_, index) => {
                    return (index >= page * n) & (index < (page + 1) * n)
                })
            ) || []
        }
    }, [data, page])

    return (
        <div className="flex flex-col h-full">
            <Header />
            <main className="min-h-[50vh]">
                <section className="mt-40 w-[85%] max-w-[1204px] mx-auto">
                    <div>
                        <div className='p-4 flex items-center gap-5 aism:py-2'>
                            <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                                <button
                                    className='w-[6rem] h-[6rem] object-cover msm:w-[5rem] msm:h-[5rem] cursor-default'
                                    style={{ color: colors.darkerColor, background: colors.randomColor }}>
                                    <span className='font-600 font-mon text-6xl msm:text-4xl'>{auth?.name.substring(0, 1)}</span>
                                </button>
                            </div>
                            <div>
                                <h1 className='text-[2rem] font-500 font-serif msm:text-xl'>
                                    {auth?.name || 'Student'}
                                </h1>
                                <p className="text-[#1F509A] font-poppins msm:text-base">CBT Exam History</p>
                                <p className="text-sm block aism:hidden">You have practiced a total of {data?.length} Free CBT Exams</p>
                            </div>
                        </div>
                        <p className="text-sm hidden aism:block aism:mb-6 text-wrap">You have practiced a total of {data?.length} Free CBT Exams</p>
                    </div>
                    <div className="my-5 mb-8">
                        <Link to='/cbt-practice' onClick={scrollTop} className='ml-2 border-2 border-solid border-[#1F509A] bg-[#1F509A] text-[#fff] shadow-sm p-2 rounded-md transition-all duration-300 hover:text-[#1F509A] hover:bg-[#eee]'>
                            Start a free cbt practice exam
                        </Link>
                    </div>
                    <ExamHistory data={filteredData} isLoading={isLoading} page={{ page: page, n: n }} />
                    {!isLoading && data?.length > 0 && (
                        <ReactPaginate
                            previousLabel={<FaArrowLeft />}
                            nextLabel={<FaArrowRight />}
                            pageCount={Math.ceil(data.length / n)}
                            onPageChange={(event) => setPage(event.selected)}
                            containerClassName={"pagination flex flex-wrap"}
                            activeClassName={"active"}
                            pageClassName={"page"}
                            pageLinkClassName={"page-link"}
                            previousClassName={"previous"}
                            nextClassName={"next"}
                            breakClassName={"break"}
                        />
                    )}
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default ExamHistoryWrapper