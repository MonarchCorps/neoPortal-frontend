import ShareButton from '@/components/ShareButton'
import useScrollTop from '@/hooks/useScrollTop'
import { Link } from 'react-router-dom'

function Footer() {

    const { scrollTop } = useScrollTop()

    return (
        <footer className='bg-[#344CB7] mt-20 '>
            <div className='max-w-[88%] mx-auto grid grid-flow-row py-14'>
                <div className='flex justify-between mb-5 fxsm:flex-col fxsm:gap-4 fxsm:mb-9 fxsm:items-center'>
                    <Link
                        to='/'
                        onClick={scrollTop}
                        className='font-500 font-mon text-2xl bg-transparent select-none'
                    >
                        <span className='bg-[] p-1 text-[#fff]'>Exam</span><span className='bg-[#fff] p-1 text-slate-900'> Portal</span>
                    </Link>
                    <div className='flex gap-3'>
                        <ShareButton url={window.location} />
                    </div>
                </div>
                <div className='grid grid-cols-4 cmd:gap-5 amd:grid-cols-2 axsm:grid-cols-1 axsm:place-content-center'>
                    <div className='axsm:text-center'>
                        <ul className='text-[#eeebeb] font-mon space-y-1 font-500'>
                            <li className='font-700 text-2xl'>Platform</li>
                            <li>Pricing</li>
                            <li>Cheating</li>
                            <li>Online exam</li>
                            <li>About</li>
                        </ul>
                    </div>
                    <div className='axsm:text-center'>
                        <ul className='text-[#eeebeb] font-mon space-y-1 font-500'>
                            <li className='font-700 text-2xl'>Exam</li>
                            <li className=''>Online Exam</li>
                            <li>Computer Based Test</li>
                            <li>Paper Based Test</li>
                        </ul>
                    </div>
                    <div className='axsm:text-center'>
                        <ul className='text-[#eeebeb] font-mon space-y-1 font-500'>
                            <li className='font-700 text-2xl'>Resources</li>
                            <li>Privacy</li>
                            <li>Support Center</li>
                            <li>Training videos</li>
                        </ul>
                    </div>
                    <div className='axsm:text-center'>
                        <ul className='text-[#eeebeb] font-mon space-y-1 font-500'>
                            <li className='font-700 text-2xl'>Services</li>
                            <li>Schools</li>
                            <li>Higher education</li>
                            <li>Companies & Organizations</li>
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer