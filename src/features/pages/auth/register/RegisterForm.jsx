/* eslint-disable react/prop-types */
import { useState } from 'react'
import SubmitButton from '@/components/SubmitButton'
import useScrollTop from '@/hooks/useScrollTop'
import { degrees } from '@/utils/degrees'
import { ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import Select from 'react-select'
import { states } from '@/utils/states'

function RegisterForm({ persona, formData, setFormData, handleChange, handleRegister }) {

    // When the name changes i set the role because i was initially having trouble setting the role when the dom mounts
    const renderContent = () => {
        switch (persona) {
            case 'school-institute':
                return <SchoolForm formData={formData} setFormData={setFormData} handleChange={handleChange} handleRegister={handleRegister} />
            case 'teacher':
                return <TeacherForm formData={formData} setFormData={setFormData} handleChange={handleChange} handleRegister={handleRegister} />
            default:
                return <UserForm formData={formData} handleChange={handleChange} setFormData={setFormData} handleRegister={handleRegister} />
        }
    }

    return (
        renderContent()
    )
}

export default RegisterForm


const SchoolForm = ({ formData, handleChange, setFormData, handleRegister }) => {

    const navigate = useNavigate()
    const { scrollTop } = useScrollTop()

    const [confirmPassword, setConfirmPassword] = useState('')

    const valid = formData.name && formData.email && formData.phoneNumber && formData.type && formData.cacNumber && formData.state && (formData.password.length > 0 && formData.password === confirmPassword)

    return (
        <>
            <form className="w-full grid grid-cols-2 max-w-[38rem] mx-auto mt-8 tmd:mt-24 p-4 gap-x-3 gap-y-2">
                <div className='col-span-2 flex items-center gap-5 mb-3'>
                    <button className='bg-white shadow p-2 rounded-md scale-75 transition-all hover:scale-95' onClick={() => { scrollTop(); navigate(-1) }}>
                        <ArrowLeft />
                    </button>
                    <h1 className='font-mon text-slate-950 font-600 text-3xl fxsm:text-xl'>Registering as an Institution</h1>
                </div>
                <div className='flex flex-col cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="name">School Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Enter school name"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                        maxLength='100'
                        minLength='5'
                        onChange={(e) => { handleChange(e); setFormData(prev => ({ ...prev, role: 'school' })) }}
                        value={formData.name}
                    />
                </div>

                <div className='flex flex-col cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="email">School Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Enter school email"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        onChange={handleChange}
                        value={formData.email}
                    />
                </div>

                <div className='flex flex-col xxsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        required
                        placeholder="Enter contact number"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        onChange={handleChange}
                        value={formData.phoneNumber}
                    />
                </div>

                <div className='flex flex-col xxsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="schoolType">Type</label>
                    <select
                        name="type"
                        id="type"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded'
                        required
                        onChange={handleChange}
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
                    />
                </div>

                <div className='flex flex-col cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete='off'
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>

                <div className='flex flex-col relative cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete='off'
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    {formData.password !== confirmPassword && (
                        <p className='absolute -bottom-5 font-karla font-700 text-base text-red-600'>Password does not match</p>
                    )}
                </div>

                <SubmitButton divStyle='col-span-2 w-full mt-4' valid={valid} action={(e) => handleRegister.mutate(e)}>
                    Register
                </SubmitButton>

            </form>
        </>
    )
}

const TeacherForm = ({ formData, handleChange, setFormData, handleRegister }) => {

    const navigate = useNavigate()
    const { scrollTop } = useScrollTop()
    const [confirmPassword, setConfirmPassword] = useState('')

    const valid = formData.name && formData.email && formData.phoneNumber && formData.qualification && formData.licenseNo && (formData.password.length > 0 && formData.password === confirmPassword)

    return (
        <>
            <form className="w-full grid grid-cols-2 max-w-[38rem] mx-auto mt-8 tmd:mt-24 p-4 gap-3">
                <div className='col-span-2 flex items-center gap-5 mb-3'>
                    <button className='bg-white shadow p-2 rounded-md scale-75 transition-all hover:scale-95' onClick={() => { scrollTop(); navigate(-1) }}>
                        <ArrowLeft />
                    </button>
                    <h1 className='font-mon text-slate-950 font-600 text-3xl fxsm:text-xl'>Registering as a Teacher</h1>
                </div>
                <div className='flex flex-col cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Enter name"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                        maxLength='100'
                        minLength='5'
                        onChange={(e) => { handleChange(e); setFormData(prev => ({ ...prev, role: 'teacher' })) }}
                        value={formData.name}
                    />
                </div>

                <div className='flex flex-col cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Enter email"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        onChange={handleChange}
                        value={formData.email}
                    />
                </div>

                <div className='flex flex-col xxsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        required
                        placeholder="Enter contact number"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        onChange={handleChange}
                        value={formData.phoneNumber}
                    />
                </div>

                <div className='flex flex-col xxsm:col-span-2'>
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
                    />
                </div>

                <div className='flex flex-col col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="licenseNo">Teaching License No.</label>
                    <input
                        type="licenseNo"
                        name="licenseNo"
                        id="licenseNo"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        placeholder="License No"
                        onChange={handleChange}
                        value={formData.licenseNo}
                    />
                </div>

                <div className='flex flex-col cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete='off'
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>

                <div className='flex flex-col relative cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete='off'
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    {formData.password !== confirmPassword && (
                        <p className='absolute -bottom-5 font-karla font-700 text-base text-red-600'>Password does not match</p>
                    )}
                </div>

                <SubmitButton divStyle='col-span-2 w-full mt-5' valid={valid} action={(e) => handleRegister.mutate(e)}>
                    Register
                </SubmitButton>

            </form>
        </>
    )
}

const UserForm = ({ formData, handleChange, setFormData, handleRegister }) => {

    const navigate = useNavigate()
    const { scrollTop } = useScrollTop()

    const [confirmPassword, setConfirmPassword] = useState('')

    const valid = formData.name && formData.email && formData.phoneNumber && (formData.password.length > 0 && formData.password === confirmPassword)

    return (
        <>
            <form className="w-full grid grid-cols-2 max-w-[32rem] mx-auto mt-10 tmd:mt-24 p-4 gap-3">
                <div className='col-span-2 flex items-center gap-5 mb-3'>
                    <button className='bg-white shadow p-2 rounded-md scale-75 transition-all hover:scale-95' onClick={() => { scrollTop(); navigate(-1) }}>
                        <ArrowLeft />
                    </button>
                    <h1 className='font-mon text-slate-950 font-600 text-3xl fxsm:text-xl'>Registering as a Student</h1>
                </div>
                <div className='flex flex-col col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="name">Name</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        placeholder="Enter name"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm'
                        maxLength='100'
                        minLength='5'
                        onChange={(e) => { handleChange(e); setFormData(prev => ({ ...prev, role: 'student' })) }}
                        value={formData.name}
                    />
                </div>

                <div className='flex flex-col col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="email">Email</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        placeholder="Enter email"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        onChange={handleChange}
                        value={formData.email}
                    />
                </div>

                <div className='flex flex-col col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="phoneNumber">Phone Number</label>
                    <input
                        type="number"
                        name="phoneNumber"
                        id="phoneNumber"
                        required
                        placeholder="Enter contact number"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        onChange={handleChange}
                        value={formData.phoneNumber}
                    />
                </div>

                <div className='flex flex-col cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="password">Password</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        autoComplete='off'
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        placeholder="Enter password"
                        onChange={handleChange}
                        value={formData.password}
                    />
                </div>

                <div className='flex flex-col relative cfsm:col-span-2'>
                    <label className='text-sm mb-1 font-500' htmlFor="password">Confirm Password</label>
                    <input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        autoComplete='off'
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        placeholder="Confirm Password"
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword}
                    />
                    {formData.password !== confirmPassword && (
                        <p className='absolute -bottom-5 font-karla font-700 text-base text-red-600'>Password does not match</p>
                    )}
                </div>

                <SubmitButton divStyle='col-span-2 w-full mt-4' valid={valid} action={(e) => handleRegister.mutate(e)}>
                    Register
                </SubmitButton>

            </form>
        </>
    )
}