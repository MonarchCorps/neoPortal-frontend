function LeftHero() {
    return (
        <div className="w-1/2 hrmd:w-full hrmd:max-w-[30rem] hrmd:shadow-sm hrmd:p-2">
            <h1 className="font-sans text-slate-950 font-700 text-5xl mb-6 break-words hlg:text-4xl hrmd:font-600 asm:text-2xl">
                <span className="text-[#133E87]">Online Exam Hub:</span>  Your Path to Exam Success Starts Here
            </h1>
            <div className="mb-10">
                <p className="font-mon tracking-tight font-500 hlg:text-sm hrmd:font-600 asm:text-xs">
                    Take exams <span className="font-600 text-[#1F509A]">anytime</span>, <span className="font-600 text-[#1F509A]">anywhere</span>, and get <span className="font-600 text-[#1F509A]">real-time</span> results. It&apos;s the next generation of testing made simple.
                </p>
                <br />
                <p className="font-mon tracking-tight font-500 hlg:text-sm hrmd:font-600 asm:text-xs">
                    Experience a smooth, reliable, and fast exam platform that helps you succeed, whether you&apos;re studying for a certification or skill test.
                </p>
            </div>
            <button className="font-500 text-slate-50 bg-[#133E87] px-5 py-4 rounded-md shadow-md transition hover:bg-white hover:text-[#133E87] hover:border hover:border-solid hover:border-[#133E87]">
                Get Started
            </button>
        </div>
    )
}

export default LeftHero