import Loading2 from "@/components/Loaders/Loading2"
import { Button } from "@/components/ui/button"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import trim from "@/utils/trim"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import toast from "react-hot-toast"
import { formatDate } from "./utils"

function MonitorStudents() {

    const axiosPrivate = useAxiosPrivate()
    const [liveId, setLiveId] = useState('')
    const [participants, setParticipants] = useState([])

    const handleFetchParticipants = useMutation({
        mutationFn: () => {
            if (!liveId) return toast.error('Exam ID is required')
            else return axiosPrivate.get(`/fetch-participants/${liveId}`)
        },
        onSuccess: ({ data }) => {
            console.log(data)
            setParticipants(data)
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to fetch participants';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    return (
        <main>
            <section className="w-full">
                {/* className='pt-20 max-w-[1000px] hrmd:w-[95%] hrmd:max-w-[1204px] ermd:w-screen ermd:mx-10 tmd:min-w-[50rem] mx-auto' */}
                <div className="max-w-[1000px] mx-auto pt-20 px-5">
                    <h1 className="text-3xl font-600 mb-2">Enter Exam ID</h1>
                    <p className="font-poppins text-base/relaxed">Enter an exam ID to see which students took your exam and their score</p>
                    <div className="grid grid-cols-[1fr,auto] gap-2 mt-3 w-full">
                        <input
                            type="search"
                            name="search"
                            id="search"
                            placeholder="Search through exam..."
                            className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm max-w-full'
                            onChange={(e) => setLiveId(e.target.value)}
                            value={liveId}
                        />
                        <Button onClick={() => handleFetchParticipants.mutate()}>
                            Search
                        </Button>
                    </div>
                    <Loading2 text='Loading' data='document' isLoading={handleFetchParticipants.isPending} className='mt-8 bg-red-950 text-slate-50 font-mon font-600 text-base px-3 py-2 rounded-sm' />
                    {!handleFetchParticipants.isPending && participants?.length > 0 ? (
                        <div className="w-full overflow-scroll px-5">
                            <div className="eumd:min-w-[50rem] mx-auto">
                                <div className="grid grid-cols-4 bg-[#f2f2f281] px-6 py-[0.9rem] rounded-xl my-5">
                                    <div className='grid grid-cols-[40px,1fr] gap-4'>
                                        <p className='font-500 font-poppins text-base'>S/N</p>
                                        <p className='font-500 font-poppins text-base'>Name</p>
                                    </div>
                                    <p className='font-500 font-poppins text-base text-center'>Email</p>
                                    <p className='font-500 font-poppins text-base text-center'>Login Time</p>
                                    <p className='font-500 font-poppins text-base text-center'>Score</p>
                                </div>
                                {participants?.length > 0 && participants?.map((par, i) => {
                                    return (
                                        <div key={i} className="grid grid-cols-4 px-6 py-[0.9rem] my-5 border border-solid rounded-md">
                                            <div className='grid grid-cols-[40px,1fr] gap-4'>
                                                <p className='font-500 font-poppins text-base'>1.</p>
                                                <p className='font-500 font-poppins text-base'>{par?.name}</p>
                                            </div>
                                            <p className='font-500 font-poppins text-base text-center'>{trim(par?.email, 15)}</p>
                                            <p className='font-500 font-poppins text-base text-center'>{par?.takenAt ? formatDate(par?.takenAt) : 'N/A'}</p>
                                            <p className='font-500 font-poppins text-base text-center'>{par?.score}</p>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className="mt-12 mb-5 w-full text-center">No participants found check back later or retry</p>
                    )}
                </div>
            </section>
        </main>
    )
}

export default MonitorStudents