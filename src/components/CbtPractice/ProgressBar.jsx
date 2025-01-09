/* eslint-disable react/prop-types */
import { formatTime } from '@/utils/timeFormatter'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'

const ProgressBar = ({ startTime, endTime, setTimeLeft, handleSubmit }) => {
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const totalDuration = new Date(endTime).getTime() - new Date(startTime).getTime()
        const interval = setInterval(() => {
            const elapsedTime = Date.now() - new Date(startTime).getTime()
            const remainingTime = Math.max(0, totalDuration - elapsedTime)

            setTimeLeft(remainingTime)
            const newProgress = Math.max(0, (remainingTime / totalDuration) * 100)
            setProgress(newProgress)

            if (remainingTime <= 0) {
                clearInterval(interval)
                toast((t) => (
                    <span>
                        Times&apos; up! Submitting the exam&nbsp;
                        <button className='bg-gray-200 px-2 py-2 rounded-md' onClick={() => toast.dismiss(t.id)}>
                            Dismiss
                        </button>
                    </span>
                ));
                handleSubmit()
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [startTime, endTime, setTimeLeft, handleSubmit]);

    return (
        <div>
            <div style={{ width: '100%', backgroundColor: '#e0e0e0', borderRadius: '999px' }}>
                <div
                    style={{
                        width: `${progress}%`,
                        height: '10px',
                        backgroundColor: '#c43434',
                        borderRadius: '999px',
                    }}
                ></div>
            </div>
            <div className='chmd:flex chmd:justify-between chmd:items-center'>
                <span className="font-500 font-mon text-base hidden chmd:block csm:text-sm">{startTime ? formatTime(startTime) : '00'}</span>
                <div className="text-center mt-2">{Math.floor(progress)}%</div>
                <span className="font-500 font-mon text-base hidden chmd:block csm:text-sm">{endTime ? formatTime(endTime) : '00'}</span>
            </div>
        </div>
    );
};

export default ProgressBar
