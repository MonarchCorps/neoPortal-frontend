import { Link } from 'react-router-dom'
import useScrollTop from '@/hooks/useScrollTop'
import { subjects } from '@/utils/subjects'
import { useState } from 'react'

function CbtSubjects() {

    const { scrollTop } = useScrollTop()

    const prevOptions = JSON.parse(localStorage.getItem('neoPortal_subject_exams')) || []
    const [subjectExams, setSubjectExams] = useState(prevOptions)

    const handleChange = (value) => {
        const prevOptions = JSON.parse(localStorage.getItem('neoPortal_subject_exams')) || [];

        const existingOption = prevOptions.find(opt => opt.subjectName === value);

        if (!existingOption) {
            const updatedOptions = [...prevOptions, { subjectName: value, noOfQuestions: 5 }];
            localStorage.setItem('neoPortal_subject_exams', JSON.stringify(updatedOptions));
            setSubjectExams(updatedOptions);
        } else {
            const updatedOptions = prevOptions.filter(opt => opt.subjectName !== value);
            localStorage.setItem('neoPortal_subject_exams', JSON.stringify(updatedOptions));
            setSubjectExams(updatedOptions);
        }
    }

    return (
        <>
            <h2 className='mt-8 mb-5 font-sans text-3xl text-slate-950 opacity-80 font-500 fxsm:text-2xl'>
                Start Practice Exam 📖
            </h2>
            <div>
                <ul className='flex flex-col gap-2'>
                    {subjects.map(subject => {
                        return (
                            <li key={subject.id} className='flex items-center gap-4 font-poppins font-400 text-base fxsm:text-sm'>
                                <input
                                    type="checkbox"
                                    name={`${subject.id} box`}
                                    id={`${subject.id} box`}
                                    className='size-4 appearance-auto border'
                                    checked={subjectExams.some(opt => opt.subjectName === subject.text.replace(/\s+/g, '-').toLowerCase())}
                                    onChange={() => handleChange(subject.text.replace(/\s+/g, '-').toLowerCase())}
                                />
                                <p>{subject.text}</p>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <div className='border-y border-solid border-y-gray-200 py-5 mt-4'>
                <Link to='exam-config' onClick={scrollTop} className='border-2 border-solid border-[#1F509A] text-[#1F509A] shadow-sm p-2 rounded-md transition-all duration-300 hover:bg-[#1F509A] hover:text-[#eee]'>
                    Configure Exam
                </Link>
            </div>
        </>
    )
}

export default CbtSubjects