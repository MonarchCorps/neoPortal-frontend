import { useState } from 'react'

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

function Faq() {

    const [openItems, setOpenItems] = useState([]);

    const faqs = [
        { id: 1, title: 'What is this platform for?', desc: 'Our platform allows users to take practice exams, live exams, and register as teachers, schools, or individual users to access tailored features.' },
        { id: 2, title: 'How do I get started?', desc: ' Simply create an account and choose a role (User, Teacher, or School) during registration. Once registered, you can explore the features relevant to your role.' },
        { id: 3, title: 'What is Remote Proctoring?', desc: 'Remote Proctoring is a method of monitoring and supervising online exams, where a student is remotely monitored through audio and video technology to ensure the integrity of the examination process.' },
        { id: 4, title: 'How does Remote Proctoring works?', desc: 'Students log into a proctoring platform, which verifies their identity and monitors them throughout the exam using webcam and microphone. The software flags any suspicious behavior or unusual activities for further investigation.' },
        { id: 5, title: 'What are the benefits of proctored exams?', desc: 'Enhanced security, deterrence of cheating, fairness in evaluating student performance, convenience for both students and instructors.' },
        { id: 6, title: 'Can I take an online exam with remote proctoring on any device?', desc: 'Yes, you can typically take an online exam with remote proctoring on various devices, such as computers, laptops, tablets, and smartphones. However, check the specific requirements and guidelines from the exam provider or remote proctoring platform to ensure compatibility with your chosen device.' },
        { id: 7, title: 'Is it easy or difficult to cheat in a remote proctored online mode exam?', desc: 'Cheating in a remote proctored online exam is generally more difficult compared to traditional in-person exams. Remote proctoring employs various measures, such as live video monitoring, AI behavior analysis, screen recording, and secure browser integration, to deter and detect cheating attempts. While it is not impossible to cheat, the combination of these measures makes it challenging and significantly reduces the likelihood of successful cheating.' },
    ]

    const handleAccordionChange = (newValue) => {
        setOpenItems(newValue)
    }

    return (
        <section>
            <div className="max-w-[40rem] mx-auto mt-20 px-10">
                <div className="max max-w-[20rem] mx-auto text-center mb-5">
                    <button className='cursor-text select-text px-6 py-1 rounded-md bg-[#1F509A] text-slate-50 text-base font-600 mb-3'>
                        Faq
                    </button>
                    <h1 className='font-mon mb-2'>Most frequent questions and answers</h1>
                    <div className='bg-[#1F509A] h-1 w-full'></div>
                </div>
                <Accordion
                    type="multiple"
                    className="w-full"
                    value={openItems}
                    onValueChange={handleAccordionChange}
                >
                    {faqs.map(faq => {
                        return (
                            <AccordionItem value={faq.id} key={faq.id}>
                                <AccordionTrigger className={`font-mon text-start ${openItems.includes(faq.id) ? 'text-[#1F509A]' : ''}`} style={{ textDecoration: 'none', userSelect: 'text' }}>{faq.title}</AccordionTrigger>
                                <AccordionContent className='font-roboto'>
                                    {faq.desc}
                                </AccordionContent>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </div>
        </section>
    )
}

export default Faq