import { FaBook, FaBookDead, FaBookOpen, FaHome, FaUser } from 'react-icons/fa'
import SidebarState from '../SimilarPages/SidebarState'

function SideBar() {

    const navLinks = [
        { id: 1, icon: <FaHome />, text: 'Dashboard', path: '', },
        { id: 2, icon: <FaBook />, text: 'Exam History', path: 'exam-history' },
        { id: 3, icon: <FaBookDead />, text: 'Study now', path: '/classroom' },
        { id: 4, icon: <FaUser />, text: 'Edit Profile', path: 'edit-profile' },
    ]

    const extraLinks = [
        { id: 1, text: 'Home', icon: <FaHome />, path: '/' },
        { id: 2, text: 'Practice Exam', icon: <FaBookOpen />, path: '/cbt-practice' },
    ]

    const excludedIndices = [1, 2, 3, 4]
    return (
        <SidebarState navLinks={navLinks} extraLinks={extraLinks} excludedIndices={excludedIndices} comparePath='student' />
    )
}

export default SideBar