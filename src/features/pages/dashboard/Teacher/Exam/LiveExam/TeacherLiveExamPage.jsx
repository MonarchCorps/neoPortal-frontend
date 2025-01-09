import { useEffect, useRef, useState } from 'react'
import QuestionsEditor from './QuestionsEditor'
import GenerateUniqueId from '../GenerateUniqueId';

function TeacherLiveExamPage() {

    const [formData, setFormData] = useState({
        liveId: '',
        startTime: '',
        endTime: ''
    })

    const dialogCloseRef = useRef(null)

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

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <section>
            <div className='mt-10 himd:mt-24 pt-10 px-5 pb-5 w-[85%] max-w-[950px] mx-auto shadow'>
                <GenerateUniqueId formData={formData} setFormData={setFormData} dialogCloseRef={dialogCloseRef} />
                <QuestionsEditor formData={formData} handleChange={handleChange} />
            </div >
        </section >
    )
}

export default TeacherLiveExamPage