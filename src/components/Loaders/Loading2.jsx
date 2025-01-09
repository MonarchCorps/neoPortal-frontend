/* eslint-disable react/prop-types */
function Loading2({ text, data, isLoading, className }) {
    return (
        isLoading && (
            <div className={className} >
                <div className="loader2" data-value={`${text} ${data}...`}>
                </div>
            </div>
        )
    )
}

export default Loading2