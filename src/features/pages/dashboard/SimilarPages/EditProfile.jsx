import { useRef, useState } from "react"
import useAuth from "@/hooks/useAuth"
import { useMutation } from "@tanstack/react-query"
import useAxiosPrivate from "@/hooks/useAxiosPrivate"
import toast from "react-hot-toast"
import useRefreshToken from "@/hooks/useRefreshToken"
import Select from 'react-select'
import useHideScroll from "@/hooks/useHideScroll"
import { degrees } from "@/utils/degrees"
import Loading from "@/components/Loaders/Loading"
import useGetColors from "@/hooks/useGetColors"
import { states } from "@/utils/states"

function EditProfile() {

    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()
    const refresh = useRefreshToken()
    const { colors } = useGetColors()
    const photoRef = useRef()
    const [preview, setPreview] = useState()

    const [formData, setFormData] = useState({
        name: auth?.name || '',
        email: auth?.email || '',
        phoneNumber: auth?.phoneNumber || '',
        qualification: auth?.qualification || '',
        licenseNo: auth?.licenseNo || '',
        profileImage: auth?.profileImage || null,
        cacNumber: auth?.cacNumber || '',
        state: auth?.state || '',
        type: auth?.type || 'type'
    })

    const handleChange = (e) => {
        const { name, value, files } = e.target
        if (files && files.length > 0) {
            const file = files[0]
            setFormData(prev => ({
                ...prev,
                [name]: file
            }))
            const url = URL.createObjectURL(file)
            setPreview(url)
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }))
        }
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        const formDataToSend = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            formDataToSend.append(key, value);
        })

        handleUpdateProfile.mutate(formDataToSend)

    }

    const handleUpdateProfile = useMutation({
        mutationFn: (formDataToSend) => {
            return axiosPrivate.patch(`/edit-profile/${auth?._id}`, formDataToSend, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                withCredentials: true
            });
        },
        onSuccess: () => {
            refresh()
            toast.success('Updated successfully')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to update';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    useHideScroll(handleUpdateProfile.isPending)

    return (
        <>
            <Loading text="updating profile" isLoading={handleUpdateProfile.isPending} />
            <section>
                <div className="p-10 mt-20 mb-10 max-w-[50rem] mx-auto shadow">
                    <h1 className="text-4xl font-roboto mb-2 tracking-tight fxsm:text-2xl">
                        <span className="text-red-600 font-400">{auth?.name} </span>edit your profile
                    </h1>
                    <h3 className="text-xl font-mon font-600 fxsm:text-base">Personal Information</h3>
                    <form className="my-4 grid grid-cols-2 gap-4 fxsm:flex fxsm:flex-col" onSubmit={handleSubmit}>

                        <div className="col-span-2 text-center grid place-content-center">
                            <input
                                ref={photoRef}
                                type="file"
                                name="profileImage"
                                id="profileImage"
                                hidden
                                multiple={false}
                                onChange={handleChange}
                            />
                            {
                                auth?.profileImage?.url || preview ? (
                                    <label htmlFor='profileImage' className={`hover:bg-[#00000023] flex flex-col items-center justify-center w-[150px] h-[150px] border-2 rounded-full overflow-hidden border-gray-300 border-dashed cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700  dark:border-gray-600 dark:hover:border-gray-500`}>
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <img src={preview || auth?.profileImage?.url} alt="" className='cursor-pointer w-[150px] object-cover h-[150px] rounded-md' />
                                        </div>
                                    </label>
                                ) : (
                                    <button
                                        onClick={(e) => { e.preventDefault(); photoRef?.current.click() }}
                                        className='w-[10rem] h-[10rem] object-cover rounded-full overflow-hidden border-4 border-solid border-slate-700'
                                        style={{ color: colors.darkerColor, background: colors.randomColor }}
                                    >
                                        <span className='font-600 font-mon text-7xl'>{auth?.name.substring(0, 1)}</span>
                                    </button>
                                )
                            }
                        </div>

                        <div className='flex flex-col w-full'>
                            <label htmlFor="name" className='text-sm mb-2 font-500'>Name</label>
                            <input
                                type="text"
                                name='name'
                                id='name'
                                placeholder='Enter name'
                                autoComplete='off'
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                                required
                                onChange={handleChange}
                                value={formData.name}
                            />
                        </div>

                        <div className='flex flex-col w-full'>
                            <label htmlFor="email" className='text-sm mb-2 font-500'>Email</label>
                            <input
                                type="email"
                                name='email'
                                id='email'
                                placeholder='Enter email'
                                autoComplete='off'
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                                required
                                onChange={handleChange}
                                value={formData.email}
                            />
                        </div>

                        <div className='flex flex-col w-full'>
                            <label htmlFor="phoneNumber" className='text-sm mb-2 font-500'>Phone Number</label>
                            <input
                                type="number"
                                name='phoneNumber'
                                id='phoneNumber'
                                placeholder='Enter contact number'
                                autoComplete='off'
                                className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                                required
                                onChange={handleChange}
                                value={formData.phoneNumber}
                            />
                        </div>

                        {auth?.role === 'teacher' && (
                            <>
                                <div className='flex flex-col w-full'>
                                    <label className='text-sm mb-1 font-500' htmlFor="qualification">Educational Qualification</label>
                                    <Select
                                        name="qualification"
                                        id="qualification"
                                        className='mt-1'
                                        required
                                        isMulti={false}
                                        options={degrees}
                                        closeMenuOnSelect={true}
                                        onChange={(e) => setFormData(prev => ({ ...prev, qualification: e.value }))}
                                        value={degrees.find(degree => degree.value === formData.qualification)}
                                    />
                                </div>

                                <div className='flex flex-col col-span-2'>
                                    <label className='text-sm mb-1 font-500' htmlFor="licenseNo">Teaching License No.</label>
                                    <input
                                        type="licenseNo"
                                        name="licenseNo"
                                        id="licenseNo"
                                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                                        placeholder="License No"
                                        onChange={handleChange}
                                        value={formData.licenseNo}
                                        required
                                    />
                                </div>
                            </>
                        )}

                        {auth?.role === 'school' && (
                            <>
                                <div className='flex flex-col'>
                                    <label className='text-sm mb-1 font-500' htmlFor="schoolType">Type</label>
                                    <select
                                        name="type"
                                        id="type"
                                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded'
                                        required
                                        onChange={handleChange}
                                        value={formData.type}
                                    >
                                        <option value="type" defaultValue>Type</option>
                                        <option value="primary">Primary</option>
                                        <option value="secondary">Secondary</option>
                                        <option value="tertiary">Tertiary</option>
                                    </select>
                                </div>

                                <div className='flex flex-col col-span-2'>
                                    <label className='text-sm mb-1 font-500' htmlFor="cacNumber">CAC Number</label>
                                    <input
                                        type="text"
                                        name="cacNumber"
                                        id="cacNumber"
                                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                                        placeholder="Cac Number"
                                        onChange={handleChange}
                                        value={formData.cacNumber}
                                    />
                                </div>

                                <div className='flex flex-col col-span-2'>
                                    <label className='text-sm mb-1 font-500' htmlFor="state">State</label>
                                    <Select
                                        name="state"
                                        id="state"
                                        className='mt-1'
                                        required
                                        isMulti={false}
                                        options={states}
                                        closeMenuOnSelect={true}
                                        onChange={(e) => setFormData(prev => ({ ...prev, state: e.value }))}
                                        value={states.find(state => state.value === formData.state)}
                                    />
                                </div>

                            </>
                        )}

                        <div className="col-span-2 mt-5">
                            <button
                                type="submit"
                                className={`border-2 border-solid border-red-600 bg-red-600 text-[#fff] shadow-sm py-2 px-4 rounded-md duration-300 font-500 font-mon  hover:text-red-600 hover:bg-[#eee]`}
                            >
                                Update
                            </button>
                        </div>

                    </form>
                </div >
            </section >
        </>
    )
}

export default EditProfile