/* eslint-disable react/prop-types */
import SubmitButton from '@/components/SubmitButton'

function LoginForm({ formData, handleChange, handleLogin }) {

    const valid = formData.state && formData.password

    return (
        <>
            <form className="size-full grid grid-cols-1 h-fit items-center justify-center max-w-[30rem] mx-auto mt-20 p-4 gap-y-1">
                <h1 className='col-span-full mb-5 text-3xl font-serif cfsm:text-2xl'>
                    Login to your account
                    <span className='ml-2 text-sm align-middle'>
                        <span className='bg-[#1F509A] p-1 text-[#fff]'>N</span><span className='text-[#fff] p-1 bg-slate-900'> P</span>
                    </span>
                </h1>
                <div className='flex flex-col w-full mb-4'>
                    <label className='text-sm mb-1 font-500' htmlFor="state">Enter name or email</label>
                    <input
                        type="text"
                        name="state"
                        id="state"
                        required
                        placeholder="Name or email"
                        className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                        onChange={handleChange}
                        value={formData.state}
                    />
                </div>

                <div className='flex flex-col w-full'>
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

                <SubmitButton divStyle='w-full mt-4' valid={valid} action={(e) => handleLogin.mutate(e)}>
                    Login
                </SubmitButton>

            </form>
        </>
    )
}

export default LoginForm