/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";
import { Link, useParams, useLocation, useNavigate } from "react-router-dom";
import useScrollTop from "@/hooks/useScrollTop";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import DOMPurify from "dompurify";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosPrivate from "@/hooks/useAxiosPrivate";
import useAuth from "@/hooks/useAuth";
import toast from "react-hot-toast";

function QuestionsList({ filteredData }) {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const navigate = useNavigate()
    const location = useLocation()

    const { subject } = useParams();
    const { scrollTop } = useScrollTop();
    const [currentPage, setCurrentPage] = useState(0);
    const [questionsPerPage] = useState(5);

    const queryClient = useQueryClient()

    const currentSubjectQuestions = filteredData?.filter(
        (que) => que.subject === subject
    );

    const indexOfLastQuestion = (currentPage + 1) * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = currentSubjectQuestions?.slice(
        indexOfFirstQuestion,
        indexOfLastQuestion
    );

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    useEffect(() => {
        const pageIndex = new URLSearchParams(location.search).get("pageIndex");
        if (pageIndex) {
            setCurrentPage(Number(pageIndex) - 1);
        }
    }, [location.search]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        searchParams.set("pageIndex", currentPage + 1);
        window.history.replaceState(null, "", "?" + searchParams.toString());
    }, [currentPage, location.search]);

    const handleSave = useMutation({
        mutationFn: ({ questionId }) => {
            return axiosPrivate.post('/save-question', {
                questionId,
                userId: auth?._id
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
        },
        onSuccess: () => {
            toast.success('Saved')
            queryClient.invalidateQueries({ queryKey: ['savedQuestions', auth?._id] })
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to save';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    });

    const handleUnSave = useMutation({
        mutationFn: ({ qId }) => {
            return axiosPrivate.post('/unsave-question', {
                qId,
                userId: auth?._id
            })
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['savedQuestions', auth?._id] })
            toast.success('Unsaved')
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to unsave';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const { data: savedQuestions } = useQuery({
        queryKey: ['savedQuestions', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/get-saved-question/${auth?._id}`).then(res => {
                return Array.isArray(res?.data) ? res?.data : []
            }),
        enabled: !!auth?._id
    })

    return (
        <div className="mt-10 flex flex-col gap-4">
            {currentQuestions?.length > 0 ? (
                currentQuestions?.map((question, i) => {
                    const questionNumber = indexOfFirstQuestion + i + 1;
                    return (
                        <div className="flex gap-5" key={i}>
                            <p className="text-[#fff] bg-red-700 size-fit px-4 py-2 rounded-full font-karla font-700 text-base grid place-content-center">
                                {questionNumber}
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
                                        to={`${question?._id}`}
                                        className="border-2 border-solid border-red-600 text-red-600 shadow-sm p-3 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-[#eee] text-center w-40"
                                    >
                                        View answer
                                    </Link>
                                    {savedQuestions?.find(sq => sq?._id === question?._id) ? (
                                        <button
                                            className={`ml-2 ixsm:ml-0 border-2 border-solid border-red-600 text-red-600 shadow-sm p-2 py-3 rounded-md transition-all duration-300 w-40 grid place-content-center ${handleUnSave.isPending || handleSave.isPending ? 'bg-opacity-80 border-gray-400' : ' hover:bg-red-600 hover:text-[#eee]'}`}
                                            onClick={() => handleUnSave.mutate({ qId: question?._id })}
                                            disabled={handleUnSave.isPending || handleSave.isPending}
                                        >
                                            {handleUnSave.isPending || handleSave.isPending ? (
                                                <div role="status">
                                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            ) : (
                                                'Unsave'
                                            )}
                                        </button>
                                    ) : (
                                        <button
                                            className={`ml-2 ixsm:ml-0 border-2 border-solid border-red-600 text-red-600 shadow-sm p-2 py-3 rounded-md transition-all duration-300 w-40 grid place-content-center ${handleUnSave.isPending || handleSave.isPending ? 'bg-opacity-80 border-gray-400' : ' hover:bg-red-600 hover:text-[#eee]'}`}
                                            onClick={() => {
                                                if (!auth?._id) {
                                                    navigate('/auth', { state: { from: location } });
                                                } else {
                                                    handleSave.mutate({ questionId: question?._id })
                                                }
                                            }}
                                            disabled={handleUnSave.isPending || handleSave.isPending}
                                        >
                                            {handleUnSave.isPending || handleSave.isPending ? (
                                                <div role="status">
                                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span className="sr-only">Loading...</span>
                                                </div>
                                            ) : (
                                                'Save for later'
                                            )}
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="w-full text-center my-5">
                    No questions available at the moment check back later or reload page
                </p>
            )}

            {currentQuestions?.length > 0 && (
                <ReactPaginate
                    previousLabel={<FaArrowLeft />}
                    nextLabel={<FaArrowRight />}
                    pageCount={Math.ceil(
                        currentSubjectQuestions?.length / questionsPerPage
                    )}
                    onPageChange={handlePageChange}
                    containerClassName={"pagination"}
                    activeClassName={"active"}
                    pageClassName={"page"}
                    pageLinkClassName={"page-link"}
                    previousClassName={"previous"}
                    nextClassName={"next"}
                    breakClassName={"break"}
                />
            )}
        </div>
    );
}

export default QuestionsList;
