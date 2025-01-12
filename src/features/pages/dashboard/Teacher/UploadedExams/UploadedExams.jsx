import { useEffect, useState } from "react"
import Loading2 from "@/components/Loaders/Loading2"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { Search } from "lucide-react"
import TableHead from "./TableHead"
import TableBody from "./TableBody"
import useComponentVisible from "@/hooks/useComponentVisible"
import Filter from "@/components/Filter"
import Loading from "@/components/Loaders/Loading"
import toast from "react-hot-toast"
import ReactPaginate from "react-paginate"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"

function UploadedExams() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible()

    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ['uploaded_exams', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/uploaded/exams/${auth?._id}`).then((res) => {
                return res?.data
            }),
        enabled: !!auth?._id
    })

    const handleUpdateExam = useMutation({
        mutationFn: ({ examID, state }) => {
            return axiosPrivate.patch(`/edit-exam/${auth?._id}`, {
                examID,
                state
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
        },
        onSuccess: () => {
            toast.success('Update successful')
            queryClient.invalidateQueries({ queryKey: ['uploaded_exams', auth?._id] })
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to update';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const handleDeleteExam = useMutation({
        mutationFn: ({ examID }) => {
            return axiosPrivate.delete(`/delete-exam/${examID}`)
        },
        onSuccess: () => {
            toast.success('Deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['uploaded_exams', auth?._id] })
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to delete';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const handleSelect = (date) => {
        setStartDate(date.selection.startDate);
        setEndDate(date.selection.endDate);
    }

    const selectionRange = {
        startDate,
        endDate,
        key: 'selection',
    }

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
        <>
            <Loading text={` ${handleUpdateExam.isPending ? 'Updating exam' : handleDeleteExam.isPending && 'Deleting exam'}`} isLoading={handleUpdateExam.isPending || handleDeleteExam.isPending} />
            <section>
                <div className='mt-10 pt-10 px-5 pb-5 w-[85%] max-w-[1000px] mx-auto shadow overflow-x-scroll'>
                    <h1 className="font-poppins font-600 text-red-950 text-3xl cfsm:text-xl mb-1">Exam Management</h1>
                    <p className="text-sm font-poppins cfsm:text-xs">Here, you can see a list of all uploaded exams you have made!</p>
                    <div className="flex justify-between items-center flex-wrap mt-7 gap-3">
                        <h1 className="text-xl font-600 mr-5">
                            Uploaded Exams {data?.length}
                        </h1>
                        <div className="flex items-center gap-3">
                            <div className="flex border border-solid rounded-md shadow-sm overflow-hidden px-2 py-2 col-span-2 w-96">
                                <Search className="rotate-90 text-slate-500" />
                                <input
                                    type="text"
                                    name="search"
                                    id="search"
                                    className="outline-none ml-3 w-full"
                                    placeholder="Search..."
                                />
                            </div>
                            <div className="relative">
                                <button
                                    type="button"
                                    id="openButton"
                                    className="bg-[#1b1a1a] text-[#fff] font-poppins font-600 w-32 py-3 rounded-lg text-base shadow border border-solid border-current transition-all duration-300 hover:border-[#1b1a1a] hover:bg-gray-50 hover:text-[#1b1a1a]"
                                    onClick={() => {
                                        setIsComponentVisible(!isComponentVisible)
                                    }}
                                >
                                    Filter
                                </button>
                                <Filter isOpen={isComponentVisible} ref={ref} selectionRange={selectionRange} handleSelect={handleSelect} />
                            </div>
                        </div>
                    </div>
                    <Loading2 text='Loading' data='document' isLoading={isLoading} className='mt-8 bg-red-950 text-slate-50 font-mon font-600 text-base px-3 py-2 rounded-sm' />
                    {!isLoading && data?.length > 0 ? (
                        <div className="mt-10 mb-20 xl:w-screen min-w-[60rem]">
                            <TableHead />
                            <TableBody details={filteredData} handleUpdateExam={handleUpdateExam} handleDeleteExam={handleDeleteExam} page={{ page: page, n: n }} />
                        </div>
                    ) : !isLoading && (
                        <p className="mt-12 mb-5 w-full text-center">No uploaded exams check back later or reload page</p>
                    )}
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
                </div>
            </section>
        </>
    )
}

export default UploadedExams