import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import Footer from "./partials/Footer/Footer"
import Header from "./partials/Header/Header"
import useAuth from "@/hooks/useAuth"
import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import ReactPaginate from "react-paginate"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import DOMPurify from 'dompurify'
import { Link } from "react-router-dom"
import useScrollTop from "@/hooks/useScrollTop"

function SavedQuestions() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const { scrollTop } = useScrollTop()

    const { data: savedQuestions, isLoading } = useQuery({
        queryKey: ['savedQuestions', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/get-saved-question/${auth?._id}`).then(res => {
                return Array.isArray(res?.data) ? res?.data : []
            }),
        enabled: !!auth?._id
    })

    const [page, setPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const n = 5

    useEffect(() => {
        if (savedQuestions) {
            setFilteredData(
                savedQuestions?.length > 0 && savedQuestions.filter((_, index) => {
                    return (index >= page * n) & (index < (page + 1) * n)
                })
            ) || []
        }
    }, [savedQuestions, page])
    console.log(savedQuestions)
    return (
        <div className="flex flex-col">
            <Header />
            <main className="flex-1 min-h-[55vh]">
                <section>
                    <div className='pt-40 tmd:pt-48 w-[85%] max-w-[1204px] mx-auto'>
                        {!isLoading && savedQuestions?.length > 0 && <h1 className="text-2xl mb-10 text-red-600 font-poppins">Here are a list of your saved questions</h1>}
                        {!isLoading && savedQuestions?.length > 0 ? (
                            <div>
                                {
                                    filteredData?.map((question, i) => {
                                        return (
                                            <div className="flex gap-5" key={i}>
                                                <p className="text-[#fff] bg-red-700 size-fit px-4 py-2 rounded-full font-karla font-700 text-base grid place-content-center">
                                                    {page * n + i + 1}
                                                </p>
                                                <div>
                                                    <p
                                                        className="text-base/relaxed font-roboto mb-4 hxsm:text-sm/relaxed"
                                                        dangerouslySetInnerHTML={{
                                                            __html: DOMPurify.sanitize(question?.question),
                                                        }}
                                                    ></p>
                                                    <ul>
                                                        {question?.qOpt.map((option) => {
                                                            return (
                                                                <li className="flex gap-2 hxsm:text-xs" key={option?.id}>
                                                                    <span className="font-700 font-roboto">
                                                                        {option?.id}
                                                                    </span>
                                                                    <span
                                                                        dangerouslySetInnerHTML={{
                                                                            __html: DOMPurify.sanitize(option?.text),
                                                                        }}
                                                                    ></span>
                                                                </li>
                                                            );
                                                        })}
                                                    </ul>
                                                    <div className="my-6 flex items-center ixsm:flex-col ixsm:gap-2">
                                                        <Link
                                                            onClick={scrollTop}
                                                            to={`/classroom/mathematics/${question?._id}`}
                                                            className="border-2 border-solid border-red-600 text-red-600 shadow-sm p-3 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-[#eee] text-center w-40"
                                                        >
                                                            View Question
                                                        </Link>
                                                        {savedQuestions?.find(sq => sq?._id === question?._id) ? (
                                                            <button
                                                                className={`ml-2 ixsm:ml-0 border-2 border-solid border-red-600 text-red-600 shadow-sm p-2 py-3 rounded-md transition-all duration-300 w-40 grid place-content-center  hover:bg-red-600 hover:text-[#eee]`}
                                                            >
                                                                Unsave
                                                            </button>
                                                        ) : (
                                                            <button
                                                                className={`ml-2 ixsm:ml-0 border-2 border-solid border-red-600 text-red-600 shadow-sm p-2 py-3 rounded-md transition-all duration-300 w-40 grid place-content-center hover:bg-red-600 hover:text-[#eee]`}
                                                            >
                                                                Save for later
                                                            </button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        ) : (
                            <p className="w-full text-center font-500 font-poppins mt-10">No saved questions. Check back later or reload the page</p>
                        )}
                        {!isLoading && savedQuestions?.length > 0 && (
                            <ReactPaginate
                                previousLabel={<FaArrowLeft />}
                                nextLabel={<FaArrowRight />}
                                pageCount={Math.ceil(savedQuestions.length / n)}
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
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default SavedQuestions
