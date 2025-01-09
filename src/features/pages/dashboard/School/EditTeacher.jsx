/* eslint-disable react/prop-types */
import { Dialog, DialogClose, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { subjects } from "@/utils/subjects";
import { FaEdit } from "react-icons/fa";

function EditTeacher({ dialogCloseRef, handleEditTeacher, handleEditChange, editData, editEmptyField, setCurrTeacherId, teacherId }) {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <button className="text-slate-500 text-2xl" onClick={() => setCurrTeacherId(teacherId)}>
                    <FaEdit />
                </button>
            </DialogTrigger>
            <DialogContent className='rounded-md'>
                <DialogClose ref={dialogCloseRef} />
                <DialogHeader>
                    <DialogTitle className='text-start'>
                        <p>
                            Edit Teacher
                        </p>
                    </DialogTitle>
                </DialogHeader>
                <form
                    className="grid grid-cols-1 gap-x-4 gap-y-3 my-3"
                    onSubmit={(e) => {
                        e.preventDefault()
                        handleEditTeacher.mutate()
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
                            onChange={handleEditChange}
                            value={editData.name}
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
                            onChange={handleEditChange}
                            value={editData.email}
                        />
                    </div>

                    <div className='flex flex-col mb-3'>
                        <label className='text-sm mb-1 font-500 text-slate-900' htmlFor="assignedSubject">Subject</label>
                        <select
                            name="assignedSubject"
                            id="assignedSubject"
                            className="p-2 rounded font-karla outline-none border border-solid border-red-100"
                            onChange={handleEditChange}
                            value={editData.assignedSubject}
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
                            }}>
                            Discard
                        </button>
                        <button type='submit'
                            className={`bg-[#000] text-[#fff] font-mon font-600 text-base mr-3 px-3 py-2 rounded-md shadow ${editEmptyField || handleEditTeacher.isPending ? 'opacity-70 cursor-default' : ''}`}
                        >
                            {handleEditTeacher.isPending ? 'Updating...' : 'Update'}
                        </button>
                    </div>
                </form>

            </DialogContent>
        </Dialog>
    )
}

export default EditTeacher