import ShareButton from '../ShareButton'

function ClassroomDescription() {
    return (
        <div className='border border-solid shadow-sm px-5 py-4 mt-5'>
            <h1 className='font-roboto font-500 text-2xl text-slate-800 opacity-95'>
                JAMB Past Questions, WAEC, NECO and Post UTME Past Questions
            </h1>
            <div className='mt-4 font-roboto font-400 text-slate-800'>
                <p className='mb-[3px] leading-[1.67]'>
                    Prepare for success in your upcoming exams with free access to JAMB, WAEC, NECO, and Post-UTME past questions and answers. Whether you&apos;re gearing up for JAMB, WAEC (SSCE or GCE), NECO, or Post-UTME, our resourceful platform provides you with past questions across various subjects to help you study effectively.
                </p>
                <p className='leading-[1.62]'>
                    Past questions are essential tools for understanding how examination bodies structure their tests. They give insight into key subject areas, question patterns, and themes, helping you identify your strengths and areas for improvement.
                </p>
                <p className='mt-2'> By practicing with past questions, you can:</p>
                <ul className='list-disc mt-3 ml-8 space-y-1'>
                    <li>
                        Gain confidence in tackling examination questions.
                    </li>
                    <li>
                        Familiarize yourself with the format of your exam.
                    </li>
                    <li>
                        Identify recurring topics and trends in the questions.
                    </li>
                </ul>
                <p className='mt-2'>
                    Access subject-specific questions to revise and ensure you’re adequately prepared to achieve a high score in your exams. Ready to begin? Select a subject below to start your journey toward success!
                </p>
            </div>
            <div className='mt-4 font-roboto font-400 text-slate-800'>
                <h3 className='mb-2 font-mon font-600 text-xl'>
                    Study Smarter with Yearly and Subject-Specific Past Questions
                </h3>
                <p className='mb-[3px] leading-[1.67]'>
                    Get a head start on your preparation by exploring past questions organized by subject and year—absolutely free! These past questions are designed to help you excel in exams like JAMB, WAEC, NECO, Post-UTME, NABTEB, and even your first-year university tests.
                </p>
                <p className='leading-[1.62]'>
                    Why Study with Us?
                </p>
                <ul className='list-disc mt-3 ml-8 space-y-1'>
                    <li>
                        Subject and Year Flexibility: Choose to study by subject or delve into questions year by year.
                    </li>
                    <li>
                        Guaranteed Exam Relevance: Many of the questions available here have a high chance of appearing in your exams.
                    </li>
                    <li>
                        Interactive Community Support: Got a challenging question? Post it and receive answers within minutes from Myschool staff or our vibrant student community.
                    </li>
                </ul>
                <p className='mt-2'>
                    For a real-life examination experience, try our CBT (Computer-Based Test) environment. Simulate your exam with an interface that mirrors the real test, complete with accurate answers and solutions.
                </p>
                <p className='mt-2'>
                    For an even better experience, consider offline access with our mobile-friendly solution—study anywhere, anytime, with complete access in your pocket. Start now, choose a subject, and make your preparation truly effective!
                </p>
            </div>
            <div className='mt-5 font-karla font-500'>
                <p>Share this free resource on Facebook, Twitter, or WhatsApp. Help others access past questions and answers to prepare for JAMB, WAEC, NECO, and Post-UTME exams.</p>
                <div className='flex items-center utsm:flex-col mt-3 gap-3'>
                    <p className='font-800'>Share:</p>
                    <ShareButton url={window.location} />
                </div>
            </div>
        </div>
    )
}

export default ClassroomDescription