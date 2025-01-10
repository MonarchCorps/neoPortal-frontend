import Header from '../partials/Header/Header'
import Footer from '../partials/Footer/Footer'
import Faq from '../Faq/Faq'

const aboutHeroImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735381996/Exam_Portal/ggxgya6vedqxxlokq2vb.jpg'
const aboutDescImg = 'https://res.cloudinary.com/dh5a8opoe/image/upload/q_auto/f_auto/v1735382068/Exam_Portal/tyhu1sxoexjkpssxszhk.jpg'

function About() {
    return (
        <>
            <Header />
            <main>
                <section>
                    <div className='relative'>
                        <img
                            src={aboutHeroImg}
                            className='h-[90vh] w-full object-cover -z-10 select-none'
                            alt="About image"
                            loading="lazy"
                        />
                        <div className='absolute top-[40%] left-10 max-w-[50rem]'>
                            <h1 className='font-mon font-800 text-[#fff] text-4xl mb-2 sm:text-3xl'>Empowering Knowledge: <span className='text-red-900'>Seamless Exam Creation and Participation</span></h1>
                            <p className='text-[#000] text-base/relaxed font-500 leading-[1.6] sm:text-sm/relaxed'>
                                Build, upload, and take exams effortlessly with our intuitive portal. Designed for exam creators and participants, our platform streamlines the process with advanced features for a secure, scalable assessment experience.
                            </p>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 items-center py-5 px-4 gap-8 hlg:grid-cols-1 hlg:max-w-[40rem] mx-auto'>
                        <img
                            src={aboutDescImg}
                            className='rounded-md'
                            alt="About image"
                            loading="lazy"
                        />
                        <div>
                            <h1 className='font-mon font-700 text-3xl mb-4'>Know more about Us</h1>
                            <p className='font-karla'>
                                <p>This platform empowers users to seamlessly create, upload, and take exams, catering to diverse needs across education, enterprises, and government sectors. It provides a user-friendly interface for exam creators to design assessments and share them with participants effortlessly. Advanced AI-driven features ensure secure and fair exams by detecting suspicious activities and enhancing integrity. The platform integrates seamlessly with Learning Management Systems (LMS) and Student Information Systems (SIS), streamlining processes and fostering a cohesive experience.</p>
                                <br />
                                <p>Offering scalable solutions, it supports institutions of any size, enabling tailored exam experiences with customizable templates and adaptive workflows. Participants benefit from an intuitive interface, ensuring a smooth and efficient exam-taking process. Designed with innovation and reliability, this platform prioritizes security, adaptability, and user satisfaction, redefining how assessments are conducted in the digital age. Ideal for both administrators and participants, it transforms traditional exam management into a modern, efficient solution.</p>
                            </p>
                        </div>
                    </div>
                    <Faq />
                </section>
            </main>
            <Footer />
        </>
    )
}

export default About