import useModal from "@/hooks/useModal";

const PersistentModal = () => {
    const { isModalOpen } = useModal()

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
            <div className="bg-white rounded-lg shadow-lg p-6 max-w-sm w-full text-center">
                <h2 className="text-2xl font-bold mb-4">Session Expired</h2>
                <p className="text-gray-700 mb-6">
                    Please log in again to continue using this application.
                </p>
                <button
                    onClick={() => (window.location.href = "/auth")}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                >
                    Log In
                </button>
            </div>
        </div>
    );
};

export default PersistentModal