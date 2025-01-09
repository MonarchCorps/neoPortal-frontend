/* eslint-disable react/prop-types */
import { X } from 'lucide-react'
import { motion } from 'motion/react'
import DOMPurify from 'dompurify'
import useScrollTop from '@/hooks/useScrollTop'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

function Preview({ isModalOpen, closeModal, currentQuestionIndex, currQue, preview, setPreview, setCurrentQuestionIndex }) {

    const handleNext = () => {
        const questionsLength = preview?.length || 0;
        setCurrentQuestionIndex((prev) => Math.min(prev + 1, questionsLength - 1));
    };

    const handlePrevious = () => {
        setCurrentQuestionIndex((prev) => Math.max(prev - 1, 0));
    };

    const handleSetPreviewAnswer = (qId, ans) => {
        setPreview((prevQuestions) => {
            const updatedQuestions = [...prevQuestions];
            const questionToUpdate = updatedQuestions[qId];
            if (questionToUpdate) {
                questionToUpdate.answer.text = ans;
            }
            return updatedQuestions;
        });
    }

    const { scrollTop } = useScrollTop()

    return (
        isModalOpen && (
            <div className='z-[2000] relative'>
                <div
                    className="overlay"
                    onClick={closeModal}
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        width: "100%",
                        height: "100%",
                        backgroundColor: "rgba(0, 0, 0, 0.5)",
                        zIndex: 10,
                    }}
                ></div>

                <motion.div
                    className="modal"
                    initial={{ y: "100%" }}
                    animate={{ y: "5%" }}
                    exit={{ y: "100%" }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    style={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        width: "100%",
                        height: "95%",
                        backgroundColor: "#fff",
                        zIndex: 20,
                        borderRadius: "20px 20px 0 0",
                        boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.3)",
                        overflowY: "auto",
                        padding: "20px",
                    }}
                >
                    <h2 className='font-500 text-3xl mb-2'>Preview Exam</h2>
                    <button
                        onClick={closeModal}
                        className='fixed z-50 right-5 top-5 transition-all duration-200 hover:rotate-180'
                    >
                        <X />
                    </button>
                    <div className='w-1/2 min-w-[40rem] max-w-[40rem]'>
                        <p className="font-poppins">
                            Question
                            <span className="font-600">&nbsp;{currentQuestionIndex + 1}&nbsp;</span>
                            of&nbsp;
                            <span className="font-600">{preview?.length || 0}</span>
                        </p>
                        <h1 className="font-poppins text-wrap text-base mt-3 ml-6 flex items-start">
                            <span className="mr-3 font-500 ">{currentQuestionIndex + 1}. </span>
                            <span
                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(currQue?.question) }}
                            >
                            </span>
                        </h1>
                        <div>
                            <ul className="bg-gray-100 max-w-[40rem] border border-solid border-[#edb1b1ba] p-4 flex flex-col gap-4 mt-2 ml-5 shadow">
                                {currQue?.qOpt?.map(opt => {
                                    return (
                                        <li key={opt?.key} className="flex items-start">
                                            <input
                                                type="radio"
                                                name={`answer-${currentQuestionIndex + 1}`}
                                                id={`answer-${currentQuestionIndex + 1}`}
                                                className="size-4 appearance-auto mr-3 mt-[0.4rem]"
                                                onClick={() => {
                                                    handleSetPreviewAnswer(currentQuestionIndex, opt.id)
                                                }}
                                                value={opt?.id}
                                                checked={currQue?.answer.text === opt?.id || ''}
                                            />
                                            <span className="mr-2 font-500">({opt?.id})</span>
                                            <p
                                                className="text-base font-500"
                                                dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(opt?.text) }}
                                            >
                                            </p>
                                        </li>
                                    )
                                })}
                            </ul>
                            <div className="w-full flex justify-between mt-8">
                                <div>
                                    {currentQuestionIndex !== 0 && (
                                        <button className={`flex items-center gap-2 bg-[#6d0000] text-slate-50 rounded-2xl py-4 px-5 transition-all duration-150 border-2 border-solid 'hover:bg-slate-300 hover:text-slate-900 hover:border-sky-400`}
                                            onClick={() => {
                                                scrollTop()
                                                handlePrevious()
                                            }}
                                            disabled={currentQuestionIndex === 0}>
                                            <FaArrowLeft />
                                            <span>Previous</span>
                                        </button>
                                    )}
                                </div>
                                <div>
                                    {currentQuestionIndex !== preview?.length - 1 && (
                                        <button
                                            className={`flex items-center gap-2 bg-[#6d0000] text-slate-50 rounded-2xl py-4 px-5 transition-all duration-150 border-2 border-solid $ 'hover:bg-slate-300 hover:text-slate-900 hover:border-sky-400`}
                                            onClick={() => {
                                                scrollTop()
                                                handleNext()
                                            }}
                                            disabled={currentQuestionIndex === preview?.length - 1}>
                                            <FaArrowRight />
                                            <span>Next</span>
                                        </button>
                                    )}
                                </div>
                            </div>
                            <ul className="flex flex-wrap gap-4 mt-8">
                                {preview?.map((pag, i) => {
                                    return (
                                        <li key={i}>
                                            <button
                                                onClick={() => {
                                                    scrollTop()
                                                    setCurrentQuestionIndex(i)
                                                }}
                                                className={
                                                    ` border border-solid  px-4 py-[0.6rem] rounded-xl transition-all duration-500 hover:scale-90 hover:border-[#b70c01] hover:shadow-[0px_2px_4px_0px_rgba(0_0_0_0.12)]
                                                 ${preview[i]?.answer.text !== ''
                                                        ? 'bg-red-600'
                                                        : currentQuestionIndex === i
                                                            ? 'bg-slate-200 text-red-600  border-red-600 hover:border-[#b70c01]'
                                                            : ' bg-slate-200 border-slate-600'}`}
                                            >
                                                {i + 1}
                                            </button>
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                    </div>
                </motion.div>
            </div>
        ))
}

export default Preview