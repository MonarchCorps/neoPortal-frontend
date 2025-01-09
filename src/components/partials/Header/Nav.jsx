import useScrollTop from "@/hooks/useScrollTop"
import { Link } from "react-router-dom"

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import useAuth from "@/hooks/useAuth"

function Nav() {

    const { auth } = useAuth()
    const { scrollTop } = useScrollTop()

    const navLinks = [
        { id: 1, text: 'Home', link: '/' },
        { id: 2, text: 'About', link: '/about' },
        { id: 3, text: 'Contact', link: '/contact' },
        {
            id: 4, children: (
                <HoverCard openDelay={20} closeDelay={20}>
                    <HoverCardTrigger asChild>
                        <a href='#' className="font-500 font-sans text-[#eceaea] tracking-wide cursor-pointer relative -mb-1 h-9 flex flex-col justify-between items-center">
                            <span>Classroom</span>
                            <div></div>
                        </a>
                    </HoverCardTrigger>
                    <HoverCardContent className="p-0 absolute -left-10 -top-1 rounded-none border border-solid border-slate-400">
                        <div>
                            <Link to='/classroom' className='border-b border-solid border-b-slate-300 px-4 text-red-600 text-sm font-karla cursor-pointer font-400 hover:bg-[#f2f2f2] py-2 grid grid-flow-col justify-start items-center gap-3 select-none' onClick={scrollTop}>
                                <span className='font-sans'>Study now</span>
                            </Link>
                            <Link to='/cbt-practice/live-exam' className='border-b border-solid border-b-slate-300 px-4 text-red-600 text-sm font-karla cursor-pointer font-400 hover:bg-[#f2f2f2] py-2 grid grid-flow-col justify-start items-center gap-3 select-none' onClick={scrollTop}>
                                <span className='font-sans'>Live exam</span>
                            </Link>
                            <Link to='/cbt-practice' className='border-b border-solid border-b-slate-300 px-4 text-red-600 text-sm font-karla cursor-pointer font-400 hover:bg-[#f2f2f2] py-2 grid grid-flow-col justify-start items-center gap-3 select-none' onClick={scrollTop}>
                                <span className='font-sans'>Practice exam</span>
                            </Link>
                        </div>
                    </HoverCardContent>
                </HoverCard>
            )
        }
    ]

    return (
        <div className="block chsm:hidden">
            <ul className="flex gap-4">
                {navLinks.map(link => {
                    return (
                        <li key={link.id}>
                            {link.text ? (
                                <Link
                                    to={link.link}
                                    onClick={scrollTop}
                                    className="font-500 font-sans text-[#eceaea] tracking-wide"
                                >
                                    {link.text}
                                </Link>
                            ) : (
                                <div
                                    className="font-500 font-sans text-[#eceaea] tracking-wide"
                                >
                                    {link.children}
                                </div>
                            )}

                        </li>
                    )
                })}
                {auth?._id && (
                    <Link
                        to='/dashboard'
                        onClick={scrollTop}
                        className="font-500 font-sans text-[#eceaea] tracking-wide"
                    >
                        Dashboard
                    </Link>
                )}
            </ul>
        </div>
    )
}

export default Nav