import Appointment from "./Appointment"
import Partner from "./Partner"

function SubSection() {
    return (
        <div className="mt-10 grid grid-cols-2 place-content-center gap-x-9 gap-y-5">
            <Appointment />
            <Partner />
        </div>
    )
}

export default SubSection
