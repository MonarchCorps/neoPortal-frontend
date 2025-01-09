const achievementsImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735378333/Exam_Portal/cqfytpi7m7wafndh5h1i.jpg'

function Achievements() {
    return (
        <section>
            <div className="max-w-[80%] mx-auto flex flex-col items-center mt-20">
                <div className='mb-8 w-fit text-center'>
                    <h1 className='font-roboto font-500 text-2xl tracking-wide'>Our Achievements</h1>
                    <div className='w-[16rem] bg-red-900 h-1 mt-3'></div>
                </div>
                <div className="grid grid-cols-2 aemd:grid-cols-1 mt-4 items-center justify-center">
                    <img
                        src={achievementsImg}
                        className='max-w-[85%] mx-auto aemd:max-h-96'
                        alt="image"
                        loading="eager"
                    />
                    <div className="grid grid-cols-2 text-center gap-10 csm:gap-6 aemd:mt-8">
                        <div>
                            <h1 className='text-[3.5rem] leading-[1.2] font-700 mb-1 text-red-900 csm:text-3xl'>34Mn+</h1>
                            <p className='text-xl font-500 csm:text-base'>Assessments</p>
                        </div>
                        <div>
                            <h1 className='text-[3.5rem] leading-[1.2] font-700 mb-1 text-red-900 csm:text-3xl'>350+</h1>
                            <p className='text-xl font-500 csm:text-base'>Clients</p>
                        </div>
                        <div>
                            <h1 className='text-[3.5rem] leading-[1.2] font-700 mb-1 text-red-900 csm:text-3xl'>46+</h1>
                            <p className='text-xl font-500 csm:text-base'>Countries</p>
                        </div>
                        <div>
                            <h1 className='text-[3.5rem] leading-[1.2] font-700 mb-1 text-red-900 csm:text-3xl'>12.5Mn+</h1>
                            <p className='text-xl font-500 csm:text-base'>Paper Saved</p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Achievements