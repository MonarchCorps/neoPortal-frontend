import Header from '../partials/Header/Header'
import Footer from '../partials/Footer/Footer'
import { FaChevronRight } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import usePathAfterSlash from '@/hooks/usePathAfterSlash'
import ClassroomDescription from './ClassroomDescription'
import SubjectsList from './SubjectsList'

function Classroom() {

    const path = usePathAfterSlash(-1)

    return (
        <>
            <Header />
            <main>
                <section>
                    <div className='pt-40 w-[85%] max-w-[1204px] mx-auto'>
                        <h1 className='flex items-center'>
                            <Link to='/' className='text-[#344CB7]'>Home</Link>
                            <span><FaChevronRight className='text-sm mx-1 opacity-45' /></span>
                            <p className='font-300 text-[0.95rem] opacity-65'>{path}</p>
                        </h1>
                        <ClassroomDescription />
                        <SubjectsList />
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Classroom