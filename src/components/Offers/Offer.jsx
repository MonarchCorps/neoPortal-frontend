import OfferCards from "./OfferCards"

function Offer() {
    return (
        <section className="bg-[#eef7ffab]">
            <div className="mt-3 py-20 max-w-[88%] mx-auto text-center">
                <div>
                    <h1 className="font-karla text-[#292828] font-500 text-3xl mb-4 cimd:text-xl">Streamlined, Secure Exam Management—Made for You</h1>
                    <p className="font-karla text-[#292828] font-400 text-base mb-8 max-w-[80%] mx-auto cimd:text-sm cimd:max-w-full">
                        Design, administer, and grade exams with unparalleled ease. Our platform simplifies the entire process, empowering you to create custom assessments tailored to each student’s needs
                    </p>
                </div>
                <OfferCards />
            </div>
        </section>
    )
}

export default Offer