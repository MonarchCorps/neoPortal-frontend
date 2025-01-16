/* eslint-disable react/prop-types */
import SubmitButton from "../SubmitButton"

function LiveExamLogin({ handleChange, handleLoginToLiveExam, formData }) {
    return (
        <form className="w-full" onSubmit={(e) => {
            e.preventDefault()
            handleLoginToLiveExam.mutate()
        }}>
            <h1 className="text-slate-950 opacity-85 text-3xl mb-3 font-600">Start Live Exam</h1>
            <div className='flex flex-col w-full mb-4'>
                <label className='text-sm mb-[0.4rem] font-500' htmlFor="liveId">Exam ID</label>
                <input
                    type="text"
                    name="liveId"
                    id="liveId"
                    className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                    placeholder="Enter Exam ID"
                    onChange={handleChange}
                />
            </div>
            <div className='flex flex-col w-full mb-4'>
                <label className='text-sm mb-[0.4rem] font-500' htmlFor="email">Email</label>
                <input
                    type="email"
                    name="email"
                    id="email"
                    className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full bg-[#def5ff]'
                    placeholder="Enter Email"
                    value={formData.email}
                    readOnly
                    title="Name: readOnly"
                />
            </div>
            <div className='flex flex-col w-full mb-4'>
                <label className='text-sm mb-[0.4rem] font-500' htmlFor="name">User name</label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full bg-[#def5ff]'
                    placeholder="Enter Name"
                    value={formData.name}
                    readOnly
                    title="Email: readOnly"
                />
            </div>

            <SubmitButton divStyle='w-full mt-8' valid={true}>
                Start Exam
            </SubmitButton>

        </form>
    )
}

export default LiveExamLogin