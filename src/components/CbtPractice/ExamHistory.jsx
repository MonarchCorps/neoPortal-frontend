/* eslint-disable react/prop-types */
import { subjectAbbv } from "@/utils/subjects"
import { format } from 'date-fns'
import { Link } from "react-router-dom"
import Loading2 from "../Loaders/Loading2"
import useScrollTop from "@/hooks/useScrollTop"

function ExamHistory({ data, isLoading, page }) {

    const { scrollTop } = useScrollTop()

    return (
        !isLoading && data?.length > 0 ? (
            <div className="w-full">
                {data?.length > 0 && data?.map((content, i) => {
                    const modifySubs = Object.keys(content?.subjectBreakdown || {})?.map(sub => {
                        const currSub = subjectAbbv.find(subAbbv => subAbbv.text === sub)
                        return currSub.abbv?.toUpperCase()
                    })

                    return (
                        <div key={content?._id} className='border border-solid border-gray-100 px-2 grid grid-cols-7 md:grid-cols-5 aism:grid-cols-2 md:px-0 xsm:grid-cols-1 items-center'>
                            <div className='border-r border-solid border-gray-200 py-3 col-span-3 md:border-b md:px-2'>
                                <div className="flex gap-3">
                                    <strong className="hidden md:block text-red-600">{page?.page * page?.n + i + 1}.</strong>
                                    <h1 className='font-poppins gap-2'>{modifySubs?.map((sub, i) => {
                                        if (i !== modifySubs?.length - 1) {
                                            return <span key={sub} className="font-500 font-karla">{sub}, </span>
                                        } else {
                                            return <span key={sub} className="font-500 font-karla">{sub} </span>
                                        }
                                    })}</h1>
                                </div>
                                <p className='font-sans text-xs opacity-75 mt-1'>Custom mode</p>
                                <p className='font-sans text-xs opacity-75 mt-1'>{content?.createdAt && content?.createdAt !== undefined ? format(content?.createdAt, "MMMM dd, yyyy") : ''}</p>
                            </div>
                            <div className='pl-3 pr-20 xsm:pr-3 py-3 h-full flex flex-col justify-center border-r border-solid border-gray-200 md:border-b xsm:col-span-full'>
                                <h1 className='font-poppins text-base xsm:text-center'>
                                    <span>Percent: </span>
                                    {
                                        content?.totalPercentage === '0.00'
                                            ||
                                            content?.totalPercentage === 'N/A'
                                            ? '0%'
                                            : !content?.totalPercentage
                                                ? 'N/A'
                                                : `${content?.totalPercentage}%`
                                    }
                                </h1>
                            </div>

                            <p className='h-full font-sans text-sm mt-1 border-r border-solid border-gray-200 px-2 grid place-content-center md:border-b md:mt-0 xsm:col-span-full xsm:py-3'>
                                <span><span className="font-500">Correct:</span> {content?.totalCorrect || 'N/A'}</span>
                            </p>

                            <p className='h-full font-sans font-500 text-sm mt-1 border-r border-solid border-gray-200 px-2 grid place-content-center md:mt-0 md:col-span-2 aism:col-span-2 xsm:col-span-full xsm:py-3'>
                                <span><span className="font-500">Questions:</span> {content?.totalQuestions}</span>
                            </p>

                            <div className='pl-4 pr-3 h-full grid place-content-center md:border-r md:py-2 md:col-span-3 aism:col-span-1 aism:border-t xsm:col-span-full'>
                                <Link
                                    onClick={scrollTop}
                                    to={`${`/cbt-practice/exam-summary/${content?._id}`}`}
                                    className='border-2 border-solid border-red-600 text-red-600 shadow-sm px-3 py-2 rounded-md transition-all duration-300 hover:bg-red-600 hover:text-[#eee]'>
                                    Review
                                </Link>
                            </div>
                        </div>
                    )
                })}
            </div>
        ) : isLoading ? (
            <div className="bg-red-700 text-[#fff] font-mon font-500 py-3 px-3 rounded-sm w-[85%] max-w-[1204px] mx-auto">
                <Loading2 text='Loading history' data='' isLoading={isLoading} />
            </div>
        ) : !isLoading && data?.length === 0 || data?.length === undefined && (
            <p className="w-full text-center my-3 axsm:text-sm/relaxed">No history available at the moment. Check back later or reload the page!</p>
        )
    )
}

export default ExamHistory