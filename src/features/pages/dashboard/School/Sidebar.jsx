import { FaHome, FaUser } from 'react-icons/fa'
import SidebarState from '../SimilarPages/SidebarState'

function SideBar() {

    const navLinks = [
        { id: 1, icon: <FaHome />, text: 'Dashboard', path: '', },
        { id: 2, icon: <FaUser />, text: 'Edit Profile', path: 'edit-profile' },
    ]

    const extraLinks = [
        { id: 1, text: 'Home', icon: <FaHome />, path: '/' }
    ]

    const excludedIndices = [1, 2]
    return (
        <SidebarState navLinks={navLinks} extraLinks={extraLinks} excludedIndices={excludedIndices} comparePath='school-institute' />
    )
}

export default SideBar