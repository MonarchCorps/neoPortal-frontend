import Header from '../partials/Header/Header'
import Footer from '../partials/Footer/Footer'
import { Button } from '../ui/button'

function Contact() {
    return (
        <>
            <Header />
            <main>
                <section>
                    <div className='pt-40 w-[85%] max-w-[700px] mx-auto'>
                        <h1 className='mb-3 font-600 text-4xl'>Contact Page</h1>
                        <div className='w-full grid grid-cols-2 gap-4'>
                            <div className='flex flex-col gap-1'>
                                <label htmlFor="name" className='text-base/relaxed font-500'>Name</label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    required
                                    placeholder="Enter name"
                                    className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                                />
                            </div>

                            <div className='flex flex-col gap-1'>
                                <label htmlFor="email" className='text-base/relaxed font-500'>Email</label>
                                <input
                                    type="email"
                                    name="email"
                                    id="email"
                                    required
                                    placeholder="Enter email"
                                    className='border-[1px] border-solid border-[#aeacac] h-[40px] p-2 rounded placeholder:text-sm w-full'
                                />
                            </div>

                            <div className='col-span-2 flex flex-col gap-1'>
                                <label htmlFor="content" className='text-base/relaxed font-500'>Content</label>
                                <textarea
                                    name="content"
                                    id="content"
                                    className='border-[1px] border-solid border-[#aeacac] h-64 p-2 rounded placeholder:text-sm w-full resize-none'
                                >

                                </textarea>
                            </div>

                            <div className='col-span-2'>
                                <Button className='w-28 h-12 text-base'>
                                    Send
                                </Button>

                            </div>

                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </>
    )
}

export default Contact