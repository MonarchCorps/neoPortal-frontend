import { useState } from 'react'
import { evaluate } from 'mathjs'
import { X } from 'lucide-react';

function Calculator({ setIsOpen, isOpen }) {
    const [input, setInput] = useState('0');

    const handleClick = (value) => {
        setInput(input + value);
    };

    const handleClear = () => {
        setInput('');
    };

    const handleDelete = () => {
        setInput(input.slice(0, -1));
    };

    const handleCalculate = () => {
        try {
            const result = evaluate(input);
            setInput(result.toString());
        } catch {
            setInput('Error');
        }
    };

    const vals = [
        { id: 1, text: '7', style: 1 },
        { id: 2, text: '8', style: 1 },
        { id: 3, text: '9', style: 1 },
        { id: 4, text: 'Del', style: 3, onClick: handleDelete },
        { id: 5, text: '4', style: 1 },
        { id: 6, text: '5', style: 1 },
        { id: 7, text: '6', style: 1 },
        { id: 8, text: '+', style: 2 },
        { id: 9, text: '1', style: 1 },
        { id: 10, text: '2', style: 1 },
        { id: 11, text: '3', style: 1 },
        { id: 12, text: '-', style: 2 },
        { id: 13, text: '.', style: 2 },
        { id: 14, text: '0', style: 1 },
        { id: 15, text: '/', style: 2 },
        { id: 16, text: '*', style: 2 },
    ]

    return (
        <div className='w-[20rem] mx-10 bg-[#fff]'>
            <div className='bg-[#181e34] text-end text-[#fff] text-4xl px-4 py-2 h-28 shadow-md rounded-md'>
                <span className='cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
                    <X />
                </span>
                {input || '0'}
            </div>
            <div className='mt-5 grid grid-cols-4 gap-x-5 gap-y-4 p-3 rounded'>
                {vals.map(val => {
                    return (
                        <button key={val.id} className={`py-2 shadow border-b-4 border-solid rounded-md 
                            ${val.style === 1
                                ? 'bg-[#dcdcdc]'
                                : val.style === 2 ? 'bg-[#17192e] border-[#0e131c] text-slate-50'
                                    : 'bg-[#f43d3d] border-[#d04b4b] text-[#fff]'
                            }`}
                            value={val.text} onClick={val?.onClick ? val?.onClick : (e) => handleClick(e.target.value.toString())}
                        >
                            {val.text}
                        </button>
                    )
                })}
                <button
                    className='col-span-2 bg-[#363957] border-[#1f2632] text-slate-50 py-2 shadow border-b-4 border-solid rounded-md'
                    onClick={handleClear}
                >
                    Reset
                </button>
                <button
                    className='col-span-2 bg-[#466e8d] border-[#14181e] text-slate-50 py-2 shadow border-b-4 border-solid rounded-md'
                    onClick={handleCalculate}
                >
                    =
                </button>
            </div>
        </div >
    );
}

export default Calculator;
