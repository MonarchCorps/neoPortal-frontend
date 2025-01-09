const aiSecurityImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735378481/Exam_Portal/txqizolfxeafls8tlbfo.jpg'
const customizableImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735377601/Exam_Portal/urcbkdwspjapciumfbon.jpg'
const sisLmsImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735377666/Exam_Portal/yedhv5x0qg5cryh16bet.jpg'

function Solution() {
    return (
        <section>
            <div className="max-w-[88%] mx-auto mt-16 mb-5">
                <div className="text-center">
                    <h1 className="font-sans font-500 text-3xl mb-2 hrmd2:text-2xl usm:text-2xl">Your Ultimate Solution for Evaluating Exceptional Talent</h1>
                    <p className="max-w-[40rem] mx-auto text-base/relaxed font-karla hrmd2:text-sm/relaxed">Streamline recruitment with a powerful platform designed to assess and identify top talent efficiently and accurately.</p>
                </div>
                <div className="flex flex-col mt-7 gap-20 hrmd2:gap-14 hrmd2:max-w-[35rem] mx-auto">
                    <div className="grid grid-cols-2 hrmd2:flex hrmd2:flex-col items-center gap-10">
                        <img
                            src={aiSecurityImg}
                            className='max-h-[25rem] min-h-[25rem] xsm:max-h-[20rem] xsm:min-h-[20rem] w-full object-cover rounded-md'
                            alt="AI-Powered Exam Security Image"
                            loading="eager"
                        />
                        <div>
                            <h1 className='font-karla font-700 text-[2.7rem] leading-[1.2] mb-4 ixsm:text-3xl'>
                                AI-Powered Exam Security
                            </h1>
                            <p className='text-sm/relaxed font-mon ixsm:text-xs/relaxed'>
                                Leverage advanced AI technology to ensure secure, fair, and accurate exam monitoring. Our proctoring features detect suspicious behavior, preventing cheating and enhancing the integrity of online assessments
                            </p>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 hrmd2:flex hrmd2:flex-col-reverse items-center gap-10">
                        <div>
                            <h1 className='font-karla font-700 text-[2.7rem] leading-[1.2] mb-4 ixsm:text-3xl'>
                                Customizable Exam Solutions
                            </h1>
                            <p className='text-sm/relaxed font-mon ixsm:text-xs/relaxed'>
                                Offer schools and institutions tailored exam experiences with fully customizable templates. Adapt the exam process to unique needs, ensuring flexibility, scalability, and enhanced user experience for both administrators and students.
                            </p>
                        </div>
                        <img
                            src={customizableImg}
                            className='max-h-[25rem] min-h-[25rem] xsm:max-h-[20rem] xsm:min-h-[20rem] w-full object-cover rounded-md'
                            alt="Customizable Exam Solutions Image"
                            loading="eager"
                        />
                    </div>
                    <div className="grid grid-cols-2 hrmd2:flex hrmd2:flex-col items-center gap-10">
                        <img
                            src={sisLmsImg}
                            className='max-h-[25rem] min-h-[25rem] xsm:max-h-[20rem] xsm:min-h-[20rem] w-full object-cover rounded-md'
                            alt="Effortless System Integration Image"
                            loading="eager"
                        />
                        <div>
                            <h1 className='font-karla font-700 text-[2.7rem] leading-[1.2] mb-4 ixsm:text-3xl'>
                                Effortless System Integration
                            </h1>
                            <p className='text-sm/relaxed font-mon ixsm:text-xs/relaxed'>
                                Seamlessly integrate with Learning Management Systems (LMS) and Student Information Systems (SIS), streamlining data flow, enhancing user experience, and simplifying administration for a unified educational environment.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Solution