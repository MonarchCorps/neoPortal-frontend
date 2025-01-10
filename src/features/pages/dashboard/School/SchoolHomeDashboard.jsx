import Loading from "@/components/Loaders/Loading"
import Loading2 from "@/components/Loaders/Loading2"
import UserDetails from "@/components/UserDetails"
import useAuth from "@/hooks/useAuth"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import useGetColors from "@/hooks/useGetColors"
import trim from "@/utils/trim"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useRef, useState } from "react"
import toast from "react-hot-toast"
import { FaTrashCan } from "react-icons/fa6"
import AddTeacher from "./AddTeacher"
import EditTeacher from "./EditTeacher"
import styled from "styled-components"
import useGetScreenWidth from "@/hooks/useGetScreenWidth"

const bgImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735378254/Exam_Portal/zjc6l4h3tehqfrolzmzy.jpg'

function SchoolHomeDashboard() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const { colors } = useGetColors()
    const dialogCloseRef = useRef(null)
    const queryClient = useQueryClient()
    const { screenWidth } = useGetScreenWidth()

    const [currTeacherId, setCurrTeacherId] = useState('')

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const handleEditChange = (e) => {
        const { name, value } = e.target
        setEditData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: ''
    })

    const { data, isLoading: teacherIsLoading } = useQuery({
        queryKey: ['fetch_teachers', auth?._id],
        queryFn: () =>
            axiosPrivate.get(`/school-fetch-teachers/${auth?._id}`).then((res) => {
                return res?.data
            }),
        enabled: !!auth?._id
    })

    const [editData, setEditData] = useState({})

    useEffect(() => {
        setEditData({
            teacherId: data && data?.find(content => content?._id == currTeacherId)?._id || '',
            name: data && data?.find(content => content?._id == currTeacherId)?.name || '',
            email: data && data?.find(content => content?._id == currTeacherId)?.email || '',
            assignedSubject: data && data?.find(content => content?._id == currTeacherId)?.assignedSubject || ''
        })
    }, [currTeacherId, data])

    const emptyField = Object.values(formData).some(val => val === '' || val === 'subject')
    const editEmptyField = Object.values(editData).some(val => val === '' || val === 'subject')

    const handleAddTeacher = useMutation({
        mutationFn: () => {
            if (emptyField)
                return toast.error('All fields are required')
            else return axiosPrivate.post('/school-add-teacher', {
                name: formData.name,
                email: formData.email,
                assignedSubject: formData.subject,
                assignedSchoolId: auth?._id
            })
        },
        onSuccess: () => {
            dialogCloseRef.current?.click();
            toast.success('Added successfully')
            queryClient.invalidateQueries({ queryKey: ['fetch_teachers', auth?._id] })
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to add';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const handleEditTeacher = useMutation({
        mutationFn: () => {
            return axiosPrivate.post('/school-edit-teacher', {
                teacherId: editData.teacherId,
                name: editData.name,
                email: editData.email,
                assignedSubject: editData.assignedSubject
            })
        },
        onSuccess: () => {
            dialogCloseRef.current?.click();
            toast.success('Updated successfully')
            queryClient.invalidateQueries({ queryKey: ['fetch_teachers', auth?._id] })
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to update';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    const handleDeleteTeacher = useMutation({
        mutationFn: ({ teacherId }) => {
            return axiosPrivate.delete(`/school-delete-teacher/${teacherId}/${auth?._id}`)
        },
        onSuccess: () => {
            toast.success('Deleted successfully')
            queryClient.invalidateQueries({ queryKey: ['fetch_teachers', auth?._id] })
        },
        onError: (error) => {
            console.log(error)
            const errorMessage = error?.response?.data?.message || 'Failed to delete';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })


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

    return (
        <>
            <Loading isLoading={handleAddTeacher.isPending || handleDeleteTeacher.isPending} text={handleAddTeacher.isPending ? 'Creating teacher account' : handleDeleteTeacher.isPending ? 'Deleting teacher' : 'Loading...'} />
            <section>
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
                                            className={`w-[10rem] h-[10rem] object-cover rounded-full`}
                                            loading="eager"
                                        />
                                    ) : (
                                        <button
                                            className='w-[10rem] h-[10rem] object-cover cursor-default'
                                            style={{ color: colors.darkerColor, background: colors.randomColor }}>
                                            <span className='font-600 font-mon text-7xl'>{auth?.name.substring(0, 1)}</span>
                                        </button>
                                    )
                                }
                            </div>
                            <h1 className='text-[2rem] font-500 font-serif'>
                                {auth?.name || 'School Institute'}
                            </h1>
                        </div>
                        {screenWidth <= 510 ? (
                            <>
                                <Text expanded={expanded}>{<UserDetails user={auth} /> || 'providedExperience'}</Text>
                                <ToggleButton onClick={toggleReadMore}>
                                    {expanded ? "Read Less" : "Read More"}
                                </ToggleButton>
                            </>
                        ) : (
                            <UserDetails user={auth} />
                        )}                        <div >
                            <div className="flex items-center justify-between my-4 cfsm:flex-col cfsm:gap-2 cfsm:items-start">
                                <h1 className="text-3xl">Teachers</h1>
                                <AddTeacher dialogCloseRef={dialogCloseRef} handleAddTeacher={handleAddTeacher} handleChange={handleChange} formData={formData} setFormData={setFormData} emptyField={emptyField} />
                            </div>
                            <div className="my-2">

                                <div className="grid grid-cols-6 bg-[#f2f2f26d] px-6 py-[0.9rem] rounded-xl mb-5">
                                    <div className=' hidden hlg:grid hlg:grid-cols-[40px,1fr] hlg:gap-4'>
                                        <p className='font-500 font-poppins text-base'>S/N</p>
                                        <p className='font-500 font-poppins text-base'>Details</p>
                                    </div>
                                    <div className='grid grid-cols-[40px,1fr] gap-4  hlg:hidden'>
                                        <p className='font-500 font-poppins text-base'>S/N</p>
                                        <p className='font-500 font-poppins text-base'>Name</p>
                                    </div>
                                    <p className='col-span-2 font-500 font-poppins text-base text-center  hlg:hidden'>Email</p>
                                    <p className='font-500 font-poppins text-base text-center hlg:hidden'>Subject</p>
                                    <p className='col-span-2 font-500 font-poppins text-base text-center hlg:hidden'>Action</p>
                                </div>

                            </div>
                            {teacherIsLoading ? (
                                <div className="bg-red-700 text-[#fff] font-mon font-500 py-3 px-3 rounded-sm w-[85%] max-w-[1204px] mx-auto">
                                    <Loading2 text='Loading list of teachers' data='' isLoading={teacherIsLoading} />
                                </div>
                            ) : !teacherIsLoading && data?.length > 0 ? (
                                data?.map((teacher, i) => {
                                    return (
                                        <div key={i} className="grid grid-cols-6 px-6 py-[0.9rem] my-5 border border-solid rounded-md hlg:grid-cols-3 hlg:gap-y-4 msm:grid-cols-2 hxsm:flex hxsm:flex-col">
                                            <div className='grid grid-cols-[40px,1fr] gap-4 msm:hidden'>
                                                <p className='font-500 font-poppins text-base'>{i + 1}.</p>
                                                <p className='font-500 font-poppins text-base'></p>
                                                {trim(teacher?.name, 20)}
                                            </div>
                                            <p className=' col-span-2 font-500 font-poppins text-base text-center msm:text-start'>
                                                <span className="hidden msm:inline-block">{i + 1}.&nbsp;</span>
                                                {trim(teacher?.email, 20)}
                                            </p>
                                            <p className='font-500 font-poppins text-base text-center capitalize hlg:text-start'>
                                                <span className="hidden hlg:inline-block text-red-700">Subject:&nbsp;</span>
                                                {trim(teacher?.assignedSubject?.replace(/-/g, " "), 20)}
                                            </p>
                                            <div className='hidden msm:grid msm:grid-cols-[40px,1fr] msm:gap-4 hxsm:flex hxsm:gap-2'>
                                                <p className='font-500 font-poppins text-base'></p>
                                                <span className="hidden hxsm:inline-block  text-red-700">Name:</span>
                                                {trim(teacher?.name, 20)}
                                            </div>
                                            <div className="col-span-2 text-center flex items-center justify-center gap-4 hxsm:justify-start">
                                                <span className="hidden hlg:inline-block text-red-700">Action:&nbsp;</span>
                                                <EditTeacher dialogCloseRef={dialogCloseRef} handleEditTeacher={handleEditTeacher} handleEditChange={handleEditChange} editData={editData} editEmptyField={editEmptyField} setCurrTeacherId={setCurrTeacherId} teacherId={teacher?._id} />
                                                <button className="text-red-600 text-2xl" onClick={() => handleDeleteTeacher.mutate({ teacherId: teacher?._id })}>
                                                    <FaTrashCan />
                                                </button>
                                            </div>
                                        </div>
                                    )
                                })
                            ) : !teacherIsLoading && data?.length == 0 && (
                                <p className="w-full text-center my-3">No teachers available at the moment. Check back later or reload the page!</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default SchoolHomeDashboard