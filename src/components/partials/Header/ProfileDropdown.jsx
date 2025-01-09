import { LayoutDashboard, Settings } from 'lucide-react'

import {
    LogOut,
    Mail,
    User,
    UserPlus,
} from "lucide-react"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import useGetColors from '@/hooks/useGetColors'
import useLogout from '@/hooks/useLogout'
import useAuth from '@/hooks/useAuth'
import { Link } from 'react-router-dom'
import Loading from '@/components/Loaders/Loading'

function ProfileDropdown() {

    const { auth } = useAuth()

    const { colors } = useGetColors()
    const { logout, logoutPending } = useLogout()

    return (
        <>
            <Loading text='Logging out' isLoading={logoutPending} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <div className='flex items-center gap-3 mx-2 mb-2'>
                        <Settings className='text-3xl text-[#eee]' />
                        {auth?.profileImage?.url ? (
                            <img
                                src={auth?.profileImage?.url}
                                className={`w-10 h-10 flex items-center justify-center rounded-full object-cover cursor-pointer`}
                                alt={`${auth?.name} profile image`}
                                loading="eager"
                            />
                        ) : (
                            <button className={`w-10 h-10 flex items-center justify-center rounded-full`} style={{ color: colors.darkerColor, background: colors.randomColor }}>
                                <span className='font-600 font-mon text-2xl'>{auth?.name.substring(0, 1)}</span>
                            </button>
                        )}
                    </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                        <Link to='/dashboard'>
                            <LayoutDashboard />
                            <span>Dashboard</span>
                            <DropdownMenuShortcut>⇧⌘D</DropdownMenuShortcut>
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <User />
                            <span>Profile</span>
                            <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            <Settings />
                            <span>Settings</span>
                            <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                        <DropdownMenuSub>
                            <DropdownMenuSubTrigger>
                                <UserPlus />
                                <span>Details</span>
                            </DropdownMenuSubTrigger>
                            <DropdownMenuPortal>
                                <DropdownMenuSubContent>
                                    <DropdownMenuItem>
                                        <Mail />
                                        <span>{auth?.email}</span>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <User />
                                        <span>{auth?.name}</span>
                                    </DropdownMenuItem>
                                </DropdownMenuSubContent>
                            </DropdownMenuPortal>
                        </DropdownMenuSub>
                    </DropdownMenuGroup>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout} className='cursor-pointer'>
                        <LogOut />
                        <span>Log out</span>
                        <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </>
    )
}

export default ProfileDropdown