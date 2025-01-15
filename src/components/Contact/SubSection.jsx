import Appointment from "./Appointment"
import Partner from "./Partner"

function SubSection() {
    return (
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-9 gap-y-5 w-full">
            <Appointment />
            <Partner />
        </div>
    )
}

export default SubSection
