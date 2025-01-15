import { useRef, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import useScrollTop from '@/hooks/useScrollTop'

const schoolImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735377912/Exam_Portal/spgya0nusjwyka6zbvsy.jpg'
// const teacherImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735377917/Exam_Portal/elmzvtdbw9li6aanqcko.jpg'
const teacherImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/f_auto,q_auto/v1/Exam_Portal/lhanig5rysfj4lzod4dd'

const studentImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735377927/Exam_Portal/o3zt5feniddphap6zt8t.jpg'

function RegisterCards() {

    const nextRef = useRef(null)
    const [persona, setPersona] = useState('')

    const navigate = useNavigate()
    const { scrollTop } = useScrollTop()

    useEffect(() => {
        if (persona) nextRef.current.scrollIntoView({ behavior: 'smooth' })
    }, [persona])

    const links = [
        { id: 1, name: 'School Institution', img: schoolImg, persona: 'school-institute' },
        { id: 2, name: 'Teacher/Tutor', img: teacherImg, persona: 'teacher' },
        { id: 3, name: 'Student/User', img: studentImg, persona: 'student' },
    ]

    const handleRedirect = (redirectUrl, persona) => {
        return navigate(`/register?redirectUrl=${redirectUrl}&persona=${persona}`)
    }

    return (
        <>
            <div className="pt-32 tmd:pt-44 max-w-[80%] mx-auto grid grid-cols-3 ilg:grid-cols-2 cimd:grid-cols-1 cimd:max-w-[30rem] msm:mx-4 gap-6">
                {links.map(rLink => {
                    return (
                        <button
                            key={rLink.id}
                            className={`shadow p-5 flex flex-col justify-between items-center rounded-xl cursor-pointer  border-solid focus:border-[#1F509A] ${persona == rLink.persona ? 'border-2 border-[#1F509A]' : ''}`}
                            onClick={() => {
                                if (persona === rLink.persona) {
                                    setPersona('')
                                } else {
                                    setPersona(rLink.persona)
                                }
                            }}
                        >
                            <img
                                src={rLink.img}
                                className='w-full h-[15rem] object-cover rounded-md'
                                alt={`${rLink.name} image`}
                                loading="eager"
                            />
                            <div className='mt-4 w-full text-center'>
                                <p className='font-mon font-600 text-base'>Register as</p>
                                <h1 className='font-karla text-xl tracking-tight'>{rLink.name}</h1>
                            </div>
                        </button>
                    )
                })}
            </div>
            <div className='w-full text-center mt-12' ref={nextRef}>
                <button
                    disabled={!persona}
                    className={`bg-[#344CB7] text-[#fff] py-3 px-7 rounded-md transition-all border border-solid shadow-inner ${!persona ? 'opacity-45' : 'hover:border-[#344CB7] hover:bg-[#fff] hover:text-[#344CB7] '}`}
                    onClick={() => { scrollTop(); handleRedirect('web', persona) }}
                >
                    Next
                </button>
            </div>
        </>
    )
}

export default RegisterCards