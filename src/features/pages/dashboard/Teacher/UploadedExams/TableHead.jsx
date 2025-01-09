function TableHead() {
    return (
        <div className="grid grid-cols-[repeat(9,minmax(0,1fr)),50px] bg-[#f2f2f26d] px-6 py-[0.9rem] rounded-xl mb-5">
            <div className='col-span-2 grid grid-cols-[40px,1fr] gap-4'>
                <p className='font-500 font-poppins text-base'>S/N</p>
                <p className='font-500 font-poppins text-base'>Exam Year</p>
            </div>
            <p className='font-500 font-poppins text-base text-center'>Exam Type</p>
            <p className='font-500 font-poppins text-base col-span-2 text-center'>Subject</p>
            <p className='font-500 font-poppins text-base col-span-2 text-center'>Questions Uploaded</p>
            <p className='font-500 font-poppins text-base text-center'>Mode</p>
            <p className='font-500 font-poppins text-base text-center'>
                Status
            </p>
            <div>
                <span>
                </span>
            </div>
        </div>
    )
}

export default TableHead