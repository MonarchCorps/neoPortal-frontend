/* eslint-disable react/prop-types */
import ShareButton from "@/components/ShareButton"
import { Button } from "@/components/ui/button"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import toast from "react-hot-toast"
import { FaPlus } from "react-icons/fa"
import { v4 as uuidv4 } from 'uuid'

function GenerateUniqueId({ formData, setFormData, dialogCloseRef }) {

    const [isGenerating, setIsGenerating] = useState(false)
    const [regenerate, setRegenerate] = useState(false)

    const generateLiveId = () => {
        setIsGenerating(true)
        setTimeout(() => {
            const val = uuidv4()
            setFormData(prev => ({
                ...prev,
                liveId: val
            }))
            setIsGenerating(false)
            dialogCloseRef.current?.click();
            toast.success('Generated')
        }, 1000)
    }

    const regenerateLiveId = () => {
        setRegenerate(true)
        setTimeout(() => {
            const val = uuidv4()
            setFormData(prev => ({
                ...prev,
                liveId: val
            }))
            setRegenerate(false)
            dialogCloseRef.current?.click();
            toast.success('Regenerated')
        }, 1000)
    }
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex justify-end'>
                    <Button className='font-sans mb-6'>
                        <span><FaPlus /></span>
                        <span>Generate Unique Exam Id</span>
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent>
                <DialogClose ref={dialogCloseRef} />
                <DialogHeader>
                    <DialogTitle>
                        <p>
                            Generate ID
                        </p>
                    </DialogTitle>
                </DialogHeader>
                <DialogDescription className='text-red-600'>
                    <div className='flex items-center justify-center'>
                        <button
                            type='button'
                            className={`bg-[#100e0e] text-[#fff] px-3 py-2 flex items-center gap-3 rounded-xl font-mon font-500 text-sm mx-2 ${isGenerating ? 'bg-opacity-75 cursor-default' : ''}`}
                            onClick={() => generateLiveId()}
                        >
                            {isGenerating && (
                                <div role="status">
                                    <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                    </svg>
                                    <span className="sr-only">Loading...</span>
                                </div>
                            )}
                            {isGenerating ? 'Generating...' : 'Generate'}
                        </button>
                    </div>
                </DialogDescription>
                <div className="flex items-center space-x-2">
                    <div className="grid flex-1 gap-2">
                        <p className='text-center font-poppins text-base/relaxed'>Share this ID with your
                            <span className='text-red-600 font-poppins font-700'> students</span> so that they can take the exam live and you will be able to monitor them from your dashboard
                        </p>
                        <div className='flex items-center justify-center'>
                            <button
                                type='button'
                                className={`w-fit bg-[#080808] text-[#fff] font-poppins font-500 py-2 px-3 shadow flex items-center gap-3 border border-solid border-gray-950 rounded-md ${regenerate || !formData.liveId ? 'bg-opacity-75 cursor-default' : ''}`}
                                disabled={!formData.liveId}
                                onClick={() => regenerateLiveId()}
                            >
                                {regenerate && (
                                    <div role="status">
                                        <svg aria-hidden="true" className="w-6 h-6 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span className="sr-only">Loading...</span>
                                    </div>
                                )}
                                {regenerate ? 'Regenerating...' : 'Regenerate'}
                            </button>
                        </div>
                        <ShareButton url={window.location} />
                    </div>
                </div>

            </DialogContent>
        </Dialog>
    )
}

export default GenerateUniqueId