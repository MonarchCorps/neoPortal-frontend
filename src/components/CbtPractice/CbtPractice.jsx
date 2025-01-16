import Footer from '../partials/Footer/Footer'
import Header from '../partials/Header/Header'
import { Link, Outlet, useLocation } from 'react-router-dom'
import { FaChevronRight } from 'react-icons/fa'
import useScrollTop from '@/hooks/useScrollTop'
import ShareButton from '../ShareButton'

function CbtPractice() {

    const { scrollTop } = useScrollTop()
    const location = useLocation()

    const path = location.pathname.split('/')
    const rPath = path[path.length - 1]

    return (
        <>
            <Header />
            <main>
                <section>
                    <div className='pt-40 tmd:pt-48 w-[85%] max-w-[1204px] mx-auto'>
                        <h1 className='flex items-center'>
                            <Link onClick={scrollTop} to='/' className='text-[#1F509A]'>Home</Link>
                            <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                            {rPath === 'exam-config' ? (
                                <Link onClick={scrollTop} to='/cbt-practice' className='text-[#1F509A]'>Cbt-Practice</Link>
                            ) : (
                                <p className='font-300 text-[0.95rem] opacity-65'>cbt-practice</p>
                            )}
                            {rPath === 'exam-config' && (
                                <>
                                    <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                                    <p className='font-300 text-[0.95rem] opacity-65'>exam-config</p>
                                </>
                            )}
                        </h1>
                        <div className='border border-solid shadow-sm px-5 py-4 mt-5'>
                            <h1 className='font-roboto font-500 text-3xl text-[#1F509A] opacity-95 md:text-2xl asm:text-base'>
                                {rPath !== 'exam-config' ? (
                                    'Practice Exam For JAMB, WAEC, NECO and Post UTME'
                                ) : (
                                    'Exam configuration for selected subjects'
                                )}
                            </h1>
                        </div>
                        <div className='grid grid-cols-3 ilg:grid-cols-1 mt-4 gap-5'>
                            <div className='col-span-2 h-fit'>
                                <div className='shadow p-4'>
                                    <div className="mx-5 my-2 border-l-4 border-solid border-[#1F509A] p-3 shadow font-mon font-500 text-sm fxsm:mx-0 asm:text-sm">
                                        Quick Tip: <span>Select your exam type and subjects, then click <strong>&quot;Configure Exam&quot;</strong> to begin.</span>
                                    </div>
                                    <h1 className='pb-3 mt-4 mb-3 font-sans text-[1.15rem] text-slate-950 opacity-80 font-500 border-b border-solid border-b-gray-200 md:text-base chsm:text-sm/relaxed asm:text-xs/relaxed'>
                                        Prepare for success with JAMB, Post UTME, WAEC, and NECO past questions—all designed to help you ace your exams and secure admission into your dream university.
                                    </h1>
                                    {/* <div className='mt-6 mb-3'>
                                        <Link to='/cbt-practice/' onClick={scrollTop} className='border-2 border-solid border-[#1F509A] bg-[#1F509A] text-[#fff] shadow-sm p-2 transition-all duration-300 hover:text-[#1F509A] hover:bg-[#eee] hover:rounded-md fxsm:text-sm'>
                                            Start a Custom Exam
                                        </Link>
                                    </div> */}

                                    <Outlet />

                                </div>

                                <div className="flex items-center mt-6 mb-3 gap-3 hxsm:flex-col">
                                    <p className="font-800">Share:</p>
                                    <ShareButton url={window.location} />
                                </div>
                            </div>
                            <div></div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default CbtPractice