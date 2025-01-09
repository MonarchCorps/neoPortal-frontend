import { useQuery } from "@tanstack/react-query"
import Footer from "../partials/Footer/Footer"
import Header from "../partials/Header/Header"
import ExamSummary from "./ExamSummary"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"

const ExamSummaryWrapper = () => {

    const { summaryId } = useParams()
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const [flattenedSummary, setFlattenedSummary] = useState({})

    const { data, isLoading } = useQuery({
        queryKey: ['exam_summary', auth?._id, summaryId],
        queryFn: () =>
            axiosPrivate.get(`/exam-summary-single/${auth?._id}/${summaryId}`).then(res => {
                return res?.data
            })
    })

    useEffect(() => {
        if (data && data?.length !== 0) {
            setFlattenedSummary(data?.[0] || {})
        }
    }, [data])


    return (
        <div className="flex flex-col h-full">
            <Header />
            <main className="min-h-[50vh]">
                <section>
                    <div className='pt-40 w-[85%] max-w-[1204px] mx-auto'>
                        <ExamSummary isLoading={isLoading} flattenedSummary={flattenedSummary} />
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

export default ExamSummaryWrapper