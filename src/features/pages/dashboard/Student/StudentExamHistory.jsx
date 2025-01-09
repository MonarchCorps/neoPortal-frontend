import ExamHistory from "@/components/CbtPractice/ExamHistory"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import useGetColors from "@/hooks/useGetColors"
import useScrollTop from "@/hooks/useScrollTop"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import ReactPaginate from "react-paginate"
import { Link } from "react-router-dom"

function StudentExamHistory() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { scrollTop } = useScrollTop()
    const { colors } = useGetColors()

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

    console.log(data)

    return (
        <main className="min-h-[50vh]">
            <section className="mt-10 w-[85%] lg:w-screen htmd:w-full max-w-[1204px] mx-auto lg:mx-6 mb-4">
                <div>
                    <div className='p-4 flex items-center gap-5 usm:py-2'>
                        <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                            <button
                                className='w-[6rem] h-[6rem] object-cover esm:w-[5rem] esm:h-[5rem] cursor-default'
                                style={{ color: colors.darkerColor, background: colors.randomColor }}>
                                <span className='font-600 font-mon text-6xl esm:text-4xl'>{auth?.name.substring(0, 1)}</span>
                            </button>
                        </div>
                        <div>
                            <h1 className='text-[2rem] font-500 font-serif esm:text-xl'>
                                {auth?.name || 'Student'}
                            </h1>
                            <p className="text-red-600 font-poppins esm:text-base">CBT Exam History</p>
                            <p className="text-sm block usm:hidden">You have practiced a total of {data?.length} Free CBT Exams</p>
                        </div>
                    </div>
                    <p className="text-sm hidden usm:block usm:mb-6 text-wrap">You have practiced a total of {data?.length} Free CBT Exams</p>
                </div>
                <div className="my-3 mb-8">
                    <Link to='/cbt-practice' onClick={scrollTop} className='ml-2 border-2 border-solid border-red-600 bg-red-600 text-[#fff] shadow-sm p-2 rounded-md transition-all duration-300 hover:text-red-600 hover:bg-[#eee]'>
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
    )
}

export default StudentExamHistory