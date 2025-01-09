import { FaBook, FaBookOpen, FaHome, FaUpload, FaUser } from "react-icons/fa"
import SidebarState from "../SimilarPages/SidebarState"
import { FaComputer } from "react-icons/fa6"

function SideBar() {

    const navLinks = [
        { id: 1, icon: <FaHome />, text: 'Dashboard', path: '' },
        {
            id: 2,
            text: 'Exam',
            children: [
                { id: 1, icon: <FaBookOpen />, text: 'Practice Exam', path: 'practice-exam' },
                { id: 2, icon: <FaBook />, text: 'Live Exam', path: 'live-exam' },
            ]
        },
        { id: 3, icon: <FaUpload />, text: 'Uploaded Exams', path: 'uploaded-exams' },
        { id: 4, icon: <FaUser />, text: 'Edit Profile', path: 'edit-profile' },
        { id: 5, icon: <FaComputer />, text: 'Monitor Students', path: 'monitor-students' },
    ]

    const extraLinks = [
        { id: 1, text: 'Home', icon: <FaHome />, path: '/' },
    ]

    const excludedIndices = [1, 3, 4, 5]

    return (
        <SidebarState navLinks={navLinks} extraLinks={extraLinks} excludedIndices={excludedIndices} comparePath='teacher' />
    )
}
export default SideBar