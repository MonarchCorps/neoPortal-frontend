/* eslint-disable react/prop-types */
import 'react-date-range/dist/styles.css'
import 'react-date-range/dist/theme/default.css'
import { DateRangePicker } from 'react-date-range'
import { FaSearch } from 'react-icons/fa'
import { getYears } from '@/utils/getYears'
import { subjects } from '@/utils/subjects'
import { forwardRef } from 'react'

const Filter = forwardRef(({ isOpen, selectionRange, handleSelect }, ref) => {

    return (
        isOpen && (
            <div className="absolute top-16 right-0 bg-[#fff] shadow-shadow border border-solid border-[#33222219] rounded-md z-10 w-fit" ref={ref}>
                <p className='font-500 px-4 py-2 text-[0.93rem] border-b border-solid border-b-[#33222219] text-[#100f0f] mb-3'>Filter</p>
                <div>
                    <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                        <p className='font-500 text-[0.93rem] text-[#100f0f]'>Date range</p>
                        <button type="reset" className='outline-none border-none text-[#007d75] text-sm'>Reset</button>
                    </div>
                    <div className='flex flex-col gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2'>
                        <div className='flex justify-between'>
                            <p className='font-sans text-[0.89rem] text-[#151111]'>From: </p>
                            <p className='font-sans text-[0.89rem] text-[#151111]'>To: </p>
                        </div>
                        <DateRangePicker
                            ranges={[selectionRange]}
                            onChange={handleSelect}
                            editableDateInputs={true}
                            moveRangeOnFirstSelection={true}
                            className='w-fit'
                        />
                    </div>
                </div>
                <div className='max-h-40 overflow-scroll mb-4'>
                    <div>
                        <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                            <p className='font-500 text-[0.93rem] text-[#100f0f]'>Exam Type</p>
                            <button type="reset" className='outline-none border-none text-[#007d75] text-sm'>Reset</button>
                        </div>
                        <div className='flex gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2'>
                            <select name="gender" id="gender" className='text-sm border border-b-2 border-solid border-[#7c7a7a] rounded-xl w-full p-2' >
                                <option value="all">All</option>
                                <option value="waec">Waec</option>
                                <option value="jamb">Jamb</option>
                                <option value="neco">Neco</option>
                                <option value="postUtme">Post Utme</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                            <p className='font-500 text-[0.93rem] text-[#100f0f]'>Exam Year</p>
                            <button type="reset" className='outline-none border-none text-[#007d75] text-sm'>Reset</button>
                        </div>
                        <div className='flex gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2'>
                            <select name="roles" id="roles" className='text-sm border border-b-2 border-solid border-[#7c7a7a] rounded-xl w-full p-2' >
                                <option value="all">All</option>
                                {getYears().map((year) => (
                                    <option key={year} value={year}>
                                        {year}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                            <p className='font-500 text-[0.93rem] text-[#100f0f]'>Subject</p>
                            <button type="reset" className='outline-none border-none text-[#007d75] text-sm'>Reset</button>
                        </div>
                        <div className='flex gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2'>
                            <select name="roles" id="roles" className='text-sm border border-b-2 border-solid border-[#7c7a7a] rounded-xl w-full p-2' >
                                <option value="all">All</option>
                                {subjects.map((subject) => (
                                    <option key={subject.id} value={subject.text.toLowerCase()}>
                                        {subject.text}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                            <p className='font-500 text-[0.93rem] text-[#100f0f]'>Status</p>
                            <button type="reset" className='outline-none border-none text-[#007d75] text-sm'>Reset</button>
                        </div>
                        <div className='flex gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2'>
                            <select name="roles" id="roles" className='text-sm border border-b-2 border-solid border-[#7c7a7a] rounded-xl w-full p-2' >
                                <option value="all">All</option>
                                <option value="saved">Saved</option>
                                <option value="published">Published</option>

                            </select>
                        </div>
                    </div>
                    <div>
                        <div className='flex justify-between text-[0.90rem] mb-2 px-3'>
                            <p className='font-500 text-[0.93rem] text-[#100f0f]'>Keyword Search</p>
                            <button type="reset" className='outline-none border-none text-[#007d75] text-sm'>Reset</button>
                        </div>
                        <div className='flex gap-3 border-b border-solid border-b-[#33222219] px-3 pb-3 mb-2 relative'>
                            <span className='absolute text-[#8b8888] text-[1.2rem] top-[0.4rem] left-6 font-300'>
                                <FaSearch />
                            </span>
                            <input
                                type="text"
                                placeholder='Search...'
                                className='text-sm border px-10 border-b-2 border-solid border-[#7c7a7a] rounded-lg w-full p-2'
                            />
                        </div>
                    </div>
                </div>
                <div>
                    <div className='text-[0.90rem] mb-2 px-3'>
                        <button type="reset" className='outline-none text-sm border border-solid border-[#acabab] px-3 py-2 rounded-md' >Reset all</button>
                    </div>
                </div>
            </div>
        )
    )
});

Filter.displayName = "Filter"

export default Filter