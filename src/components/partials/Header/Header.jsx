import { Link } from 'react-router-dom'
import Nav from './Nav'
import useScrollTop from '@/hooks/useScrollTop'
import useAuth from '@/hooks/useAuth'

import useLogout from '@/hooks/useLogout'
import Loading from '@/components/Loaders/Loading'
import ProfileDropdown from './ProfileDropdown'
import MenuDropdown from './MenuDropdown'
import { FaSearch } from 'react-icons/fa'

function Header() {

    const { auth } = useAuth()
    const { scrollTop } = useScrollTop()
    const { logoutPending } = useLogout()

    return (
        <>
            <Loading text='Logging out' isLoading={logoutPending} />
            <header className="fixed w-full top-0 bg-red-900 z-[1000]">
                <div className='flex justify-between items-center px-4 py-2 tmd:flex-col tmd:gap-4 tmd:items-start'>
                    <Link
                        to='/'
                        onClick={scrollTop}
                        className='font-500 font-mon text-2xl bg-transparent select-none'
                    >
                        <span className='bg-red-900 p-1 text-[#fff]'>Exam</span><span className='bg-[#fff] p-1 text-slate-900'> Portal</span>
                    </Link>
                    <div className='flex items-center border-[1px] border-solid border-[#eaeaea] h-[40px] w-[22rem] tmd:w-full rounded-md'>
                        <FaSearch className='mx-3 text-slate-100 rotate-90 text-xl opacity-80' />
                        <input
                            type="search"
                            name="homeSearch"
                            id="homeSearch"
                            className='h-full w-full bg-transparent outline-none font-poppins font-500 text-base text-[#fff] placeholder:text-sm'
                            placeholder='Search...'
                        />
                    </div>
                </div>
                <div className='bg-red-950 pt-2 px-7 flex items-center justify-between'>
                    <Nav />
                    <MenuDropdown />
                    {
                        !auth?._id ? (
                            <div className='flex gap-4 mb-3'>
                                <Link
                                    to='/auth'
                                    onClick={scrollTop}
                                    className='border grid place-content-center px-3 py-1 rounded-md text-[#eee] font-600 transition-all'
                                >
                                    <span>Login</span>
                                </Link>
                                <Link
                                    to='/register'
                                    onClick={scrollTop}
                                    className='border border-current grid place-content-center px-3 py-1 text-red-900 bg-[#eee] rounded-md'
                                >
                                    Sign Up
                                </Link>
                            </div>
                        ) : (
                            <ProfileDropdown />
                        )
                    }
                </div>
            </header>
        </>
    )
}

export default Header