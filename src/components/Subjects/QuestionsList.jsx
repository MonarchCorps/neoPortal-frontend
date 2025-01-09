/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react'
import ReactPaginate from 'react-paginate'
import { Link, useParams, useLocation } from 'react-router-dom'
import useScrollTop from "@/hooks/useScrollTop"
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import DOMPurify from 'dompurify'

function QuestionsList({ filteredData }) {
    const { subject } = useParams();
    const { scrollTop } = useScrollTop();
    const location = useLocation();
    const [currentPage, setCurrentPage] = useState(0);
    const [questionsPerPage] = useState(5);

    const currentSubjectQuestions = filteredData?.filter(que => que.subject === subject);

    const indexOfLastQuestion = (currentPage + 1) * questionsPerPage;
    const indexOfFirstQuestion = indexOfLastQuestion - questionsPerPage;
    const currentQuestions = currentSubjectQuestions?.slice(indexOfFirstQuestion, indexOfLastQuestion);

    const handlePageChange = (selectedPage) => {
        setCurrentPage(selectedPage.selected);
    };

    useEffect(() => {
        const pageIndex = new URLSearchParams(location.search).get('pageIndex');
        if (pageIndex) {
            setCurrentPage(Number(pageIndex) - 1);
        }
    }, [location.search]);

    useEffect(() => {

        const searchParams = new URLSearchParams(location.search);
        searchParams.set('pageIndex', currentPage + 1);
        window.history.replaceState(null, '', '?' + searchParams.toString());

    }, [currentPage, location.search]);

    return (
        <div className="mt-10 flex flex-col gap-4">
            {currentQuestions?.length > 0 ? (
                currentQuestions?.map((question, i) => {
                    const questionNumber = indexOfFirstQuestion + i + 1;
                    return (
                        <div className="flex gap-5" key={i}>
                            <p className="text-[#fff] bg-red-700 size-fit px-4 py-2 rounded-full font-karla font-700 text-base grid place-content-center">{questionNumber}</p>
                            <div>
                                <p
                                    className="text-base/relaxed font-roboto mb-4 hxsm:text-sm/relaxed"
                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(question?.question) }}
                                ></p>
                                <ul>
                                    {question?.qOpt.map(option => {
                                        return (
                                            <li className="flex gap-2 hxsm:text-xs" key={option?.id}>
                                                <span className="font-700 font-roboto">{option?.id}</span>
                                                <span
                                                    dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(option?.text) }}
                                                ></span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                <div className='my-6 ixsm:flex ixsm:flex-col ixsm:gap-2'>
                                    <Link onClick={scrollTop} to={`${question?._id}`} className='border-2 border-solid border-red-600 text-red-600 shadow-sm p-3 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-[#eee] text-center w-40'>
                                        View answer
                                    </Link>
                                    <button className='ml-2 ixsm:ml-0 border-2 border-solid border-red-600 text-red-600 shadow-sm p-2 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-[#eee] w-40'>
                                        Save for later
                                    </button>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <p className="w-full text-center my-5">No questions available at the moment check back later or reload page</p>
            )}

            {currentQuestions?.length > 0 && (
                <ReactPaginate
                    previousLabel={<FaArrowLeft />}
                    nextLabel={<FaArrowRight />}
                    pageCount={Math.ceil(currentSubjectQuestions?.length / questionsPerPage)}
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
