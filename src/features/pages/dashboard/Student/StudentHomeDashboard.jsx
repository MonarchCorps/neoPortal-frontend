import useAuth from '@/hooks/useAuth'
import UserDetails from '@/components/UserDetails'
import useGetColors from '@/hooks/useGetColors'
import ExamHistory from '@/components/CbtPractice/ExamHistory'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import ReactPaginate from 'react-paginate'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'

// const bgImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735378254/Exam_Portal/zjc6l4h3tehqfrolzmzy.jpg'
const bgImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/f_auto,q_auto/v1/Exam_Portal/isw1m68np15c1skojjlg'

function StudentHomeDashboard() {

    const { auth } = useAuth()
    const { colors } = useGetColors()
    const { screenWidth } = useGetScreenWidth()

    const axiosPrivate = useAxiosPrivate()

    const Text = styled.p`
        font-size: 16px;
            white-space: pre-wrap;
            overflow: hidden;
            max-height: ${({ expanded }) => (expanded ? "none" : "300px")};
            transition: max-height 0.3s ease;
        `;

    const ToggleButton = styled.button`
            margin-top: 1px;
            color: #D6809C;
            font-size: 14px;
            font-weight: bold;
            cursor: pointer;
            text-align: center;

            &:hover {
               text-decoration: underline;
            }

            @media (min-width: 768px) {
                width: auto;
            }
        `;

    const [expanded, setExpanded] = useState(false)

    const toggleReadMore = () => {
        setExpanded(!expanded);
    }

    const { data, isLoading } = useQuery({
        queryKey: ['exam_history', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/exam-history/${auth?._id}`).then(res => {
                return Array.isArray(res?.data) ? res?.data : []
            }),
        enabled: !!auth?._id
    })

    const [page, setPage] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const n = 5

    useEffect(() => {
        if (data) {
            setFilteredData(
                data?.length > 0 && data.filter((_, index) => {
                    return (index >= page * n) & (index < (page + 1) * n)
                })
            ) || []
        }
    }, [data, page])

    return (
        <section className='hrmd2:w-screen'>
            <div className='w-full'>
                <div className='absolute right-0 left-0 h-[19rem] -z-20'>
                    <img
                        src={bgImg}
                        className='h-[24rem] w-full object-cover'
                        alt="No image"
                        loading="eager"
                    />
                </div>
                <div className='pt-64 px-6'>
                    <div className='p-4'>
                        <div className='border-solid border-slate-50 border-8 w-fit rounded-full overflow-hidden'>
                            {
                                auth?.profileImage?.url ? (
                                    <img
                                        src={auth?.profileImage?.url}
                                        alt={`${auth?.name} profile image`}
                                        className='w-[10rem] h-[10rem] object-cover imd:w-[8rem] imd:h-[8rem]'
                                        loading="eager"
                                    />
                                ) : (
                                    <button
                                        className='w-[10rem] h-[10rem] imd:w-[8rem] imd:h-[8rem] cursor-default'
                                        style={{ color: colors.darkerColor, background: colors.randomColor }}>
                                        <span className='font-600 font-mon text-7xl'>{auth?.name.substring(0, 1)}</span>
                                    </button>
                                )
                            }
                        </div>
                        <h1 className='text-[2rem] mb-2 font-500 font-serif imd:text-3xl imd:mt-2'>
                            {auth?.name || 'Student'}
                        </h1>
                    </div>
                    {screenWidth <= 361 ? (
                        <>
                            <Text expanded={expanded}>{<UserDetails user={auth} /> || 'providedExperience'}</Text>
                            <ToggleButton onClick={toggleReadMore}>
                                {expanded ? "Read Less" : "Read More"}
                            </ToggleButton>
                        </>
                    ) : (
                        <UserDetails user={auth} />
                    )}
                    <div className='my-8 mx-10 lg:mx-4'>
                        <h1 className='mb-7 text-[#1F509A] text-4xl aism:text-2xl aism:mb-5'>CBT Exam History: <span className='text-slate-950'>{data?.length}</span></h1>
                        <div className='border border-solid border-gray-100 grid grid-cols-7 items-center lg:w-screen htmd:w-full htmd:grid-cols-5 aism:grid-cols-2'>
                            <div className='border-r border-solid border-gray-200 py-3 col-span-3 htmd:border-b htmd:px-2'>
                                <h1 className='font-poppins font-600'>Exam Details</h1>
                                <p className='font-sans text-sm opacity-85'>Exam Type</p>
                            </div>
                            <div className='h-full flex items-center border-r border-solid border-gray-200 pl-[1.12rem] pr-20 py-3 htmd:border-b xsm:col-span-2'>
                                <h1 className='font-poppins font-600'>Percent</h1>
                            </div>
                            <div className='h-full flex items-center border-r border-solid border-gray-200 pl-[0.92rem] pr-10 py-3 htmd:border-b'>
                                <h1 className='font-poppins font-600'>Correct</h1>
                            </div>
                            <div className='h-full flex items-center border-r border-solid border-gray-200 pl-[0.92rem] pr-10 py-3 htmd:col-span-2 aism:col-span-2 '>
                                <h1 className='font-poppins font-600'>Total</h1>
                            </div>
                            <div className='h-full flex items-center pl-[0.92rem] pr-10 py-3 htmd:col-span-2 aism:col-span-1 aism:border-t '>
                                <h1 className='font-poppins font-600'>Action</h1>
                            </div>
                        </div>
                        <div className='my-4 lg:w-screen htmd:w-full mb-10'>
                            <ExamHistory data={filteredData} isLoading={isLoading} page={{ page: page, n: n }} />
                        </div>
                        {!isLoading && data?.length > 0 && (
                            <ReactPaginate
                                previousLabel={<FaArrowLeft />}
                                nextLabel={<FaArrowRight />}
                                pageCount={Math.ceil(data.length / n)}
                                onPageChange={(event) => setPage(event.selected)}
                                containerClassName={"pagination flex flex-wrap"}
                                activeClassName={"active"}
                                pageClassName={"page"}
                                pageLinkClassName={"page-link"}
                                previousClassName={"previous"}
                                nextClassName={"next"}
                                breakClassName={"break"}
                            />
                        )}
                    </div>
                </div>
            </div>
        </section >
    )
}

export default StudentHomeDashboard