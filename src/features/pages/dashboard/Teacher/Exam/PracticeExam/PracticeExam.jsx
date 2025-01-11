import { useEffect, useState } from 'react'
import { getYears } from '@/utils/getYears'
import { subjects } from '@/utils/subjects'
import { MdOutlineClass } from 'react-icons/md'
import useScrollTop from '@/hooks/useScrollTop'
import QuestionsEditor from './QuestionsEditor'
import useAuth from '@/hooks/useAuth'

function PracticeExam() {

    const { auth } = useAuth()
    const { scrollTop } = useScrollTop()

    const features = [
        { id: 1, text: 'Instant Access:', content: 'Exams become available to students as soon as they are uploaded, allowing them to start preparing without delay.' },
        { id: 2, text: 'Secure Uploads:', content: 'Your exam files are securely processed and stored, ensuring safe and seamless handling throughout the upload process.' },
        { id: 3, text: 'Effortless Management:', content: 'Easily organize and manage all your practice exams in one place, streamlining the preparation process for both instructors and students.' },
        { id: 4, text: 'Tracking and Analytics:', content: 'Gain insights into student engagement and performance, helping you improve future exams and assessments.' }
    ]

    const [formData, setFormData] = useState({
        examType: '',
        examYear: '',
        subject: auth?.assignedSubject || '',
    })

    const [step, setStep] = useState(1)

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const valid = Object.values(formData).every(data => data !== '');

    const [proceed, setProceed] = useState(false)

    useEffect(() => {
        const handleBeforeUnload = (event) => {
            const message = "Are you sure you want to leave? Any unsaved changes will be lost.";
            event.returnValue = message;
            return message;
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, []);

    return (
        <section>
            <div className='mt-10 pt-10 himd:mt-20 px-5 pb-5 w-[85%] max-w-[950px] mx-auto shadow'>
                {step === 1 ? (
                    <>
                        <h1 className='text-4xl sm:text-3xl axsm:text-2xl font-500'>
                            <span className='inline-block'> Upload Practice Exam</span>
                            <span className='text-red-600 inline-block align-middle ml-2 -mt-1'>
                                <MdOutlineClass />
                            </span>
                        </h1>
                        <div className="border-l-4 border-solid border-red-700 ml-10 chsm:ml-5 mt-6 p-2 shadow axsm:text-sm/relaxed">
                            <p>
                                Effortlessly upload your practice exams to our platform, providing students with immediate access to valuable resources for exam preparation.
                            </p>
                            <br />
                            <p>
                                Easily manage and organize your practice exams, ensuring a smooth and efficient experience for both instructors and students.
                            </p>
                        </div>
                        <div className='mt-12 mb-8'>
                            <h1 className='font-mon font-600 text-2xl mb-4 axsm:text-xl'>Key Features of Uploading Practice Exams</h1>
                            <ol className='max-w-[40rem] list-decimal px-5'>
                                {features.map(feature => {
                                    return (
                                        <li key={feature.id} className='mb-4'>
                                            <h1 className='font-poppins font-600 text-base text-slate-950 mb-1'>{feature.text}</h1>
                                            <p className='text-sm/relaxed font-poppins'>{feature.content}</p>
                                        </li>
                                    )
                                })}
                            </ol>
                        </div>
                        <div>
                            <h2 className='text-red-500 font-roboto text-3xl mb-3'>Set Exam Details</h2>
                            <div className='flex flex-col mb-3'>
                                <label className='text-sm mb-2 font-500' htmlFor="examType">Exam Type</label>
                                <select
                                    name="examType"
                                    id="examType"
                                    className="p-2 rounded font-karla outline-none border border-solid border-red-100"
                                    onChange={handleChange}
                                    value={formData.examType}
                                >
                                    <option value="type">Type</option>
                                    <option value="waec">Waec</option>
                                    <option value="jamb">Jamb</option>
                                    <option value="neco">Neco</option>
                                    <option value="postUtme">Post Utme</option>
                                </select>
                            </div>

                            <div className='flex flex-col mb-3'>
                                <label className='text-sm mb-2 font-500' htmlFor="examType">Exam Year</label>
                                <select
                                    name="examYear"
                                    id="examYear"
                                    className="p-2 rounded font-karla outline-none border border-solid border-red-100"
                                    onChange={handleChange}
                                    value={formData.examYear}
                                >
                                    <option value="year">Year</option>
                                    {getYears().map((year) => (
                                        <option key={year} value={year}>
                                            {year}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex flex-col mb-3'>
                                <label className='text-sm mb-2 font-500' htmlFor="examType">Subject</label>
                                <select
                                    name="subject"
                                    id="subject"
                                    className="p-2 rounded font-karla outline-none border border-solid border-red-100"
                                    onChange={handleChange}
                                    value={formData.subject}
                                >
                                    {
                                        !auth?.assignedSubject ? (
                                            <>
                                                <option value="subject">Subject</option>
                                                {subjects.map(subject => (
                                                    <option key={subject.id} value={subject.text.replace(/\s+/g, '-').toLowerCase()}>
                                                        {subject.text}
                                                    </option>
                                                ))}
                                            </>
                                        ) : (
                                            <option value={auth?.assignedSubject}>{auth?.assignedSubject.toUpperCase()}</option>
                                        )
                                    }
                                </select>
                                {auth?.assignedSubject && <p className='text-sm text-red-600 mt-4 mb-2'>
                                    You have been assigned a default subject by your school institute. You can&apos;t change it.
                                    <span className='block text-[#000] font-poppins text-600'>Contact your institute for more details!</span>
                                </p>}
                            </div>

                            <div className='grid justify-end'>
                                <button
                                    type='submit'
                                    className={`mt-4 border-2 border-solid border-red-600 text-red-600 shadow-sm p-3 rounded-md transition-all duration-300  ${!valid || proceed ? 'opacity-60' : 'hover:bg-red-600 hover:text-[#eee]'}`}
                                    onClick={() => {
                                        setProceed(true)
                                        setTimeout(() => {
                                            scrollTop();
                                            setStep(2)
                                            setProceed(false)
                                        }, 1200)
                                    }}
                                    disabled={!valid}
                                >
                                    {!proceed ? 'Proceed' : 'Proceeding...'}
                                </button>
                            </div>
                        </div>
                    </>
                ) : (
                    <>
                        <QuestionsEditor setStep={setStep} formData={formData} />
                    </>
                )}
            </div >
        </section >
    )
}

export default PracticeExam