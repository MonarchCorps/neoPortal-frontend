import useAuth from '@/hooks/useAuth'
import useExamQuestions from '@/hooks/useExamQuestions'
import useScrollTop from '@/hooks/useScrollTop'
import { useMutation } from '@tanstack/react-query'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import Loading2 from '../Loaders/Loading2'
import useAxiosPrivate from '@/hooks/useAxiosPrivate'

function CbtExamConfig() {
    const { auth } = useAuth()
    const axiosPrivate = useAxiosPrivate()

    const navigate = useNavigate()
    const location = useLocation();

    const { scrollTop } = useScrollTop()

    const { setQuestions } = useExamQuestions()

    const subjectExams = JSON.parse(localStorage.getItem('neoPortal_subject_exams')) || []

    const [details, setDetails] = useState(subjectExams)
    const [examType, setExamType] = useState('all')
    const [duration, setDuration] = useState({
        hour: 0,
        mins: 1
    })

    useEffect(() => {
        const storedSubjectExams = JSON.parse(localStorage.getItem('neoPortal_subject_exams'))
        if (!storedSubjectExams) {
            return navigate('/cbt-practice')
        }
    }, [navigate])

    const handleChange = (e) => {
        const { name, value } = e.target
        const updatedSubjects = subjectExams.map(subject => {
            if (name === subject.subjectName) {
                return {
                    ...subject,
                    noOfQuestions: parseInt(value)
                }
            }
            return subject
        })

        localStorage.setItem('neoPortal_subject_exams', JSON.stringify(updatedSubjects))
        setDetails(updatedSubjects)
    }

    const handleSetDuration = (e) => {
        const { name, value } = e.target
        setDuration(prev => ({
            ...prev,
            [name]: value
        }))
    }


    const { mutate: handleStartExam, isPending } = useMutation({
        mutationFn: () => {
            return axiosPrivate.post(`/start-exam/${auth?._id}`, {
                examId: uuidv4(),
                examType,
                details,
                duration: `${duration.hour}hr ${duration.mins}mins`,
                examMode: 'practice'
            }, {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            })
        },
        onSuccess: ({ data }) => {
            scrollTop()
            setQuestions(data)
            if (data?.msg) {
                toast.error(data?.msg)
            }
            sessionStorage.setItem('neoPortal_current_exam', JSON.stringify(data?.examId))
            navigate('/cbt-practice/exam')
        },
        onError: (error) => {
            const errorMessage = error?.response?.data?.message || 'Failed to start exam';
            toast.error(error.response ? errorMessage : 'No server response');
        }
    })

    return (
        <>
            <h2 className='mt-8 mb-5 font-sans text-3xl text-slate-950 opacity-80 font-500'>
                Exam Configuration 📚
            </h2>
            <p className='font-poppins mb-4 text-xl font-500'>Number of questions</p>
            <ul className='flex flex-col gap-3'>

                {details.map((subject, i) => {
                    return (
                        <li key={i} className='flex flex-col gap-3'>
                            <label htmlFor={subject.subjectName.replace(/\s+/g, '-')} className='font-poppins font-500 text-base opacity-85 text-slate-950 capitalize'>{subject.subjectName.replace(/-/g, ' ')}</label>
                            <select
                                name={subject.subjectName.replace(/\s+/g, '-')}
                                id={subject.subjectName.replace(/\s+/g, '-')}
                                className='border w-full p-2 rounded-md'
                                onChange={handleChange}
                                value={details.find(opt => opt.subjectName.toLowerCase() === subject.subjectName.replace(/-/g, ' '))?.noOfQuestions || 5}
                            >
                                <option value="5">5</option>
                                <option value="10">10</option>
                                <option value="15">15</option>
                                <option value="20">20</option>
                                <option value="25">25</option>
                                <option value="30">30</option>
                                <option value="35">35</option>
                                <option value="40">40</option>
                                <option value="45">45</option>
                                <option value="50">50</option>
                                <option value="55">55</option>
                                <option value="60">60</option>
                                <option value="65">65</option>
                                <option value="70">70</option>
                                <option value="75">75</option>
                                <option value="80">80</option>
                                <option value="85">85</option>
                                <option value="90">90</option>
                                <option value="95">95</option>
                                <option value="100">100</option>
                            </select>
                        </li>
                    )
                })}
            </ul>
            <div className='mt-10 text-2xl'>
                <p className='font-poppins mb-6 text-xl font-500'>Exam duration</p>
                <div className='grid grid-cols-2 hxsm:grid-cols-1 gap-4'>
                    <div>
                        <label htmlFor='hour' className='font-roboto font-400 text-xl opacity-85 text-slate-950'>Hour</label>
                        <select
                            name="hour"
                            id="hour"
                            className='border w-full p-2 mt-2 rounded-md text-base'
                            onChange={handleSetDuration}
                        >
                            <option value="0">0</option>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                        </select>
                    </div>
                    <div>
                        <label htmlFor='minutes' className='font-roboto font-400 text-xl opacity-85 text-slate-950'>Minutes</label>
                        <select
                            name="mins"
                            id="mins"
                            className='border w-full p-2 mt-2 rounded-md text-base'
                            onChange={handleSetDuration}
                        >
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                            <option value="32">32</option>
                            <option value="33">33</option>
                            <option value="34">34</option>
                            <option value="35">35</option>
                            <option value="36">36</option>
                            <option value="37">37</option>
                            <option value="38">38</option>
                            <option value="39">39</option>
                            <option value="40">40</option>
                            <option value="41">41</option>
                            <option value="42">42</option>
                            <option value="43">43</option>
                            <option value="44">44</option>
                            <option value="45">45</option>
                            <option value="46">46</option>
                            <option value="47">47</option>
                            <option value="48">48</option>
                            <option value="49">49</option>
                            <option value="50">50</option>
                            <option value="51">51</option>
                            <option value="52">52</option>
                            <option value="53">53</option>
                            <option value="54">54</option>
                            <option value="55">55</option>
                            <option value="56">56</option>
                            <option value="57">57</option>
                            <option value="58">58</option>
                            <option value="59">59</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className='mt-10 text-2xl'>
                <label htmlFor='questionType' className='font-poppins text-xl font-500'>Question Type</label>
                <select
                    name='questionType'
                    id='questionType'
                    className='border w-full p-2 mt-5 rounded-md text-base'
                    onChange={(e) => setExamType(e.target.value)}
                >
                    <option value="all">All</option>
                    <option value="jamb">Jamb</option>
                    <option value="waec">Waec</option>
                    <option value="postUtme">Post Utme</option>
                </select>
            </div>
            <div className='mt-8 mb-5 ixsm:grid ixsm:grid-cols-2 cfsm:grid-cols-1 place-content-center ixsm:gap-y-4'>
                {isPending ? (
                    <button
                        type='button'
                        disabled
                    >
                        <Loading2 text='Starting exam' data='' isLoading={isPending} className='opacity-65 border-2 border-solid border-[#1F509A] bg-[#1F509A] text-[#fff] shadow-sm p-3 transition-all duration-300 hover:text-[#1F509A] hover:bg-[#eee] hover:rounded-md' />
                    </button>
                ) : (
                    <button
                        onClick={() => {
                            if (!auth?._id) {
                                navigate('/auth', { state: { from: location } });

                            } else {
                                handleStartExam()
                            }
                        }}
                        className='border-2 border-solid border-[#1F509A] bg-[#1F509A] text-[#fff] shadow-sm p-3 transition-all duration-300 hover:text-[#1F509A] hover:bg-[#eee] hover:rounded-md'>
                        Start Exam
                    </button>
                )}
                <Link onClick={scrollTop} to='/cbt-practice' className='ml-3 cfsm:ml-0 border-2 border-solid border-gray-700 bg-gray-700 text-[#fff] shadow-sm p-3 transition-all duration-300 hover:text-gray-700 hover:bg-[#eee] hover:rounded-md text-center'>
                    Change Subjects
                </Link>
                <button onClick={() => {
                    localStorage.removeItem('neoPortal_subject_exams')
                    navigate('/cbt-practice')
                    scrollTop()
                }}
                    className='ml-3 ixsm:ml-0 border-2 border-solid border-gray-700 bg-gray-700 text-[#fff] shadow-sm py-2 px-4 rounded-md transition-all duration-300 hover:text-gray-700 hover:bg-[#eee] hover:rounded-none'>
                    Leave
                </button>
            </div>
        </>
    )
}

export default CbtExamConfig