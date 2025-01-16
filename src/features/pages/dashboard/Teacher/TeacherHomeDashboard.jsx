import useAuth from '@/hooks/useAuth'
import UserDetails from '@/components/UserDetails'
import useGetColors from '@/hooks/useGetColors'
import TableHead from './UploadedExams/TableHead'
import { useQuery } from '@tanstack/react-query'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'
import TableBody from './UploadedExams/TableBody'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import useGetScreenWidth from '@/hooks/useGetScreenWidth'
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa'
import ReactPaginate from 'react-paginate'

const bgImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735378254/Exam_Portal/zjc6l4h3tehqfrolzmzy.jpg'

function TeacherHomeDashboard() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { colors } = useGetColors()
    const { screenWidth } = useGetScreenWidth()

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
        queryKey: ['uploaded_exams', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/uploaded/exams/${auth?._id}`).then((res) => {
                return res?.data
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
        <section>
            <div className='w-full overflow-x-scroll'>
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
                            {auth?.name || 'Teacher'}
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
                    {data?.length > 0 ? (
                        <div className='overflow-x-scroll max-w-full'>
                            <div className="mt-10 w-screen min-w-[60rem]">
                                <h1 className='mb-7 text-slate-950 text-3xl'>Uploaded Exams</h1>
                                <TableHead />
                                <TableBody details={filteredData} page={{ page: page, n: n }} />
                            </div>
                        </div>
                    ) : (
                        <p className='w-full text-center my-3'>No uploaded exams available at the moment! Check back later or reload the page.</p>
                    )}
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
        </section >
    )
}

export default TeacherHomeDashboard