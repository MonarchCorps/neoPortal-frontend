/* eslint-disable react/prop-types */
import trim from '@/utils/trim'
import { format } from 'date-fns'

function UserDetails({ user }) {

    return (
        <div className='grid grid-cols-3 smd:grid-cols-2 utsm:grid-cols-1 gap-4 p-5 mb-2 bg-[#8786861e] rounded'>
            <div className='flex flex-col gap-1 break-words border-b border-solid border-slate-300 pb-2 ahsm:text-sm'>
                <span className='font-600 text-base text-[#1f2937]'>User ID: </span>
                <span>{user?._id}</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2  ahsm:text-sm'>
                <span className='font-600 text-base text-[#1f2937] ahsm:text-sm'>Address: </span>
                <span>{user?.address ? trim(user?.address, 15) : 'Not available'}</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2  ahsm:text-sm'>
                <span className='font-600 text-base text-[#1f2937]'>Email: </span>
                <span>{user?.email ? trim(user?.email, 15) : 'Not available'}</span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2  ahsm:text-sm'>
                <span className='font-600 text-base text-[#1f2937] ahsm:text-sm'>Phone Number</span>
                <span>{user?.phoneNumber ? trim(user?.phoneNumber, 10) : 'Not available'}</span>
            </div>
            <div className='flex flex-col gap-2 border-b border-solid border-slate-300 pb-2  ahsm:text-sm'>
                <span className='font-600 text-base text-[#1f2937] ahsm:text-sm'>Roles</span>
                <span className='font-500 text-base tracking-tight align-text-top'>
                    <span>
                        {user?.role === 'school' && (
                            <span className=' border border-solid border-[#15433c] bg-[#45837a1a] text-[#15433c] px-4 mr-1 rounded-2xl flex items-center w-fit'>
                                <span className='text-[0.8rem] ahsm:text-sm'>School </span>
                            </span>
                        )}
                        {user?.role === 'teacher' && (
                            <span className='border border-solid border-[#4358d1] bg-[#2e387122] text-[#4358d1] px-4 mr-1 rounded-2xl flex items-center w-fit'>
                                <span className='text-[0.8rem] ahsm:text-sm'>Teacher </span>
                            </span>
                        )}
                        {user?.role === 'student' && (
                            <span className='border border-solid border-[#d143ab] bg-[#2e387122] text-[#d143ab] px-4 rounded-2xl flex items-center w-fit'>
                                <span className='text-[0.8rem] ahsm:text-sm'>Student</span>
                            </span>
                        )}
                    </span>
                </span>
            </div>
            <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2  ahsm:text-sm'>
                <span className='font-600 text-base text-[#1f2937]  ahsm:text-sm'>Date Registered</span>
                <span>{user?.createdAt && format(user?.createdAt, "MMMM dd, yyyy")}</span>
            </div>
            {user?.role === 'student' && (
                <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2 ahsm:text-sm'>
                    <span className='font-600 text-base text-[#1f2937] ahsm:text-sm'>Number of exams taken</span>
                    <span>{user?.examCount || 0}</span>
                </div>
            )}
            {user?.role === 'school' && (
                <>
                    <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2'>
                        <span className='font-600 text-base text-[#1f2937]'>Cac Number</span>
                        <span>{user?.cacNumber}</span>
                    </div>
                    <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2'>
                        <span className='font-600 text-base text-[#1f2937]'>State</span>
                        <span>{user?.state}</span>
                    </div>
                    <div className='flex flex-col gap-1 border-b border-solid border-slate-300 pb-2 capitalize'>
                        <span className='font-600 text-base text-[#1f2937]'>Type</span>
                        <span>{user?.type}</span>
                    </div>
                </>
            )}
        </div>
    )
}

export default UserDetails