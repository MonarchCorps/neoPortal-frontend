/* eslint-disable react/prop-types */
function SubmitButton({ divStyle = '', valid = false, action, children }) {
    return (
        <div className={`${divStyle}`}>
            <button
                type="submit"
                className={`text-[#f2f2f2] text-sm h-12 w-full rounded-[10px] shadow-sm shadow-[#241a1a] font-500 ${(!valid) ? 'opacity-45 bg-[#000000]' : 'bg-[#1b1b1b]'}`}
                disabled={!valid}
                onClick={action}
            >
                {children}
            </button>
        </div>
    )
}

export default SubmitButton