/* eslint-disable react/prop-types */
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { subjects } from "@/utils/subjects"
import { FaPlus } from "react-icons/fa"

function AddTeacher({ dialogCloseRef, handleAddTeacher, handleChange, formData, setFormData, emptyField }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <div className='flex justify-end'>
                    <button type="button" className='flex items-center gap-2 border-2 border-solid border-red-600 text-red-600 shadow-sm p-3 transition-all duration-300 hover:bg-red-600 hover:text-[#eee] hover:rounded-lg'>
                        <FaPlus />
                        Add a Teacher
                    </button>
                </div>
            </DialogTrigger>
            <DialogContent className='rounded-md'>
                <DialogClose ref={dialogCloseRef} />
                <DialogHeader>
                    <DialogTitle className='text-start'>
                        <p>
                            Add Teacher
                        </p>
                    </DialogTitle>
                </DialogHeader>
                <form
                    className="grid grid-cols-1 gap-x-4 gap-y-3 my-3"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleAddTeacher.mutate()
                    }}
                >

                    <div className='flex flex-col w-full'>
                        <label className='text-sm mb-1 font-500 text-slate-900' htmlFor="email">Teacher Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            required
                            placeholder="Name"
                            className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                            onChange={handleChange}
                            value={formData.name}
                        />
                    </div>

                    <div className='flex flex-col w-full'>
                        <label className='text-sm mb-1 font-500 text-slate-900' htmlFor="email">Teacher Email</label>
                        <input
                            type="email"
                            name="email"
                            id="email"
                            required
                            placeholder="Email"
                            className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                            onChange={handleChange}
                            value={formData.email}
                        />
                    </div>

                    <div className='flex flex-col mb-3'>
                        <label className='text-sm mb-1 font-500 text-slate-900' htmlFor="subject">Subject</label>
                        <select
                            name="subject"
                            id="subject"
                            className="p-2 rounded font-karla outline-none border border-solid border-red-100"
                            onChange={handleChange}
                            value={formData.subject}
                        >
                            <option value="subject">Subject</option>
                            {subjects.map(subject => (
                                <option key={subject.id} value={subject.text.replace(/\s+/g, '-').toLowerCase()}>
                                    {subject.text}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <button
                            type='button'
                            className="bg-red-600 text-[#fff] font-mon font-600 text-base mr-3 px-3 py-2 rounded-md shadow"
                            onClick={() => {
                                dialogCloseRef.current?.click();
                                setFormData({
                                    name: '',
                                    email: '',
                                    subject: ''
                                })
                            }}>
                            Discard
                        </button>
                        <button type='submit'
                            className={`bg-[#000] text-[#fff] font-mon font-600 text-base mr-3 px-3 py-2 rounded-md shadow ${emptyField ? 'opacity-70' : ''}`}
                        >
                            Add Teacher
                        </button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default AddTeacher