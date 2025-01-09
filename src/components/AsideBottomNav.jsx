import { FaUserAltSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { SidebarFooter, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar'
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from './ui/dropdown-menu'
import { ChevronsUpDown, Delete, LogOut, Sparkles } from 'lucide-react'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import useAuth from '@/hooks/useAuth'
import useGetColors from '@/hooks/useGetColors'
import useScrollTop from '@/hooks/useScrollTop'
import useLogout from '@/hooks/useLogout'
import Loading from './Loaders/Loading'
import useHideScroll from '@/hooks/useHideScroll'
import { useMutation } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import toast from 'react-hot-toast'
import { DeleteCancelButton, DeleteConfirmButton, DeleteModal } from './Modal/DeleteModal'
import { useState } from 'react'

function AsideBottomNav() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const { screenWidth } = useGetScreenWidth()
    const { colors } = useGetColors()
    const { scrollTop } = useScrollTop()
    const navigate = useNavigate()
    const { logout, logoutPending } = useLogout()

    const [isModalOpen, setIsModalOpen] = useState(false)

    const getOffset = () => {
        if (screenWidth <= 333) {
            return -230
        } else if (screenWidth <= 357) {
            return -200
        } else if (screenWidth <= 406) {
            return -170
        } else if (screenWidth <= 455) {
            return -130
        } else if (screenWidth <= 547) {
            return -30
        } else if (screenWidth <= 504) {
            return -80
        } else {
            return -4
        }
    }

    const handleProfileNavigate = () => {
        scrollTop();
        setTimeout(() => {
            navigate('edit-profile')
        }, 200)
    }

    const handleDeleteAccount = useMutation({
        mutationFn: () => {
            return axiosPrivate.delete(`/delete-account/${auth?._id}`)
        },
        onSuccess: () => {
            toast.success('Deleted successfully')
            window.location.href = '/auth'
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to delete';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(logoutPending)

    return (
        <>
            <Loading text={`${handleDeleteAccount.isPending ? 'Deleting account' : logoutPending && 'logging out'}`} isLoading={handleDeleteAccount.isPending || logoutPending} />
            <SidebarFooter className="cursor-pointer">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton
                                    size="lg"
                                    className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                                >
                                    {auth?.profileImage?.url ? (
                                        <img
                                            src={auth?.profileImage?.url}
                                            className={`w-7 h-7 flex items-center justify-center rounded-full object-cover`}
                                            alt={`${auth?.name} profile image`}
                                            loading="eager"
                                        />
                                    ) : (
                                        <button className={`w-7 h-7 flex items-center justify-center rounded-full`} style={{ color: colors.darkerColor, background: colors.randomColor }}>
                                            <span className='font-600 font-mon text-base'>{auth?.name?.substring(0, 1)}</span>
                                        </button>
                                    )}
                                    <div className="grid flex-1 text-left text-sm leading-tight">
                                        <span className="truncate font-semibold">{auth?.name}</span>
                                        <span className="truncate text-xs">{auth?.email}</span>
                                    </div>
                                    <ChevronsUpDown className="ml-auto size-4" />
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg z-[1000] relative"
                                side={"right"}
                                align={'end'}
                                sideOffset={getOffset()}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        {auth?.profileImage?.url ? (
                                            <img
                                                src={auth?.profileImage?.url}
                                                className={`w-7 h-7 flex items-center justify-center rounded-full object-cover`}
                                                alt={`${auth?.name} profile image`}
                                                loading="eager"
                                            />
                                        ) : (
                                            <button className={`w-7 h-7 flex items-center justify-center rounded-full`} style={{ color: colors.darkerColor, background: colors.randomColor }}>
                                                <span className='font-600 font-mon text-base'>{auth?.name?.substring(0, 1)}</span>
                                            </button>
                                        )}
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold">{auth?.name}</span>
                                            <span className="truncate text-xs">{auth?.email}</span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                                        <Link className='flex gap-1 items-center'>
                                            <Sparkles />
                                            Help Center
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <div>
                                        <DropdownMenuItem >
                                            <SidebarMenuButton onClick={handleProfileNavigate}>
                                                <span>
                                                    <FaUserAltSlash />
                                                </span>
                                                <span className='font-sans font-500 text-[0.93rem] text-[#100f0f]'>Edit profile</span>
                                            </SidebarMenuButton>
                                        </DropdownMenuItem>
                                    </div>

                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer" onClick={logout}>
                                    <LogOut />
                                    Log out
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer text-red-600 font-500" onClick={() => setIsModalOpen(!isModalOpen)}>
                                    <Delete />
                                    Delete Account
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter >

            {isModalOpen && (
                <DeleteModal>
                    <p>
                        {`Are you sure you want to delete your account`}
                    </p>
                    <p className='font-poppins font-500 text-base/relaxed'>
                        User ID: {auth?._id}
                    </p>
                    <div className='mt-3 w-full text-center flex gap-4 justify-center'>
                        <DeleteCancelButton
                            onClick={() => {
                                setIsModalOpen(false)
                            }}
                        />
                        <DeleteConfirmButton
                            onClick={() => {
                                handleDeleteAccount.mutate();
                                setIsModalOpen(false)
                            }}
                        />
                    </div>
                </DeleteModal>
            )}
        </>
    )
}

export default AsideBottomNav