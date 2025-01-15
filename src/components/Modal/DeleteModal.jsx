/* eslint-disable react/prop-types */
export function DeleteModal({ children }) {
    return (
        <div className="fixed top-0 left-0 bottom-0 right-0 w-full overflow-hidden flex items-center justify-center bg-black bg-opacity-50 z-[2000]">
            <div className="bg-white p-5 rounded max-w-[30rem] text-center">
                {children}
            </div>
        </div>
    )
}

export function DeleteCancelButton({ onClick, className, style }) {
    return (
        <button
            onClick={(event) => {
                onClick?.(event)
            }}
            className={`px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 ${className}`}
            style={{ ...style }}
        >
            Cancel
        </button>
    )
}

export function DeleteConfirmButton({ onClick, className, style }) {
    return (
        <button
            onClick={(event) => {
                onClick?.(event)
            }}
            className={`px-4 py-2 bg-[#608BC1] text-white rounded hover:bg-[#1F509A] ${className}`}
            style={{ ...style }}
        >
            Confirm
        </button>
    )
}